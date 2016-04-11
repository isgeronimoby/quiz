import React, { Component, PropTypes } from 'react';
import './score.scss';


class QuizScoreControls extends Component {

	static propTypes = {
		info: PropTypes.string.isRequired,
		teams: PropTypes.array.isRequired,
		onSubmit: PropTypes.func.isRequired,
	};


	render() {
		const { info, teams: [team1, team2], onSubmit } = this.props;
		const title = <span>Select a score<br/>for {team1}</span>;

		return (
			<div className="quiz-controls" onClick={ () => onSubmit() }>
				<div className="quiz-info">{ info }</div>

				<div className="teams-idle-wrapper">
					<div className="team-idle">
						<div className="team-idle-content">?</div>
						<div className="team-name">{ team1 }</div>
					</div>

					<div className="colon">:</div>

					<div className="team-idle disabled">
						<div className="team-idle-content">?</div>
						<div className="team-name">{ team2 }</div>
					</div>
				</div>

				<div className="quiz-title">{ title }</div>

				<div className="score-choice">
					<div className="score-btn">1</div>
					<div className="score-btn">2</div>
					<div className="score-btn">3</div>
					<div className="score-btn">4</div>
					<div className="score-btn">5</div>
					<div className="score-btn">6</div>
					<div className="score-btn">7</div>
					<div className="score-btn">8</div>
					<div className="score-btn">9</div>
					<div className="score-btn">10</div>
				</div>
			</div>
		);
	}
}

export default QuizScoreControls;
