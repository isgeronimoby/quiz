import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { toggleWelcome, fetchFixturesIfNeeded } from '../flux/actions';
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
		fixtureList: PropTypes.array.isRequired,
		fetchFixtures: PropTypes.func.isRequired,
	};

	async componentDidMount() {
		this.showWelcomeIfNeeded();
		await this.props.fetchFixtures();
		setTimeout(() => this.visitFirstQuizOrList(), MIN_DELAY);
	}

	componentWillReceiveProps({showWelcomePopup}) {
		const welcomeClosed = this.props.showWelcomePopup && !showWelcomePopup;
		//console.log('>>welcomeClosed %s -> %s', this.props.showWelcomePopup, showWelcomePopup);

		if (welcomeClosed) {
			Cookies.set(WELCOME_COOKIE_KEY, 'true', {expires: WELCOME_COOKIE_EXPIRES});
		}
	}

	showWelcomeIfNeeded() {
		if (!Cookies.get(WELCOME_COOKIE_KEY)) {
			this.props.openWelcomePopup();
		}
	}

	visitFirstQuizOrList() {
		const firstQuiz = this.props.fixtureList[0];

		if (firstQuiz) {
			Location.push({
				pathname: './quiz',
				state: {matchId: firstQuiz.matchId}
			});
		} else {
			Location.push({pathname: './fixtures'});
		}
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
		showWelcomePopup: state.showWelcomePopup,
		fixtureList: state.fixtures.list,
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		fetchFixtures: () => dispatch(fetchFixturesIfNeeded()),
		openWelcomePopup: () => dispatch(toggleWelcome(true)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);

