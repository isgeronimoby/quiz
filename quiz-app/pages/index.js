import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { toggleWelcome, fetchProfileIfNeeded,  } from '../flux/actions';
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
		fetchProfile: PropTypes.func.isRequired,
		openWelcomePopup: PropTypes.func.isRequired,
	};

	async componentDidMount() {
		this.showWelcomeIfNeeded();
		await this.props.fetchProfile();
		this.visitFirstQuiz();
	}

	componentWillReceiveProps({showWelcomePopup}) {
		const welcomeClosed = this.props.showWelcomePopup && !showWelcomePopup;
		if (welcomeClosed) {
			Cookies.set(WELCOME_COOKIE_KEY, 'true', {expires: WELCOME_COOKIE_EXPIRES});
		}
	}

	async showWelcomeIfNeeded() {
		if (!Cookies.get(WELCOME_COOKIE_KEY)) {
			this.props.openWelcomePopup();
		}
	}

	visitFirstQuiz() {
		//const [{ quizId }] = this.props.data; // TODO: first quiz's id
		const quizId = 1;

		setTimeout(() => {
			Location.push({
				pathname: './quiz',
				state: {id: quizId}
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
		openWelcomePopup: () => dispatch(toggleWelcome(true)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);

