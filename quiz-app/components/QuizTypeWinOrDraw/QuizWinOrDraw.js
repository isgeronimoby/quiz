import React, { Component, PropTypes } from 'react';
import QuizControls from './QuizWinOrDrawControls';
import QuizStats from './QuizWinOrDrawStats';
import './draw.scss';


function parseData(data, outcomeId) {
	const {
		TotalAnswersCount: total,
		QuestionId: questionId,
		Outcomes: [{
			AnswersCount: count1,
			OutcomeId: id1,
			Team: teamHome
			}, {
			AnswersCount: count2,
			OutcomeId: id2,
			Team: teamAway
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
		teamHome,
		teamAway,
		outcomes: [
			{name: teamHome, id: id1},
			{name: teamAway, id: id2},
			{name: 'Draw', id: id3}
		],
		stats: {
			[teamHome]: calcStat(count1, id1),
			[teamAway]: calcStat(count2, id2),
			'-': calcStat(count3, id3),
		}
	};
}

class QuizWinOrDraw extends Component {

	static propTypes = {
		info: PropTypes.string.isRequired,
		data: PropTypes.object.isRequired,
		onAnswerSubmit: PropTypes.func.isRequired,
	};

	state = {
		outcomeId: null,
		showStats: false
	};

	handleSubmit(questionId, outcomeId) {
		const {onAnswerSubmit, data} = this.props;
		const { outcomes } = parseData(data, outcomeId);
		const summary = {
			halfTimeWinner: {
				isHome: outcomes[0].id === outcomeId,
				isAway: outcomes[1].id === outcomeId
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
		const { info, data } = this.props; //'23 March, 19:00, 3rd tour, London';
		const { outcomeId, showStats } = this.state;
		const {
			questionId,
			teamHome,
			teamAway,
			stats,
			outcomes
			} = parseData(data, outcomeId);
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
