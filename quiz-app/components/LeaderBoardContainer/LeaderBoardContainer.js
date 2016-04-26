import React, { Component, PropTypes } from 'react';
import LeaderBoard from '../LeaderBoard';
import { LeaderBoardGroup } from '../LeaderBoard';
import Tabs from '../Tabs';
import UserProfile from '../UserProfile';
import ScreenSwiper from '../ScreenSwiper';
import Section from '../LeaderBoard/Section.js';

const tabs = [
	{
		tabId: 'all',
		label: 'Overall',
	},
	{
		tabId: 'friends',
		label: 'Friends',
	},
	{
		tabId: 'groups',
		label: 'Groups',
	}
];


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
		}, () => this.selectScreen());
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

	selectScreen(tabId) {
		const tab = tabs.find((t) => t.tabId === tabId);
		this.setState({
			currentScreenIdx: tabs.indexOf(tab) || 3 // last is Profile
		});
	}

	render() {
		const {
			users: { top3, all, friends},
			groups: {top3: top3Groups, all: allGroups},
			profile
			} = this.props.data;
		const { selectedUser, currentScreenIdx: idx } = this.state;
		const { tabId  } = tabs[idx] || {};
		const onProfileBackClick = () => this.prevScreen();
		const onPrev = () => this.prevScreen();
		const onNext = () => this.nextScreen();
		const onSelectTab = (tabId) => this.selectScreen(tabId);
		const onSelectUser = (user) => this.selectUser(user);

		let profileMaybe = <div className="forbidden"></div>;
		if (selectedUser) {
			profileMaybe = <UserProfile user={ selectedUser }/>;
		}

		const showOverlay = (idx === 3);
		let overlayMaybe = <div className="forbidden"></div>;
		if (showOverlay) {
			overlayMaybe = <HeaderOverlay title="Profile" onBackClick={ onProfileBackClick }/>;
		}

		return (
			<div className="screen">
				{ overlayMaybe }
				<Tabs items={ tabs } selectedItemId={ tabId } onSelect={ onSelectTab }/>

				<ScreenSwiper currentScreenIdx={idx} onPrevScreen={onPrev} onNextScreen={onNext}>
					<LeaderBoard top3={top3} users={ all } profile={profile} onSelect={ onSelectUser }/>
					<LeaderBoard top3={top3} users={ friends } profile={profile} onSelect={ onSelectUser }/>
					<LeaderBoardGroup top3={top3Groups} groups={ allGroups } onSelect={ onSelectUser }/>
					{ profileMaybe }
				</ScreenSwiper>
			</div>
		);
	}
}

export default LeaderBoardContainer;
