/**
 * External dependencies
 */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

/**
 * Internal dependencies
 */
import { fetchPostImages } from 'data/besidesprogramming/media';
import { requestPostMedia, requestPostMediaError, updatePostMedia } from 'state/media/actions';

const QueryPostMedia = ({ postSlug }) => {
	const [currentPostSlug, setCurrentPostSlug] = useState('');

	const dispatch = useDispatch();

	if (postSlug && postSlug !== currentPostSlug) {
		dispatch(requestPostMedia(postSlug));

		fetchPostImages(
			postSlug,
			({ media }) => dispatch(updatePostMedia(postSlug, media)),
			() => dispatch(requestPostMediaError(postSlug)),
		);

		setCurrentPostSlug(postSlug);
	}

	return null;
};

QueryPostMedia.propTypes = {
	postSlug: PropTypes.string.isRequired,
};

export default QueryPostMedia;
