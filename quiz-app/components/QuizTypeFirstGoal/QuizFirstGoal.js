import React, { Component, PropTypes } from 'react';
import QuizControls from './QuizFirstGoalControls';
import QuizStats from './QuizFirstGoalStats';
import './players.scss';


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

class QuizFirstGoal extends Component {

	static propTypes = {
		quizId: PropTypes.number.isRequired,
		onStatsShown: PropTypes.func.isRequired,
	};

	state = {
		showStats: false,
		stats: null,
		choice: null,
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
			stats: null
		});
	}

	render() {
		const info = '23 March, 18:00, 2nd tour, London';
		const params = { info };

		const { showStats, ...restStats } = this.state;
		const onSubmit = (choice) => this.handleSubmit(choice);
		const onDismiss = () => this.hideStats();

		return (
			<div className="quiz-content">
				<QuizControls {...params} onSubmit={ onSubmit }/>
				<QuizStats
					hidden={ !showStats }
					order={ [ /* TODO*/ ] }
					{...restStats}
					onDismiss={ onDismiss }/>
			</div>
		);
	}
}

export default QuizFirstGoal;
