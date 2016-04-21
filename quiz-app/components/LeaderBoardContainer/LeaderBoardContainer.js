import React, { Component, PropTypes } from 'react';
import Hammer from 'react-hammerjs';
import LeaderBoard from '../LeaderBoard';
import Section from '../LeaderBoard/Section.js';

// TODO - to utils
const DIRECTION_LEFT = 2; //from Hammer
const DIRECTION_RIGHT = 4; //from Hammer


class ScreenSwiper extends Component {

	static propTypes = {
		isNextAllowed: PropTypes.func
	};

	state = {
		currentScreen: 1,
	};

	nextScreen() {
		const { children, isNextAllowed } = this.props;
		const total = children.length;
		const step = this.state.currentScreen;
		if (step < total && isNextAllowed()) {
			this.setState({
				currentScreen: step + 1
			})
		}
	}

	prevScreen() {
		const step = this.state.currentScreen;
		if (step > 1) {
			this.setState({
				currentScreen: step - 1
			})
		}
	}

	render() {
		const { children } = this.props;
		const total = children.length;
		const { currentScreen: step } = this.state;
		const width = 100 * total;
		const scrollX = -100 * (step - 1) / total;
		const containerStyle = {
			width: `${width}%`,
			transform: `translateX(${scrollX}%)`
		};
		const onSwipe = (e) => {
			if (e.direction === DIRECTION_LEFT) {
				this.nextScreen();
			}
			if (e.direction === DIRECTION_RIGHT) {
				this.prevScreen();
			}
		};

		return (
			<div className="screen">
				<Hammer onSwipe={onSwipe}>
					<div className="screen-swiper" style={ containerStyle }>
						{ children }
					</div>
				</Hammer>
			</div>
		);
	}
}


class LeaderBoardContainer extends Component {

	static propTypes = {
		data: PropTypes.object.isRequired,
	};

	state = {
		selectedUser: undefined
	};

	selectUser(user) {
		this.setState({
			selectedUser: user
		}, () => {
			this.refs['swiper'].nextScreen();
		});
	}

	render() {
		const { data } = this.props;
		const isNextAllowed = () => {
			return !!this.state.selectedUser
		};

		return (
			<ScreenSwiper ref="swiper" isNextAllowed={ isNextAllowed }>

				<LeaderBoard users={ data } onSelect={ (user) => this.selectUser(user) }/>
				<div className="screen-content">
					<Section title="TODO">
						TODO
					</Section>
				</div>
			</ScreenSwiper>
		);
	}
}

export default LeaderBoardContainer;
