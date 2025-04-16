/**
 * External dependencies
 */
import React from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

/**
 * Internal dependencies
 */
import HeaderMeta from 'components/header-meta';
import PageHeader from 'components/page-header';
import PostsFeed from 'components/posts-feed';
import QueryPosts from 'components/data/query-posts';
import { config } from 'config';
import {
	getAllPosts,
	getPostsError,
	getPostsLoadingStatus,
	getPostsTotal,
	getPostsTotalPages,
} from 'state/posts/selectors';

const categories = config('posts.categories');
const postsPerPage = config('posts.perPage');

const categoryUrl = (category) => `/${category}/{{pageNumber}}`;

const Category = ({ categorySlug, ...props }) => {
	const params = useParams();

	const page = (params.page && parseInt(params.page, 10)) || 1;
	const category = categories[categorySlug];
	const query = {
		filter: `tag:${category.id}`,
		limit: postsPerPage,
		page: page,
	};

	return (
		<React.Fragment>
			<HeaderMeta
				title={`${category.label} - Page ${page}`}
				url={`${config('app.host')}/${categorySlug}/${page}`}
			/>

			<PageHeader text={category.label} />

			<QueryPosts query={query} />
			<PostsFeed currentPage={page} paginationBase={categoryUrl(categorySlug)} {...props} />
		</React.Fragment>
	);
};

export default connect((state) => ({
	error: getPostsError(state),
	loading: getPostsLoadingStatus(state),
	posts: getAllPosts(state),
	total: getPostsTotal(state),
	totalPages: getPostsTotalPages(state),
}))(Category);
