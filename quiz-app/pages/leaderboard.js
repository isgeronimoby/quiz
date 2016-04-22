import React, { Component, PropTypes } from 'react';
import withFetch from '../components/withFetch';
import LeaderBoardContainer from '../components/LeaderBoardContainer';
import data from '../components/LeaderBoardContainer/data.js';

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
			<LeaderBoardContainer {...this.props} />
		);
	}

}

export default withFetch(Leaders, fetch);
