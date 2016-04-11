import React, { Component, PropTypes } from 'react';
import Hammer from 'react-hammerjs';
import ProgressBar from '../ProgressBar';
import QuizTypeWinOrDraw from '../QuizTypeWinOrDraw';
import QuizTypeScore from '../QuizTypeScore';
import QuizTypeFirstGoal from '../QuizTypeFirstGoal';
import './quiz.scss'

const DIRECTION_LEFT = 2; //from Hammer
const DIRECTION_RIGHT = 4; //from Hammer

const STATS_SHOW_DELAY = 1000;

const type2componet = {
	'win-or-draw': QuizTypeWinOrDraw,
	'score': QuizTypeScore,
	'first-goal': QuizTypeFirstGoal
};


class QuizContainer extends Component {

	static propTypes = {
		data: PropTypes.array.isRequired,
	};

	state = {
		currentStep: 1,
		statsShown: {},
	};

	nextStep() {
		const totalSteps = this.props.data.length;
		const step = this.state.currentStep;
		if (step < totalSteps) {
			this.setState({
				currentStep: step + 1
			})
		}
	}

	prevStep() {
		const step = this.state.currentStep;
		if (step > 1) {
			this.setState({
				currentStep: step - 1
			})
		}
	}

	onStatsShown(quizId) {
		const {statsShown} = this.state;
		if (statsShown[quizId]) { return; }

		this.setState({
			statsShown: {
				...statsShown,
				[quizId]: true
			}
		}, () => {
			setTimeout(() => this.nextStep(), STATS_SHOW_DELAY);
		});
	}

	render() {
		const { data } = this.props;
		const quizes = data.map(({ type, ...rest }, i) => {
			const Quiz = type2componet[type];
			return (
				<Quiz key={ `type-${i}` } {...rest} onStatsShown={ () => this.onStatsShown() }/>
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
			if (e.direction === DIRECTION_LEFT) {
				this.nextStep();
			}
			if (e.direction === DIRECTION_RIGHT) {
				this.prevStep();
			}
		};

		return (
			<div className="quiz">
				<ProgressBar total={ totalSteps } current={ this.state.currentStep }/>
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
