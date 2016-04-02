import React, { Component, PropTypes } from 'react';
import QuizItemType1 from '../components/QuizItemType1';
import QuizItemType2 from '../components/QuizItemType2';

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

				
				<QuizItemType2 />


			</div>
		)
	}

}

export default Quiz;