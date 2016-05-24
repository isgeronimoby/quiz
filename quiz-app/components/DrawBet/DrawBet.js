import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import Link from '../Link';
import Button from '../Button';
import Slider from '../Slider';
import SectionCollapsible from '../SectionCollapsible';
import Countdown from '../Countdown';
import './DrawBet.scss';


class DrawBet extends Component {

	static propTypes = {
		drawItem: PropTypes.object.isRequired,
		points: PropTypes.number.isRequired,
		demoPoints: PropTypes.number.isRequired,
		onSubmit: PropTypes.func.isRequired,
		betError: PropTypes.string,
	};

	state = {
		betValue: undefined
	};

	handelBetValueChange(betValue) {
		this.setState({betValue});
	}

	render() {
		const {
			drawItem: {prizeTitle, prizeImageUrl, prizeDescription, endDate},
			points,
			demoPoints,
			onSubmit,
			betError = ''
			} = this.props;
		const maxPoints = (demoPoints || points);
		const minPoints = maxPoints > 0 ? 1 : 0;
		let { betValue = maxPoints } = this.state;
		betValue = Math.min(maxPoints, betValue);

		const disabledBet = (betValue === 0);
		const disabledBtnClass = disabledBet ? 'disabled' : '';
		const dateFormatted = moment.utc(endDate).format('YYYY/MM');
		const errorClass = betError ? 'reveal' : '';
		const onChange = (v) => this.handelBetValueChange(v);
		const onBtnClick = () => !disabledBet && onSubmit(betValue);

		return (
			<div className="draw-content">
				<div className="draw-details">
					<div className="draw-details-image">
						<img src={ prizeImageUrl }/>
					</div>
					<div className="draw-details-content">
						<Countdown dateStr={ endDate }/>
						<h3 className="list-title">{ prizeTitle }</h3>
						<h5 className="list-meta">{ dateFormatted }</h5>
					</div>
				</div>

				<SectionCollapsible>
					<div className="bet-description">{ prizeDescription }</div>
				</SectionCollapsible>

				<div className="bet-subtitle">How many points<br/> you want to place?</div>

				<div className="bet-value">
					<span className="bet-points">{ betValue }</span>
					<span> { `point${ betValue === 1 ? '' : 's' }` }</span>
				</div>

				<Slider min={ minPoints } max={ maxPoints } value={ betValue } step={ 1 } onChange={ onChange }/>

				<div className={"bet-error " + errorClass}>{ betError }</div>

				<Button className={"big-btn money-btn " + disabledBtnClass} onClick={onBtnClick}>
					Place points
				</Button>

				<Link className="big-btn share-btn" to="./earn">Earn more points</Link>
			</div>
		);
	}
}

export default DrawBet;
