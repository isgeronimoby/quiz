import React, { Component, PropTypes } from 'react';
import FormSignUp from './FormSignUp.js';
import FormLogIn from './FormLogIn.js';
import FormForgotPwd from './FormForgotPwd.js';
import './AuthPopup.scss';

const DELAY = 100;

const view2comp = {
	'signup': [FormSignUp, '/signUp'],
	'login': [FormLogIn, './logIn'],
	'forgot': [FormForgotPwd, './restorePwd'],
};


async function post(url, data) {
	console.log('>>TODO: post %s %s', url, JSON.stringify(data));

	const err = {
		message: 'Email or password is incorrect. Please try again'
	};

	return new Promise((resolve, reject) => {
		setTimeout(() => reject(err),  DELAY);
	});
}

class AuthPopup extends Component {

	static propTypes = {
		show: PropTypes.bool.isRequired,
		onClick: PropTypes.func,
	};

	state = {
		view: 'signup',
		signup: {
			error: undefined,
			loading: false,
		},
		login: {
			error: undefined,
			loading: false,
		},
		forgot: {
			error: undefined,
			loading: false,
		},
	};

	navigateTo(view) {
		this.setState({
			view,
			[view]: {
				error: undefined,
				loading: false,
			}
		});
	}

	doPost(view, url, data) {
		this.setState({
			[view]: {
				error: undefined,
				loading: true
			}
		}, async () => {
			let error, res;
			try {
				res = await post(url, data);
			}
			catch (err) {
				error = err.message;
			}

			this.setState({
				[view]: {
					error,
					loading: false
				}
			});
		});
	}

	render() {
		const { show } = this.props;
		const { view } = this.state;
		const hiddenClass = !show ? 'is-hidden' : '';
		const [Component, url] = view2comp[view];
		const params = this.state[view];

		return (
			<div className={"auth-screen " + hiddenClass }>
				<Component
					onNavigate={ (view) => this.navigateTo(view) }
					onSubmit={ (data) => this.doPost(view, url, data) }
					{ ...params }
				/>
			</div>
		);
	}
}

export default AuthPopup;
