import React, { Component, PropTypes } from 'react';
import QuizItemType1 from '../components/QuizItemType1';
import QuizItemType2 from '../components/QuizItemType2';
import QuizItemType3 from '../components/QuizItemType3';
import ProgressBar from '../components/ProgressBar';

import './../components/quiz.scss'

class Quiz extends Component {

	static title = 'Match Quiz';

	render() {
		return (
			<div className="quiz">
				<ProgressBar />
				<QuizItemType3 />
			</div>
		)
	}

}

export default Quiz;