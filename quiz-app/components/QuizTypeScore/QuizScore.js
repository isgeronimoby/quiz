import React, { Component, PropTypes } from 'react';
import QuizControls from './QuizScoreControls';
import QuizStats from './QuizScoreStats';
import './score.scss';

const DELAY = 300;
const dataStats = {
	// TODO
};

async function post(id, data) {

	console.log('>>TODO: post /quiz/[%s]/result: %s', id, JSON.stringify(data));

	return new Promise((resolve, reject) => {
		setTimeout(() => resolve(dataStats), DELAY);
	});
}

class QuizScore extends Component {

	static propTypes = {
		quizId: PropTypes.number.isRequired
	};

	state = {
		showStats: false,
		stats: null,
		choice: null,
	};

	handleSubmit(choice) {
		this.setState({showStats: true}, () => {
			post(this.props.quizId, {choice}).then((stats) => {
				this.setState({
					showStats: true,
					stats,
					choice
				});
			});
		});
	}

	hideStats() {
		this.setState({
			showStats: false,
			stats: null
		});
	}

	render() {
		const info = '23 March, 18:00, 2nd tour, London';
		const teams = ['Chelsea', 'Everton'];
		const params = {info, teams};

		const { showStats, ...restStats } = this.state;
		const onSubmit = (choice) => this.handleSubmit(choice);
		const onDismiss = () => this.hideStats();

		return (
			<div className="quiz-content">
				<QuizControls {...params} onSubmit={ onSubmit }/>
				<QuizStats
					hidden={ !showStats }
					order={ [ teams[0], teams[1] ] }
					{...restStats}
					onDismiss={ onDismiss }/>
			</div>
		);
	}
}

export default QuizScore;
