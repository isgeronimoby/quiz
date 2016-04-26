import React, { Component, PropTypes } from 'react';
import Section from './Section.js';
import Logo from '../UserProfile/Logo.js';
import './leader-board.scss';


const UserListOfTop = ({ top3, onSelect }) => {
	const top3cols = top3.map((user, i) => {
		const {picture, name, answers, rank} = user;

		return (
			<div key={`top-${i}`} className="col" onClick={ () => onSelect(user) }>
				<Logo src={picture} rank={rank} />
				<div className="user-name">{ name }</div>
				<div className="user-answers">{ answers } answers</div>
			</div>
		);
	});

	return (
		<div className="user-cols-3">
			{ top3cols }
		</div>
	);
};


const UserListOfAll = ({ list, profileRank, onSelect }) => {
	const playerItems = list.map((user, i) => {
		const {picture, name, answers, rank} = user;
		const myselfClass = (rank === profileRank) ? 'myself' : '';

		return (
			<li key={`user-${i}`} className={"user-list-item " + myselfClass} onClick={ () => onSelect(user) }>
				<div className="user-rank">{ rank }</div>
				<Logo src={picture} />
				<div className="user-details">
					<div className="user-name large">{ name }</div>
					<div className="user-answers large">{ answers } answers</div>
				</div>
			</li>
		);
	});

	return (
		<ul className="user-list">
			{ playerItems }
		</ul>
	);
};



class LeaderBoard extends Component {

	static propTypes = {
		top3: PropTypes.array.isRequired,
		users: PropTypes.array.isRequired,
		onSelect: PropTypes.func.isRequired,
		profile: PropTypes.object.isRequired,
	};

	render() {
		const { top3, users, profile, onSelect} = this.props;
		const { rank } = profile;
		const rankTitle = `You are ranked ${rank}`;
		const _onSelect = (user) => onSelect(user);

		return (
			<div className="screen-content">
				<Section title="TOP players">
					<UserListOfTop top3={ top3 } onSelect={_onSelect} />
				</Section>

				<Section title={ rankTitle }>
					<UserListOfAll list={ users } profileRank={rank} onSelect={_onSelect} />
				</Section>
			</div>
		);
	}
}


export class LeaderBoardGroup extends Component {

	static propTypes = {
		top3: PropTypes.array.isRequired,
		groups: PropTypes.array.isRequired,
		onSelect: PropTypes.func.isRequired,
	};

	render() {
		const { top3, groups, onSelect} = this.props;
		const rankTitle = `You are 4 groups`;
		const _onSelect = (user) => onSelect(user);

		return (
			<div className="screen-content">
				<Section title="TOP groups">
					<UserListOfTop top3={ top3 } onSelect={_onSelect} />
				</Section>

				<Section title={ rankTitle }>
					<UserListOfAll list={ groups } profileRank="123" onSelect={_onSelect} />
				</Section>
			</div>
		);
	}
}

export default LeaderBoard;
