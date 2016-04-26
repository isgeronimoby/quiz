import React, { Component, PropTypes } from 'react';
import Hammer from 'react-hammerjs';

const DIRECTION_LEFT = 2; //from Hammer
const DIRECTION_RIGHT = 4; //from Hammer


class ScreenSwiper extends Component {

	static propTypes = {
		currentScreenIdx: PropTypes.number.isRequired,
		onPrevScreen: PropTypes.func.isRequired,
		onNextScreen: PropTypes.func.isRequired,
	};

	render() {
		const { currentScreenIdx: idx, onPrevScreen, onNextScreen, children } = this.props;
		const total = children.length;
		const width = 100 * total;
		const scrollX = -100 * idx / total;
		const containerStyle = {
			width: `${width}%`,
			transform: `translateX(${scrollX}%)`
		};
		const onSwipe = (e) => {
			if (e.direction === DIRECTION_LEFT) {
				onPrevScreen();
			}
			if (e.direction === DIRECTION_RIGHT) {
				onNextScreen();
			}
		};

		return (
			<Hammer onSwipe={onSwipe}>
				<div className="screen-swiper" style={ containerStyle }>
					{ children }
				</div>
			</Hammer>
		);
	}
}
export default ScreenSwiper;
