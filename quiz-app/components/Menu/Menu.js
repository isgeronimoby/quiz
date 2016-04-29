import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
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
	const { picture, name, points, pendingPoints, userId } = profile;


	return (
		<Link className="menu-header" to="./profile" state={{ userId }}>
			<div className="user-picture">
				<img src={picture}/>
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
		<div className="menu-header menu-login">
			<Button className="hollow-btn" onClick={ () => onClick('login') }>LogIn</Button>
			<div className="or-small">or</div>
			<Button className="hollow-btn lite" onClick={ () => onClick('signup') }>SignUp</Button>
		</div>
	);
};


class Menu extends Component {

	static propTypes = {
		activePath: PropTypes.string,
		show: PropTypes.bool.isRequired,
		onClick: PropTypes.func.isRequired,
		// from store
		profile: PropTypes.object.isRequired,
	};

	static contextTypes = {
		openAuthPopup: React.PropTypes.func
	};

	render() {
		const { activePath, show, profile, ...others} = this.props;
		const { isLoggedIn } = profile;
		const hiddenClass = !show ? 'is-hidden' : '';
		const onSwipe = (e) => {
			if (e.direction === DIRECTION_LEFT) {
				this.props.onClick(); // close menu
			}
		};
		const isActiveItem = (path) => (activePath === `/${path}`);
		const onAuthClick = (view) => this.context.openAuthPopup(undefined, view);

		let profileHeaderMaybe = <AuthHeader onClick={ onAuthClick }/>;
		if (isLoggedIn) {
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
	return {
		profile: state.profile
	};
};

const MenuSmart = connect(
	mapStateToProps
)(Menu);


export default MenuSmart;
