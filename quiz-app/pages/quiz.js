import React, { Component, PropTypes } from 'react';
import QuizItem from '../components/QuizItem';

import './../components/quiz.scss'

class Quiz extends Component {

	static title = 'Match Quiz';

	state = {
		currentQuizIndex: 1,
		quizTotalAmount: 5
	};

	getProgressBarInfo() {
		let percentage = this.state.currentQuizIndex / this.state.quizTotalAmount;
		let style = {
			transform: `scaleX(${percentage})`
		};

		return { style };
	}

	render() {
		let { style } = this.getProgressBarInfo();

		return (
			<div className="quiz">
				<div className="progress-bar">
					<div className="progress-bar-completed" style={style} />
				</div>

				
				<QuizItem
					info="23 March, 19:00, 3thd tour, London"
					title="Who will win in a half-time?">

					<div className="quiz-teams">
						<div className="team-container">
							<img src={require("./../static/images/team-chelsea.svg")} />
						</div>
						<div className="versus">vs</div>
						<div className="team-container">
							<img src={require("./../static/images/team-everton.svg")} />
						</div>
					</div>
					<div className="result-draw">
						<div className="result-draw-icon">
							<img src={require("./../static/images/icon-friendship.svg")} />
						</div>
						Draw
					</div>
				</QuizItem>


			</div>
		)
	}

}

export default Quiz;