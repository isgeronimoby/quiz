import React, { Component, PropTypes } from 'react';
import './draw.scss';


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
		const columns = order
			.map(name => [name, 100 - (stats ? stats[name] : 0)])
			.map(([name, sz], i) => {
				const winnerClass = (choice === name ? 'winner' : '');
				return (
					<div key={`score-${i}`} className="col" style={{transform: `translateY(${sz}%)`}}>
						<div className={ "stats-bar " + winnerClass }>{ sz }%</div>
					</div>
				);
			});

		return (
			<div className={"quiz-stats cols-3 " + classes } onClick={ onDismiss }>
				{ columns }
			</div>
		);
	}
}

export default QuizWinOrDrawStats;
