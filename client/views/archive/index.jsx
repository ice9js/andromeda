/**
 * External dependencies
 */
import React from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';

/**
 * Internal dependencies
 */
import PageHeader from 'components/page-header';
import PostsFeed from 'components/posts-feed';
import QueryPosts from 'components/data/query-posts';
import { config } from 'config';
import { getAllPosts, getPostsError, getPostsLoadingStatus, getPostsTotal, getPostsTotalPages } from 'state/posts/selectors';

const postsPerPage = config( 'posts.perPage' );

const Archive = ( { match, ...props } ) => {
	const page = ( match.params.page && parseInt( match.params.page ) ) || 1;
	const query = {
		per_page: postsPerPage,
		offset: ( page - 1 ) * postsPerPage,
	};

	return (
		<React.Fragment>
			<Helmet>
				<title>{ `Archive - Page ${ page } - ${ config( 'app.name' ) }` }</title>
			</Helmet>

			<PageHeader text="Archive" />

			<QueryPosts query={ query } />
			<PostsFeed
				currentPage={ page }
				paginationBase="/all/{{pageNumber}}"
				{ ...props } />
		</React.Fragment>
	);
};

export default connect(
	( state ) => ( {
		error: getPostsError( state ),
		loading: getPostsLoadingStatus( state ),
		posts: getAllPosts( state ),
		total: getPostsTotal( state ),
		totalPages: getPostsTotalPages( state ),
	} )
)( Archive );
