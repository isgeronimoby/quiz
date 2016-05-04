import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { selectUserProfile, fetchUserProfileIfNeeded } from '../flux/actions';
import UserProfile from '../components/UserProfile';


class Profile extends Component {

	static title = 'Profile';

	static propTypes = {
		params: PropTypes.object.isRequired,
		// from store
		fetchUserProfile: PropTypes.func.isRequired,
		selectUserProfile: PropTypes.func.isRequired,
		userProfile: PropTypes.object.isRequired,
	};

	componentDidMount() {
		const { params: { userId }, fetchUserProfile, selectUserProfile } = this.props;

		// TODO - my vs others profiles

		fetchUserProfile(userId).then(() => {
			selectUserProfile(userId);
		});
	}

	render() {
		const { user: { isFetching, user } } = this.props;

		if (isFetching) {
			return <div/>; // TODO: spinner
		}
		return <UserProfile user={ user }/>;
	}
}

// Connect to store
//
const mapStateToProps = (state) => {
	return {
		userProfile: state.userProfiles[state.selectedUserProfile] || {isFetching: true}
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		selectUserProfile: (userId) => dispatch(selectUserProfile(userId)),
		fetchUserProfile: (userId) => dispatch(fetchUserProfileIfNeeded(userId))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
