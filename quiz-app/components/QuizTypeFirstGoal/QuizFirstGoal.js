import React, { Component, PropTypes } from 'react';
import QuizControls from './QuizFirstGoalControls';
import QuizStats from './QuizFirstGoalStats';
import './players.scss';


function parseData(data, selectedOutcomeId) {
	const {
		QuestionId: questionId,
		TotalAnswersCount: total,
		Outcomes: outcomes
		} = data;
	const players = outcomes.map(({
		OutcomeId: outcomeId,
		FirstScorer: name,
		ScorerTeam: team,
		AnswersCount: count
		}) => {
		const isSelected = (selectedOutcomeId === outcomeId);
		const countSelected = isSelected ? count + 1 : count;
		const percent = Math.floor(countSelected / (total + 1) * 100);

		return {
			outcomeId,
			name,
			team,
			percent,
			isSelected,
		};
	});
	const noGoalPlayer = players.find(p => p.name === 'No Goalscorer');
	const noGoalPlayerIdx = players.indexOf(noGoalPlayer);
	const otherPlayersSorted = [
		...players.slice(0, noGoalPlayerIdx),
		...players.slice(noGoalPlayerIdx + 1)
	].sort((a, b) => (a.percent < b.percent));
	const adjustedPlayers = [
		{
			...noGoalPlayer,
			team: ''
		},
		...otherPlayersSorted
	];

	return {
		questionId,
		players: adjustedPlayers
	};
}

class QuizFirstGoal extends Component {

	static propTypes = {
		info: PropTypes.string.isRequired,
		teamNames: PropTypes.array.isRequired,
		data: PropTypes.object.isRequired,
		onAnswerSubmit: PropTypes.func.isRequired,
	};

	state = {
		showStats: false,
		outcomeId: null,
	};

	handleSubmit(questionId, outcomeId) {
		const { data, teamNames: [teamHome, teamAway], onAnswerSubmit } = this.props;
		const { players } = parseData(data, outcomeId);
		const { name, team } = players.find(p => p.isSelected);

		const summary = {
			firstGoalScorer: {
				questionId,
				outcomeId,
				name: name,
				isHome: team === teamHome,
				isAway: team === teamAway,
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
		const { info, data } = this.props;
		const { showStats, outcomeId } = this.state;
		const { questionId, players } = parseData(data, outcomeId);
		const stats = players.map(({ outcomeId, percent }) => {
			return {
				outcomeId,
				percent
			};
		});

		const container = this.refs['container'];
		const offsetHeight = container ? container.offsetHeight : 0;
		const onSubmit = (outcomeId) => this.handleSubmit(questionId, outcomeId);
		const onDismiss = () => this.hideStats();

		return (
			<div ref="container" className="quiz-content">
				<QuizControls info={info} players={players} outcomeId={outcomeId} onSubmit={ onSubmit }>
					<QuizStats
						hidden={ !showStats }
						stats={ stats }
						outcomeId={ outcomeId }
						offsetHeight={ offsetHeight }
						onDismiss={ onDismiss }/>
				</QuizControls>
			</div>
		);
	}
}

export default QuizFirstGoal;
