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


class LeaderBoardContainer extends Component {

	static propTypes = {
		data: PropTypes.object.isRequired,
	};

	state = {
		currentScreenIdx: 0,
	};

	nextScreen() {
		const { currentScreenIdx: idx } = this.state;
		if (idx < 2) {
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
			currentScreenIdx: tabs.indexOf(tab)
		});
	}

	render() {
		const {
			users: { top3, all, friends},
			groups: {top3: top3Groups, all: allGroups},
			profile
			} = this.props.data;
		const { currentScreenIdx: idx } = this.state;
		const { tabId  } = tabs[idx] || {};
		const onPrev = () => this.prevScreen();
		const onNext = () => this.nextScreen();
		const onSelectTab = (tabId) => this.selectScreen(tabId);

		return (
			<div className="screen">
				<Tabs items={ tabs } selectedItemId={ tabId } onSelect={ onSelectTab }/>

				<ScreenSwiper currentScreenIdx={idx} onPrevScreen={onPrev} onNextScreen={onNext}>
					<LeaderBoard top3={ top3 } users={ all } profile={ profile }/>
					<LeaderBoard top3={ top3 } users={ friends } profile={ profile }/>
					<LeaderBoardGroup top3={ top3Groups } groups={ allGroups }/>
				</ScreenSwiper>
			</div>
		);
	}
}

export default LeaderBoardContainer;
