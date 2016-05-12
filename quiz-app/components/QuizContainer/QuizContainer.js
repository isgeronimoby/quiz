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
		matchId: PropTypes.string.isRequired,
		startDate: PropTypes.string.isRequired,
		teamNames: PropTypes.array.isRequired,
		questionList: PropTypes.array.isRequired,

		isValidating: PropTypes.bool.isRequired,
		odds: PropTypes.number.isRequired,
		invalidOutcomes: PropTypes.array.isRequired,
		fetchOdds: PropTypes.func.isRequired,
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
		const totalSteps = this.totalSteps();

		if (idx + 1 < totalSteps) {
			this.setState({
				currentScreenIdx: idx + 1
			}, () => {
				const { currentScreenIdx: idx } = this.state;
				const isSummaryScreen = (idx + 1 === totalSteps);
				if (isSummaryScreen) {
					this.submitAnswers();
				}
			});
		}
	}

	prevScreen() {
		const { currentScreenIdx: idx } = this.state;
		if (idx > 0) {
			this.setState({
				currentScreenIdx: idx - 1
			});
		}
	}

	showScreenByQuestionId(questionId) {
		const { questionList } = this.props;
		const questionIds = questionList.map(({ QuestionId: questionId }) => questionId);
		const idx = questionIds.indexOf(questionId);

		this.setState({
			currentScreenIdx: idx
		});
	}

	submitAnswers() {
		const { outcomes } = this.state;
		const answers = this.props.questionList
			.map(({ QuestionId: questionId }) => questionId)
			.reduce((acc, questionId) => {
				return [
					...acc,
					outcomes[questionId].outcomeId
				];
			}, []);

		this.props.fetchOdds(answers);
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
		const { matchId,
			startDate,
			teamNames,
			questionList,
			isValidating,
			invalidOutcomes } = this.props;
		const info = moment.utc(startDate).format('D MMMM, HH:mm');
		const { currentScreenIdx: idx, summary } = this.state;
		const total = this.totalSteps();
		const onPrev = () => this.prevScreen();
		const onNext = () => this.nextScreen();
		const onAnswerSubmit = this.handleAnswerSubmit.bind(this);
		const onShowScreen = (questionId) => this.showScreenByQuestionId(questionId);

		const quizScreens = questionList.map(({ Type, ...data }, i) => {
			const Quiz = type2componet[Type];
			return (
				<Quiz key={ `type-${i}` } info={info} teamNames={teamNames} data={data}
					onAnswerSubmit={ onAnswerSubmit }/>
			);
		}).concat(
			isValidating ? <div key="summary"/> :
				<QuizSummary key="summary"
					matchId={ matchId }
					info={ info }
					teamNames={ teamNames }
					summary={ summary }
					invalidOutcomes={ invalidOutcomes }
					onShowScreen={ onShowScreen }
				/>
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
