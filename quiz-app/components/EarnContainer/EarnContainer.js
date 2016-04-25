import React, { Component, PropTypes } from 'react';
import Hammer from 'react-hammerjs';
import Logo from '../UserProfile/Logo.js';
import Tabs from './Tabs.js';
import './EarnContainer.scss';

const DIRECTION_LEFT = 2; //from Hammer
const DIRECTION_RIGHT = 4; //from Hammer

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
		currentStep: 0
	};

	nextStep() {
		const totalSteps = tabs.length;
		const step = this.state.currentStep;
		if (step < totalSteps) {
			this.setState({
				currentStep: step + 1
			})
		}
	}

	prevStep() {
		const step = this.state.currentStep;
		if (step > 0) {
			this.setState({
				currentStep: step - 1
			});
		}
	}

	selectStep(tabId) {
		const tab = tabs.find((t) => t.tabId === tabId);
		this.setState({
			currentStep: tabs.indexOf(tab)
		});
	}

	render() {
		const { data } = this.props;
		const { currentStep: step } = this.state;
		const { tabId  } = tabs[step];
		const screens = tabs
			.map(({ filter }, i) => {
				const earnItems = data.filter(filter);
				return (
					<Screen key={`screen-${i}`} list={ earnItems }/>
				);
			});

		const totalSteps = tabs.length;
		const width = 100 * totalSteps;
		const scrollX = -100 * step / totalSteps;
		const containerStyle = {
			width: `${width}%`,
			transform: `translateX(${scrollX}%)`
		};
		const onSwipe = (e) => {
			if (e.direction === DIRECTION_LEFT) {
				this.nextStep();
			}
			if (e.direction === DIRECTION_RIGHT) {
				this.prevStep();
			}
		};
		const onTabSelect = (tabId) => this.selectStep(tabId);

		return (
			<div className="screen">
				<Tabs items={ tabs } selectedItemId={ tabId } onSelect={ onTabSelect }/>

				<Hammer onSwipe={onSwipe}>
					<div className="screen-swiper" style={ containerStyle }>
						{ screens }
					</div>
				</Hammer>
			</div>
		);
	}
}

export default EarnContainer;
