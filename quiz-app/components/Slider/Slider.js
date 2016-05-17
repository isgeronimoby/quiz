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
		const width = this._bodyEl.offsetWidth;
		let offset = pageX - this._bodyEl.offsetLeft;
		offset = Math.max(0, Math.min(width, offset));

		return Math.floor(offset / width * max);
	}

	getValueByDiff(diff) {
		const { value, max } = this.props;
		return Math.max(0, Math.min(max, value + diff))
	}

	render() {
		const { max, value, step = 10, onChange } = this.props;
		const posPercent = max ? value / max * 100 : 0;
		const style = {
			transform: `translateX(${posPercent}%)`,
			WebkitTransform: `translateX(${posPercent}%)`,
		};
		const onPlusClick = () => onChange(this.getValueByDiff(step));
		const onMinusClick = () => onChange(this.getValueByDiff(-step));
		const onLineClick = (e) => onChange(this.getValueByOffset(e.pageX));
		const onPanStart = (e) => onChange(this.getValueByOffset(e.center.x));
		const onPan = (e) => onChange(this.getValueByOffset(e.center.x));

		return (
			<div className="slider">
				<div className="slider-icon icon-minus" onClick={ onMinusClick }></div>

				<Hammer onPanStart={onPanStart} onPan={onPan}>
					<div ref={(c) => this._bodyEl = c} className="slider-body" onClick={ onLineClick }>
						<div className="slider-gripper" style={style}></div>
					</div>
				</Hammer>

				<div className="slider-icon icon-plus" onClick={ onPlusClick }></div>
			</div>
		);
	}

}

export default Slider;
