/**
 * External dependencies
 */
import React, { useEffect } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import PropTypes from 'prop-types';
import { Route, Routes } from 'react-router';
import { useNavigate } from 'react-router-dom';

/**
 * Internal dependencies
 */
import Archive from 'views/archive';
import Category from 'views/category';
import Home from 'views/home';
import MobileNavigation from 'components/navigation/mobile';
import Navigation from 'components/navigation';
import ErrorView from 'views/error';
import Post from 'views/post';
import Search from 'views/search';
import { getLink, isLocalLink } from './utils';

const App = () => {
	const navigate = useNavigate();

	const handleClick = (event) => {
		const link = getLink(event.target);

		if (link && isLocalLink(link)) {
			event.preventDefault();
			navigate(new URL(link.href).pathname);
		}
	};

	useEffect(() => {
		window && window.addEventListener('click', handleClick);

		return () => {
			window && window.removeEventListener('click', handleClick);
		};
	}, []);

	return (
		<div className="app">
			<Navigation />
			<MobileNavigation />

			<main className="app__content">
				<ErrorBoundary FallbackComponent={ErrorView}>
					<Routes>
						<Route path="/" element={<Home />} />

						<Route path="/thoughts" element={<Category categorySlug="thoughts" />} />
						<Route path="/thoughts/:page" element={<Category categorySlug="thoughts" />} />

						<Route path="/programming" element={<Category categorySlug="programming" />} />
						<Route
							path="/programming/:page"
							element={<Category categorySlug="programming" />}
						/>

						<Route path="/travel" element={<Category categorySlug="travel" />} />
						<Route path="/travel/:page" element={<Category categorySlug="travel" />} />

						<Route path="/photos" element={<Category categorySlug="photos" />} />
						<Route path="/photos/:page" element={<Category categorySlug="photos" />} />

						<Route path="/all" element={<Archive />} />
						<Route path="/all/:page" element={<Archive />} />

						<Route path="/search" element={<Search />} />

						<Route path="/:slug/*" element={<Post />} />
					</Routes>
				</ErrorBoundary>
			</main>
		</div>
	);
};

export default App;
