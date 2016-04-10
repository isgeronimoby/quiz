import React, { Component, PropTypes } from 'react';
import QuizControls from './QuizWinOrDrawControls';
import QuizStats from './QuizWinOrDrawStats';
import './draw.scss';

const DELAY = 600;
const dataStats = {
	'chelsea': 55,
	'everton': 30,
	'-': 15
};

async function post(id, data) {

	console.log('>>TODO: post /quiz/[%s]/result: %s', id, JSON.stringify(data));

	return new Promise((resolve, reject) => {
		setTimeout(() => resolve(dataStats), DELAY);
	});
}

class QuizWinOrDraw extends Component {

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
			stats: null,
			choice: null,
		});
	}

	render() {
		const info = '23 March, 19:00, 3rd tour, London';
		const title = 'Who will win in a half-time?';
		const teams = ['chelsea', 'everton'];
		const params = {info, title, teams};
		const { showStats, ...restStats } = this.state;
		const onSubmit = (choice) => this.handleSubmit(choice);
		const onDismiss = () => this.hideStats();

		return (
			<div className="quiz-content">
				<QuizControls {...params} onSubmit={ onSubmit }/>
				<QuizStats
					hidden={ !showStats }
					order={ [ teams[0], '-', teams[1] ] }
					{...restStats}
					onDismiss={ onDismiss }/>
			</div>
		);
	}
}

export default QuizWinOrDraw;
