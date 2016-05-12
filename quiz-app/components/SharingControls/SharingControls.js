import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchRewards, startSharingFacebook, startSharingTwitter } from '../../flux/actions';
import { SharingPopup } from '../Popup';
import SocialLink from '../SocialLink';


class SharingControls extends Component {
	static propTypes = {
		// from store:
		isLoggedIn: PropTypes.bool.isRequired,
		points: PropTypes.number.isRequired,
		rewards: PropTypes.object.isRequired,
		fetchRewards: PropTypes.func.isRequired,
		startSharingFacebook: PropTypes.func.isRequired,
		startSharingTwitter: PropTypes.func.isRequired,
	};

	componentDidMount() {
		if (this.props.isLoggedIn) {
			this.props.fetchRewards();
		}
	}

	componentWillReceiveProps({ isLoggedIn, points }) {
		const wasLoggedIn = this.props.isLoggedIn;
		const justAuthorized = !wasLoggedIn && isLoggedIn;
		if (justAuthorized) {
			this.props.fetchRewards();
		}

		const pointsDiff = points - this.props.points;
		if (wasLoggedIn && pointsDiff > 0) {
			this.showAwardPopup(pointsDiff);
		}
	}

	submitShare(name) {
		const {startSharingFacebook, startSharingTwitter} = this.props;

		if (name === 'facebook') {
			startSharingFacebook();
		} else if (name === 'twitter') {
			startSharingTwitter();
		}
	}

	showAwardPopup(points) {
		this.refs['sharing-popup'].show(points, 3000);
	}

	render() {
		const {
			isLoggedIn,
			rewards,
			onSubmitShare
			} = this.props;
		const {
			facebookShare: {rewardPoints: facebookSharePoints} = {},
			twitterShare: {rewardPoints: twitterSharePoints} = {},
			} = rewards;
		const onShareClick = (name) => this.submitShare(name);

		if (!isLoggedIn) {
			return <div/>;
		}

		return (
			<div className="sharing">
				<SharingPopup ref="sharing-popup"/>

				<SocialLink key="fb" name="facebook" points={facebookSharePoints} onClick={ onShareClick }/>,
				<SocialLink key="tw" name="twitter" points={twitterSharePoints} onClick={ onShareClick }/>
			</div>
		);
	}
}

// Connect to store
//
const mapStateToProps = (state) => {
	return {
		isLoggedIn: state.auth.isLoggedIn,
		points: state.profile.points,
		rewards: state.rewards.map
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		fetchRewards: () => dispatch(fetchRewards()),
		startSharingFacebook: () => dispatch(startSharingFacebook()),
		startSharingTwitter: () => dispatch(startSharingTwitter()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(SharingControls);
