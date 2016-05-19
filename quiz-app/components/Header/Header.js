import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { postLogout } from '../../flux/actions';
import Location from '../../lib/Location';
import Link from '../Link';
import './Header.scss';


class Header extends Component {

	static propTypes = {
		title: PropTypes.string.isRequired,
		hasBack: PropTypes.bool.isRequired,
		hasLogout: PropTypes.bool.isRequired,
		onMenuBtnClick: PropTypes.func.isRequired,
		// From store
		points: PropTypes.number,
	};

	handleLogout() {
		this.props.postLogout().then(() => {
			Location.push({pathname: './fixtures'});
		});
	}

	renderLeftBtn() {
		const { onMenuBtnClick, hasBack} = this.props;
		const menuBtn = (
			<div className="nav-button" onClick={ onMenuBtnClick }>
				<img className="icon-menu" src={require('./images/icon-menu.svg')}/>
			</div>
		);
		const backBtn = (
			<Link className="nav-button back" goBack={true}>
				<img src={ require('../../static/images/arrow-left-white.svg') }/> Back
			</Link>
		);

		return hasBack ? backBtn : menuBtn;
	}

	renderRightBtn() {
		const { points, hasLogout } = this.props;
		const pointsClass = (points === null) ? 'is-hidden' : '';
		const onLogout = () => this.handleLogout();
		const ptsBtn = (
			<Link className={ "header-points " + pointsClass } to="./earn">
				<img className="icon-points" src={ require('../../static/images/icon-cup.svg') }/>
				{ points }
			</Link>
		);
		const logoutBtn = (
			<div className="nav-button logout" onClick={ onLogout }>
				Logout
			</div>
		);

		return hasLogout ? logoutBtn : ptsBtn;
	}

	render() {
		const { title } = this.props;

		return (
			<div className="header">
				{ this.renderLeftBtn() }

				<div className="header-title">
					<h2>{ title }</h2>
				</div>

				{ this.renderRightBtn() }
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
const mapDispatchToProps = (dispatch) => {
	return {
		postLogout: () => dispatch(postLogout()),
	};
};


export default connect(mapStateToProps, mapDispatchToProps)(Header);
