/**
 * External dependencies
 */
import React from 'react';
import { Helmet } from 'react-helmet';
import { trimEnd } from 'lodash';
import { decode } from 'he';

/**
 * Internal dependencies
 */
import DiscourseEmbed from 'components/discourse-embed';
import PostContent from 'components/post-content';
import PostFooter from 'components/post-footer';
import PostHeader from 'components/post-header';
import PostPlaceholder from 'components/post-placeholder';
import ErrorView from 'views/error';
import { config } from 'config';

const Post = ( { error, loading, post } ) => {
	if ( loading ) {
		return <PostPlaceholder />;
	}

	if ( error ) {
		return <ErrorView status={ error } />
	}

	if ( ! post ) {
		return <ErrorView status={ 404 } />
	}

	return (
		<>
			<Helmet>
				<title>{ decode( post.title )  }</title>
				<meta
					name="description"
					content={ decode( post.excerpt.replace( /(<[^<]*>)/gi, '' ) ) }
				/>

				<meta property="og:type" content="article" />
				<meta property="og:url" content={ trimEnd( post.link, '/' ) } />
				<meta property="og:title" content={ decode( post.title ) } />
				<meta
					property="og:description"
					content={
						decode( post.excerpt.replace( /(<[^<]*>)/gi, '' ) )
					}
				/>
				<meta property="og:image" content={ post.image || config( 'app.openGraphImage' ) } />
				<meta property="article:published_time" content={ post.date } />
				<meta property="article:modified_time" content={ post.modified } />
				<meta property="article:author" content={ post.author } />

				<meta property="twitter:card" content="summary_large_image" />
				<meta property="twitter:site" content={ config( 'app.twitterHandle' ) } />
				<meta property="twitter:creator" content={ config( 'app.twitterHandle' ) } />
			</Helmet>

			<PostHeader { ...post } />
			<PostContent content={ post.content } />
			<PostFooter { ...post } />
			<DiscourseEmbed url={ post.link } />
		</>
	);
};

export default Post;
