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
					<Link className="menu-item" to="/fixtures">
						<h3>Fixtures</h3>
					</Link>
					<Link className="menu-item" to="/">
						<h3>Leaderboard</h3>
					</Link>
					<Link className="menu-item" to="/">
						<h3>Earn</h3>
					</Link>
					<Link className="menu-item" to="/">
						<h3>Earn</h3>
					</Link>
				</div>
			</div>
		);
	}

}

export default Menu;
