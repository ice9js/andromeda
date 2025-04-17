/**
 * External dependencies
 */
import React, { use } from 'react';
import { Helmet } from 'react-helmet-async';
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
import { config } from 'config';

const Post = ({ post: postPromise }) => {
	const post = use(postPromise);

	return (
		<>
			<Helmet>
				<title>{decode(post.title)}</title>
				<meta
					name="description"
					content={decode(post.excerpt.replace(/(<[^<]*>)/gi, ''))}
				/>

				<meta property="og:type" content="article" />
				<meta property="og:url" content={trimEnd(post.url, '/')} />
				<meta property="og:title" content={decode(post.title)} />
				<meta
					property="og:description"
					content={decode(post.excerpt.replace(/(<[^<]*>)/gi, ''))}
				/>
				<meta property="og:image" content={post.feature_image || config('app.openGraphImage')} />
				<meta property="article:published_time" content={post.published_at} />
				<meta property="article:modified_time" content={post.updated_at} />
				<meta property="article:author" content={post.primary_author.name} />

				<meta property="twitter:card" content="summary_large_image" />
				<meta property="twitter:site" content={config('app.twitterHandle')} />
				<meta property="twitter:creator" content={config('app.twitterHandle')} />
			</Helmet>

			<PostHeader post={post} />
			<PostContent content={post.html} />
			<PostFooter {...post} />
			<DiscourseEmbed url={post.url} />
		</>
	);
};

export default Post;
