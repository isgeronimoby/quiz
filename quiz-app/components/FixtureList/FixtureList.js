import React, { Component, PropTypes } from 'react';
import Link from '../Link';
import './FixtureList.scss';

const data = [];

class FixtureList extends Component {

	render() {
		return (
			<ul className="fixture-list">
				<li className="fixture-group-head">28 APRIL - Champions League</li>
				<li className="fixture-group-item">
					<div className="fixture-item-icons"></div>
					<div className="fixture-item-content">
						<h3 className="list-title">Everton vs Chelsea</h3>
						<h5 className="list-meta">19:00. 3rd Tour, London</h5>
						<div className="badge">+32 friends</div>
					</div>
					<div className="fixture-item-arrow"></div>
				</li>
				<li className="fixture-group-item last">
					<div className="fixture-item-icons"></div>
					<div className="fixture-item-content">
						<h3 className="list-title">Everton vs Chelsea</h3>
						<h5 className="list-meta">19:00. 3rd Tour, London</h5>
						<div className="badge">+32 friends</div>
					</div>
					<div className="fixture-item-arrow"></div>
				</li>
				<li className="fixture-group-head">28 APRIL - Champions League</li>
				<li className="fixture-group-item">
					<div className="fixture-item-icons"></div>
					<div className="fixture-item-content">
						<h3 className="list-title">Everton vs Chelsea</h3>
						<h5 className="list-meta">19:00. 3rd Tour, London</h5>
						<div className="badge">+32 friends</div>
					</div>
					<div className="fixture-item-arrow"></div>
				</li>
			</ul>
		);
	}

}

export default FixtureList;
