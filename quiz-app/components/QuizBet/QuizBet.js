import React, { Component, PropTypes } from 'react';
import { SharingPopup } from '../Popup';
import Button from '../Button';
import Slider from '../Slider';
import SocialLink from '../SocialLink';
import './bet.scss';


class QuizBet extends Component {

	static propTypes = {
		points: PropTypes.number.isRequired,
		demoPoints: PropTypes.number.isRequired,
		odds: PropTypes.array.isRequired,
		rewards: PropTypes.object.isRequired,
		onSubmitBet: PropTypes.func.isRequired,
		onSubmitShare: PropTypes.func.isRequired,
	};

	state = {
		betValue: undefined
	};

	showPopup() {
		this.refs['sharing-popup'].show(3000);
	}

	handelBetValueChange(betValue) {
		this.setState({betValue});
	}

	render() {
		const {
			points,
			demoPoints,
			odds,
			rewards,
			onSubmitBet,
			onSubmitShare
			} = this.props;
		const maxPoints = (demoPoints || points);
		let { betValue = maxPoints } = this.state;
		betValue = Math.min(maxPoints, betValue); // after login user can got points < demoPoints

		const winValue = odds[0] * betValue;
		const disabledBet = (betValue === 0);
		const disabledBtnClass = disabledBet ? 'disabled' : '';
		const {
			facebookShare: {rewardPoints: facebookSharePoints} = {},
			twitterShare: {rewardPoints: twitterSharePoints} = {},
			} = rewards;
		const onChange = (v) => this.handelBetValueChange(v);
		const onBetClick = () => !disabledBet && onSubmitBet(betValue);
		const onShareClick = (name) => onSubmitShare(name);

		return (
			<div className="quiz-content">
				<SharingPopup ref="sharing-popup"/>

				<div className="bet-subtitle">How much you want to bet?</div>

				<div className="bet-value">
					<span className="bet-points">{ betValue }</span>
					<span> points</span>
				</div>

				<Slider max={ maxPoints } value={ betValue } step={ 1 } onChange={ onChange }/>

				<div className="bet-subtitle">
					Odds: <span className="text-lg">{ odds.join('-') }</span>
					win <span className="text-lg">{ winValue }</span>
					<span className="text-sm"> points</span>
				</div>

				<Button className={"big-btn money-btn " + disabledBtnClass} onClick={onBetClick}>
					Bet points
				</Button>

				<SocialLink name="facebook" points={facebookSharePoints} onClick={ onShareClick }/>
				<SocialLink name="twitter" points={twitterSharePoints} onClick={ onShareClick }/>
			</div>
		);
	}
}

export default QuizBet;
