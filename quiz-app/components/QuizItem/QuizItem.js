import React, { Component, PropTypes } from 'react';

class QuizItem extends Component {

	static propTypes = {
		info: PropTypes.string.isRequired,
		title: PropTypes.string
	};


	render() {
		return (
			<div className="quiz-content">
				<div className="quiz-info">{ this.props.info }</div>
				<div className="quiz-title">{ this.props.title }</div>
				{ this.props.children }
			</div>
		);
	}
}

export default QuizItem;