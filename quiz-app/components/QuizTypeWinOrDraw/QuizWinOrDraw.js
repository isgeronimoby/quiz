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
		quizId: PropTypes.number.isRequired,
		onStatsShown: PropTypes.func.isRequired,
	};

	state = {
		choice: null,
		showStats: false,
		stats: null,
	};

	handleSubmit(choice) {
		const {quizId, onStatsShown} = this.props;

		this.setState({
			choice,
			showStats: true,
		}, () => {
			post(quizId, {choice}).then((stats) => {
				this.setState({ stats }, () => onStatsShown(quizId));
			});
		});
	}

	hideStats() {
		this.setState({
			showStats: false,
			stats: null,
		});
	}

	render() {
		const info = '23 March, 19:00, 3rd tour, London';
		const title = <span>Who will be winning<br/>at half-time?</span>;
		const teams = ['chelsea', 'everton'];
		const { choice, showStats, stats} = this.state;
		const controlParams = {info, title, teams, choice};
		const onSubmit = (choice) => this.handleSubmit(choice);
		const onDismiss = () => this.hideStats();

		return (
			<div className="quiz-content">
				<QuizControls {...controlParams} onSubmit={ onSubmit }/>
				<QuizStats
					order={ [ teams[0], '-', teams[1] ] }
					hidden={ !showStats }
					choice={ showStats ? choice : null }
					stats={stats}
					onDismiss={ onDismiss }/>
			</div>
		);
	}
}

export default QuizWinOrDraw;
