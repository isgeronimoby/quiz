import React, { Component, PropTypes } from 'react';
import './Header.scss';

class NavButton extends Component {
	static propTypes = {
		onClick: PropTypes.func.isRequired,
	};

	render() {
		return (
			<div className="nav-button" {...this.props}>
				<span className="dash top"></span>
				<span className="dash middle"></span>
				<span className="dash bottom"></span>
			</div>
		);
	}
}

export default NavButton;
