import React, { Component, PropTypes } from 'react';
import Button from './Button.js';
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

				<Button className="big-btn money-btn">Make a free bet</Button>

				<Button className="big-btn share-btn">Share your prediction</Button>
			</div>
		);
	}
}

export default QuizSummary;
