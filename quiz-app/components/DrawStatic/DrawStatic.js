import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import Link from '../Link';
import SectionCollapsible from '../SectionCollapsible';
import './DrawStatic.scss';


class DrawStatic extends Component {

	static propTypes = {
		drawItem: PropTypes.object.isRequired,
		children: PropTypes.any.isRequired,
	};

	render() {
		const { drawItem: {prizeTitle, prizeImageUrl, prizeDescription, endDate}, children } = this.props;
		const titleDateEnded = `Finished ${ moment.utc(endDate).fromNow() }`;
		const dateFormatted = moment.utc(endDate).format('YYYY/MM');

		return (
			<div className="draw-content draw-static">
				<div className="draw-details">
					<div className="draw-details-image">
						<img src={ prizeImageUrl }/>
					</div>
					<div className="draw-details-content">
						<h3 className="list-meta as-header">{ titleDateEnded }</h3>
						<h3 className="list-title">{ prizeTitle }</h3>
						<h5 className="list-meta">{ dateFormatted }</h5>
					</div>
					<div className="draw-details-label orange">You won!</div>
				</div>

				<SectionCollapsible>
					<div className="bet-description">{ prizeDescription }</div>
				</SectionCollapsible>

				{ children }

				<Link className="big-btn share-btn" to="./earn">Earn more points</Link>
			</div>
		);
	}
}

export default DrawStatic;
