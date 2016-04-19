import 'babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';
import Location from './lib/Location';
import Layout from './components/Layout';

const routes = {}; // Auto-generated on build. See tools/lib/routes-loader.js

const route = async (path, params = {}, callback) => {
	const handler = routes[path] || routes['/404'];
	const Component = await handler();
	const pageTitle = Component.title || 'Index';
	await callback(
		<Layout title={pageTitle} path={path}>
			<Component params={params}/>
		</Layout>
	);
};

function run() {
	const container = document.getElementById('app');
	Location.listen(location => {
		const pathname = location.pathname;
		const state = location.state;
		const path = pathname.slice(pathname.lastIndexOf('/'));

		route(path, state, async (component) => {
			ReactDOM.render(component, container, () => {
				// Track the page view event via Google Analytics
				//window.ga('send', 'pageview');
			});
		});
	});
}

if (canUseDOM) {
// Run the application when both DOM is ready
// and page content is loaded
	if (window.addEventListener) {
		window.addEventListener('DOMContentLoaded', run);
	} else {
		window.attachEvent('onload', run);
	}
}

export default {route, routes};
