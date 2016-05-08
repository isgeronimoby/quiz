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
		onSubmit: PropTypes.func.isRequired,
	};

	state = {
		betValue: undefined
	};

	handelBetValueChange(betValue) {
		this.setState({ betValue });
	}

	render() {
		const { drawItem: {prizeTitle, prizeImageUrl, prizeDescription, endDate}, points, onSubmit } = this.props;
		const { betValue = points } = this.state;
		const disabledBet = (betValue === 0);
		const disabledBtnClass = disabledBet ? 'disabled' : '';
		const dateFormatted = moment.utc(endDate).format('YYYY/MM');
		const onChange = (v) => this.handelBetValueChange(v);
		const onBtnClick = () => !disabledBet && onSubmit(betValue);

		return (
			<div className="draw-content">
				<div className="draw-details">
					<div className="draw-details-image">
						<img src={ prizeImageUrl } />
					</div>
					<div className="draw-details-content">
						<Countdown dateStr={ endDate } />
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
					<span> points</span>
				</div>

				<Slider max={ points } value={ betValue } step={ 1 } onChange={ onChange } />

				<Button className={"big-btn money-btn " + disabledBtnClass} onClick={onBtnClick} >
					Place points
				</Button>

				<Link className="big-btn share-btn" to="./earn" >Earn more points</Link>
			</div>
		);
	}
}

export default DrawBet;
