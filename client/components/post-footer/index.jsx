/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';
import { decode } from 'he';

/**
 * Internal dependencies
 */
import Icon from 'components/icon';
import ShareButton from 'components/share-button';
import { facebookShareUrl, pinterestShareUrl, twitterShareUrl } from 'lib/social';

const PostFooter = ( { image, link, next, previous, title } ) => (
	<div className="post-footer">
		<div className="post-footer__share">
			<ShareButton
				className={ 'facebook' }
				icon={ <Icon icon={ [ 'fab', 'facebook-f' ] } /> }
				label={ 'Share' }
				url={ facebookShareUrl( link ) } />
			<ShareButton
				className={ 'twitter' }
				icon={ <Icon icon={ [ 'fab', 'twitter' ] } /> }
				label={ 'Tweet' }
				url={ twitterShareUrl( link, decode( title ) ) } />
			<ShareButton
				className={ 'pinterest' }
				icon={ <Icon icon={ [ 'fab', 'pinterest' ] } /> }
				label={ 'Pin' }
				url={ pinterestShareUrl( link, decode( title ), image ) } />
		</div>

		<div className="post-footer__links">
			{ next && (
				<a className="post-footer__link is-next" href={ `/${ next.slug }`}>
					<span className="post-footer__link-label">{ 'next' }</span>
					<span className="post-footer__link-title">{ decode( next.title ) }</span>
				</a>
			) }
			{ previous && (
				<a className="post-footer__link is-prev" href={ `/${ previous.slug }`}>
					<span className="post-footer__link-label">{ 'previous' }</span>
					<span className="post-footer__link-title">{ decode( previous.title ) }</span>
				</a>
			) }
		</div>
	</div>
);

PostFooter.propTypes = {
	image: PropTypes.string,
	link: PropTypes.string.isRequired,
	next: PropTypes.shape( {
		slug: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
	} ),
	previous: PropTypes.shape( {
		slug: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
	} ),
	title: PropTypes.string.isRequired,
};

export default PostFooter;
