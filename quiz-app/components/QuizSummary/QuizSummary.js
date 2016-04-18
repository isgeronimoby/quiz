import React, { Component, PropTypes } from 'react';
import Link from '../Link';
import Popup from '../Popup';
import Button from '../Button';
import './summary.scss';


async function post(id, data) {

	console.log('>>TODO: post /quiz/[%s]/result: %s', id, JSON.stringify(data));

	return new Promise((resolve, reject) => {
		setTimeout(() => resolve(dataStats), DELAY);
	});
}

class QuizSummary extends Component {

	static propTypes = {
		/*info: PropTypes.string.isRequired,
		 teams: PropTypes.array.isRequired,
		 score: PropTypes.array.isRequired,
		 choices: PropTypes.array.isRequired,*/
	};

	state = {};

	showPopup() {
		this.refs['sharing-popup'].show(3000);
	}

	render() {
		const info = '23 March, 18:00, 2nd tour, London';
		const [team1, team2] = ['chelsea', 'everton'];
		const [name1, name2] = ['Chelsea', 'Everton'];
		const [score1, score2] = [3, 2];
		const firstGoalScorer = 'A.A. Lennon';
		const choiceData = [
			{
				title: 'Winner of the match',
				choice: [true, false]
			},
			{
				title: 'Winner at half-time',
				choice: [true, false]
			},
			{
				title: `First goal scorer: ${firstGoalScorer}`,
				choice: [false, true]
			}
		];
		const choiceItems = choiceData.map(({ title, choice: [choice1, choice2] }, i) => {
			const class1 = choice1 ? 'selected' : '';
			const class2 = choice2 ? 'selected' : '';
			return (
				<li key={`choice-${i}`} className="summary-choice">
					<div className={ "choice-check left " + class1 }></div>
					<div className="choice-text text-small">{ title }</div>
					<div className={ "choice-check right " + class2 }></div>
				</li>
			);
		});

		return (
			<div className="quiz-content">
				<Popup ref="sharing-popup" className="blue" autoHide={2000}>
					<div className="popup-icon"></div>
					<div className="popup-content">
						<div className="popup-title">You got +10 points!</div>
						<div className="popup-text">Thank you for sharing</div>
					</div>
				</Popup>

				<div className="quiz-info">{ info }</div>

				<div className="summary-banner">
					<div className="team-logo-small left">
						<img src={require(`../../static/images/team-${team1}.svg`)}/>
					</div>
					<div className="text-small">{ name1 }</div>

					<div className="team-score-container">
						<div className="team-score">{ `${score1}:${score2}` }</div>
					</div>

					<div className="text-small">{ name2 }</div>
					<div className="team-logo-small right">
						<img src={require(`../../static/images/team-${team2}.svg`)}/>
					</div>
				</div>

				<ul className="summary-choices">
					{ choiceItems }
				</ul>

				<Link className="big-btn money-btn" to="/bet" state={{id: 1}}>
					Make a free bet
				</Link>

				<Button className="big-btn share-btn" onClick={ () => this.showPopup() }>
					Share and get +10 points
				</Button>
			</div>
		);
	}
}

export default QuizSummary;
