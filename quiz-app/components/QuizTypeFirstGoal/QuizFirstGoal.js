import React, { Component, PropTypes } from 'react';
import QuizControls from './QuizFirstGoalControls';
import QuizStats from './QuizFirstGoalStats';
import './players.scss';


function parseData(data) {
	const {
		QuestionId: questionId,
		TotalAnswersCount: total,
		Outcomes: outcomes
		} = data;
	const players = outcomes.map(({
		OutcomeId: outcomeId,
		FirstScorer: name,
		ScorerTeam: position,
		AnswersCount
		}, i) => {
		return {
			outcomeId,
			number: i + 1,
			name,
			position,
			percent: total ? Math.floor(AnswersCount / total * 100) : 0,
		};
	});

	return {
		questionId,
		players
	};
}

class QuizFirstGoal extends Component {

	static propTypes = {
		info: PropTypes.string.isRequired,
		data: PropTypes.object.isRequired,
		onStatsShown: PropTypes.func.isRequired,
	};

	state = {
		showStats: false,
		outcomeId: null,
	};

	handleSubmit(questionId, outcomeId) {
		const { onStatsShown } = this.props;

		this.setState({
			outcomeId,
			showStats: true,
		}, () => {
			onStatsShown(questionId)
		});
	}

	hideStats() {
		this.setState({
			showStats: false
		});
	}

	render() {
		const { info, data } = this.props;
		const { questionId, players } = parseData(data);
		const { showStats, outcomeId } = this.state;
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
				<QuizControls info={info} players={players} onSubmit={ onSubmit }>
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
