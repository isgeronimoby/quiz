import React, { Component, PropTypes } from 'react';
import QuizControls from './QuizWinOrDrawControls';
import QuizStats from './QuizWinOrDrawStats';
import './draw.scss';


function parseData(data, [teamHome, teamAway], outcomeId) {
	const {
		TotalAnswersCount: total,
		QuestionId: questionId,
		Outcomes: [{
			AnswersCount: count1,
			OutcomeId: id1,
			Team: team1
			}, {
			AnswersCount: count2,
			OutcomeId: id2,
			Team: team2
			}, {
			AnswersCount: count3,
			OutcomeId: id3
			}]
		} = data;
	const calcStat = (count, id) => {
		const selectedCount = (id === outcomeId) ? count + 1 : count;
		return Math.floor(selectedCount / (total + 1) * 100)
	};

	return {
		questionId,
		outcomes: data.Outcomes.reduce((acc, { OutcomeId: id, Team: name }) => {
			switch (name) {
				case teamHome:
					return {...acc, home: {id, name}};
				case teamAway:
					return {...acc, away: {id, name}};
				default:
					return {...acc, draw: {id}};
			}
		}, {}),
		stats: {
			[team1]: calcStat(count1, id1),
			[team2]: calcStat(count2, id2),
			'-': calcStat(count3, id3),
		}
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
			outcomes,
			stats,
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
					order={ [ teamHome, '-', teamAway ] }
					outcomeId={ outcomeId }
					stats={ stats }
					onDismiss={ onDismiss }/>
			</div>
		);
	}
}

export default QuizWinOrDraw;
