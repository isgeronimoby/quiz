import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import './Header.scss';



class Header extends Component {

	static propTypes = {
		isLoggedIn: PropTypes.bool.isRequired,
		title: PropTypes.string.isRequired,
		points: PropTypes.number.isRequired,
		onMenuBtnClick: PropTypes.func.isRequired,
	};

	render() {
		const { isLoggedIn, title, points, onMenuBtnClick} = this.props;
		const pointsClass = isLoggedIn ? '' : 'is-hidden';

		return (
			<div className="header">
				<div className="header-title">
					<h2>{ title }</h2>
				</div>

				<div className="nav-button" onClick={ onMenuBtnClick }>
					<img className="icon-menu" src={require('./images/icon-menu.svg')}/>
				</div>

				<div className={ "header-points " + pointsClass }>
					<img className="icon-points" src={ require('../../static/images/icon-cup.svg') }/>
					{ points }
				</div>
			</div>
		);
	}

}

// Connect to store
//
const mapStateToProps = (state) => {
	const { points, isLoggedIn } = state.profile;
	return {
		points,
		isLoggedIn
	};
};

export default connect(mapStateToProps)(Header);
