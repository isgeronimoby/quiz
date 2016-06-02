import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Header from '../Header';
import Menu from '../Menu';
import AuthPopup from '../AuthPopup';
import WelcomePopup from '../WelcomePopup';
import './Layout.scss';


export const Fetching = () => {
	return (
		<div className="fetching">
			<div className="loader"></div>
		</div>
	);
};


class Layout extends Component {

	static propTypes = {
		title: PropTypes.string.isRequired,
		path: PropTypes.string.isRequired,
		showAuthPopup: PropTypes.bool.isRequired,
		authPopupView: PropTypes.string.isRequired,
		showWelcomePopup: PropTypes.bool.isRequired,
		children: PropTypes.element.isRequired,
	};

	static childContextTypes = {
		updateHeader: PropTypes.func.isRequired,
	};

	getChildContext() {
		return {
			updateHeader: (opts) => this.updateHeader(opts)
		}
	}

	state = {
		showMenu: false,
		header: {
			title: '',
			hasBack: false,
			hasLogout: false,
		},
	};

	componentWillReceiveProps({ path, title }) {
		const hasNavigated = this.props.path !== path;
		if (hasNavigated) {
			this.updateHeader({title}); // reset all updates on navigate
		}
	}

	toggleMenu(on) {
		this.setState({
			showMenu: on
		});
	}

	updateHeader({ title = '', hasBack = false, hasLogout = false}) {
		this.setState({
			header: {
				title,
				hasBack,
				hasLogout
			}
		});
	}

	render() {
		const {title: pageTitle, path, showAuthPopup, authPopupView, showWelcomePopup, children} = this.props;
		const { showMenu, header: { title: stateTitle, hasBack, hasLogout } } = this.state;
		const contentClass = (path === '/partners') ? 'safari-scroll-fix' : '';

		return (
			<div className="layout">
				<Header
					title={ stateTitle || pageTitle }
					hasBack={ hasBack }
					hasLogout={ hasLogout }
					onMenuBtnClick={ () => this.toggleMenu(true) }/>

				<Menu
					activePath={ path }
					show={ showMenu }
					onClick={ () => this.toggleMenu(false) }/>

				<AuthPopup show={ showAuthPopup }
					view={ authPopupView }/>

				<WelcomePopup show={ showWelcomePopup }/>

				<div className={"content " + contentClass}>
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
