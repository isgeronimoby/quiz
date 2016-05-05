import React, { Component, PropTypes } from 'react';
import './players.scss';


class QuizFirstGoalControls extends Component {

	static propTypes = {
		info: PropTypes.string.isRequired,
		players: PropTypes.array.isRequired,
		onSubmit: PropTypes.func.isRequired,
		choice: PropTypes.number
	};

	render() {
		const { info, players, onSubmit, choice, children } = this.props;
		const title = <span>Who will score<br/>the first goal?</span>;
		const selectedClass = (number) => (number === choice ? 'selected' : '');

		let playerItems = players.map(({outcomeId, number, name, position}, i) => {
			return (
				<li key={`player-${i}`} className={"player-item " + selectedClass(number)}
					onClick={ () => onSubmit(outcomeId) }>
					<div className="player-number">{ number }</div>
					<div className="player-info">
						<div className="player-name">{ name }</div>
						<div className="player-position">{ position }</div>
					</div>
				</li>
			);
		});

		return (
			<div className="quiz-controls">
				<div className="quiz-info">{ info }</div>
				<div className="quiz-title">{ title }</div>

				<ul className="players-list">
					{ playerItems }
				</ul>

				{ children }
			</div>
		);
	}
}

export default QuizFirstGoalControls;
