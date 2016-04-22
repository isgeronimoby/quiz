import path from 'path';
import webpack from 'webpack';
import merge from 'lodash.merge';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const NPM_SCRIPT = process.env.npm_lifecycle_event;
const DEBUG = !process.argv.includes('release');
const VERBOSE = process.argv.includes('verbose');
const WATCH = global.watch; // same as DEBUG, currently

//console.log('>>TARGET', NPM_SCRIPT);


const AUTOPREFIXER_BROWSERS = [
	'Android 2.3',
	'Android >= 4',
	'Chrome >= 35',
	'Firefox >= 31',
	'Explorer >= 9',
	'iOS >= 7',
	'Opera >= 12',
	'Safari >= 7.1',
];
const JS_LOADER = {
	test: /\.jsx?$/,
	include: [
		path.resolve(__dirname, '../components'),
		path.resolve(__dirname, '../lib'),
		path.resolve(__dirname, '../pages'),
		path.resolve(__dirname, '../app.js'),
		path.resolve(__dirname, '../config.js'),
	],
	loader: 'babel-loader',
};


// Common
//
const common = {
	output: {
		path: path.join(__dirname, '../build'), // may be overwritten in bundle.js
		publicPath: './',
		sourcePrefix: '  ',
	},
	cache: false,
	debug: DEBUG,
	stats: {
		colors: true,
		reasons: DEBUG,
		hash: VERBOSE,
		version: VERBOSE,
		timings: true,
		chunks: VERBOSE,
		chunkModules: VERBOSE,
		cached: VERBOSE,
		cachedAssets: VERBOSE,
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'Quizz app',
			template: 'components/index.html',
			inject: 'body'
		}),
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': DEBUG ? '"development"' : '"production"',
			'__DEV__': DEBUG,
		}),
	],
	module: {
		loaders: [
			{
				test: /[\\\/]app\.js$/,
				loader: path.join(__dirname, './lib/routes-loader.js'),
			},
			{
				test: /\.json$/,
				loader: 'json-loader',
			},
			{
				test: /\.txt$/,
				loader: 'raw-loader',
			},
			{
				test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
				loader: 'url-loader?prefix=./?limit=10000', // prefix is required until we are on gh-pages
			},
			{
				test: /\.(eot|ttf|wav|mp3)$/,
				loader: 'file-loader',
			},
			{
				test: /\.scss$/,
				loaders: ['style-loader', 'css-loader', 'postcss-loader'],
			},
		],
	},
	postcss: function plugins() {
		return [
			require('postcss-import')({
				onImport: files => files.forEach(this.addDependency),
			}),
			require('precss')(),
			require('autoprefixer')({
				browsers: AUTOPREFIXER_BROWSERS
			}),
		];
	},
};

// Production & staging
//

let appConfig;
if (/build|build-prod|deploy/.test(NPM_SCRIPT)) {
	appConfig = merge({}, common, {
		entry: {
			app: './app.js',
		},
		output: {
			filename: 'app.js',
		},
		devtool: false,
		plugins: [
			...common.plugins,
			new webpack.optimize.DedupePlugin(),
			new webpack.optimize.UglifyJsPlugin({
				compress: {
					warnings: VERBOSE
				}
			}),
			//new webpack.optimize.AggressiveMergingPlugin(),
			new webpack.optimize.LimitChunkCountPlugin({maxChunks: 1}), // TODO - figure out relative chunk paths
		],
		module: {
			loaders: [
				JS_LOADER,
				...common.module.loaders
			],
		},
	});
}

// Dev/watch
//

if (NPM_SCRIPT === 'start') {
	appConfig = merge({}, common, {
		entry: [
			'webpack-hot-middleware/client', // WATCH
			'./app.js',
		],
		output: {
			filename: 'app.js',
		},
		// http://webpack.github.io/docs/configuration.html#devtool
		devtool: 'cheap-module-eval-source-map',
		plugins: [
			...common.plugins,
			new webpack.HotModuleReplacementPlugin(), // WATCH
			new webpack.NoErrorsPlugin(), // WATCH
		],
		module: {
			loaders: [
				Object.assign({}, JS_LOADER, { // WATCH
					query: {
						// Wraps all React components into arbitrary transforms
						// https://github.com/gaearon/babel-plugin-react-transform
						plugins: ['react-transform'],
						extra: {
							'react-transform': {
								transforms: [
									{
										transform: 'react-transform-hmr',
										imports: ['react'],
										locals: ['module'],
									}, {
										transform: 'react-transform-catch-errors',
										imports: ['react', 'redbox-react'],
									},
								],
							},
						},
					},
				}),
				...common.module.loaders
			],
		},
	});
}


export default appConfig;
