/**
 * External dependencies
 */
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { hydrateRoot } from 'react-dom/client';

/**
 * Internal dependencies
 */
import App from 'components/app';
import store from 'state';
import { installServiceWorker } from 'lib/service-worker';

hydrateRoot(
	document.getElementById('app'),
	<Provider store={ store }>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>
);

window.addEventListener( 'load', installServiceWorker );
