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
	const randomFail = (Math.random() > .5);

	return new Promise((resolve, reject) => {
		setTimeout(() => {
			if (randomFail) {
				reject(err);
			} else {
				resolve('ok');
			}
		},  DELAY);
	});
}

async function doPost(url, data) {
	let error, res;
	try {
		res = await post(url, data); // TODO - use res?
	}
	catch (err) {
		error = err.message;
	}

	return {error, res};
}


class AuthPopup extends Component {

	static propTypes = {
		show: PropTypes.bool.isRequired,
		onClose: PropTypes.func.isRequired,
		view: PropTypes.string,
	};

	state = {
		view: 'signup',
		error: undefined,
		loading: false,
	};

	componentWillReceiveProps({view}) {
		if (!view) { return; }

		this.setState({ view });
	}

	navigateTo(view) {
		this.setState({
			view,
			error: undefined,
			loading: false
		});
	}

	handleSubmit(url, data) {
		const { onClose } = this.props;

		this.setState({
			error: undefined,
			loading: true
		}, async () => {
			const {error, res} = await doPost(url, data);

			this.setState({
				error,
				loading: false
			}, () => {
				if (!error) {
					onClose(true);
				}
			});
		});
	}

	render() {
		const { show, onClose } = this.props;
		const { view, ...rest } = this.state;
		const hiddenClass = !show ? 'is-hidden' : '';
		const [Component, url] = view2comp[view];
		const onClick = (e) => {
			if (e.target === this.refs['auth-shadow']) {
				onClose(false);
			}
		};

		return (
			<div ref="auth-shadow" className={"auth-screen " + hiddenClass } onClick={ onClick }>
				<Component
					onNavigate={ (view) => this.navigateTo(view) }
					onSubmit={ (data) => this.handleSubmit(url, data) }
					{ ...rest }
				/>
			</div>
		);
	}
}

export default AuthPopup;
