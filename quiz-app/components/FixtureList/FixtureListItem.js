import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import Link from '../Link';
import './FixtureList.scss';

class FixtureListItem extends Component {

	static propTypes = {
		header: PropTypes.string,
		fixtureItem: PropTypes.object.isRequired,
	};

	getItemClass({ isOpenForBetting, isWinner }) {
		if (isWinner) {
			return 'has-finished is-winner';
		} else if (!isOpenForBetting) {
			return 'has-finished';
		}
		return '';
	}

	render() {
		const { fixtureItem, header } = this.props;
		const { matchId, teamHome, teamAway, startDate, betAmount, isOpenForBetting, isEnded, isWinner, wonAmount } = fixtureItem;
		const itemClass = this.getItemClass(fixtureItem);
		const headerClass = !header ? 'is-collapsed' : '';
		const title = `${teamHome} vs ${teamAway}`;
		const timeStr = moment(startDate).format('HH:mm');
		const isPending = !isOpenForBetting && !isEnded;
		const teamHomeIcon = require(`../../static/images/team-${teamHome}.svg`);
		const teamAwayIcon = require(`../../static/images/team-${teamAway}.svg`);

		let subTitle = timeStr;
		if (isPending) {
			subTitle += ' - in progress';
		} else if (isEnded) {
			subTitle = `Finished ${ moment(startDate).fromNow() }`;
		}

		let betLabel = ''; // TODO - need wonAmount?
		if (betAmount) {
			betLabel = (
				<div className="list-label green">
					{ `You bet ${betAmount} point${betAmount > 1 ? 's' : ''}` }
				</div>
			);
		}
		let wonLabel = '';
		if (isWinner) {
			wonLabel = (
				<div className="list-label winner">You won!</div>
			)
		}

		return (
			<li className="fixture-item">
				<div className={ "fixture-item-header " + headerClass }>
					<h5>{ header }</h5>
				</div>

				<Link className={ "fixture-item-body " + itemClass } to="./quiz" query={ {matchId} }>
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
						<div className="list-label-cont">
							{ betLabel }
							{ wonLabel }
						</div>
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
