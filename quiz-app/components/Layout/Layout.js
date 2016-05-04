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
		children: PropTypes.element.isRequired,
	};

	state = {
		showMenu: false,
		showWelcomePopup: false,
	};

	_welcomeCb = null;

	toggleMenu(on) {
		this.setState({
			showMenu: on
		});
	}

	openWelcomePopup(callback) {
		if (callback) {
			this._welcomeCb = callback;
		}

		this.setState({
			showWelcomePopup: true
		});
	}

	closeWelcomePopup() {
		this.setState({
			showWelcomePopup: false
		}, () => {
			if (this._welcomeCb) {
				this._welcomeCb();
				this._welcomeCb = null;
			}
		});
	}

	render() {
		const {title, path, showAuthPopup, authPopupView, children} = this.props;
		const { showMenu, showWelcomePopup } = this.state;
		const onCloseWelcomePopup = () => this.closeWelcomePopup();

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

				<WelcomePopup show={ showWelcomePopup }
					onClose={ onCloseWelcomePopup }/>

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
	const { auth } = state;
	return {
		showAuthPopup: auth.showAuthPopup,
		authPopupView: auth.authPopupView,
	};
};

export default connect(mapStateToProps)(Layout);
