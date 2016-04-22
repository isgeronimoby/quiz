import React, { Component, PropTypes } from 'react';
import SignIn from './SignIn.js';
import './AuthPopup.scss';


const view2comp = {
	'signin': SignIn
};


class AuthPopup extends Component {

	static propTypes = {
		show: PropTypes.bool.isRequired,
		onClick: PropTypes.func,
	};

	state = {
		view: 'signin'
	};

	render() {
		const { show } = this.props;
		const hiddenClass = !show ? 'is-hidden' : '';

		return (
			<div className={"auth-screen " + hiddenClass }>
				<SignIn onNavigate={() => {}}/>
			</div>
		);
	}
}

export default AuthPopup;
