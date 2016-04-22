import React, { Component, PropTypes } from 'react';
import Button from '../Button';
import { EmailInput } from './Controls.js';


class FormForgotPwd extends Component {
	static propTypes = {
		onNavigate: PropTypes.func.isRequired,
		onSubmit: PropTypes.func.isRequired,
	};

	state = {
	};

	handleSubmit() {
		const emailEl = this.refs['email-input'];
		if (!emailEl.validate()) {
			emailEl.focus();
			return;
		}

		const data = {
			email: emailEl.value()
		};
		this.props.onSubmit(data);
	}

	render() {
		const { onNavigate } = this.props;
		const toLogin = () => onNavigate('login');
		const toSignup = () => onNavigate('signup');
		const onSubmit = () => this.handleSubmit();

		return (
			<div className="auth-popup">
				<div className="auth-icon">
					<img src={ require('./images/icon-ball-lg.svg') }/>
				</div>

				<div className="auth-p">
					<div className="auth-text">Don't feel bad</div>
					<div className="auth-text-sm">It happens to the best of us</div>
				</div>

				<form className="auth-form">
					<EmailInput ref="email-input" required={true} />

					<Button className="footer-btn big-btn money-btn" onClick={ onSubmit }>Send</Button>
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
