import React, { Component, PropTypes } from 'react';
import Link from '../Link';
import { SharingPopup } from '../Popup';
import Button from '../Button';
import './summary.scss';


class QuizSummary extends Component {

	static propTypes = {
		info: PropTypes.string.isRequired,
		teamNames: PropTypes.array.isRequired,
		summary: PropTypes.object.isRequired
	};

	state = {};

	showPopup() {
		this.refs['sharing-popup'].show(3000);
	}

	render() {
		const { info, teamNames, summary: {
			scoreHome = '?',
			scoreAway = '?',
			winner,
			halfTimeWinner,
			firstGoalScorer = {}
			} } = this.props;
		const [teamHome, teamAway] = teamNames;
		const scoresStr = `${scoreHome}:${scoreAway}`;
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

		return (
			<div className="quiz-content">
				<SharingPopup ref="sharing-popup"/>

				<div className="quiz-info">{ info }</div>

				<div className="summary-banner">
					<div className="team-logo-small left">
						<img src={require(`../../static/images/team-${teamHome}.svg`)}/>
					</div>
					<div className="text-small">{ teamHome }</div>

					<div className="team-score-container">
						<div className="team-score">{ scoresStr }</div>
					</div>

					<div className="text-small">{ teamAway }</div>
					<div className="team-logo-small right">
						<img src={require(`../../static/images/team-${teamAway}.svg`)}/>
					</div>
				</div>

				<ul className="summary-choices">
					{ choiceItems }
				</ul>

				<Link className="big-btn money-btn" to="./bet" state={{id: 1}}>
					Bet points
				</Link>

				<Button className="big-btn share-btn" onClick={ () => this.showPopup() }>
					Share and get +10 points
				</Button>
			</div>
		);
	}
}

export default QuizSummary;
