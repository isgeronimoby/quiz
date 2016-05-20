import React, { Component, PropTypes } from 'react';
import Link from '../Link';
import Button from '../Button';
import SharingControls from '../SharingControls';
import './summary.scss';


class QuizSummary extends Component {

	static propTypes = {
		matchId: PropTypes.string.isRequired,
		info: PropTypes.string.isRequired,
		teamNames: PropTypes.array.isRequired,
		summary: PropTypes.object.isRequired,
		invalidOutcomes: PropTypes.array.isRequired,
		onShowScreen: PropTypes.func.isRequired,
	};

	render() {
		const { matchId, info, teamNames, invalidOutcomes, onShowScreen, summary: {
			score = {},
			winner = {},
			halfTimeWinner = {},
			firstGoalScorer = {},
			} } = this.props;
		const [teamHome, teamAway] = teamNames;
		const {scoreHome = '?', scoreAway = '?', questionId} = score;
		const scoreStr = `${scoreHome}:${scoreAway}`;
		const showScoreScreen = () => onShowScreen(questionId);
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
		const choiceItems = choiceData.map(({ title, sides: {isHome, isAway, outcomeId, questionId} }, i) => {
			const isInvalid = invalidOutcomes.indexOf(outcomeId) >= 0;
			const classHome = isHome ? 'selected' : '';
			const classAway = isAway ? 'selected' : '';
			const invalidClass = isInvalid ? 'invalid' : '';
			const onClick = () => onShowScreen(questionId);
			return (
				<li key={`choice-${i}`} className={"summary-choice " + invalidClass} onClick={ onClick }>
					<div className={ "choice-check left " + classHome }></div>
					<div className="choice-text text-small">{ title }</div>
					<div className={ "choice-check right " + classAway }></div>
				</li>
			);
		});
		const hasInvalids = invalidOutcomes.length > 0;
		let btnOrError = (
			<div className="error-text">
				<h3 className="strong">Answers that marked in red<br/> contradict each other.</h3>
				Please change your answers
			</div>
		);
		if (!hasInvalids) {
			btnOrError = (
				<Link className="big-btn money-btn" to="./bet" query={ {matchId} }>Submit Prediction</Link>
			);
		}

		return (
			<div className="quiz-content">
				<div className="quiz-info">{ info }</div>

				<div className="summary-banner" onClick={ showScoreScreen }>
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

				{ btnOrError }

				<SharingControls matchId={ matchId }/>
			</div>
		);
	}
}

export default QuizSummary;
