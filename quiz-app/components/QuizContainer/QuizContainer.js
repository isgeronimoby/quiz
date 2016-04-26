import React, { Component, PropTypes } from 'react';
import ScreenSwiper from '../ScreenSwiper';
import ProgressBar from '../ProgressBar';
import QuizTypeWinOrDraw from '../QuizTypeWinOrDraw';
import QuizTypeScore from '../QuizTypeScore';
import QuizTypeFirstGoal from '../QuizTypeFirstGoal';
import QuizSummary from '../QuizSummary';
import './quiz.scss'


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
		currentScreenIdx: 0,
		statsShown: {},
	};

	totalSteps() {
		return this.props.data.length + 1; // + Summary
	}

	nextScreen() {
		const { currentScreenIdx: idx } = this.state;
		if (idx + 1 < this.totalSteps()) {
			this.setState({
				currentScreenIdx: idx + 1
			})
		}
	}

	prevScreen() {
		const { currentScreenIdx: idx } = this.state;
		if (idx > 0) {
			this.setState({
				currentScreenIdx: idx - 1
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
			setTimeout(() => this.nextScreen(), STATS_SHOW_DELAY);
		});
	}

	render() {
		const { data } = this.props;
		const { currentScreenIdx: idx } = this.state;
		const total = this.totalSteps();
		const onPrev = () => this.prevScreen();
		const onNext = () => this.nextScreen();
		const quizScreens = data.map(({ type, ...rest }, i) => {
			const Quiz = type2componet[type];
			return (
				<Quiz key={ `type-${i}` } {...rest} onStatsShown={ (quizId) => this.onStatsShown(quizId) }/>
			);
		}).concat(
			<QuizSummary key='summary' />
		);

		return (
			<div className="screen">
				<ProgressBar total={ total } current={ idx }/>

				<ScreenSwiper currentScreenIdx={idx} onPrevScreen={onPrev} onNextScreen={onNext}>
					{ quizScreens }
				</ScreenSwiper>
			</div>
		);
	}
}

export default QuizContainer;
