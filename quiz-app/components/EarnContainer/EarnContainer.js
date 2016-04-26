import React, { Component, PropTypes } from 'react';
import ScreenSwiper from '../ScreenSwiper';
import Tabs from '../Tabs';
import './EarnContainer.scss';


const tabs = [
	{
		tabId: 'all',
		label: 'Overall',
		filter: () => true,
	},
	{
		tabId: 'share',
		label: 'Share',
		filter: ({ type }) => type === 'share',
	},
	{
		tabId: 'watch',
		label: 'Watch',
		filter: ({ type }) => type === 'watch',
	},
	{
		tabId: 'visit',
		label: 'Visit',
		filter: ({ type }) => type === 'visit',
	},
	{
		tabId: 'download',
		label: 'Download',
		filter: ({ type }) => type === 'download',
	}
];


const type2title = {
	watch: 'Watch Video',
	share: 'Share wtih Friends',
	visit: 'Visit Page',
	download: 'Download App',
};


const Screen = ({ list, onSelect }) => {
	const earnItems = list.map((earn, i) => {
		const { earnId, type, sponsor, name } = earn;
		const onClickItem = () => onSelect(earnId);
		const picture = require('./images/icon-nike.png');
		const title = type2title[type];

		return (
			<li key={`earn-${i}`} className={"earn-list-item"} onClick={ onClickItem }>
				<div className="earn-logo-cont">
					<img className="earn-logo" src={ picture } alt="Logo"/>
				</div>
				<div className="earn-details">
					<div className="list-title">{ title }</div>
					<div className="list-meta">{ name }</div>
				</div>
				<div className="list-item-arrow">
					<img src={ require('../../static/images/arrow-right-grey.svg') } />
				</div>
			</li>
		);
	});
	return (
		<div className="screen-content">
			<ul className="earn-list">
				{ earnItems }
			</ul>
		</div>
	);
};


class EarnContainer extends Component {

	static propTypes = {
		data: PropTypes.array.isRequired,
	};

	state = {
		currentScreenIdx: 0
	};

	nextScreen() {
		const { currentScreenIdx: idx } = this.state;
		const totalSteps = tabs.length;
		if (idx + 1 < totalSteps) {
			this.setState({
				currentScreenIdx: idx + 1
			})
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
		const { data } = this.props;
		const { currentScreenIdx: idx } = this.state;
		const { tabId  } = tabs[idx];
		const screens = tabs
			.map(({ filter }, i) => {
				const earnItems = data.filter(filter);
				return (
					<Screen key={`screen-${i}`} list={ earnItems }/>
				);
			});
		const onTabSelect = (tabId) => this.selectScreen(tabId);
		const onPrev = () => this.prevScreen();
		const onNext = () => this.nextScreen();

		return (
			<div className="screen">
				<Tabs items={ tabs } selectedItemId={ tabId } onSelect={ onTabSelect }/>

				<ScreenSwiper currentScreenIdx={idx} onPrevScreen={onPrev} onNextScreen={onNext}>
					{ screens }
				</ScreenSwiper>
			</div>
		);
	}
}

export default EarnContainer;
