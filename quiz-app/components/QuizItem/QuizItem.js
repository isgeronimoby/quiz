import React, { Component, PropTypes } from 'react';

class QuizItem extends Component {

	static propTypes = {

	};


	render() {
		return (
			<div className="quiz-content">
				<div className="quiz-info">23 March, 19:00, 3thd tour, London</div>
				<div className="quiz-title">Who will win in a half-time?</div>
				
				<div className="quiz-teams">
					<div className="team-container">
						<img src={require("./../../static/images/team-chelsea.svg")} />
					</div>
					<div className="versus">vs</div>
					<div className="team-container">
						<img src={require("./../../static/images/team-everton.svg")} />
					</div>
				</div>
				<div className="result-draw">
					<div className="result-draw-icon">
						<img src={require("./../../static/images/icon-friendship.svg")} />
					</div>
					<div>Draw</div>
				</div>
			</div>
		);
	}
}

export default QuizItem;