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
					<a className="menu-item" href="/fixtures" onClick={Link.handleClick}>
						<h3>Fixtures</h3>
					</a>
					<a className="menu-item" href="/" onClick={Link.handleClick}>
						<h3>Leaderboard</h3>
					</a>
					<a className="menu-item" href="/" onClick={Link.handleClick}>
						<h3>Earn</h3>
					</a>
					<a className="menu-item" href="/" onClick={Link.handleClick}>
						<h3>Draws</h3>
					</a>
				</div>
			</div>
		);
	}

}

export default Menu;
