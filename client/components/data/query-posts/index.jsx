/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { isEqual } from 'lodash';

/**
 * Internal dependencies
 */
import { fetchPosts } from 'data/besidesprogramming/posts';
import { requestPosts, requestPostsError, updatePosts } from 'state/posts/actions';
import { getPostsLoadingStatus, getPostsError, getQuery } from 'state/posts/selectors';

const QueryPosts = ({ query }) => {
	const dispatch = useDispatch();

	const [lastQuery, error, loading] = useSelector((state) => [
		getQuery(state),
		getPostsError(state),
		getPostsLoadingStatus(state),
	]);

	if (!isEqual(query, lastQuery) && !loading) {
		dispatch(requestPosts(query));

		fetchPosts(
			query,
			({ items, total, totalPages }) => dispatch(updatePosts(items, total, totalPages)),
			(error) => dispatch(requestPostsError(error.status)),
		);
	}

	return null;
};

QueryPosts.propTypes = {
	query: PropTypes.object,
};

export default QueryPosts;
