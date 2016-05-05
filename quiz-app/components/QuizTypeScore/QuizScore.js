import React, { Component, PropTypes } from 'react';
import QuizControls from './QuizScoreControls';
import QuizStats from './QuizScoreStats';
import './score.scss';


function parseData(data, scores = []) {
	const [scoreHome, scoreAway] = scores;
	const {
		TotalAnswersCount: total,
		QuestionId: questionId,
		Outcomes: outcomes
		} = data;
	const score = (scoreHome >= scoreAway) ? `${scoreHome}-${scoreAway}` : `${scoreAway}-${scoreHome}`;
	const { OutcomeId: outcomeId, AnswersCount = 0} = outcomes.find(({ Score }) => Score === score) || {};
	const chance = total ? Math.floor(AnswersCount / total * 100) : 100;

	return {
		questionId,
		outcomeId,
		stats: chance
	};
}


class QuizScore extends Component {

	static propTypes = {
		info: PropTypes.string.isRequired,
		data: PropTypes.object.isRequired,
		teamNames: PropTypes.array.isRequired,
		onStatsShown: PropTypes.func.isRequired,
	};

	state = {
		showStats: false,
		scores: undefined
	};

	handleSubmit(questionId, scores) {
		const { onStatsShown } = this.props;

		this.setState({
			showStats: true,
			scores: scores
		}, () => {
			onStatsShown(questionId);
		});
	}

	hideStats() {
		this.setState({
			showStats: false,
			scores: undefined
		});
	}

	render() {
		const { info, data, teamNames } = this.props;
		const { showStats, scores } = this.state;
		const { questionId, stats } = parseData(data, scores);
		const onSubmit = (scores) => this.handleSubmit(questionId, scores);
		const onDismiss = () => this.hideStats();

		return (
			<div className="quiz-content">
				<QuizControls info={info} teamNames={teamNames} onSubmit={ onSubmit }/>
				<QuizStats
					hidden={ !showStats }
					percent={ showStats ? stats : null }
					onDismiss={ onDismiss }/>
			</div>
		);
	}
}

export default QuizScore;
