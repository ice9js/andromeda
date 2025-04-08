/**
 * External dependencies
 */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import { config } from 'config';

const discourseUrl = config( 'app.discourseUrl' );

const DiscourseEmbed = ( { url } ) => {
	useEffect( () => {
		if (
			typeof window === 'undefined' ||
			! discourseUrl ||
			! url
		) {
			return;
		}

		window.DiscourseEmbed = {
			discourseUrl: config( 'app.discourseUrl' ),
			discourseEmbedUrl: url,
		};

		const script = document.createElement('script' );
		script.setAttribute( 'type', 'text/javascript' );
		script.setAttribute( 'async', true );
		script.setAttribute( 'src', `${ discourseUrl }javascripts/embed.js`  );

		document.head.appendChild( script );

		return () => document.head.removeChild( script );
	}, [ url ] );

	return <div id="discourse-comments" />;
};


DiscourseEmbed.propTypes = {
	url: PropTypes.string.isRequired,
};

export default DiscourseEmbed;
