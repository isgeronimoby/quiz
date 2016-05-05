import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { toggleWelcome, fetchProfileIfNeeded, fetchFixtures } from '../flux/actions';
import Cookies from 'js-cookie';
import Location from '../lib/Location';

const MIN_DELAY = 2000;
const WELCOME_COOKIE_KEY = 'quiz-everton-onboarded';
const WELCOME_COOKIE_EXPIRES = 365; //days


class Index extends Component {

	static title = 'Match Quiz';

	static propTypes = {
		// from store
		showWelcomePopup: PropTypes.bool.isRequired,
		openWelcomePopup: PropTypes.func.isRequired,
		fetchProfile: PropTypes.func.isRequired,
		fetchFixtures: PropTypes.func.isRequired,
	};

	async componentDidMount() {
		this.showWelcomeIfNeeded();
		this.props.fetchProfile();
		await this.props.fetchFixtures();
		this.visitFirstQuiz()
	}

	componentWillReceiveProps({showWelcomePopup}) {
		const welcomeClosed = this.props.showWelcomePopup && !showWelcomePopup;
		if (welcomeClosed) {
			Cookies.set(WELCOME_COOKIE_KEY, 'true', {expires: WELCOME_COOKIE_EXPIRES});
		}
	}

	showWelcomeIfNeeded() {
		if (!Cookies.get(WELCOME_COOKIE_KEY)) {
			this.props.openWelcomePopup();
		}
	}

	visitFirstQuiz() {
		//const [{ quizId }] = this.props.data; // TODO: first quiz's id
		const matchId = '0f465529-f5d5-4dd0-8581-728693287d50';

		setTimeout(() => {
			Location.push({
				pathname: './quiz',
				state: {matchId}
			});
		}, MIN_DELAY);
	}

	render() {
		return (
			<div className="preloader">
				<div className="loader-image"></div>
			</div>
		);
	}
}

// Connect to store
//
const mapStateToProps = (state) => {
	return {
		showWelcomePopup: state.showWelcomePopup
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		fetchProfile: () => dispatch(fetchProfileIfNeeded()),
		fetchFixtures: () => dispatch(fetchFixtures()),
		openWelcomePopup: () => dispatch(toggleWelcome(true)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);

