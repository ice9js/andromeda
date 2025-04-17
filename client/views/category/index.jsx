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

const categories = config('posts.categories');
const postsPerPage = config('posts.perPage');

const categoryUrl = (category) => `/${category}/{{pageNumber}}`;

const Category = ({ categorySlug, ...props }) => {
	const params = useParams();

	const page = (params.page && parseInt(params.page, 10)) || 1;
	const category = categories[categorySlug];

	const posts = ghost.posts.browse({
		filter: `tag:${category.id}`,
		include: 'authors',
		limit: postsPerPage,
		page,
	});

	return (
		<>
			<HeaderMeta
				title={`${category.label} - Page ${page}`}
				url={`${config('app.host')}/${categorySlug}/${page}`}
			/>

			<PageHeader text={category.label} />

			<Suspense fallback={times(3, (n) => <PostPlaceholder key={n} />)}>
				<PostsFeed currentPage={page} paginationBase={categoryUrl(categorySlug)} posts={posts} />
			</Suspense>
		</>
	);
};

export default Category;
