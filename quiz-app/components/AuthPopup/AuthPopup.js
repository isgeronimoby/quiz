import React, { Component, PropTypes } from 'react';
import FormSignUp from './FormSignUp.js';
import FormLogIn from './FormLogIn.js';
import FormForgotPwd from './FormForgotPwd.js';
import './AuthPopup.scss';


const view2comp = {
	'signup': FormSignUp,
	'login': FormLogIn,
	'forgot': FormForgotPwd,
};


class AuthPopup extends Component {

	static propTypes = {
		show: PropTypes.bool.isRequired,
		onClick: PropTypes.func,
	};

	state = {
		view: 'signup'
	};

	navigateTo(view) {
		this.setState({
			view
		});
	}

	render() {
		const { show } = this.props;
		const { view } = this.state;
		const hiddenClass = !show ? 'is-hidden' : '';
		const Component = view2comp[view];

		return (
			<div className={"auth-screen " + hiddenClass }>
				<Component onNavigate={ (view) => this.navigateTo(view) }/>
			</div>
		);
	}
}

export default AuthPopup;
