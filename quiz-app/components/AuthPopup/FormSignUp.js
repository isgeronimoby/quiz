import React, { Component, PropTypes } from 'react';
import Button from '../Button';
import { Separator, EmailInput, PasswordInput } from './Controls.js';


class FormSignIn extends Component {
	static propTypes = {
		onNavigate: PropTypes.func.isRequired,
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
		const { onNavigate } = this.props;
		const toSignup = () => onNavigate('login');
		const onSubmit = () => this.handleSubmit();

		return (
			<div className="auth-popup">
				<div className="auth-icon">
					<img src={ require('./images/icon-ball-lg.svg') } />
				</div>

				<a className="big-btn facebook-btn" href="//facebook.com" target="_blank">SignUp with Facebook</a>
				<div className="auth-p">
					<div className="auth-text">and get <span className="text-brand">+10 points</span></div>
				</div>

				<Separator />

				<form className="auth-form">
					<EmailInput ref="email-input" required={true} />
					<PasswordInput ref="pwd-input" required={true} />

					<Button className="footer-btn big-btn share-btn" onClick={ onSubmit }>SignUp with Email</Button>
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
