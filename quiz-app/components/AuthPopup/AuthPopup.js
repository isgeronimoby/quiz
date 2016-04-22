import React, { Component, PropTypes } from 'react';
import Button from '../Button';
import './AuthPopup.scss';


class SignIn extends Component {
	static propTypes = {
		onClick: PropTypes.func,
	};

	render() {
		const { show, ...others} = this.props;

		return (
			<div className="auth-popup">
				<div className="auth-icon">
					<img src={ require('../../static/images/user-default.png') } />
				</div>

				<a className="big-btn facebook-btn" href="//facebook.com" target="_blank">SignUp with Facebook</a>

				<div className="auth-text">and get <span className="text-brand">+10 points</span></div>

				<div className="auth-separator">
					<img className="strike" src={ require('./images/or-separator.svg') } />
					<div className="text-sm">Or</div>
					<img className="strike flip" src={ require('./images/or-separator.svg') } />
				</div>

			</div>
		);
	}
}

class AuthPopup extends Component {

	static propTypes = {
		show: PropTypes.bool.isRequired,
		onClick: PropTypes.func,
	};

	render() {
		const { show } = this.props;
		const hiddenClass = !show ? 'is-hidden' : '';

		return (
			<div className={"auth-screen " + hiddenClass }>
				<SignIn />
			</div>
		);
	}
}

export default AuthPopup;
