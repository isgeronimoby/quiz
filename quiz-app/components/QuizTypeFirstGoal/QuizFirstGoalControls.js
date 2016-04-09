import React, { Component, PropTypes } from 'react';
import './players.scss';


class QuizFirstGoalControls extends Component {

	static propTypes = {
		info: PropTypes.string.isRequired,
		onSubmit: PropTypes.func.isRequired,
	};


	render() {
		const { info, onSubmit } = this.props;

		let players = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(player => {
			return <li key={`player-${player}`}>
				<div className="player-number">{player}</div>
				<div className="player-info">
					<div className="player-name">Aaron Lennon</div>
					<div className="player-position">Everton, Middle Forward</div>
				</div>
			</li>;
		});

		return (
			<div className="quiz-controls" onClick={ () => onSubmit() }>
				<div className="quiz-info">{ info }</div>
				<div className="quiz-title">Who will score the first?</div>

				<ul className="players-list">
					{ players }
				</ul>
			</div>
		);
	}
}

export default QuizFirstGoalControls;
