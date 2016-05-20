import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { requestAuth } from '../../flux/actions';
import Hammer from 'react-hammerjs';
import Link from '../Link';
import Button from '../Button';
import './Menu.scss';

const DIRECTION_LEFT = 2; //from Hammer


const MenuItem = (props) => {
	const { label, path, active } = props;
	const path2icon = (path) => {
		if (path === 'earn') {
			return require('../../static/images/icon-cup.svg');
		}
		return require(`./images/icon-${path}.svg`);
	};

	return (
		<Link className={`menu-item menu-item-${path} ${active ? 'active' : ''}`} to={`./${path}`}>
			<div className="icon-menu-item">
				<img src={ path2icon(path) }/>
			</div>
			<h3>{ label }</h3>
		</Link>
	)
};


const ProfileHeader = ({ profile }) => {
	const { name, imageUrl, points, pendingPoints } = profile;


	return (
		<Link className="menu-header" to="./profile">
			<div className="user-picture">
				<img src={imageUrl}/>
			</div>
			<div className="user-info">
				<div className="menu-user-name">{ name }</div>
				<div className="user-stats">
					<div className="user-stats-points">{ points } Points</div>
					<div className="separator">|</div>
					<div className="user-stats-pending">{ pendingPoints } pending</div>
				</div>
			</div>
		</Link>
	);
};


const AuthHeader = ({ onClick }) => {
	return (
		<div className="menu-header menu-login" onClick={ onClick }>
			<div className="icon-menu-item">
				<img src={ require('./images/icon-not-loggedin.svg') }/>
			</div>
			<h3 className="">LogIn</h3>
		</div>
	);
};


class Menu extends Component {

	static propTypes = {
		activePath: PropTypes.string,
		show: PropTypes.bool.isRequired,
		onClick: PropTypes.func.isRequired,
		// from store
		profile: PropTypes.object,
		openAuthPopup: PropTypes.func.isRequired
	};

	render() {
		const { activePath, show, profile, openAuthPopup, ...others} = this.props;
		const hiddenClass = !show ? 'is-hidden' : '';
		const onSwipe = (e) => {
			if (e.direction === DIRECTION_LEFT) {
				this.props.onClick(); // close menu
			}
		};
		const isActiveItem = (path) => (activePath === `/${path}`);
		const onAuthClick = () => openAuthPopup('login');

		let profileHeaderMaybe = <AuthHeader onClick={ onAuthClick }/>;
		if (profile !== null) {
			profileHeaderMaybe = <ProfileHeader profile={profile}/>;
		}

		return (
			<Hammer onSwipe={onSwipe}>
				<div className={"menu " + hiddenClass } {...others} >
					<div className="menu-panel">

						{profileHeaderMaybe}

						<MenuItem label="Fixtures" path='fixtures' active={ isActiveItem('fixtures') }/>

						<MenuItem label="Leaderboard" path='leaderboard' active={ isActiveItem('leaderboard') }/>

						<MenuItem label="Earn" path='earn' active={ isActiveItem('earn') }/>

						<MenuItem label="Draws" path='draws' active={ isActiveItem('draws') }/>
					</div>
				</div>
			</Hammer>
		);
	}
}


// Connect to store
//
const mapStateToProps = (state) => {
	const { profile, auth } = state;
	return {
		profile: auth.isLoggedIn ? profile : null
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		openAuthPopup: (view) => dispatch(requestAuth(view)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
