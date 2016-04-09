import React, { Component, PropTypes } from 'react';
import './draw.scss';


class QuizWinOrDrawStats extends Component {

	static propTypes = {
		hidden: PropTypes.bool.isRequired,
		stats: PropTypes.object,
		choice: PropTypes.string,
		onDismiss: PropTypes.func.isRequired
	};


	render() {
		const { hidden, onDismiss } = this.props;
		const classes = !hidden ? 'reveal' : '';

		return (
			<div className={"quiz-stats " + classes } onClick={ onDismiss }>
				<div className="stats-bar winner"></div>
				<div className="stats-bar"></div>
				<div className="stats-bar"></div>
			</div>
		);
	}
}

export default QuizWinOrDrawStats;
