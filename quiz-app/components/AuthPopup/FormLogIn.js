import React, { Component, PropTypes } from 'react';
import Button from '../Button';


class FormLogIn extends Component {
	static propTypes = {
		onNavigate: PropTypes.func.isRequired,
	};

	render() {
		const { onNavigate } = this.props;
		const toForgot = () => onNavigate('forgot');
		const toSignup = () => onNavigate('signup');

		return (
			<div className="auth-popup">
				<div className="auth-icon">
					<img src={ require('./images/icon-ball-lg.svg') } />
				</div>

				<a className="big-btn facebook-btn" href="//facebook.com" target="_blank">LogIn with Facebook</a>

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

						<div className="link-small-x text-brand" onClick={ toForgot }>Forgot Password?</div>
					</div>

					<Button className="footer-btn big-btn share-btn">LogIn with Email</Button>
				</form>

				<div className="auth-footer">
					<div className="link-small text-brand" onClick={ toSignup }>
						Don't have an account? SignUp
					</div>
				</div>
			</div>
		);
	}
}

export default FormLogIn;
