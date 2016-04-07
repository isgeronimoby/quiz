import React, { Component, PropTypes } from 'react';
import ProgressBar from '../ProgressBar';
import QuizTypeWinOrDraw from '../QuizTypeWinOrDraw';
import QuizTypeScore from '../QuizTypeScore';
import QuizTypeFirstGoal from '../QuizTypeFirstGoal';

import '../quiz.scss'

const type2componet = {
	'win-or-draw': QuizTypeWinOrDraw,
	'score': QuizTypeScore,
	'first-goal': QuizTypeFirstGoal
};


class QuizContainer extends Component {

	static propTypes = {
		data: PropTypes.array.isRequired
	};

	render() {
		const { data } = this.props;
		const quizes = data.map(({ type, ...rest }) => {
			const Quiz = type2componet[type];
			return (
				<Quiz key={ "type" + Math.random() } {...rest} />
			);
		});

		return (
			<div className="quiz">
				<ProgressBar total={ data.length } current={1} />
				{ quizes }
			</div>
		);
	}
}

export default QuizContainer;
