import React, { Component, PropTypes } from 'react';
import Hammer from 'react-hammerjs';
import './players.scss';

const DIRECTION_UP = 8; // from Hammer

class QuizFirstGoalStats extends Component {

	static propTypes = {
		hidden: PropTypes.bool.isRequired,
		onDismiss: PropTypes.func.isRequired,
	};


	render() {
		const { hidden, onDismiss } = this.props;
		const classes = !hidden ? 'reveal' : '';

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
				<div className={"quiz-stats cols-3 " + classes } onClick={ onDismiss }>
					TODO
				</div>
			</Hammer>
		);
	}
}

export default QuizFirstGoalStats;
