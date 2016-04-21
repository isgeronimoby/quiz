import React, { Component, PropTypes } from 'react';
import withFetch from '../components/withFetch';
import LeaderBoard from '../components/LeaderBoard';
import data from '../components/LeaderBoard/data.js';

const DELAY = 100;

async function fetch() {

	console.log('>>TODO: fetch /leaderboard');

	return new Promise((resolve, reject) => {
		setTimeout(() => resolve(data), DELAY);
	});
}

class Leaders extends Component {

	static title = 'Leaderboard';

	render() {
		return (
			<LeaderBoard {...this.props} />
		);
	}

}

export default withFetch(Leaders, fetch);
