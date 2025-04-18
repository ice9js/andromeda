/**
 * External dependencies
 */
import React from 'react';

/**
 * Internal dependencies
 */
import { config } from 'config';

const Document = ({ children, head, preloadedState }) => (
	<html lang="en">
		<head>
			{head?.title?.toComponent()}
			{head?.meta?.toComponent()}

			<meta charSet="utf-8" />
			<meta name="viewport" content="width=device-width, initial-scale=1" />

			<link
				href="/andromeda/styles.min.css"
				rel="stylesheet"
				type="text/css"
				media="screen"
			/>

			<link
				href="https://fonts.googleapis.com/css?family=Montserrat:400,700,900&display=swap"
				rel="stylesheet"
			/>
			<link
				href="https://fonts.googleapis.com/css?family=Open+Sans:400,400i,700&display=swap"
				rel="stylesheet"
				type="text/css"
			/>
			<link
				href="https://fonts.googleapis.com/css?family=Source+Code+Pro&display=swap"
				rel="stylesheet"
				type="text/css"
			/>
			<link
				href="https://use.fontawesome.com/releases/v5.4.1/css/svg-with-js.css"
				rel="stylesheet"
				type="text/css"
			></link>

			<link rel="apple-touch-icon" sizes="57x57" href="andromeda/ico/apple-icon-57x57.png" />
			<link rel="apple-touch-icon" sizes="60x60" href="andromeda/ico/apple-icon-60x60.png" />
			<link rel="apple-touch-icon" sizes="72x72" href="andromeda/ico/apple-icon-72x72.png" />
			<link rel="apple-touch-icon" sizes="76x76" href="andromeda/ico/apple-icon-76x76.png" />
			<link
				rel="apple-touch-icon"
				sizes="114x114"
				href="andromeda/ico/apple-icon-114x114.png"
			/>
			<link
				rel="apple-touch-icon"
				sizes="120x120"
				href="andromeda/ico/apple-icon-120x120.png"
			/>
			<link
				rel="apple-touch-icon"
				sizes="144x144"
				href="andromeda/ico/apple-icon-144x144.png"
			/>
			<link
				rel="apple-touch-icon"
				sizes="152x152"
				href="andromeda/ico/apple-icon-152x152.png"
			/>
			<link
				rel="apple-touch-icon"
				sizes="180x180"
				href="andromeda/ico/apple-icon-180x180.png"
			/>
			<link
				rel="icon"
				type="image/png"
				sizes="192x192"
				href="andromeda/ico/android-icon-192x192.png"
			/>
			<link
				rel="icon"
				type="image/png"
				sizes="32x32"
				href="andromeda/ico/favicon-32x32.png"
			/>
			<link
				rel="icon"
				type="image/png"
				sizes="96x96"
				href="andromeda/ico/favicon-96x96.png"
			/>
			<link
				rel="icon"
				type="image/png"
				sizes="16x16"
				href="andromeda/ico/favicon-16x16.png"
			/>
			<link rel="manifest" href="/andromeda/manifest.json" />

			<meta name="msapplication-TileColor" content="#ffffff" />
			<meta name="msapplication-TileImage" content="andromeda/ico/ms-icon-144x144.png" />
			<meta name="theme-color" content="#ffffff" />

			<script
				async
				src={`https://www.googletagmanager.com/gtm.js?id=${config('app.gtmId')}`}
			/>
			<script
				dangerouslySetInnerHTML={{
					__html: `
						window.dataLayer = window.dataLayer || [];
						window.dataLayer.push( {
							'gtm.start': new Date().getTime(),
							event: 'gtm.js',
						} );
					`,
				}}
			/>
		</head>
		<body>
			<noscript>
				<iframe
					src={`https://www.googletagmanager.com/ns.html?id=${config('app.gtmId')}"`}
					height={0}
					width={0}
					style={{ display: 'none', visibility: 'higgen' }}
				/>
			</noscript>

			<div id="app" data-preloaded-state={JSON.stringify(preloadedState)}>
				{children}
			</div>
			<script defer type="text/javascript" src="/andromeda/app.js"></script>
		</body>
	</html>
);

export default Document;
