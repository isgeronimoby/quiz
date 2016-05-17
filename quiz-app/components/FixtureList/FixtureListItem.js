import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import Link from '../Link';
import './FixtureList.scss';

class FixtureListItem extends Component {

	static propTypes = {
		header: PropTypes.string,
		fixtureItem: PropTypes.object.isRequired,
	};


	render() {
		const { fixtureItem } = this.props;
		const { matchId, teamHome, teamAway, startDate, betAmount } = fixtureItem;
		const { header } = this.props;
		const headerClass = !header ? 'is-collapsed' : '';
		const title = `${teamHome} vs ${teamAway}`;
		const subTitle = moment.utc(startDate).format('HH:mm');
		const teamHomeIcon = require(`../../static/images/team-${teamHome}.svg`);
		const teamAwayIcon = require(`../../static/images/team-${teamAway}.svg`);
		const betLabelText = `You bet ${betAmount} point${betAmount > 1 ? 's' : ''}`;

		let betLabel = '';
		if (betAmount) {
			betLabel = (
				<div className="list-label green">{ betLabelText }</div>
			)
		}

		return (
			<li className="fixture-item">
				<div className={ "fixture-item-header " + headerClass }>
					<h5>{ header }</h5>
				</div>
				<Link className="fixture-item-body" to="./quiz" state={ {matchId, fixtureItem} }>
					<div className="fixture-item-team-icons">
						<div className="fixture-item-team">
							<img src={ teamHomeIcon }/>
						</div>
						<div className="fixture-item-team fixture-item-team-overlap">
							<img src={ teamAwayIcon }/>
						</div>
					</div>
					<div className="fixture-item-content">
						<h3 className="list-title">{ title }</h3>
						<h5 className="list-meta">{ subTitle }</h5>
						{ betLabel }
					</div>
					<div className="list-item-arrow">
						<img src={require('../../static/images/arrow-right-grey.svg')}/>
					</div>
				</Link>
			</li>
		);
	}

}

export default FixtureListItem;
