import React, { Component, PropTypes } from 'react';
import './draw.scss';


class QuizWinOrDrawControls extends Component {

	static propTypes = {
		info: PropTypes.string.isRequired,
		outcomes: PropTypes.object.isRequired,
		onSubmit: PropTypes.func.isRequired,
		outcomeId: PropTypes.string
	};

	render() {
		const {
			info,
			outcomes: {
				home: {name: teamHome, id: outcomeIdHome},
				away: {name: teamAway, id: outcomeIdAway},
				draw: {id: outcomeIdDraw}
				},
			onSubmit } = this.props;
		const title = <span>Who will be winning<br/>at half-time?</span>;

		return (
			<div className="quiz-controls">
				<div className="quiz-info">{ info }</div>
				<div className="quiz-title">{ title }</div>

				<div className="quiz-teams">
					<div className={"team-container select-btn"}
						onClick={ () => onSubmit(outcomeIdHome) }>
						<img src={require(`../../static/images/team-${teamHome}.svg`)}/>
					</div>

					<div className="versus">vs</div>

					<div className={"team-container select-btn"}
						onClick={ () => onSubmit(outcomeIdAway) }>
						<img src={require(`../../static/images/team-${teamAway}.svg`)}/>
					</div>
				</div>
				<div className="result-draw">
					<div className={"result-draw-icon select-btn"}
						onClick={ () => onSubmit(outcomeIdDraw) }>
						<img src={require("../../static/images/icon-friendship.svg")}/>
					</div>
					<div>Draw</div>
				</div>
			</div>
		);
	}
}

export default QuizWinOrDrawControls;
