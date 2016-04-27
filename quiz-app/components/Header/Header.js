import React, { Component, PropTypes } from 'react';
import './Header.scss';


class Header extends Component {

	static propTypes = {
		title: PropTypes.string.isRequired,
		points: PropTypes.number.isRequired,
		onMenuBtnClick: PropTypes.func.isRequired,
	};

	render() {
		const { title, points, onMenuBtnClick} = this.props;

		return (
			<div className="header">
				<div className="header-title">
					<h2>{ title }</h2>
				</div>

				<div className="nav-button" onClick={ onMenuBtnClick }>
					<img className="icon-menu" src={require('./images/icon-menu.svg')}/>
				</div>

				<div className="header-points">
					<img className="icon-points" src={require('../../static/images/icon-cup.svg')}/>
					{ points }
				</div>
			</div>
		);
	}

}

export default Header;
