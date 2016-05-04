import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { cancelAuth } from '../../flux/actions';
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


class AuthPopup extends Component {

	static propTypes = {
		show: PropTypes.bool.isRequired,
		view: PropTypes.string,
		//from store
		onCancel: PropTypes.func.isRequired,
	};

	state = {
		view: 'signup',
	};

	componentWillReceiveProps({view}) {
		if (!view) { return; }

		this.setState({view});
	}

	navigateTo(view) {
		this.setState({
			view
		});
	}

	render() {
		const { show, onCancel } = this.props;
		const { view, ...rest } = this.state;
		const hiddenClass = !show ? 'is-hidden' : '';
		const [Component, url] = view2comp[view];
		const onClick = (e) => {
			if (e.target === this.refs['auth-shadow']) {
				onCancel();
			}
		};

		return (
			<div ref="auth-shadow" className={"auth-screen " + hiddenClass } onClick={ onClick }>
				<Component
					onNavigate={ (view) => this.navigateTo(view) }
					{ ...rest }
				/>
			</div>
		);
	}
}


// Connect to store
//
const mapDispatchToProps = (dispatch) => {
	return {
		onCancel: () => dispatch(cancelAuth()),
	};
};

export default connect(null, mapDispatchToProps)(AuthPopup);
