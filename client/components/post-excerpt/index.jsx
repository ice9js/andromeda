/**
 * External dependencies
 */
import React from 'react';

/**
 * Internal dependencies
 */
import Icon from 'components/icon';
import PostContent from 'components/post-content';
import PostHeader from 'components/post-header';

const PostExcerpt = ({ post }) => (
	<div className="post-excerpt">
		<PostHeader post={post} />
		<PostContent content={`<p>${post.excerpt}</p>`} />

		<div className="post-excerpt__actions">
			<a className="post-excerpt__read-more" href={`/${post.slug}`}>
				{'Continue reading'}
				<Icon className="post-excerpt__read-more-icon" icon="angles-right" />
			</a>
		</div>
	</div>
);

export default PostExcerpt;
