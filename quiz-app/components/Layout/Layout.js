import React, { Component, PropTypes } from 'react';
import Header from '../Header';
import Menu from '../Menu';
import './Layout.scss';

class Layout extends Component {

	static propTypes = {
		title: PropTypes.string.isRequired,
		path: PropTypes.string.isRequired,
		children: PropTypes.element.isRequired,
	};

	state = {
		showMenu: false
	};

	toggleMenu(on) {
		this.setState({
			showMenu: on
		})
	}

	render() {
		const {title, path, children} = this.props;

		return (
			<div className="layout">
				<Header
					title={ title }
					onMenuBtnClick={ () => this.toggleMenu(true) }/>

				<Menu
					activePath={ path }
					show={ this.state.showMenu }
					onClick={ () => this.toggleMenu(false) }/>

				<div className="content">
					{ children }
				</div>
			</div>
		);
	}

}

export default Layout;
