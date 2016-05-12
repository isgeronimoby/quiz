import React, { Component, PropTypes } from 'react';
import QuizControls from './QuizWinOrDrawControls';
import QuizStats from './QuizWinOrDrawStats';
import './draw.scss';


function parseData(data, [teamHome, teamAway], outcomeId) {
	const {
		TotalAnswersCount: total,
		QuestionId: questionId,
		} = data;
	const calcStat = (count, id) => {
		const selectedCount = (id === outcomeId) ? count + 1 : count;
		return Math.floor(selectedCount / (total + 1) * 100)
	};

	return {
		questionId,
		outcomes: data.Outcomes.reduce((acc, { OutcomeId: id, Team: name, AnswersCount: count }) => {
			const percent = calcStat(count, id);
			switch (name) {
				case teamHome:
					return {...acc, home: {id, name, percent}};
				case teamAway:
					return {...acc, away: {id, name, percent}};
				default:
					return {...acc, draw: {id, name, percent}};
			}
		}, {})
	};
}

class QuizWinOrDraw extends Component {

	static propTypes = {
		info: PropTypes.string.isRequired,
		data: PropTypes.object.isRequired,
		teamNames: PropTypes.array.isRequired,
		onAnswerSubmit: PropTypes.func.isRequired,
	};

	state = {
		outcomeId: null,
		showStats: false
	};

	handleSubmit(questionId, outcomeId) {
		const {onAnswerSubmit, data, teamNames} = this.props;
		const { outcomes: {home, away} } = parseData(data, teamNames, outcomeId);
		const summary = {
			halfTimeWinner: {
				questionId,
				outcomeId,
				isHome: home.id === outcomeId,
				isAway: away.id === outcomeId
			}
		};

		this.setState({
			outcomeId,
			showStats: true,
		}, () => {
			onAnswerSubmit(questionId, outcomeId, summary);
		});
	}

	hideStats() {
		this.setState({
			showStats: false
		});
	}

	render() {
		const { info, data, teamNames } = this.props;
		const { outcomeId, showStats } = this.state;
		const {
			questionId,
			outcomes
			} = parseData(data, teamNames, outcomeId);
		const [teamHome, teamAway] = teamNames;
		const onSubmit = (outcomeId) => this.handleSubmit(questionId, outcomeId);
		const onDismiss = () => this.hideStats();

		return (
			<div className="quiz-content">
				<QuizControls
					info={info}
					outcomes={outcomes}
					outcomeId={outcomeId}
					onSubmit={ onSubmit }/>
				<QuizStats
					hidden={ !showStats }
					order={ [ 'home', 'draw', 'away' ] }
					outcomeId={ outcomeId }
					outcomes={ outcomes }
					onDismiss={ onDismiss }/>
			</div>
		);
	}
}

export default QuizWinOrDraw;
