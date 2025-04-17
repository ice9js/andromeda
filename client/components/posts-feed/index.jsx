/**
 * External dependencies
 */
import React, { use } from 'react';
import PropTypes from 'prop-types';
import { map } from 'lodash';

/**
 * Internal dependencies
 */
import Pagination from 'components/pagination';
import PostExcerpt from 'components/post-excerpt';

const PostsFeed = ({ currentPage, paginationBase, posts: postsPromise }) => {
	const posts = use(postsPromise);

	return (
		<>
			{posts.map((post) => <PostExcerpt key={post.slug} post={post} />)}

			{paginationBase && posts.meta.pagination.total !== 0 && (
				<Pagination
					currentPage={currentPage}
					pages={posts.meta.pagination.pages}
					paginationBase={paginationBase}
				/>
			)}
		</>
	);
};

export default PostsFeed;
