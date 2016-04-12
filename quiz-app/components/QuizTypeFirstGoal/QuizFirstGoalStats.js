import React, { Component, PropTypes } from 'react';
import Hammer from 'react-hammerjs';
import './players.scss';

const DIRECTION_UP = 8; // from Hammer

class QuizFirstGoalStats extends Component {

	static propTypes = {
		hidden: PropTypes.bool.isRequired,
		order: PropTypes.array.isRequired,
		choice: PropTypes.number,
		stats: PropTypes.object,
		onDismiss: PropTypes.func.isRequired,
		offsetHeight: PropTypes.number,
	};


	render() {
		const { hidden, order, choice, stats, onDismiss, offsetHeight } = this.props;
		const classes = !hidden ? 'reveal' : '';
		const bottom = 158 + order.length * 81 - offsetHeight;
		const [fromX, toX] = [25, 90];

		const listItems = order
			.map(number => [number, stats ? stats[number] : 0])
			.map(([number, percent]) => [number, percent, !stats ? 100 : 0, fromX + (toX - fromX) * (100 - percent) / 100])
			.map(([number, percent, statPos, rowPos], i) => {
				const selectedClass = (number === choice ? 'selected' : '');
				return (
					<li key={`stats-${i}`} className={"stats-item " + selectedClass}
						style={{transform: `translateX(${statPos}%)`}}>
						<div className="stats-row" style={{transform: `translateX(${rowPos}%)`}}>{ percent }%</div>
					</li>
				);
			});

		const hammerOptions = {
			recognizers: {
				swipe: {
					direction: DIRECTION_UP
				}
			}
		};
		const onSwipe = () => onDismiss();

		return (
			<Hammer onSwipe={onSwipe} options={ hammerOptions }>
				<div className={"quiz-stats " + classes } style={{ bottom: `-${bottom}px` }}
					onClick={ onDismiss }>
					<div className="stats-spacer"></div>

					<ul className="stats-list">
						{ listItems }
					</ul>
				</div>
			</Hammer>
		);
	}
}

export default QuizFirstGoalStats;
