import React, { Component, PropTypes } from 'react';
import './bet-success.scss';

const SHOW_TIME = 3000;


class QuizBetSuccess extends Component {

	static propTypes = {
		onDismiss: PropTypes.func.isRequired
	};

	componentDidMount() {
		setTimeout(() => this.props.onDismiss(), SHOW_TIME);
	}

	render() {
		const onClick = () => this.props.onDismiss();

		return (
			<div className="quiz-success" onClick={onClick}>
				<div className="icon-success">
					<img src={ require('./images/icon-success.svg') }/>
				</div>

				<div className="success-subtitle">Bet is accepted</div>
				<div className="success-text">Thank you</div>
			</div>
		);
	}
}

export default QuizBetSuccess;
