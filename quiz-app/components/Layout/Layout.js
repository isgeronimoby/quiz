import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Header from '../Header';
import Menu from '../Menu';
import AuthPopup from '../AuthPopup';
import WelcomePopup from '../WelcomePopup';
import './Layout.scss';


class Layout extends Component {

	static propTypes = {
		title: PropTypes.string.isRequired,
		path: PropTypes.string.isRequired,
		showAuthPopup: PropTypes.bool.isRequired,
		authPopupView: PropTypes.string.isRequired,
		showWelcomePopup: PropTypes.bool.isRequired,
		children: PropTypes.element.isRequired,
	};

	state = {
		showMenu: false,
	};

	toggleMenu(on) {
		this.setState({
			showMenu: on
		});
	}

	render() {
		const {title, path, showAuthPopup, authPopupView, showWelcomePopup, children} = this.props;
		const { showMenu } = this.state;

		return (
			<div className="layout">
				<Header
					title={ title }
					onMenuBtnClick={ () => this.toggleMenu(true) }/>

				<Menu
					activePath={ path }
					show={ showMenu }
					onClick={ () => this.toggleMenu(false) }/>

				<AuthPopup show={ showAuthPopup }
					view={ authPopupView }/>

				<WelcomePopup show={ showWelcomePopup } />

				<div className="content">
					{ children }
				</div>
			</div>
		);
	}

}


// Connect to store
//
const mapStateToProps = (state) => {
	const { auth, showWelcomePopup } = state;
	return {
		showAuthPopup: auth.showAuthPopup,
		authPopupView: auth.authPopupView,
		showWelcomePopup
	};
};

export default connect(mapStateToProps)(Layout);
