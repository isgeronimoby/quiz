import React, { Component, PropTypes } from 'react';
import Button from '../Button';
import Slider from '../Slider';
import SharingControls from '../SharingControls';
import './bet.scss';


class QuizBet extends Component {

	static propTypes = {
		matchId: PropTypes.string.isRequired,
		points: PropTypes.number.isRequired,
		demoPoints: PropTypes.number.isRequired,
		odds: PropTypes.array.isRequired,
		betError: PropTypes.string.isRequired,
		onSubmitBet: PropTypes.func.isRequired,
	};

	state = {
		betValue: undefined
	};

	handelBetValueChange(betValue) {
		this.setState({betValue});
	}

	render() {
		const {
			matchId,
			points,
			demoPoints,
			odds,
			betError,
			onSubmitBet,
			} = this.props;
		const maxPoints = (demoPoints || points);
		const minPoints = maxPoints > 0 ? 1 : 0;
		let { betValue = maxPoints } = this.state;
		betValue = Math.min(maxPoints, betValue); // after login user can got points < demoPoints

		const winValue = odds[0] * betValue;
		const disabledBet = (betValue === 0);
		const disabledBtnClass = disabledBet ? 'disabled' : '';
		const errorClass = betError ? 'reveal' : '';
		const onChange = (v) => this.handelBetValueChange(v);
		const onBetClick = () => !disabledBet && onSubmitBet(betValue);

		return (
			<div className="quiz-content bet">

				<div className="bet-subtitle">How much you want to bet?</div>

				<div className="bet-value">
					<span className="bet-points">{ betValue }</span>
					<span> { `point${ betValue === 1 ? '' : 's' }` }</span>
				</div>

				<Slider min={ minPoints } max={ maxPoints } value={ betValue } step={ 1 } onChange={ onChange }/>

				<div className="bet-subtitle">
					Odds: <span className="text-lg">{ odds.join('-') }</span>
					win <span className="text-lg">{ winValue }</span>
					<span className="text-sm"> points</span>
				</div>

				<div className={'bet-error ' + errorClass}>{ betError }</div>

				<Button className={"big-btn money-btn " + disabledBtnClass} onClick={onBetClick}>
					Bet points
				</Button>

				<SharingControls matchId={ matchId }/>
			</div>
		);
	}
}

export default QuizBet;
