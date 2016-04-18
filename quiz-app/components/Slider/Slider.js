import React, { Component, PropTypes } from 'react';
import Hammer from 'react-hammerjs';
import './slider.scss';


class Slider extends Component {

	static propTypes = {
		max: PropTypes.number.isRequired,
		value: PropTypes.number.isRequired,
		step: PropTypes.number,
		onChange: PropTypes.func
	};

	_bodyEl = null;

	getValueByOffset(pageX) {
		const { max } = this.props;
		const offset = pageX - this._bodyEl.offsetLeft;
		const width = this._bodyEl.offsetWidth;
		return Math.floor(offset / width * max);
	}

	getValueByDiff(diff) {
		const { value, max } = this.props;
		return Math.max(0, Math.min(max, value + diff))
	}

	render() {
		const { max, value, step = 10, onChange } = this.props;
		const posPercent = value / max * 100;
		const onPlus = () => onChange(this.getValueByDiff(step));
		const onMinus = () => onChange(this.getValueByDiff(-step));
		const onClick = (e) => onChange(this.getValueByOffset(e.pageX));
		const onPanStart = (e) => onChange(this.getValueByOffset(e.center.x));
		const onPan = (e) => onChange(this.getValueByOffset(e.center.x));

		return (
			<div className="slider">
				<div className="slider-icon icon-minus" onClick={ onMinus }></div>

				<Hammer onPanStart={onPanStart} onPan={onPan}>
					<div ref={(c) => this._bodyEl = c} className="slider-body" onClick={ onClick }>
						<div className="slider-gripper" style={{transform: `translateX(${posPercent}%)`}}></div>
					</div>
				</Hammer>

				<div className="slider-icon icon-plus" onClick={ onPlus }></div>
			</div>
		);
	}

}

export default Slider;
