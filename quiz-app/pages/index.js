import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Cookies from 'js-cookie';
import { fetchProfile } from '../flux/actions';
import Location from '../lib/Location';

const DELAY = 3000;
const WELCOME_COOKIE_KEY = 'quiz-everton-onboarded';
const WELCOME_COOKIE_EXPIRES = 365; //days


class Index extends Component {

	static title = 'Match Quiz';

	static contextTypes = {
		openWelcomePopup: React.PropTypes.func
	};

	static PropTypes = {
		// from store
		fetchProfile: PropTypes.func.isRequired,
	};

	async componentDidMount() {
		await this.showWelcomeIfNeeded();
		await this.props.fetchProfile();
		this.visitFirstQuiz();
	}

	async showWelcomeIfNeeded() {
		if (!Cookies.get(WELCOME_COOKIE_KEY)) {
			return new Promise((resolve, reject) => {
				this.context.openWelcomePopup(() => {
					Cookies.set(WELCOME_COOKIE_KEY, 'true', {expires: WELCOME_COOKIE_EXPIRES});
					resolve();
				})
			});
		} else {
			return Promise.resolve();
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
		}, DELAY);
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
const mapDispatchToProps = (dispatch) => {
	return {
		fetchProfile: () => dispatch(fetchProfile())
	};
};

export default connect(null, mapDispatchToProps)(Index);

