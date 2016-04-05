import React, { Component, PropTypes } from 'react';
import ProgressBar from '../ProgressBar';
import QuizItemType1 from '../QuizItemType1';
import QuizItemType2 from '../QuizItemType2';
import QuizItemType3 from '../QuizItemType3';

import '../quiz.scss'

const type2componet = {
	'xxx': QuizItemType1,
	'yyy': QuizItemType2,
	'zzz': QuizItemType3
};


class QuizContainer extends Component {

	static propTypes = {
		data: PropTypes.array.isRequired
	};

	render() {
		const { data } = this.props;
		const quizes = data.map(({ type, ...rest }) => {
			const QuizItem = type2componet[type];
			return (
				<QuizItem key={ "type" + Math.random() } {...rest} />
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
