import React, { Component, PropTypes } from 'react';
import AuthFrom from './AuthForm.js';


class SignIn extends Component {
	static propTypes = {
		onClick: PropTypes.func,
	};

	render() {
		const { ...others} = this.props;

		return (
			<div className="auth-popup">
				<div className="auth-icon">
					<img src={ require('./images/icon-ball-lg.svg') } />
				</div>

				<a className="big-btn facebook-btn" href="//facebook.com" target="_blank">SignUp with Facebook</a>

				<div className="auth-text">and get <span className="text-brand">+10 points</span></div>

				<div className="auth-separator">
					<img className="strike" src={ require('./images/or-separator.svg') } />
					<div className="text-sm">Or</div>
					<img className="strike flip" src={ require('./images/or-separator.svg') } />
				</div>

				<AuthFrom />
			</div>
		);
	}
}

export default SignIn;
