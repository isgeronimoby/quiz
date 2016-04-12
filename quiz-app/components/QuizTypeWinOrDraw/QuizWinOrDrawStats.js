import React, { Component, PropTypes } from 'react';
import Hammer from 'react-hammerjs';
import './draw.scss';

const DIRECTION_UP = 8; // from Hammer

class QuizWinOrDrawStats extends Component {

	static propTypes = {
		hidden: PropTypes.bool.isRequired,
		order: PropTypes.array.isRequired,
		choice: PropTypes.string,
		stats: PropTypes.object,
		onDismiss: PropTypes.func.isRequired,
	};


	render() {
		const { hidden, order, choice, stats, onDismiss } = this.props;
		const classes = !hidden ? 'reveal' : '';
		const bottomPercent = 84; // by trial
		const columns = order
			.map(name => [name, stats ? stats[name] : 0])
			.map(([name, percent]) => [name, percent, !stats ? 100 : bottomPercent - bottomPercent*percent/100])
			.map(([name, percent, sz], i) => {
				const winnerClass = (choice === name ? 'winner' : '');
				return (
					<div key={`score-${i}`} className="col" style={{transform: `translateY(${sz}%)`}}>
						<div className={ "stats-bar " + winnerClass }>{ percent }%</div>
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
				<div className={"quiz-stats cols-3 " + classes } onClick={ onDismiss }>
					{ columns }
				</div>
			</Hammer>
		);
	}
}

export default QuizWinOrDrawStats;
