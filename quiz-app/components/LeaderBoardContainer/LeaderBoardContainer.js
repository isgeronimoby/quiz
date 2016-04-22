import React, { Component, PropTypes } from 'react';
import Hammer from 'react-hammerjs';
import LeaderBoard from '../LeaderBoard';
import UserProfile from '../UserProfile';
import Section from '../LeaderBoard/Section.js';

// TODO - to utils
const DIRECTION_LEFT = 2; //from Hammer
const DIRECTION_RIGHT = 4; //from Hammer


class ScreenSwiper extends Component {

	static propTypes = {
		isNextAllowed: PropTypes.func,
		menuOverlay: PropTypes.element,
		showOverlay: PropTypes.func
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
		const { children, menuOverlay, showOverlay } = this.props;
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
		let overlay;
		if (menuOverlay && showOverlay(step)) {
			overlay = menuOverlay;
		}

		return (
			<div className="screen">
				{ overlay }
				<Hammer onSwipe={onSwipe}>
					<div className="screen-swiper" style={ containerStyle }>
						{ children }
					</div>
				</Hammer>
			</div>
		);
	}
}


const HeaderOverlay = ({ title, onBackClick}) => {
	return (
		<div className="header-overlay">
			<div className="header-title">
				<h2>{ title }</h2>
			</div>
			<div className="nav-button" onClick={ () => onBackClick() }>
				<img src={ require('../../static/images/icon-arrow.svg') } alt="Back"/> Back
			</div>
		</div>
	);
};


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
		}, () => this.nextScreen());
	}

	nextScreen() {
		this.refs['swiper'].nextScreen();
	}

	prevScreen() {
		this.refs['swiper'].prevScreen();
	}

	render() {
		const { data } = this.props;
		const { selectedUser } = this.state;
		const profileMaybe = selectedUser ? <UserProfile user={selectedUser}/> : <div></div>;
		const isNextAllowed = () => !!selectedUser;
		const menuOverlay = (
			<HeaderOverlay title="Profile" onBackClick={() => this.prevScreen() }/>
		);
		const showOverlay = (currentScreen) => currentScreen === 2;

		return (
			<ScreenSwiper ref="swiper" isNextAllowed={ isNextAllowed }
				menuOverlay={ menuOverlay }
				showOverlay={ showOverlay }>

				<LeaderBoard users={ data } onSelect={ (user) => this.selectUser(user) }/>
				{ profileMaybe }
			</ScreenSwiper>
		);
	}
}

export default LeaderBoardContainer;
