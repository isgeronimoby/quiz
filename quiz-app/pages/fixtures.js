import React, { Component, PropTypes } from 'react';
import FixtureList from '../components/FixtureList';
import withFetch from '../components/withFetch';
import items from '../components/FixtureList/data.js';

const DELAY = 100;


async function fetch() {

	console.log('>>TODO: fetch /fixtures');

	return new Promise((resolve, reject) => {
		setTimeout(() => resolve(items),  DELAY);
	});
}

class Fixtures extends Component {

	static title = 'Fixtures';

	render() {
		return (
			<FixtureList {...this.props} />
		);
	}
}

export default withFetch(Fixtures, fetch);
