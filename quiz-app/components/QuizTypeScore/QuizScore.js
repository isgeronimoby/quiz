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
	const { OutcomeId: outcomeId, AnswersCount: count = 0} = outcomes.find(({ Score }) => Score === score) || {};
	const chance = Math.floor((count + 1) / (total + 1) * 100);

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
		onAnswerSubmit: PropTypes.func.isRequired,
	};

	state = {
		showStats: false,
		scores: undefined
	};

	handleSubmit(questionId, outcomeId, scores) {
		const { onAnswerSubmit } = this.props;
		const [scoreHome, scoreAway] = scores;
		const summary = {
			scoreHome,
			scoreAway,
			winner: {
				isHome: scoreHome > scoreAway,
				isAway: scoreHome < scoreAway,
			}
		};

		this.setState({
			showStats: true,
			scores: scores
		}, () => {
			onAnswerSubmit(questionId, outcomeId, summary);
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
		const { questionId, outcomeId, stats } = parseData(data, scores);
		const onSubmit = (scores) => this.handleSubmit(questionId, outcomeId, scores);
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
