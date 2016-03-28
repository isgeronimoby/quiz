import React, { Component, PropTypes } from 'react';
import NavButton from './NavButton.js';
import Link from '../Link';

import './Header.scss';

class Header extends Component {
	static propTypes = {
		title: PropTypes.string.isRequired,
		onMenuBtnClick: PropTypes.func.isRequired
	};

	render() {
		return (
			<div className="header">
				<div className="header-title">
					<h2>{ this.props.title }</h2>
				</div>


				<div
					className="nav-button"
					onClick={ () => this.props.onMenuBtnClick() }>
					<img className="icon-menu" src={require('./images/menu.svg')} />
				</div>
				
				<div className="header-points">
					<img className="icon-points" src={require('./images/points.svg')} />
					220 pts
				</div>
			</div>
		);
	}

}

export default Header;
