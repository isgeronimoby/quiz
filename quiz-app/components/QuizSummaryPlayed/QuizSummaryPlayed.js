import React, { Component, PropTypes } from 'react';
import { parseWinOrDrawData, parseFirstGoalData, parseScoreData } from '../../lib/parseData.js';
import Link from '../Link';
import SharingControls from '../SharingControls';
import './QuizSummaryPlayed.scss';


function getSummary(questionList, teamNames, answers) {
	return questionList.reduce((acc, questionData) => {
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
		matchId: PropTypes.string.isRequired,
		info: PropTypes.string.isRequired,
		questionList: PropTypes.array.isRequired,
		teamNames: PropTypes.array.isRequired,
		betAmount: PropTypes.number.isRequired,
		isWinner: PropTypes.bool.isRequired,
		isEnded: PropTypes.bool.isRequired,
		answers: PropTypes.array.isRequired,
		odds: PropTypes.number.isRequired,
		maxWonOdds: PropTypes.number.isRequired,
		maxWonPoints: PropTypes.number.isRequired,
		fetchOdds: PropTypes.func.isRequired,
	};

	componentDidMount() {
		const answersArr = this.props.answers.map(({ outcomeId }) => outcomeId);
		this.props.fetchOdds(answersArr);
	}


	renderChoiceItems() {
		const { questionList, teamNames, answers } = this.props;
		const { score, winner, halfTimeWinner, firstGoalScorer} = getSummary(questionList, teamNames, answers);
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

		return {
			score,
			choiceItems,
		};
	}

	renderGreyBtn(scoreStr) {
		const { isEnded, isWinner, betAmount, odds, maxWonOdds, maxWonPoints } = this.props;
		const oddsList = [odds, 1];
		const oddsStr = oddsList.join('-');
		const winAmount = betAmount * odds;
		let title = '';
		let subText = '';

		if (isEnded) {
			title = `Match ended ${scoreStr}`;
			if (isWinner) {
				subText = `Your bet: ${betAmount}  You won: ${winAmount} pts`;
			} else {
				subText = `Odds: ${maxWonOdds}  Max won ${maxWonPoints} pts`;
			}
		} else {
			title = `You bet ${betAmount} pts`;
			subText = `Odds: ${oddsStr}  win ${winAmount} pts`;
		}

		return (
			<div className="big-btn grey-btn">
				{ title }<br/>
				<span className="btn-text-sm">{ subText }</span>
			</div>
		);
	}


	render() {
		const { matchId, info, teamNames } = this.props;
		const { score, choiceItems } = this.renderChoiceItems();
		const [ teamHome, teamAway ] = teamNames;
		const { scoreHome, scoreAway } = score;
		const scoreStr = `${scoreHome}:${scoreAway}`;
		const greyBtn = this.renderGreyBtn(scoreStr);

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

				<SharingControls matchId={ matchId }/>
			</div>
		);
	}
}

export default QuizSummaryPlayed;
