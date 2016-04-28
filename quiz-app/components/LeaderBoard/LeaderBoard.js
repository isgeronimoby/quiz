import React, { Component, PropTypes } from 'react';
import Section from './Section.js';
import Link from '../Link';
import Logo from '../UserProfile/Logo.js';
import './leader-board.scss';


const UserListOfTop = ({ top3 }) => {
	const top3cols = top3.map((user, i) => {
		const {userId, picture, name, answers, rank} = user;

		return (
			<Link key={`top-${i}`} className="col" to="./profile" state={ {userId} }>
				<Logo src={ picture } rank={ rank }/>
				<div className="user-name">{ name }</div>
				<div className="user-answers">{ answers } answers</div>
			</Link>
		);
	});

	return (
		<div className="user-cols-3">
			{ top3cols }
		</div>
	);
};


const UserListOfAll = ({ list, profileRank }) => {
	const playerItems = list.map((user, i) => {
		const {userId, picture, name, answers, rank} = user;
		const myselfClass = (rank === profileRank) ? 'myself' : '';

		return (
			<Link key={`user-${i}`} className={"user-list-item " + myselfClass} to="./profile" state={ {userId} }>
				<div className="user-rank">{ rank }</div>
				<Logo src={picture}/>
				<div className="user-details">
					<div className="user-name large">{ name }</div>
					<div className="user-answers large">{ answers } answers</div>
				</div>
			</Link>
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
		profile: PropTypes.object.isRequired,
	};

	render() {
		const { top3, users, profile: {rank} } = this.props;
		const rankTitle = `You are ranked ${rank}`;

		return (
			<div className="screen-content">
				<Section title="TOP players">
					<UserListOfTop top3={ top3 }/>
				</Section>

				<Section title={ rankTitle }>
					<UserListOfAll list={ users } profileRank={rank}/>
				</Section>
			</div>
		);
	}
}


export class LeaderBoardGroup extends Component {

	static propTypes = {
		top3: PropTypes.array.isRequired,
		groups: PropTypes.array.isRequired
	};

	render() {
		const { top3, groups } = this.props;
		const rankTitle = `You are in 4 groups`;

		return (
			<div className="screen-content">
				<Section title="TOP groups">
					<UserListOfTop top3={ top3 }/>
				</Section>

				<Section title={ rankTitle }>
					<UserListOfAll list={ groups } profileRank="123"/>
				</Section>
			</div>
		);
	}
}

export default LeaderBoard;
