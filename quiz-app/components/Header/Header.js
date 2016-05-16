import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Link from '../Link';
import './Header.scss';



class Header extends Component {

	static propTypes = {
		title: PropTypes.string.isRequired,
		points: PropTypes.number,
		onMenuBtnClick: PropTypes.func.isRequired,
	};

	render() {
		const { title, points, onMenuBtnClick} = this.props;
		const pointsClass = (points === null) ? 'is-hidden' : '';

		return (
			<div className="header">
				<div className="header-title">
					<h2>{ title }</h2>
				</div>

				<div className="nav-button" onClick={ onMenuBtnClick }>
					<img className="icon-menu" src={require('./images/icon-menu.svg')}/>
				</div>

				<Link className={ "header-points " + pointsClass } to="./earn">
					<img className="icon-points" src={ require('../../static/images/icon-cup.svg') }/>
					{ points }
				</Link>
			</div>
		);
	}

}

// Connect to store
//
const mapStateToProps = (state) => {
	const { profile, auth } = state;
	return {
		points: auth.isLoggedIn ? profile.points : null
	};
};

export default connect(mapStateToProps)(Header);
