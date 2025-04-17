/**
 * External dependencies
 */
import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom/server';
import { renderToPipeableStream } from 'react-dom/server';
import express from 'express';

/**
 * Internal dependencies
 */
import App from 'components/app';
import Document from 'document';
import store from 'state';

export default (req, res, next) => {
	const helmetContext = {};

	const { pipe } = renderToPipeableStream(
		<Document head={helmetContext.helmet}>
			<HelmetProvider context={helmetContext}>
				<Provider store={store}>
					<StaticRouter location={req.url}>
						<App />
					</StaticRouter>
				</Provider>
			</HelmetProvider>
		</Document>,
		{
			onAllReady: () => {
				res.setHeader('Content-Type', 'text/html');
				pipe(res);
			},
			onError: (err) => {
				res.statusCode = err.response?.status || 500;

				if (500 <= res.statusCode) {
					console.error('SSR Error: ', err);
				}
			},
		}
	);
};
