import React, { Component, PropTypes } from 'react';
import './ProgressBar.scss';

class ProgressBar extends Component {
	
	state = {
		currentQuizIndex: 1,
		quizTotalAmount: 5
	};

	getProgressBarInfo() {
		let percentage = this.state.currentQuizIndex / this.state.quizTotalAmount;
		let style = {
			transform: `scaleX(${percentage})`
		};

		return { style };
	}


	render() {
		let { style } = this.getProgressBarInfo();

		return (
			<div className="progress-bar">
				<div className="progress-bar-completed" style={style} />
			</div>
		);
	}
}

export default ProgressBar;