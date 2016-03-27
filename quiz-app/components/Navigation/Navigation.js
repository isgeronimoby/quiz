import React, { Component } from 'react';
import './Navigation.scss';
import Link from '../Link';

export default class extends Component {

	render() {
		return (
			<ul className="navigation" role="menu">
				<li className="navigation-item">
					<a className="navigation-link" href="/" onClick={Link.handleClick}>Home</a>
				</li>
				<li className="navigation-item">
					<a className="navigation-link" href="/about" onClick={Link.handleClick}>About</a>
				</li>
			</ul>
		);
	}

}
