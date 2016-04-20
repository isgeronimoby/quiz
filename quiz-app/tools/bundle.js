/**
 * React Static Boilerplate
 * https://github.com/koistya/react-static-boilerplate
 * Copyright (c) Konstantin Tarkus (@koistya) | MIT license
 */

import webpack from 'webpack';
import path from 'path';
import merge from 'lodash.merge';
import task from './lib/task';
import configs from './webpack.config';

export default task(function bundle(dir = 'build') {

	// overwrite path config
	const configsWithDir = configs.map((c) => merge({}, c, {
		output: {
			path: path.join(__dirname, `../${dir}`)
		}
	}));

	return new Promise((resolve, reject) => {
		const bundler = webpack(configsWithDir);
		const run = (err, stats) => {
			if (err) {
				reject(err);
			} else {
				console.log(stats.toString(configsWithDir[0].stats));
				resolve();
			}
		};
		bundler.run(run);
	});
});
