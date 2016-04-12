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
		const bottomPercent = 84; // by trial
		const columns = order
			.map(name => [name, stats ? stats[name] : 0])
			.map(([name, percent]) => [name, percent, !stats ? 100 : bottomPercent - bottomPercent*percent/100])
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
