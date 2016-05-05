import React, { Component, PropTypes } from 'react';
import QuizControls from './QuizWinOrDrawControls';
import QuizStats from './QuizWinOrDrawStats';
import './draw.scss';

const dataStats = {
	'chelsea': 55,
	'everton': 30,
	'-': 15
};


function parseData(data) {
	console.log('>>data', data);

	const {
		TotalAnswersCount,
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
		teamHome,
		teamAway,
		stats: {
			[teamHome]: 10, //Math.floor(count1 / TotalAnswersCount * 100),
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

	handleSubmit(outcomeId) {
		const {data: {QuestionId: questionId}, onStatsShown} = this.props;

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
		const title = <span>Who will be winning<br/>at half-time?</span>;
		const { info, data } = this.props; //'23 March, 19:00, 3rd tour, London';
		const {
			teamHome,
			teamAway,
			stats,
			outcomes
			} = parseData(data);
		const { outcomeId, showStats } = this.state;
		const controlParams = {info, title, outcomes, outcomeId};
		const onSubmit = (outcomeId) => this.handleSubmit(outcomeId);
		const onDismiss = () => this.hideStats();

		return (
			<div className="quiz-content">
				<QuizControls {...controlParams} onSubmit={ onSubmit }/>
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
