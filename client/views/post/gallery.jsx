/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router-dom';

/**
 * Internal dependencies
 */
import ImagePreview from 'components/image-preview';
import QueryPostMedia from 'components/data/query-post-media';
import {
	getPostImage,
	getNextPostImage,
	getPreviousPostImage,
	isPostMediaLoading,
	isPostMediaRequested,
} from 'state/media/selectors';

const Gallery = ({ postSlug }) => {
	const { imageId } = useParams();

	const navigate = useNavigate();

	const [currentImage, loading, nextImage, previousImage, requested] = useSelector((state) => [
		getPostImage(state, postSlug, parseInt(imageId, 10)),
		isPostMediaLoading(state, postSlug),
		getNextPostImage(state, postSlug, parseInt(imageId, 10)),
		getPreviousPostImage(state, postSlug, parseInt(imageId, 10)),
		isPostMediaRequested(state, postSlug),
	]);

	const redirectToPost = () => navigate(`/${postSlug}`);

	if (requested && !loading && !currentImage) {
		return <Navigate to={`/${postSlug}`} replace />;
	}

	return (
		<React.Fragment>
			<QueryPostMedia postSlug={postSlug} />

			<Helmet>
				<meta name="robots" content="noindex" />
			</Helmet>

			{currentImage && (
				<ImagePreview
					image={currentImage}
					nextUrl={nextImage && `/${postSlug}/images/${nextImage.id}`}
					previousUrl={previousImage && `/${postSlug}/images/${previousImage.id}`}
					onClose={redirectToPost}
				/>
			)}
		</React.Fragment>
	);
};

Gallery.propTypes = {
	postSlug: PropTypes.string.isRequired,
};

export default Gallery;
