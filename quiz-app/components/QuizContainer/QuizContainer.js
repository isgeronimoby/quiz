import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import ScreenSwiper from '../ScreenSwiper';
import ProgressBar from '../ProgressBar';
import QuizTypeWinOrDraw from '../QuizTypeWinOrDraw';
import QuizTypeScore from '../QuizTypeScore';
import QuizTypeFirstGoal from '../QuizTypeFirstGoal';
import QuizSummary from '../QuizSummary';
import './quiz.scss'


const STATS_SHOW_DELAY = 1000;
const type2componet = {
	'FirstHalfResult': QuizTypeWinOrDraw,
	'CorrectScore': QuizTypeScore,
	'FirstGoalScorer': QuizTypeFirstGoal
};


class QuizContainer extends Component {

	static propTypes = {
		questionList: PropTypes.array.isRequired,
		fixtureItem: PropTypes.object.isRequired,
	};

	state = {
		currentScreenIdx: 0,
		summary: {},
		outcomes: {},
	};

	totalSteps() {
		return this.props.questionList.length + 1; // + Summary
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

	handleAnswerSubmit(questionId, outcomeId, summaryData) {
		const { summary, outcomes } = this.state;
		const questionSummary = summary[questionId];
		const isStatsShown = questionSummary && questionSummary.isStatsShown;

		this.setState({
			outcomes: {
				...outcomes,
				[questionId]: {
					outcomeId,
					isStatsShown: true,
				}
			},
			summary: {
				...summary,
				...summaryData
			}
		}, () => {
			if (!isStatsShown) {
				setTimeout(() => this.nextScreen(), STATS_SHOW_DELAY);
			}
		});
	}

	render() {
		const { questionList, fixtureItem: { startDate, teamHome, teamAway } } = this.props;
		const info = moment.utc(startDate).format('D MMMM, HH:mm');
		const { currentScreenIdx: idx, summary } = this.state;
		const total = this.totalSteps();
		const teamNames = [teamHome, teamAway];
		const onPrev = () => this.prevScreen();
		const onNext = () => this.nextScreen();
		const onAnswerSubmit = this.handleAnswerSubmit.bind(this);

		const quizScreens = questionList.map(({ Type, ...data }, i) => {
			const Quiz = type2componet[Type];
			return (
				<Quiz key={ `type-${i}` } info={info} teamNames={teamNames} data={data}
					onAnswerSubmit={ onAnswerSubmit }/>
			);
		}).concat(
			<QuizSummary key="summary" info={ info } teamNames={ teamNames } summary={ summary }/>
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
