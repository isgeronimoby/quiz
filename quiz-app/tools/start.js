/**
 * React Static Boilerplate
 * https://github.com/koistya/react-static-boilerplate
 * Copyright (c) Konstantin Tarkus (@koistya) | MIT license
 */

import browserSync from 'browser-sync';
import webpack from 'webpack';
import hygienistMiddleware from 'hygienist-middleware';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import historyApiFallback from 'connect-history-api-fallback';


global.watch = true;
const webpackConfig = require('./webpack.config');
const bundler = webpack(webpackConfig);

export default async () => {
	await require('./build')();

	browserSync({
		server: {
			baseDir: 'build',

			middleware: [
				hygienistMiddleware('build'),

				webpackDevMiddleware(bundler, {
					// IMPORTANT: dev middleware can't access config, so we should
					// provide publicPath by ourselves
					publicPath: webpackConfig.output.publicPath,

					// pretty colored output
					stats: webpackConfig.stats,

					// for other settings see
					// http://webpack.github.io/docs/webpack-dev-middleware.html
				}),

				// bundler should be the same as above
				webpackHotMiddleware(bundler),

				// returns index.html for any url on F5
				historyApiFallback(),
			],
		},

		// no need to watch '*.js' here, webpack will take care of it for us,
		// including full page reloads if HMR won't work
		files: [
			'build/**/*.css',
			'build/**/*.html',
		],
	});
};
