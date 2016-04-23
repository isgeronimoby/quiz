import React, { Component, PropTypes } from 'react';
import DrawList from '../components/DrawList';
import withFetch from '../components/withFetch';
import items from '../components/DrawList/data.js';

const DELAY = 100;


async function fetch() {

	console.log('>>TODO: fetch /draws');

	return new Promise((resolve, reject) => {
		setTimeout(() => resolve(items),  DELAY);
	});
}

class Draws extends Component {

	static title = 'Draws';

	render() {
		return (
			<DrawList {...this.props} />
		);
	}
}

export default withFetch(Draws, fetch);
