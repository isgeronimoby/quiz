import React, { Component, PropTypes } from 'react';
import { parseWinOrDrawData, parseFirstGoalData, parseScoreData } from '../../lib/parseData.js';
import Link from '../Link';
import SharingControls from '../SharingControls';
import './QuizSummaryPlayed.scss';


function getSummary(questionList, teamNames, answers) {
	return questionList.reduce((acc, questionData, i) => {
		const { outcomeId } = answers.find(({ questionId })=> questionId === questionData.QuestionId);
		switch (questionData.Type) {
			case 'FirstHalfResult':
				return {
					...acc,
					...parseWinOrDrawData(questionData, teamNames, outcomeId).summary,
				};
			case 'FirstGoalScorer':
				return {
					...acc,
					...parseFirstGoalData(questionData, teamNames, outcomeId).summary,
				};
			case 'CorrectScore':
				return {
					...acc,
					...parseScoreData(questionData, teamNames, null, outcomeId).summary,
				};
			default:
				return acc;
		}
	}, {
		score: {},
		winner: {},
		halfTimeWinner: {},
		firstGoalScorer: {},
	});
}


class QuizSummaryPlayed extends Component {

	static propTypes = {
		info: PropTypes.string.isRequired,
		questionList: PropTypes.array.isRequired,
		teamNames: PropTypes.array.isRequired,
		betAmount: PropTypes.number.isRequired,
		isWinner: PropTypes.bool.isRequired,
		answers: PropTypes.array.isRequired,
		odds: PropTypes.number.isRequired,
		fetchOdds: PropTypes.func.isRequired,
	};

	componentDidMount() {
		const answersArr = this.props.answers.map(({ outcomeId }) => outcomeId);
		this.props.fetchOdds(answersArr);
	}

	render() {
		const { info, questionList, teamNames, betAmount, isWinner, answers, odds } = this.props;
		const { score, winner, halfTimeWinner, firstGoalScorer} = getSummary(questionList, teamNames, answers);

		const [teamHome, teamAway] = teamNames;
		const {scoreHome, scoreAway} = score;
		const scoreStr = `${scoreHome}:${scoreAway}`;
		const choiceData = [
			{
				title: 'Winner of the match',
				sides: {...winner}
			},
			{
				title: 'Winner at half-time',
				sides: {...halfTimeWinner}
			},
			{
				title: `First goal scorer: ${firstGoalScorer.name || '?'}`,
				sides: {...firstGoalScorer}
			}
		];
		const choiceItems = choiceData.map(({ title, sides: {isHome, isAway} }, i) => {
			const classHome = isHome ? 'selected' : '';
			const classAway = isAway ? 'selected' : '';
			return (
				<li key={`choice-${i}`} className="summary-choice">
					<div className={ "choice-check left " + classHome }></div>
					<div className="choice-text text-small">{ title }</div>
					<div className={ "choice-check right " + classAway }></div>
				</li>
			);
		});

		const oddsList = [odds, 1];
		const oddsStr = oddsList.join('-');
		const winAmount = betAmount * odds;
		let greyBtn;
		if (!isWinner) {
			greyBtn = (
				<div className="big-btn grey-btn">
					{ `You bet ${betAmount} pts` }<br/>
					<span className="btn-text-sm">{ `Odds: ${oddsStr}  win ${winAmount} pts` }</span>
				</div>
			);
		} else {
			greyBtn = (
				<div className="big-btn grey-btn">
					You won!<br/>
					<span className="btn-text-sm">{ `Your bet: ${betAmount}  You won: ${winAmount} pts` }</span>
				</div>
			);
		}

		return (
			<div className="quiz-content summary-played">
				<div className="quiz-info">{ info }</div>

				<div className="summary-banner">
					<div className="team-logo-small left">
						<img src={require(`../../static/images/team-${teamHome}.svg`)}/>
					</div>
					<div className="text-small">{ teamHome }</div>

					<div className="team-score-container">
						<div className="team-score">{ scoreStr }</div>
					</div>

					<div className="text-small text-right">{ teamAway }</div>
					<div className="team-logo-small right">
						<img src={require(`../../static/images/team-${teamAway}.svg`)}/>
					</div>
				</div>

				<ul className="summary-choices">
					{ choiceItems }
				</ul>

				{ greyBtn }

				<SharingControls />
			</div>
		);
	}
}

export default QuizSummaryPlayed;
