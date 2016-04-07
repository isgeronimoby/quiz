import React, { Component, PropTypes } from 'react';

class QuizItem extends Component {

	static propTypes = {

	};

	renderPlayers() {
		return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(player => {
			return <li key={`player-${player}`}>
				<div className="player-number">{player}</div>
				<div className="player-info">
					<div className="player-name">Aaron Lennon</div>
					<div className="player-position">Everton, Middle Forward</div>
				</div>
			</li>;
		})
	}


	render() {
		let players = this.renderPlayers();
		return (
			<div className="quiz-content">
				<div className="quiz-info">23 March, 19:00, 3thd tour, London</div>
				<div className="quiz-title">Who will score the first?</div>

				<ul className="players-list">
					{ players }
				</ul>
			</div>
		);
	}
}

export default QuizItem;