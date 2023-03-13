/**
 * External dependencies
 */
import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useGesture } from 'react-use-gesture';
import { useNavigate } from 'react-router-dom';

/**
 * Internal dependencies
 */
import Icon from 'components/icon';
import ScreenReaderText from 'components/screen-reader-text';
import { getImageUrl, getSizes, getSrcSet } from './utils';

const ImagePreview = ( { image, nextUrl, onClose, previousUrl } ) => {
	const [ showControls, setShowControls ] = useState( true );
	const preview = useRef( null );

	const navigate = useNavigate();

	// Disable window scrolling while preview is active
	useEffect( () => {
		if ( ! document ) {
			return;
		}

		document.body.style = 'overflow: hidden;';
		return () => document.body.style = '';
	} );

	// Set up gesture handlers
	const bind = useGesture( {
		onDrag: ( { last, vxvy: [ vx, vy ] } ) => {
			// Swipe down - close preview
			if ( last && Math.abs( vx ) < 0.3 && vy > 0.3 ) {
				return onClose();
			}

			// Swipe left - next image
			if ( nextUrl && last && Math.abs( vy ) < 0.3 && vx < -0.3 ) {
				return navigate( nextUrl );
			}

			// Swipe right - previous image
			if ( previousUrl && last && Math.abs( vy ) < 0.3 && vx > 0.3 ) {
				return navigate( previousUrl );
			}
		},
		onPinch: ( state ) => {

		},
	}, { domTarget: preview } );
	useEffect( bind, [ bind ] );

	const classes = classNames( 'image-preview', {
		'with-controls': showControls,
	} );

	return (
		<div ref={ preview } className={ classes }>
			<figure className="image-preview__frame">
				<img
					className="image-preview__image"
					src={ getImageUrl( image.file, 380 ) }
					srcSet={ getSrcSet( image.file, image.width ) }
					sizes={ getSizes( image.width ) } />

				<figcaption className="image-preview__caption">{ image.title }</figcaption>
			</figure>

			<nav>
				<button className="image-preview__button image-preview__button-close" onClick={ onClose }>
					<ScreenReaderText>Close image preview</ScreenReaderText>
					<Icon icon="xmark" />
				</button>

				{ previousUrl && (
					<a className="image-preview__button image-preview__button-prev" href={ previousUrl }>
						<ScreenReaderText>Previous image</ScreenReaderText>
						<Icon icon="arrow-left" />
					</a>
				) }
				{ nextUrl && (
					<a className="image-preview__button image-preview__button-next" href={ nextUrl }>
						<ScreenReaderText>Next image</ScreenReaderText>
						<Icon icon="arrow-right" />
					</a>
				) }
			</nav>
		</div>
	);
};

ImagePreview.propTypes = {
	image: PropTypes.shape( {
		file: PropTypes.string.isRequired,
	} ),
	nextUrl: PropTypes.string,
	onClose: PropTypes.func.isRequired,
	previous: PropTypes.string,
};

export default ImagePreview;
