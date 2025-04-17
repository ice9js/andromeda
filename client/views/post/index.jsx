/**
 * External dependencies
 */
import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

/**
 * Internal dependencies
 */
import PostComponent from 'components/post';
import PostPlaceholder from 'components/post-placeholder';
import { ghost } from 'data/ice9js.me';
import Gallery from './gallery';

const Post = () => {
	const { slug } = useParams();

	const post = ghost.posts.read({ slug }, { include: 'authors' });

	return (
		<>
			<Suspense fallback={ <PostPlaceholder /> }>
				<PostComponent post={post} />
			</Suspense>

			<Routes>
				<Route path={`images/:imageId`} element={<Gallery postSlug={slug} />} />
			</Routes>
		</>
	);
};

export default Post;
