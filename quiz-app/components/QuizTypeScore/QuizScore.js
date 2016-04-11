import React, { Component, PropTypes } from 'react';
import QuizControls from './QuizScoreControls';
import QuizStats from './QuizScoreStats';
import './score.scss';

const DELAY = 300;

async function post(id, data) {

	console.log('>>TODO: post /quiz/[%s]/result: %s', id, JSON.stringify(data));

	const dataStats = Object.keys(data).reduce((acc, name) => {
		return {
			...acc,
			[name]: Math.round(Math.random()*90)
		};
	}, {});

	return new Promise((resolve, reject) => {
		setTimeout(() => resolve(dataStats), DELAY);
	});
}

class QuizScore extends Component {

	static propTypes = {
		quizId: PropTypes.number.isRequired,
		onStatsShown: PropTypes.func.isRequired,
	};

	state = {
		showStats: false,
		stats: null
	};

	handleSubmit(scores) {
		const {quizId, onStatsShown} = this.props;

		this.setState({
			showStats: true,
		}, () => {
			post(quizId, scores).then((stats) => {
				this.setState({ stats }, () => onStatsShown(quizId));
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
		const onSubmit = (scores) => this.handleSubmit(scores);
		const onDismiss = () => this.hideStats();

		return (
			<div className="quiz-content">
				<QuizControls {...params} onSubmit={ onSubmit }/>
				<QuizStats
					hidden={ !showStats }
					order={ teams }
					{...restStats}
					onDismiss={ onDismiss }/>
			</div>
		);
	}
}

export default QuizScore;
