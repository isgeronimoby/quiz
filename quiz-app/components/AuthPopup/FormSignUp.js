import React, { Component, PropTypes } from 'react';
import Button from '../Button';
/*import AuthFrom from './AuthForm.js';*/


class FormSignIn extends Component {
	static propTypes = {
		onNavigate: PropTypes.func.isRequired,
	};

	render() {
		const { onNavigate } = this.props;
		const toSignup = () => onNavigate('login');

		return (
			<div className="auth-popup">
				<div className="auth-icon">
					<img src={ require('./images/icon-ball-lg.svg') } />
				</div>

				<a className="big-btn facebook-btn" href="//facebook.com" target="_blank">SignUp with Facebook</a>

				<div className="auth-p">
					<div className="auth-text">and get <span className="text-brand">+10 points</span></div>
				</div>

				<div className="auth-separator">
					<img className="strike" src={ require('./images/or-separator.svg') } />
					<div className="auth-text-sm">Or</div>
					<img className="strike flip" src={ require('./images/or-separator.svg') } />
				</div>

				<form className="auth-form">
					<div className="input-group">
						<input type="email" name="email" placeholder="Email"/>
					</div>
					<div className="input-group">
						<input type="password" name="password" placeholder="Password"/>
					</div>

					<Button className="footer-btn big-btn share-btn">SignUp with Email</Button>
				</form>

				<div className="auth-footer">
					<div className="link-small text-brand" onClick={ toSignup }>
						Already have an account? LogIn
					</div>
				</div>
			</div>
		);
	}
}

export default FormSignIn;
