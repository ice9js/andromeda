/**
 * External dependencies
 */
import React, { useEffect } from 'react';
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
import Post from 'views/post';
import Search from 'views/search';
import { getLink, isLocalLink } from './utils';

const App = () => {
	const navigate = useNavigate();

	const handleClick = ( event ) => {
		const link = getLink( event.target );

		if ( link && isLocalLink( link ) ) {
			event.preventDefault();
			navigate( new URL( link.href ).pathname );
		}
	};

	useEffect( () => {
		window && window.addEventListener( 'click', handleClick );

		return () => {
			window && window.removeEventListener( 'click', handleClick );
		};
	}, [] );

	return (
		<div className="app">
			<Navigation />
			<MobileNavigation />

			<main className="app__content">
				<Routes>
					<Route
						path="/"
						element={ <Home /> }
					/>
					<Route
						path="/:category(thoughts|programming|travel|photos)/:page(\d+)?"
						element={ <Category /> }
					/>
					<Route
						path="/all/:page(\d+)?"
						element={ <Archive /> }
					/>
					<Route
						path="/search"
						element={ <Search /> }
					/>
					<Route
						path="/:slug/*"
						element={ <Post /> }
					/>
				</Routes>
			</main>
		</div>
	);
};

export default App;
