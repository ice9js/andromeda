/**
 * External dependencies
 */
import React, { Suspense } from 'react';
import { times } from 'lodash';

/**
 * Internal dependencies
 */
import HeaderMeta from 'components/header-meta';
import PostPlaceholder from 'components/post-placeholder';
import PostsFeed from 'components/posts-feed';
import { config } from 'config';
import { ghost } from 'data/ice9js.me';

const postsPerPage = config('posts.perPage');

const Home = (props) => {
	const posts = ghost.posts.browse({ include: 'authors', limit: postsPerPage});

	return (
		<>
			<HeaderMeta title="Home" url={config('app.host')} />

			<Suspense fallback={times(3, (n) => <PostPlaceholder key={n} />)}>
				<PostsFeed posts={posts} />
			</Suspense>
		</>
	);
};

export default Home;
