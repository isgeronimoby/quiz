import React, { Component, PropTypes } from 'react';
import Button from '../Button';
import { SeparatorOrError, TextInput, EmailInput, PasswordInput } from './Controls.js';


class FormSignIn extends Component {
	static propTypes = {
		onNavigate: PropTypes.func.isRequired,
		onSubmit: PropTypes.func.isRequired,
		error: PropTypes.string,
		loading: PropTypes.bool,
	};

	static defaultProps = {
		error: '',
		loading: false,
	};

	handleSubmit() {
		const nameEl = this.refs['name-input'];
		if (!nameEl.validate()) {
			nameEl.focus();
			return;
		}
		const emailEl = this.refs['email-input'];
		if (!emailEl.validate()) {
			emailEl.focus();
			return;
		}
		const pwdEl = this.refs['pwd-input'];
		if (!pwdEl.validate()) {
			pwdEl.focus();
			return;
		}

		const data = {
			name: nameEl.value(),
			email: emailEl.value(),
			password: pwdEl.value(),
		};
		this.props.onSubmit(data);
	}

	render() {
		const { onNavigate, error } = this.props;
		const toSignup = () => onNavigate('login');
		const onSubmit = () => this.handleSubmit();

		return (
			<div className="auth-popup">
				<div className="auth-icon">
					<img src={ require('./images/icon-ball-lg.svg') }/>
				</div>

				<a className="big-btn facebook-btn" href="//facebook.com" target="_blank">SignUp with Facebook</a>
				<div className="auth-p">
					<div className="auth-text">and get <span className="text-brand">+10 points</span></div>
				</div>

				<SeparatorOrError error={error} />

				<form className="auth-form">
					<TextInput ref="name-input" required={true} name="name" label="Full Name"/>
					<EmailInput ref="email-input" required={true}/>
					<PasswordInput ref="pwd-input" required={true}/>

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
