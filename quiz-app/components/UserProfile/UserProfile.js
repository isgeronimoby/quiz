import React, { Component, PropTypes } from 'react';
import Link from '../Link';
import Logo from './Logo.js';
import './UserProfile.scss';


class UserProfile extends Component {

	static propTypes = {
		user: PropTypes.object.isRequired,
	};
	static contextTypes = {
		updateHeader: PropTypes.func.isRequired,
	};

	componentDidMount() {
		this.context.updateHeader({
			hasBack: true,
			hasLogout: true,
		});
	}

	render() {
		const { user: { name, imageUrl, points, pendingPoints } } = this.props;

		return (
			<div className="user-profile">
				<div className="profile-summary">
					<div className="summary-aside">
						<img className="aside-icon" src={require('./images/icon-badge-sm.svg')} alt=""/>
						<h4 className="aside-title">Badges</h4>
						<h5 className="aside-text">coming soon</h5>
					</div>

					<div className="summary-center">
						<Logo src={imageUrl}/>
						<div className="user-name">{ name }</div>
					</div>

					<div className="summary-aside">
						<img className="aside-icon" src={require('./images/icon-points-sm.svg')} alt=""/>
						<h4 className="aside-title">{ points } points</h4>
						<h5 className="aside-text">+{ pendingPoints } pending</h5>
					</div>
				</div>

				<h1 className="todo-title">Coming soon:</h1>

				<ul className="todo-list">
					<li>
						<div className="todo-image">
							<img className="big-icon" src={require('./images/icon-ranks.svg')} alt=""/>
						</div>
						<h3>Top Ranking</h3>
					</li>
					<li>
						<div className="todo-image">
							<img className="big-icon" src={require('./images/icon-badges.svg')} alt=""/>
						</div>
						<h3>Badges</h3>
					</li>
					<li>
						<div className="todo-image">
							<img className="big-icon" src={require('./images/icon-groups.svg')} alt=""/>
						</div>
						<h3>Badges</h3>
					</li>
					<li>
						<h2>And much more...</h2>
					</li>
				</ul>
			</div>
		);
	}
}

export default UserProfile;
