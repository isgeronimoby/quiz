import React, { Component, PropTypes } from 'react';
import Popup from '../Popup';
import Button from '../Button';
import './bet.scss';


class QuizBet extends Component {

	static propTypes = {
		data: PropTypes.array.isRequired,
	};

	state = {
	};

	showPopup() {
		this.refs['sharing-popup'].show(3000);
	}

	render() {
		const title = 'How much you want to bet?';

		return (
			<div className="quiz-content">
				<Popup ref="sharing-popup" className="blue">
					<div className="popup-icon"></div>
					<div className="popup-content">
						<div className="popup-title">You got +10 points!</div>
						<div className="popup-text">Thank you for sharing</div>
					</div>
				</Popup>

				<div className="quiz-subtitle">{ title }</div>

				<Button className="big-btn money-btn">Bet points</Button>

				<Button className="big-btn share-btn" onClick={ () => this.showPopup() }>
					Share and get +10 points
				</Button>
			</div>
		);
	}
}

export default QuizBet;
