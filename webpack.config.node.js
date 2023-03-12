var path = require( 'path' );
var webpack = require( 'webpack' );

// var ExtractTextPlugin = require( 'extract-text-webpack-plugin' );
// var UglifyJsPlugin = require( 'uglifyjs-webpack-plugin' );
// var HtmlWebpackPlugin = require( 'html-webpack-plugin' );

var APP_DIR = path.resolve( __dirname, 'client' );
var ASSETS_DIR = path.resolve( __dirname, 'assets' );
var BUILD_DIR = path.resolve( __dirname, 'build' );
var SERVER_DIR = path.resolve( __dirname, 'server' );

var isDevelopment = process.env.NODE_ENV === 'development';
var settingsFile = isDevelopment ? 'development.js' : 'production.js';

var config = {
	// devtool: 'source-map',
	entry: './index.js',
	target: 'node',
	output: {
		path: BUILD_DIR,
		filename: 'server.js'
	},
	mode: isDevelopment ? 'development' : 'production',
	optimization: { minimize: false },

	module: {
		rules: [
			{
				test: /\.jsx?$/,
				include: APP_DIR,
				loader: 'babel-loader',
			},
			{
				test: /\.jsx$/,
				include: SERVER_DIR,
				loader: 'babel-loader',
			}
		],
	},

	resolve: {
		extensions: [ '.json', '.js', '.jsx' ],
		modules: [
			APP_DIR,
			SERVER_DIR,
			'node_modules',
		],
		alias: {
			'app-settings': path.resolve( __dirname, 'config',  settingsFile )
		},
	},

	plugins: [
		new webpack.optimize.LimitChunkCountPlugin( { maxChunks: 1 } ),
	],

	stats: {
		errorDetails: true,
	},
};

module.exports = config;
