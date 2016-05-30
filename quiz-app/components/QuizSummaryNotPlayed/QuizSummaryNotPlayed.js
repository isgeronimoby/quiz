import React, { Component, PropTypes } from 'react';
import { getFinalMatchScore } from '../../lib/parseData.js';
import Link from '../Link';
import SharingControls from '../SharingControls';
import './QuizSummaryNotPlayed.scss';


class QuizSummaryNotPlayed extends Component {

	static propTypes = {
		matchId: PropTypes.string.isRequired,
		info: PropTypes.string.isRequired,
		questionList: PropTypes.array.isRequired,
		teamNames: PropTypes.array.isRequired,
		maxWonOdds: PropTypes.number.isRequired,
		maxWonPoints: PropTypes.number.isRequired,
	};

	render() {
		const { matchId, info, questionList, teamNames, maxWonOdds, maxWonPoints } = this.props;
		const score = getFinalMatchScore(questionList, teamNames);
		const [teamHome, teamAway] = teamNames;
		const [scoreHome, scoreAway] = score;
		const scoreStr = `${scoreHome}:${scoreAway}`;
		const oddsStr = [maxWonOdds, 1].join('-');

		let oddsPointsOfWinner = '';
		if (maxWonPoints) {
			oddsPointsOfWinner = <span className="btn-text-sm">{ `Odds: ${oddsStr}  Max won ${maxWonPoints} pts` }</span>
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

				<div className="big-btn grey-btn">
					{ `Match ended ${scoreStr}` }<br/>
					{ oddsPointsOfWinner }
				</div>

				<SharingControls matchId={ matchId }/>
			</div>
		);
	}
}

export default QuizSummaryNotPlayed;
