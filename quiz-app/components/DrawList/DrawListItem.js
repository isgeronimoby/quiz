import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import Link from '../Link';
import './DrawList.scss';

const STATE_UNFINISHED = 'STATE_UNFINISHED';
const STATE_UNFINISHED_HAS_BET = 'STATE_UNFINISHED_HAS_BET';
const STATE_FINISHED_WAITING_WINNER = 'STATE_FINISHED_WAITING_WINNER';
const STATE_FINISHED_NO_WINNER = 'STATE_FINISHED_NO_WINNER';
const STATE_FINISHED_HAS_WINNER = 'STATE_FINISHED_HAS_WINNER';
const STATE_FINISHED_HAS_WINNER_USER = 'STATE_FINISHED_HAS_WINNER_USER';


function dateFormat(str) {
	const formatted = moment.utc(str).fromNow();
	const ended = formatted.indexOf('ago') > -1;
	const prefix = ended ? 'ended' : 'ends';
	return `${prefix} ${formatted}`;
}

class DrawListItem extends Component {

	static propTypes = {
		data: PropTypes.object.isRequired,
		profile: PropTypes.object.isRequired,
	};

	getItemState(subTitle, betAmount, isWinner) {
		const { userId } = this.props.profile;
		const { isDrawn, winner } = this.props.data;
		const isFinished = subTitle.indexOf('ended') >= 0;

		if (!isFinished) {
			if (betAmount) {
				return STATE_UNFINISHED_HAS_BET;
			} else {
				return STATE_UNFINISHED;
			}
		}
		else {
			if (!isDrawn) {
				return STATE_FINISHED_WAITING_WINNER;
			} else if (!winner) {
				return STATE_FINISHED_NO_WINNER;
			} else if (isWinner) {
				return STATE_FINISHED_HAS_WINNER_USER;
			} else {
				return STATE_FINISHED_HAS_WINNER;
			}
		}
	}

	getItemClass(itemState) {
		switch (itemState) {
			case STATE_UNFINISHED_HAS_BET:
				return 'has-bet';
			case STATE_FINISHED_NO_WINNER:
			case STATE_FINISHED_HAS_WINNER:
				return 'has-finished';
			case STATE_FINISHED_WAITING_WINNER:
				return 'has-finished waiting-winner';
			case STATE_FINISHED_HAS_WINNER_USER:
				return 'has-finished is-winner';
			case STATE_UNFINISHED:
			default:
				return '';
		}
	}

	render() {
		const { drawId, endDate, prizeTitle, prizeImageUrl, betAmount, winner, isWinner } = this.props.data;
		const subTitle = dateFormat(endDate);
		const itemState = this.getItemState(subTitle, betAmount, isWinner);
		const itemClasses = this.getItemClass(itemState);
		const betLabelText = `You bet ${betAmount} point${betAmount > 1 ? 's' : ''}`;
		const userWinnerImg = require('../../static/images/user-winner.svg');

		let winnerImg = '';
		if (winner) {
			winnerImg = (
				<div className="draw-item-winner-image">
					<img src={ isWinner ? userWinnerImg : winner.ImageUrl }/>
				</div>
			);
		}
		let betLabel = '';
		if (betAmount) {
			betLabel = (
				<div className="list-label green">{ betLabelText }</div>
			)
		}
		let wonLabel = '';
		if (isWinner) {
			betLabel = '';
			wonLabel = (
				<div className="list-label winner">You won!</div>
			);
		}

		return (
			<li className="draw-item">
				<Link className={"draw-item-body " + itemClasses} to="./draw" state={ {drawId} }>
					<div className="draw-item-aside">
						<div className="draw-item-image">
							<img src={ prizeImageUrl }/>
						</div>
						{ winnerImg }
					</div>
					<div className="draw-item-content">
						<h3 className="list-title">{ prizeTitle }</h3>
						<h5 className="list-meta">{ subTitle }</h5>
						{ betLabel }
						{ wonLabel }
					</div>
					<div className="list-item-arrow">
						<img src={ require('../../static/images/arrow-right-grey.svg') }/>
					</div>
				</Link>
			</li>
		);
	}

}

export default DrawListItem;
