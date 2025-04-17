/**
 * External dependencies
 */
import React, { Suspense } from 'react';
import { useParams } from 'react-router-dom';
import { times } from 'lodash';

/**
 * Internal dependencies
 */
import HeaderMeta from 'components/header-meta';
import PageHeader from 'components/page-header';
import PostPlaceholder from 'components/post-placeholder';
import PostsFeed from 'components/posts-feed';
import { config } from 'config';
import { ghost } from 'data/ice9js.me';

const postsPerPage = config('posts.perPage');

const Archive = (props) => {
	const params = useParams();

	const page = (params.page && parseInt(params.page, 10)) || 1;
	const posts = ghost.posts.browse({ include: 'authors', limit: postsPerPage, page });

	return (
		<>
			<HeaderMeta
				title={`All Posts - Page ${page}`}
				url={`${config('app.host')}/all/${page}`}
			/>

			<PageHeader text="All Posts" />

			<Suspense fallback={times(3, (n) => <PostPlaceholder key={n} />)}>
				<PostsFeed currentPage={page} paginationBase="/all/{{pageNumber}}" posts={posts} />
			</Suspense>
		</>
	);
};

export default Archive;
