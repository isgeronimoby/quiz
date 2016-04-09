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
				<div className="quiz-title">
					Select a score for Everton
				</div>

				<div className="score-choice">
					<div>1</div>
					<div>2</div>
					<div>3</div>
					<div>4</div>
					<div>5</div>
					<div>6</div>
					<div>7</div>
					<div>8</div>
					<div>9</div>
					<div>10</div>
				</div>
			</div>
		);
	}
}

export default QuizScoreControls;
