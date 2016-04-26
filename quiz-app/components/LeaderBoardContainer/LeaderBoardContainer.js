import React, { Component, PropTypes } from 'react';
import Hammer from 'react-hammerjs';
import LeaderBoard from '../LeaderBoard';
import UserProfile from '../UserProfile';
import ScreenSwiper from '../ScreenSwiper';
import Section from '../LeaderBoard/Section.js';


const HeaderOverlay = ({ title, onBackClick}) => {
	return (
		<div className="header header-overlay">
			<div className="header-title with-btn">
				<h2>{ title }</h2>
			</div>
			<div className="nav-button" onClick={ () => onBackClick() }>
				<img src={ require('../../static/images/arrow-left-white.svg') } alt="Back"/> Back
			</div>
		</div>
	);
};


class LeaderBoardContainer extends Component {

	static propTypes = {
		data: PropTypes.object.isRequired,
	};

	state = {
		currentScreenIdx: 0,
		selectedUser: undefined
	};

	selectUser(user) {
		this.setState({
			selectedUser: user
		}, () => this.nextScreen());
	}

	nextScreen() {
		const { currentScreenIdx: idx, selectedUser } = this.state;
		if (idx < 1 && !!selectedUser) {
			this.setState({
				currentScreenIdx: idx + 1
			});
		}
	}

	prevScreen() {
		const { currentScreenIdx: idx } = this.state;
		if (idx > 0) {
			this.setState({
				currentScreenIdx: idx - 1
			});
		}
	}

	render() {
		const { data } = this.props;
		const { selectedUser, currentScreenIdx: idx } = this.state;
		const showOverlay = (idx === 1);
		const onProfileBackClick = () => this.prevScreen();
		const onPrev = () => this.prevScreen();
		const onNext = () => this.nextScreen();

		let profileMaybe = <div className="forbidden"></div>;
		if (selectedUser) {
			profileMaybe = <UserProfile user={ selectedUser }/>;
		}

		let overlayMaybe = <div className="forbidden"></div>;
		if (showOverlay) {
			overlayMaybe = <HeaderOverlay title="Profile" onBackClick={ onProfileBackClick }/>;
		}

		return (
			<div className="screen">
				{ overlayMaybe }
				<ScreenSwiper currentScreenIdx={idx} onPrevScreen={onPrev} onNextScreen={onNext}>
					<LeaderBoard users={ data } onSelect={ (user) => this.selectUser(user) }/>
					{ profileMaybe }
				</ScreenSwiper>
			</div>
		);
	}
}

export default LeaderBoardContainer;
