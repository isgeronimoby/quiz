import React, { Component, PropTypes } from 'react';
import './draw.scss';


class QuizWinOrDrawControls extends Component {

	static propTypes = {
		info: PropTypes.string.isRequired,
		title: PropTypes.element.isRequired,
		outcomes: PropTypes.array.isRequired,
		onSubmit: PropTypes.func.isRequired,
		outcomeId: PropTypes.string
	};

	render() {
		const { info, title, outcomes: [
			{name: teamHome, id: outcomeHome},
			{name: teamAway, id: outcomeAway},
			{id: outcomeDraw}
			], outcomeId, onSubmit } = this.props;
		const selectedClass = (name) => (name === outcomeId ? 'selected' : '');

		return (
			<div className="quiz-controls">
				<div className="quiz-info">{ info }</div>
				<div className="quiz-title">{ title }</div>

				<div className="quiz-teams">
					<div className={"team-container select-btn " + selectedClass(teamHome)}
						onClick={ () => onSubmit(outcomeHome) }>
						<img src={require(`../../static/images/team-${teamHome}.svg`)} />
					</div>

					<div className="versus">vs</div>

					<div className={"team-container select-btn " + selectedClass(teamAway)}
						onClick={ () => onSubmit(outcomeAway) }>
						<img src={require(`../../static/images/team-${teamAway}.svg`)} />
					</div>
				</div>
				<div className="result-draw">
					<div className={"result-draw-icon select-btn " + selectedClass('-')}
						onClick={ () => onSubmit(outcomeDraw) }>
						<img src={require("../../static/images/icon-friendship.svg")} />
					</div>
					<div>Draw</div>
				</div>
			</div>
		);
	}
}

export default QuizWinOrDrawControls;
