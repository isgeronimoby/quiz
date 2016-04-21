import React, { Component, PropTypes } from 'react';
import Section from './Section.js';
import './leader-board.scss'
const defaultPicture = require("../../static/images/user-default.png");


// TODO - to common?
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


const UserListOfTop = ({ listOf3, onSelect }) => {
	const top3cols = listOf3.map((user, i) => {
		const {picture, name, answers, rank} = user;
		return (
			<div key={`top-${i}`} className="col" onClick={ () => onSelect(user) }>
				<Logo src={picture || defaultPicture} rank={rank} />
				<div className="user-name">{ name }</div>
				<div className="user-answers">{ answers } answers</div>
			</div>
		);
	});

	return (
		<div className="player-cols-3">
			{ top3cols }
		</div>
	);
};


const UserListOfAll = ({ list, onSelect }) => {
	const playerItems = list.map((user, i) => {
		const {picture, name, answers, rank, myself} = user;
		const myselfClass = myself ? 'myself' : '';
		return (
			<li key={`user-${i}`} className={"player-item " + myselfClass} onClick={ () => onSelect(user) }>
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
		<ul className="player-list">
			{ playerItems }
		</ul>
	);
};


class LeaderBoard extends Component {

	static propTypes = {
		users: PropTypes.object.isRequired,
		onSelect: PropTypes.func.isRequired,
	};

	state = {
	};

	render() {
		const { users: { top3, rest }, onSelect} = this.props;
		const myRank = rest.find((u) => u.myself).rank;
		const rankTitle = `You are ranked ${myRank}`;
		const _onSelect = (user) => onSelect(user);

		return (
			<div className="screen-content">
				<Section title="TOP players">
					<UserListOfTop listOf3={ top3 } onSelect={_onSelect} />
				</Section>

				<Section title={ rankTitle }>
					<UserListOfAll list={ rest } onSelect={_onSelect} />
				</Section>
			</div>
		);
	}
}

export default LeaderBoard;
