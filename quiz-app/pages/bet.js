import React, { Component, PropTypes } from 'react';
import withFetch from '../components/withFetch';
import QuizBetContainer from '../components/QuizBetContainer';

const DELAY = 500;

async function fetch({ id }) {

	console.log('>>TODO: fetch /bet/[%s]', id);

	return new Promise((resolve, reject) => {
		setTimeout(() => resolve([]), DELAY);
	});
}

class Quiz extends Component {

	static title = 'Match Quiz';

	static propTypes = {
		params: PropTypes.object.isRequired
	};

	render() {
		return (
			<QuizBetContainer {...this.props} />
		);
	}

}

export default withFetch(Quiz, fetch);