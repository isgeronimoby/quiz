import React, { Component, PropTypes } from 'react';
import QuizControls from './QuizWinOrDrawControls';
import QuizStats from './QuizWinOrDrawStats';
import './draw.scss';


function parseData(data) {
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

	return {
		questionId,
		teamHome,
		teamAway,
		stats: {
			[teamHome]: 10, //Math.floor(count1 / TotalAnswersCount * 100), TODO
			[teamAway]: 20, //Math.floor(count2 / TotalAnswersCount * 100),
			'-': 30 //Math.floor(count3 / TotalAnswersCount * 100),
		},
		outcomes: [
			{name: teamHome, id: id1},
			{name: teamAway, id: id2},
			{name: 'Draw', id: id3}
		]
	};
}

class QuizWinOrDraw extends Component {

	static propTypes = {
		info: PropTypes.string.isRequired,
		data: PropTypes.object.isRequired,
		onStatsShown: PropTypes.func.isRequired,
	};

	state = {
		outcomeId: null,
		showStats: false
	};

	handleSubmit(questionId, outcomeId) {
		const {onStatsShown} = this.props;

		this.setState({
			outcomeId,
			showStats: true,
		}, () => {
			onStatsShown(questionId);
		});
	}

	hideStats() {
		this.setState({
			showStats: false
		});
	}

	render() {
		const { info, data } = this.props; //'23 March, 19:00, 3rd tour, London';
		const {
			questionId,
			teamHome,
			teamAway,
			stats,
			outcomes
			} = parseData(data);
		const { outcomeId, showStats } = this.state;
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
					order={ [ teamHome, '-', teamAway ] }
					hidden={ !showStats }
					outcomeId={ showStats ? outcomeId : null }
					stats={stats}
					onDismiss={ onDismiss }/>
			</div>
		);
	}
}

export default QuizWinOrDraw;
