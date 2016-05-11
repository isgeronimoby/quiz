import React, { Component, PropTypes } from 'react';
import { SharingPopup } from '../Popup';
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
		betValue: undefined
	};

	showPopup() {
		this.refs['sharing-popup'].show(3000);
	}

	handelBetValueChange(betValue) {
		this.setState({ betValue });
	}

	render() {
		const { points, odds, onSubmit } = this.props;
		const { betValue = points } = this.state;
		const winValue = odds[0] * betValue;
		const disabledBet = (betValue === 0);
		const disabledBtnClass = disabledBet ? 'disabled' : '';
		const onChange = (v) => this.handelBetValueChange(v);
		const onBtnClick = () => !disabledBet && onSubmit(betValue);

		return (
			<div className="quiz-content">
				<SharingPopup ref="sharing-popup" />

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

				<Button className={"big-btn money-btn " + disabledBtnClass} onClick={onBtnClick} >
					Bet points
				</Button>

				{/*
				 <Button className="big-btn share-btn" onClick={ () => this.showPopup() }>
				 Share and get +10 points
				 </Button>
				*/}
			</div>
		);
	}
}

export default QuizBet;
