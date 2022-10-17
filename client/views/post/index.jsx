/**
 * External dependencies
 */
import React, { Fragment } from 'react';
import { Route, Routes } from 'react-router';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

/**
 * Internal dependencies
 */
import PostComponent from 'components/post';
import QueryPosts from 'components/data/query-posts';
import { getPostsError, getPostsLoadingStatus, getPost } from 'state/posts/selectors';
import Gallery from './gallery';

const Post = () => {
	const { slug } = useParams();

	const [ error, loading, post ] = useSelector( ( state ) => [
		getPostsError( state ),
		getPostsLoadingStatus( state ),
		getPost( state, slug ),
	] );

	const query = {
		_embed: true,
		per_page: 1,
		slug,
	};

	return (
		<Fragment>
			<QueryPosts query={ query } />

			<PostComponent post={ post } loading={ loading } error={ error } />

			<Routes>
				<Route
					path={ `images/:imageId` }
					element={ <Gallery postSlug={ slug } /> }
				/>
			</Routes>
		</Fragment>
	);
};

export default Post;
