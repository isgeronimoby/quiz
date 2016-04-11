import React, { Component, PropTypes } from 'react';
import './draw.scss';


class QuizWinOrDrawControls extends Component {

	static propTypes = {
		info: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
		teams: PropTypes.array.isRequired,
		onSubmit: PropTypes.func.isRequired,
	};


	render() {
		const { info, title, teams: [team1, team2], onSubmit } = this.props;

		return (
			<div className="quiz-controls">
				<div className="quiz-info">{ info }</div>
				<div className="quiz-title">{ title }</div>

				<div className="quiz-teams">
					<div className="team-container"
						onClick={ () => onSubmit(team1) }>
						<img src={require(`../../static/images/team-${team1}.svg`)} />
					</div>
					<div className="versus">vs</div>
					<div className="team-container"
						onClick={ () => onSubmit(team2) }>
						<img src={require(`../../static/images/team-${team2}.svg`)} />
					</div>
				</div>
				<div className="result-draw">
					<div className="result-draw-icon"
						onClick={ () => onSubmit('-') }>
						<img src={require("../../static/images/icon-friendship.svg")} />
					</div>
					<div>Draw</div>
				</div>
			</div>
		);
	}
}

export default QuizWinOrDrawControls;
