import React, { Component, PropTypes } from 'react';
import Header from '../Header';
import Menu from '../Menu';
import './Layout.scss';

class Layout extends Component {

	static propTypes = {
		title: PropTypes.string.isRequired,
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
		return (
			<div className="layout">
				<Header
					title={ this.props.title }
					onMenuBtnClick={ () => this.toggleMenu(true) }/>

				<Menu
					show={ this.state.showMenu }
					onClick={ () => this.toggleMenu(false) }/>

				{ this.props.children }
			</div>
		);
	}

}

export default Layout;
