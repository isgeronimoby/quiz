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
				<div className="header-menu">
					<NavButton onClick={ () => this.props.onMenuBtnClick() }/>
				</div>
				<div className="header-title">
					<h2>{ this.props.title }</h2>
				</div>
				<div className="header-points">
					<h2>
						<span className="title-icon">[?]</span>
						{220}pts
					</h2>
				</div>
			</div>
		);
	}

}

export default Header;
