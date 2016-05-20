import React, { Component, PropTypes } from 'react';
import Link from '../Link';
import './DrawBetExit.scss';


class DrawBetExit extends Component {

	static propTypes = {
		nextDrawItem: PropTypes.object.isRequired
	};

	render() {
		const { drawId, prizeImageUrl } = this.props.nextDrawItem;

		return (
			<div className="draw-exit">
				<Link className="big-image" to="./draw" query={ {drawId} }>
					<img src={ prizeImageUrl }/>
				</Link>

				<Link className="big-btn share-btn" to="./earn">
					Earn more points
				</Link>
			</div>
		);
	}
}

export default DrawBetExit;
