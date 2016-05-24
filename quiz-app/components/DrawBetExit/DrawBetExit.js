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
				<div className="big-image-panel">
					<div className="big-image">
						<img src={ prizeImageUrl }/>
					</div>

					<Link className="big-btn money-btn" to="./draw" query={ {drawId} }>
						Enter next draw
					</Link>
				</div>

				<Link className="big-btn share-btn" to="./earn">
					Earn more points
				</Link>
			</div>
		);
	}
}

export default DrawBetExit;
