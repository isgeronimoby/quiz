import React, { Component, PropTypes } from 'react';
import Button from '../Button';


class AuthForm extends Component {
	static propTypes = {
		onNavigate: PropTypes.func.isRequired
	};

	render() {
		const { onNavigate } = this.props;

		return (
			<form className="auth-form">
				<div className="input-group">
					<input type="email" name="email" placeholder="Email"/>
				</div>
				<div className="input-group">
					<input type="password" name="password" placeholder="Password"/>
				</div>

				<Button className="big-btn share-btn">SignUp with Email</Button>

				<div className="link-small text-center" onClick={ () => onNavigate('login')}>
					Already have an account? LogIn
				</div>
			</form>
		);
	}
}

export default AuthForm;
