import React, { Component, PropTypes } from 'react';
import Hammer from 'react-hammerjs';
import './score.scss';

const DIRECTION_UP = 8; // from Hammer

class QuizScoreStats extends Component {

	static propTypes = {
		hidden: PropTypes.bool.isRequired,
		onDismiss: PropTypes.func.isRequired,
		order: PropTypes.array.isRequired,
		stats: PropTypes.object,
	};


	render() {
		const { hidden, onDismiss, order, stats } = this.props;
		const classes = !hidden ? 'reveal' : '';
		const columns = order
			.map(name => [name, stats ? stats[name] : 0])
			.map(([name, percent]) => [name, percent, 100 - percent - 10]) // TODO - fix!
			.map(([name, percent, sz], i) => {
				return (
					<div key={`score-${i}`} className="col" style={{transform: `translateY(${sz}%)`}}>
						<div className="stats-bar">{ percent }%</div>
					</div>
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
				<div className={"quiz-stats cols-2 " + classes } onClick={ onDismiss }>
					{ columns }
				</div>
			</Hammer>
		);
	}
}

export default QuizScoreStats;
