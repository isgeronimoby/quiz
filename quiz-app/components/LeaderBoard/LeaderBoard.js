import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Section from './Section.js';
import Link from '../Link';
import Logo from '../UserProfile/Logo.js';
import './leader-board.scss';


class LeaderBoard extends Component {

	static propTypes = {
		top3: PropTypes.array.isRequired,
		users: PropTypes.array.isRequired,
		//from store
		profile: PropTypes.object.isRequired,
	};

	render() {
		const { top3, users, profile: {userId: profileUserId} } = this.props;
		const myUser = users.find(({ userId }) => userId === profileUserId);
		const rankTitle = myUser ? `You are ranked ${myUser.rank}` : '';
		const top3cols = top3.map((user, i) => {
			const {userId, imageUrl, name, points, rank } = user;

			return (
				<div key={`top-user-${i}`} className="col">
					<Logo src={ imageUrl } rank={ rank }/>
					<div className="user-name">{ name }</div>
					<div className="user-points">{ points } points</div>
				</div>
			);
		});
		const playerItems = users.map((user, i) => {
			const { userId, imageUrl, name, points, rank } = user;

			return (
				<div key={`user-${i}`} className={"user-list-item"}>
					<div className="user-rank">{ rank }</div>
					<Logo src={imageUrl}/>
					<div className="user-details">
						<div className="user-name large">{ name }</div>
						<div className="user-points large">{ points } points</div>
					</div>
				</div>
			);
		});

		return (
			<div className="screen-content">
				<Section title="TOP players">
					<div className="user-cols-3">
						{ top3cols }
					</div>
				</Section>

				<Section title={ rankTitle }>
					<ul className="user-list">
						{ playerItems }
					</ul>
				</Section>
			</div>
		);
	}
}

// Connect to store
//
const mapStateToProps = (state) => {
	return {
		profile: state.profile
	};
};

export default connect(mapStateToProps)(LeaderBoard);

