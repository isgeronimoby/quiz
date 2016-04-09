import React, { Component, PropTypes } from 'react';
import Hammer from 'react-hammerjs';
import ProgressBar from '../ProgressBar';
import QuizTypeWinOrDraw from '../QuizTypeWinOrDraw';
import QuizTypeScore from '../QuizTypeScore';
import QuizTypeFirstGoal from '../QuizTypeFirstGoal';
import './quiz.scss'

const DIRECTION_LEFT = 2; //from Hammer
const DIRECTION_RIGHT = 4; //from Hammer


const type2componet = {
	'win-or-draw': QuizTypeWinOrDraw,
	'score': QuizTypeScore,
	'first-goal': QuizTypeFirstGoal
};


class QuizContainer extends Component {

	static propTypes = {
		data: PropTypes.array.isRequired
	};

	state = {
		currentStep: 1
	};

	render() {
		const { data } = this.props;
		const quizes = data.map(({ type, ...rest }) => {
			const Quiz = type2componet[type];
			return (
				<Quiz key={ "type" + Math.random() } {...rest} />
			);
		});
		const onSwipe = (e) => {

		};

		return (
			<div className="quiz">
				<ProgressBar total={ data.length } current={ this.state.currentStep } />
				{/*<Hammer onSwipe={onSwipe}>
					<div className="quiz-swiper">
						<div className="quiz-content red"></div>
						<div className="quiz-content red"></div>
					</div>
				</Hammer>
				*/}
				{ quizes }
			</div>
		);
	}
}

export default QuizContainer;
