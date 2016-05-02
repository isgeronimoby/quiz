import React, { Component, PropTypes } from 'react';
import Header from '../Header';
import Menu from '../Menu';
import AuthPopup from '../AuthPopup';
import WelcomePopup from '../WelcomePopup';
import './Layout.scss';


class Layout extends Component {

	static propTypes = {
		title: PropTypes.string.isRequired,
		path: PropTypes.string.isRequired,
		children: PropTypes.element.isRequired,
	};

	static childContextTypes = {
		openAuthPopup: React.PropTypes.func,
		openWelcomePopup: React.PropTypes.func,
	};

	getChildContext() {
		return {
			openAuthPopup: this.openAuthPopup.bind(this),
			openWelcomePopup: () => this.toggleWelcomePopup(true)
		};
	}

	state = {
		showMenu: false,
		showAuthPopup: false,
		authPopupView: undefined,
		showWelcomePopup: false,
	};

	_authCb = null; // hack

	toggleMenu(on) {
		this.setState({
			showMenu: on
		});
	}

	openAuthPopup(callback, view = 'signup') {
		if (callback) {
			this._authCb = callback;
		}

		this.setState({
			showAuthPopup: true,
			authPopupView: view
		});
	}

	closeAuthPopup(result) {
		this.setState({
			showAuthPopup: false
		}, () => {
			if (this._authCb) {
				this._authCb(result);
				this._authCb = null;
			}
		});
	}

	toggleWelcomePopup(on) {
		this.setState({
			showWelcomePopup: on
		});
	}

	render() {
		const {title, path, children} = this.props;
		const { showMenu, showAuthPopup, authPopupView, showWelcomePopup } = this.state;
		const onCloseAuthPopup = (result) => this.closeAuthPopup(result);
		const onCloseWelcomePopup = () => this.toggleWelcomePopup(false);

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
					view={ authPopupView }
					onClose={ onCloseAuthPopup }/>

				<WelcomePopup show={ showWelcomePopup }
					onClose={ onCloseWelcomePopup }/>

				<div className="content">
					{ children }
				</div>
			</div>
		);
	}

}

export default Layout;
