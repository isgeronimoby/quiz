import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { postLogin, authWithFacebook } from '../../flux/actions';
import Button from '../Button';
import { SeparatorOrError, EmailInput, PasswordInput } from './Controls.js';
import autofill from 'react-autofill';


@autofill
class FormLogIn extends Component {
	static propTypes = {
		onNavigate: PropTypes.func.isRequired,
		// from store
		error: PropTypes.string.isRequired,
		isFetching: PropTypes.bool.isRequired,
		postLogin: PropTypes.func.isRequired,
		authWithFacebook: PropTypes.func.isRequired,
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

		this.props.postLogin(data);
	}

	render() {
		const { onNavigate, error, authWithFacebook } = this.props;
		const toForgot = () => onNavigate('forgot');
		const toSignup = () => onNavigate('signup');
		const onSubmit = () => this.handleSubmit();

		return (
			<div className="auth-popup">
				<div className="auth-icon">
					<img src={ require('../../static/images/icon-ball-lg.svg') } />
				</div>

				<div className="big-btn facebook-btn" onClick={ authWithFacebook }>LogIn with Facebook</div>

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


// Connect to store
//
const mapStateToProps = (state) => {
	const { isFetching, errors } = state.auth;
	return {
		error: errors.login || '',
		isFetching: isFetching.login || false,
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		postLogin: (data) => dispatch(postLogin(data)),
		authWithFacebook: () => dispatch(authWithFacebook()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(FormLogIn);

