import React, { Component, PropTypes } from 'react';
import Section from './Section.js';
import './leader-board.scss'
const defaultPicture = require("../../static/images/user-default.png");

const Logo = (props) => {
	const { src, rank } = props;
	let medalImg;
	if (rank) {
		const medal = ['gold', 'silver', 'bronze'][rank - 1];
		const medalSrc = require(`../../static/images/rank-${medal}.png`);
		medalImg = <img className="user-medal" src={medalSrc} alt="User rank"/>;
	}
	return (
		<div className="user-logo-cont">
			<img className="user-logo" src={src} alt="User logo"/>
			{ medalImg }
		</div>
	);
};

class LeaderBoard extends Component {

	static propTypes = {
		data: PropTypes.object.isRequired,
	};

	state = {
	};

	render() {
		const { top3, rest } = this.props.data;
		const top3cols = top3.map((user, i) => {
			const {picture, name, answers, rank} = user;
			return (
				<div key={`top-${i}`} className="col">
					<Logo src={picture || defaultPicture} rank={rank} />
					<div className="user-name">{ name }</div>
					<div className="user-answers">{ answers } answers</div>
				</div>
			);
		});

		const myRank = rest.find((u) => u.myself).rank;
		const rankTitle = `You are ranked ${myRank}`;
		const playerItems = rest.map((user, i) => {
			const {picture, name, answers, rank, myself} = user;
			const myselfClass = myself ? 'myself' : '';
			return (
				<li key={`user-${i}`} className={"player-item " + myselfClass}>
					<div className="user-rank">{ rank }</div>
					<Logo src={picture || defaultPicture} />
					<div className="user-details">
						<div className="user-name large">{ name }</div>
						<div className="user-answers large">{ answers } answers</div>
					</div>
				</li>
			);
		});

		return (
			<div className="quiz">
				<Section title="TOP players">
					<div className="player-cols-3">
						{ top3cols }
					</div>
				</Section>

				<Section title={ rankTitle }>
					<ul className="player-list">
						{ playerItems }
					</ul>
				</Section>
			</div>
		);
	}
}

export default LeaderBoard;
