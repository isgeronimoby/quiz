import React, { Component, PropTypes } from 'react';
import Link from '../Link';
import './Menu.scss';

class Menu extends Component {

	static propTypes = {
		show: PropTypes.bool.isRequired,
		onClick: PropTypes.func.isRequired,
	};

	render() {
		const { show, ...others} = this.props;
		const hiddenClass = !show ? 'is-hidden' : '';

		return (
			<div className={"menu " + hiddenClass } {...others} >
				<div className="menu-panel">
					<div className="menu-header"></div>
					<Link className="menu-item menu-item-fixtures" to="/fixtures">
						<div className="icon-menu-item">
							<img src={require('./images/icon-fixtures.svg')} />
						</div>
						<h3>Fixtures</h3>
					</Link>
					<Link className="menu-item menu-item-leaderboard" to="/">
						<div className="icon-menu-item">
							<img src={require('./images/icon-leaderboard.svg')} />
						</div>
						<h3>Leaderboard</h3>
					</Link>
					<Link className="menu-item menu-item-earn" to="/">
						<div className="icon-menu-item">
							<img src={require('../../static/images/icon-cup.svg')} />
						</div>
						<h3>Earn</h3>
					</Link>
					<Link className="menu-item menu-item-draws" to="/">
						<div className="icon-menu-item">
							<img src={require('./images/icon-draws.svg')} />
						</div>
						<h3>Draws</h3>
					</Link>
				</div>
			</div>
		);
	}

}

export default Menu;
