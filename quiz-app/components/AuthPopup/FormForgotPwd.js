import React, { Component, PropTypes } from 'react';
import Button from '../Button';


const EMAIL_RE = /.*@.*?\..*?/;


class EmailInput extends Component {
	static propTypes = {
		defaultValue: PropTypes.string,
		required: PropTypes.bool,
	};

	_input = null;

	state = {
		value: '',
		error: undefined
	};

	value() {
		return this.state.value;
	}

	isEmpty() {
		const { value } = this.state;
		return value === '';
	}

	isValid() {
		const { value } = this.state;
		return EMAIL_RE.test(value);
	}

	setValid() {
		this.setState({ error: undefined });
	}

	validate() {
		const { required } = this.props;
		let error;
		if (required && this.isEmpty()) {
			error = 'required';
		}
		else if (!this.isValid()) {
			error = 'email';
		}

		this.setState({ error });

		return !error;
	}

	focus() {
		this._input.focus();
	}

	handleChange(value) {
		this.setState({ value }, () => this.setValid());
	}

	render() {
		const { defaultValue = '' } = this.props;
		const { value, error } = this.state;
		const onChange = (e) => this.handleChange(e.target.value);
		const errorClass = error ? `has-error` : '';
		const errorStyle = (type) => {
			return {
				display: (type === error) ? 'block' : 'none'
			};
		};

		return (
			<div className={"input-group " + errorClass}>
				<input type="email" name="email" placeholder="Email"
					ref={(c) => this._input = c}
					defaultValue={ defaultValue }
					value={ value }
					onChange={ onChange } />
				<div className="input-error" style={ errorStyle('required') } >Email is required</div>
				<div className="input-error" style={ errorStyle('email') }>Email should have a format: email@example.com</div>
			</div>
		);
	}
}

class FormForgotPwd extends Component {
	static propTypes = {
		onNavigate: PropTypes.func.isRequired,
		onSubmit: PropTypes.func.isRequired,
	};

	state = {
	};

	handleSubmit() {
		const emailEl = this.refs['email-input'];
		if (!emailEl.validate()) { return; }

		this.props.onSubmit({
			email: emailEl.value()
		});
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
