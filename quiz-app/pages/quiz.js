import React, { Component, PropTypes } from 'react';
import withFetch from '../components/withFetch';
import QuizContainer from '../components/QuizContainer';
import items from '../components/QuizContainer/data.js';

const DELAY = 100;

async function fetch({ id }) {

	console.log('>>TODO: fetch /quiz/[%s]', id);

	return new Promise((resolve, reject) => {
		setTimeout(() => resolve(items), DELAY);
	}).then((items) => {
		// Emulate different order of Quiz steps in quizes

		if (id === 1) {
			return [items[0], items[1], items[2]];
		}
		else {
			return [items[0], items[2], items[1]];
		}
	});
}

class Quiz extends Component {

	static title = 'Match Quiz';

	static propTypes = {
		params: PropTypes.object.isRequired
	};

	render() {
		return (
			<QuizContainer {...this.props} />
		);
	}

}

export default withFetch(Quiz, fetch);
