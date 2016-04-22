import React, { Component, PropTypes } from 'react';
import Popup from '../Popup';
import Button from '../Button';
import Slider from '../Slider';
import './bet.scss';


class QuizBet extends Component {

	static propTypes = {
		points: PropTypes.number.isRequired,
		odds: PropTypes.array.isRequired,
		onSubmit: PropTypes.func.isRequired,
	};

	state = {
		betValue: 20
	};

	showPopup() {
		this.refs['sharing-popup'].show(3000);
	}

	handelBetValueChange(betValue) {
		this.setState({ betValue });
	}

	render() {
		const { points, odds, onSubmit } = this.props;
		const { betValue } = this.state;
		const winValue = odds[0] * betValue;
		const onChange = (v) => this.handelBetValueChange(v);

		return (
			<div className="quiz-content">
				<Popup ref="sharing-popup" className="blue">
					<div className="popup-icon"></div>
					<div className="popup-content">
						<div className="popup-title">You got +10 points!</div>
						<div className="popup-text">Thank you for sharing</div>
					</div>
				</Popup>

				<div className="bet-subtitle">How much you want to bet?</div>

				<div className="bet-value">
					<span className="bet-points">{ betValue }</span>
					<span> points</span>
				</div>

				<Slider max={ points } value={ betValue } step={ 1 } onChange={ onChange } />

				<div className="bet-subtitle">
					Odds: <span className="text-lg">{ odds.join('-') }</span>
					win <span className="text-lg">{ winValue }</span>
					<span className="text-sm"> points</span>
				</div>

				<Button className="big-btn money-btn" onClick={() => onSubmit(betValue)} >Bet points</Button>

				<Button className="big-btn share-btn" onClick={ () => this.showPopup() }>
					Share and get +10 points
				</Button>
			</div>
		);
	}
}

export default QuizBet;
