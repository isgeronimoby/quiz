import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { requestAuth, startEarnSharingTwitter, startEarnSharingFacebook } from '../../flux/actions';
import ScreenSwiper from '../ScreenSwiper';
import Tabs from '../Tabs';
import './EarnContainer.scss';

const TYPE_SHARE = 'Share';
const TYPE_TWITTER_SHARE = 'TwitterShare';
const TYPE_FACEBOOK_SHARE = 'FacebookShare';

const tabs = [
	{
		tabId: 'all',
		label: 'Overall',
		filter: ({ type }) => type === TYPE_SHARE,
	},
	{
		tabId: 'share',
		label: 'Share',
		filter: ({ type }) => type === TYPE_SHARE,
	},
];


const Screen = ({ list, onClickItem }) => {
	const earnItems = list.map((earn, i) => {
		const { earnId, subType, title, description, imageUrl, earnPoints, customData } = earn;
		const pointsLabelText = `+${earnPoints} point${ earnPoints > 1 ? 's' : ''}`;
		const onClick = () => onClickItem(earnId, subType, customData);

		return (
			<li key={`earn-${i}`} className={"earn-list-item"} onClick={ onClick }>
				<div className="earn-item-aside">
					<div className="earn-item-image">
						<img className="earn-logo" src={ imageUrl }/>
					</div>
				</div>
				<div className="earn-details">
					<div className="list-title">{ title }</div>
					<div className="list-meta">{ description }</div>
					<div className="list-label green">{ pointsLabelText }</div>
				</div>
				<div className="list-item-arrow">
					<img src={ require('../../static/images/arrow-right-grey.svg') }/>
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
		earnList: PropTypes.array.isRequired,
		// from store
		isLoggedIn: PropTypes.bool.isRequired,
		openAuthPopup: PropTypes.func.isRequired,
		startEarnSharingTwitter: PropTypes.func.isRequired,
		startEarnSharingFacebook: PropTypes.func.isRequired,
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

	handleClickItem(earnId, subType, customData) {
		const { isLoggedIn, openAuthPopup, startEarnSharingTwitter, startEarnSharingFacebook } = this.props;

		if (!isLoggedIn) {
			return openAuthPopup();
		}

		switch (subType) {
			case TYPE_TWITTER_SHARE:
				return startEarnSharingTwitter(earnId, customData);
			case TYPE_FACEBOOK_SHARE:
				return startEarnSharingFacebook(earnId, customData);
		}
	}

	render() {
		const { earnList } = this.props;
		const { currentScreenIdx: idx } = this.state;
		const { tabId  } = tabs[idx];
		const onPrev = () => this.prevScreen();
		const onNext = () => this.nextScreen();
		const onTabSelect = (tabId) => this.selectScreen(tabId);
		const onClickItem = this.handleClickItem.bind(this);

		const screens = tabs
			.map(({ filter }, i) => {
				const earnItems = earnList.filter(filter);
				return (
					<Screen key={`screen-${i}`} list={ earnItems } onClickItem={ onClickItem }/>
				);
			});

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


// Connect to store
//
const mapStateToProps = (state) => {
	return {
		isLoggedIn: state.auth.isLoggedIn,
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		openAuthPopup: () => dispatch(requestAuth()),
		startEarnSharingTwitter: (earnId, customData) => dispatch(startEarnSharingTwitter(earnId, customData)),
		startEarnSharingFacebook: (earnId, customData) => dispatch(startEarnSharingFacebook(earnId, customData)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(EarnContainer);
