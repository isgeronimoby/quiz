import React, { Component, PropTypes } from 'react';
import Hammer from 'react-hammerjs';
import Link from '../Link';
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

class Menu extends Component {

	static propTypes = {
		activePath: PropTypes.string,
		show: PropTypes.bool.isRequired,
		onClick: PropTypes.func.isRequired,
	};

	render() {
		const { activePath, show, ...others} = this.props;
		const hiddenClass = !show ? 'is-hidden' : '';
		const onSwipe = (e) => {
			if (e.direction === DIRECTION_LEFT) {
				this.props.onClick(); // close menu
			}
		};
		const isActiveItem = (path) => (activePath === `/${path}`);

		return (
			<Hammer onSwipe={onSwipe}>
				<div className={"menu " + hiddenClass } {...others} >
					<div className="menu-panel">

						<div className="menu-header">
							<div className="user-picture">
								<img src={require("../../static/images/user-picture.jpg")}/>
							</div>
							<div className="user-info">
								<div className="menu-user-name">Edward Snowden</div>
								<div className="user-stats">
									<div className="user-stats-points">210 Points</div>
									<div className="separator">|</div>
									<div className="user-stats-pending">110 pending</div>
								</div>
							</div>
						</div>

						<MenuItem label="Fixtures" path='fixtures' active={ isActiveItem('fixtures') } />

						<MenuItem label="Leaderboard" path='leaderboard' active={ isActiveItem('leaderboard') } />

						<MenuItem label="Earn" path='earn' active={ isActiveItem('earn') } />

						<MenuItem label="Draws" path='draws' active={ isActiveItem('draws') } />
					</div>
				</div>
			</Hammer>
		);
	}

}

export default Menu;
