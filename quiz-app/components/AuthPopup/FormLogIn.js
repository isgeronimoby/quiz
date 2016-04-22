import React, { Component, PropTypes } from 'react';
import Button from '../Button';
import { SeparatorOrError, EmailInput, PasswordInput } from './Controls.js';


class FormLogIn extends Component {
	static propTypes = {
		onNavigate: PropTypes.func.isRequired,
		onSubmit: PropTypes.func.isRequired,
		error: PropTypes.string,
		loading: PropTypes.bool,
	};

	handleSubmit() {
		const emailEl = this.refs['email-input'];
		const pwdEl = this.refs['pwd-input'];
		if (!emailEl.validate()) {
			emailEl.focus();
			return;
		}
		if (!pwdEl.validate()) {
			pwdEl.focus();
			return;
		}

		const data = {
			email: emailEl.value(),
			password: pwdEl.value(),
		};
		this.props.onSubmit(data);
	}

	render() {
		const { onNavigate, error } = this.props;
		const toForgot = () => onNavigate('forgot');
		const toSignup = () => onNavigate('signup');
		const onSubmit = () => this.handleSubmit();

		return (
			<div className="auth-popup">
				<div className="auth-icon">
					<img src={ require('./images/icon-ball-lg.svg') } />
				</div>

				<a className="big-btn facebook-btn" href="//facebook.com" target="_blank">LogIn with Facebook</a>

				<SeparatorOrError error={error} />

				<form className="auth-form">
					<EmailInput ref="email-input" required={true} />
					<PasswordInput ref="pwd-input" required={true} >
						<div className="link-small-x text-brand" onClick={ toForgot }>Forgot Password?</div>
					</PasswordInput>

					<Button className="footer-btn big-btn share-btn" onClick={ onSubmit }>LogIn with Email</Button>
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
