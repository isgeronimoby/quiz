import React, { Component, PropTypes } from 'react';
import './Header.scss';

class NavButton extends Component {
	static propTypes = {
		onClick: PropTypes.func.isRequired,
	};

	render() {
		return (
			<div className="nav-button" {...this.props}>
				
			</div>
		);
	}
}

export default NavButton;
