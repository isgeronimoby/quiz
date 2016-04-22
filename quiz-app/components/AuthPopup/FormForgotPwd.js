import React, { Component, PropTypes } from 'react';
import Button from '../Button';


class FormForgotPwd extends Component {
	static propTypes = {
		onNavigate: PropTypes.func.isRequired,
	};

	render() {
		const { onNavigate } = this.props;
		const toLogin = () => onNavigate('login');
		const toSignup = () => onNavigate('signup');

		return (
			<div className="auth-popup">
				<div className="auth-icon">
					<img src={ require('./images/icon-ball-lg.svg') } />
				</div>

				<div className="auth-p">
					<div className="auth-text">Don't feel bad</div>
					<div className="auth-text-sm">It happens to the best of us</div>
				</div>

				<form className="auth-form">
					<div className="input-group">
						<input type="email" name="email" placeholder="Email"/>
					</div>

					<Button className="footer-btn big-btn money-btn">Send</Button>
				</form>

				<div className="auth-footer">
					<div className="link-small text-brand" onClick={ toLogin }>LogIn</div>
					<div className="text-brand">|</div>
					<div className="link-small text-brand" onClick={ toSignup }>SignUp</div>
				</div>
			</div>
		);
	}
}

export default FormForgotPwd;
