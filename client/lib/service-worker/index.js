/**
 * Installs the service worker for the app.
 */
export const installServiceWorker = async () => {
	if ( ! window.navigator.serviceWorker ) {
		return;
	}

	navigator.serviceWorker.register( '/andromeda/service-worker.js', { scope: '/', } )
		.then( ( registration ) => {
			// Check for updates
			registration.update();
		} )
		.catch( ( error ) => {
			console.error( `Service worker registration failed with ${ error }` );
		} );
};
