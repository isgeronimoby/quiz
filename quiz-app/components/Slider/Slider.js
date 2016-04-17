import React, { Component, PropTypes } from 'react';
import './slider.scss';


class Slider extends Component {

	static propTypes = {
		max: PropTypes.number.isRequired,
		value: PropTypes.number.isRequired,
		step: PropTypes.number,
		onChange: PropTypes.func
	};

	_bodyEl = null;

	handleBodyClick(e) {
		const { max, onChange } = this.props;
		const offset = e.pageX - this._bodyEl.offsetLeft;
		const width = this._bodyEl.offsetWidth;
		const value = Math.floor(offset / width * max)

		onChange(value);
	}

	render() {
		const { max, value, step = 10, onChange } = this.props;
		const onPlus = () => onChange(Math.min(max, value + step));
		const onMinus = () => onChange(Math.max(0, value - step));
		const posPercent = value/max * 100;

		return (
			<div className="slider">
				<div className="slider-icon icon-minus" onClick={ onMinus }></div>

				<div ref={(c) => this._bodyEl = c} className="slider-body" onClick={(e) => this.handleBodyClick(e) }>
					<div className="slider-gripper" style={{transform: `translateX(${posPercent}%)`}}></div>
				</div>

				<div className="slider-icon icon-plus" onClick={ onPlus }></div>
			</div>
		);
	}

}

export default Slider;
