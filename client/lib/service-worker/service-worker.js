const type = {
	REST: 'rest',
	IMAGE: 'image',
	STATIC: 'static',
	CONTENT: 'content',
};

const opts = {
	prefillAssets: [
		'/',
		'/andromeda/styles.min.css',
		'/andromeda/img/logo.svg',
		'/andromeda/app.js',
		'/andromeda/highlightjs.app.js',
		'/andromeda/browserconfig.xml',
		'/andromeda/manifest.json'
	],
	offlinePage: '/',
	offlineImage: '',
	allowedOrigins: [
		{
			host: self.location.origin,
			pattern: /^\/((wp-content\/uploads|wp-json|andromeda)\/(.+))?$/
		},
		'https://fonts.googleapis.com',
		'https://fonts.gstatic.com',
		'https://i0.wp.com',
		{
			host: 'https://themissingsemicolon.blog',
			pattern: /^\/((wp-content\/uploads|wp-json|andromeda)\/(.+))?$/
		},
		'https://use.fontawesome.com',
		'https://www.google-analytics.com',
		'https://www.googletagmanager.com',
	],
};

/**
 * Return a resource type based on the request
 */
const getResourceType = ( request ) => {
	const url = new URL( request.url );
	const acceptHeader = request.headers.get( 'Accept' );

	if ( url.pathname.startsWith( '/wp-json' ) ) {
		return type.REST;
	}

	if (
		acceptHeader.indexOf( 'text/html' ) !== -1 ||
		url.pathname.startsWith( '/andromeda')
	) {
		return type.STATIC;
	}

	if ( acceptHeader.indexOf('image') !== -1 ) {
		return type.IMAGE;
	}

	return type.CONTENT;
}

/**
 * Returns true when the fetch event should be handled by the worker
 */
const shouldHandleFetch = ( event ) => {
	const request = event.request;
	const url = new URL( request.url );

	if ( request.method !== 'GET' ) {
		return false;
	}

	const rule = opts.allowedOrigins.find( ( origin ) => origin.host === url.origin );

	return rule && ( ! rule.pattern || rule.pattern.exec( url.pathname ) );
}

/**
 * Add the response for the request to the cache with cacheKey
 */
const addToCache = ( cacheKey, request, response ) => {
	if ( ! response.ok ) {
		return;
	}

	const copy = response.clone();
	caches.open( cacheKey ).then( ( cache ) => cache.put( request, copy ) );

	return response;
};

/**
 * Attempt to find a response for the request in the cache
 */
const fetchFromCache = ( event ) => {
	return caches.match( event.request ).then( ( response ) => {
		if ( ! response ) {
			throw new Error( `${ event.request.url } not found in cache` );
		}

		return response;
	} );
};

/**
 * Return an offline response for the given resourceType
 */
const offlineResponse = ( resourceType ) => {
	if ( resourceType === type.IMAGE ) {
		return new Response( opts.offlineImage, {
			headers: { 'Content-Type': 'image/svg+xml' }
		} );
	}

	if ( resourceType === type.REST ) {
		return new Response( null, {
			status: 503,
			statusText: 'Service Unavailable',
			headers: { 'Content-Type': 'application/json' }
		} );
	}

	// type.STATIC && type.CONTENT
	return caches.match( opts.offlinePage );
};

/**
 * Install event handler
 */
self.addEventListener( 'install', ( event ) => event.waitUntil(
	caches
		.open( type.STATIC )
		.then( cache => cache.addAll( opts.prefillAssets ) )
) );

/**
 * Fetch event handler
 */
self.addEventListener( 'fetch', ( event ) => {
	if ( ! shouldHandleFetch( event ) ) {
		return;
	}

	const request = event.request;
	const resourceType = getResourceType( request );

	event.respondWith(
		fetch( event.request )
			.then( ( response ) => addToCache( resourceType, request, response ) )
			.catch( () => fetchFromCache( event ) )
			.catch( () => offlineResponse( resourceType ) )
	);
} );
