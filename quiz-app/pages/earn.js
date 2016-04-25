import React, { Component, PropTypes } from 'react';
import EarnContainer from '../components/EarnContainer';
import withFetch from '../components/withFetch';
import items from '../components/EarnContainer/data.js';

const DELAY = 100;


async function fetch() {

	console.log('>>TODO: fetch /earn');

	return new Promise((resolve, reject) => {
		setTimeout(() => resolve(items),  DELAY);
	});
}

class Earns extends Component {

	static title = 'Earn';

	render() {
		return (
			<EarnContainer {...this.props} />
		);
	}
}

export default withFetch(Earns, fetch);
