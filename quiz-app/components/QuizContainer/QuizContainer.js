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
		const quizes = data.map(({ type, ...rest }, i) => {
			const Quiz = type2componet[type];
			return (
				<Quiz key={ `type-${i}` } {...rest} />
			);
		});

		const step = this.state.currentStep;
		const totalSteps = data.length;
		const width = 100 * data.length;
		const scrollX = -100 * (step - 1) / totalSteps;
		const containerStyle = {
			width: `${width}%`,
			transform: `translateX(${scrollX}%)`
		};
		const onSwipe = (e) => {
			if (e.direction === DIRECTION_LEFT && step < totalSteps) {
				this.setState({
					currentStep: step + 1
				})
			}

			if (e.direction === DIRECTION_RIGHT && step > 1) {
				this.setState({
					currentStep: step - 1
				})
			}
		};

		return (
			<div className="quiz">
				<ProgressBar total={ totalSteps } current={ this.state.currentStep } />
				<Hammer onSwipe={onSwipe}>
					<div className="quiz-swiper" style={ containerStyle }>
						{ quizes }
					</div>
				</Hammer>
			</div>
		);
	}
}

export default QuizContainer;
