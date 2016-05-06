import React, { Component, PropTypes } from 'react';
import './players.scss';


class QuizFirstGoalControls extends Component {

	static propTypes = {
		info: PropTypes.string.isRequired,
		players: PropTypes.array.isRequired,
		outcomeId: PropTypes.string,
		onSubmit: PropTypes.func.isRequired,
	};

	render() {
		const { info, players, onSubmit, outcomeId: selectedOutcomeId, children } = this.props;
		const title = <span>Who will score<br/>the first goal?</span>;
		const selectedClass = (outcomeId) => (outcomeId === selectedOutcomeId ? 'selected' : '');

		let playerItems = players.map(({outcomeId, name, team}, i) => {
			const icon =  team ? require(`../../static/images/team-${team}.svg`) :
				require(`../../static/images/icon-friendship.svg`);

			return (
				<li key={`player-${i}`} className={"player-item " + selectedClass(outcomeId)}
					onClick={ () => onSubmit(outcomeId) }>
					<div className="player-icon">
						<img src={ icon }/>
					</div>
					<div className="player-info">
						<div className="player-name">{ name }</div>
						<div className="player-position">{ team }</div>
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
