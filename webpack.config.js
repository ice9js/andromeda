var path = require( 'path' );
var webpack = require( 'webpack' );
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

var APP_DIR = path.resolve( __dirname, 'client' );
var BUILD_DIR = path.resolve( __dirname, 'public' );

var isDevelopment = process.env.NODE_ENV === 'development';
var shouldMinify = ! isDevelopment;
var settingsFile = isDevelopment ? 'development.js' : 'production.js';

var config = {
	entry: APP_DIR + '/index.jsx',

	output: {
		filename: 'app.js',
		path: BUILD_DIR,
		publicPath: 'andromeda/',
	},
	mode: isDevelopment ? 'development' : 'production',
	optimization: { minimize: shouldMinify },

	module: {
		rules: [
			{
				test: /\.jsx?$/,
				include: APP_DIR,
				loader: 'babel-loader'
			},
		]
	},
	resolve: {
		extensions: [ '.json', '.js', '.jsx' ],
		modules: [ APP_DIR, path.resolve( __dirname, 'node_modules' ) ],
		alias: {
			'app-settings': path.resolve( __dirname, 'config',  settingsFile )
		},
	},
	plugins: [
	],
};

if ( process.env.BUNDLE_ANALYSIS ) {
	config.plugins.push( new BundleAnalyzerPlugin() );
}

module.exports = config;
