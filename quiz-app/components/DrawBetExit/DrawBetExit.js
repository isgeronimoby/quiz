import React, { Component, PropTypes } from 'react';
import Link from '../Link';
import { SharingPopup } from '../Popup';
import './DrawBetExit.scss';


class DrawBetExit extends Component {

	static propTypes = {
	};

	showPopup() {
		// TODO
		this.refs['sharing-popup'].show(3000);
	}

	render() {

		return (
			<div className="draw-exit" >
				<SharingPopup ref="sharing-popup" />

				<div className="big-image">
					Amazing illustration here
				</div>

				<Link className="big-btn share-btn" to="./earn">
					Earn more points
				</Link>
			</div>
		);
	}
}

export default DrawBetExit;
