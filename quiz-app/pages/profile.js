import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { selectProfile, fetchProfileIfNeeded } from '../flux/actions';
import UserProfile from '../components/UserProfile';


class Profile extends Component {

	static title = 'Profile';

	static propTypes = {
		params: PropTypes.object.isRequired,
		// from store
		fetchProfile: PropTypes.func.isRequired,
		selectProfile: PropTypes.func.isRequired,
		profile: PropTypes.object.isRequired,
	};

	componentDidMount() {
		const { params: { userId }, fetchProfile, selectProfile } = this.props;

		fetchProfile(userId).then(() => {
			selectProfile(userId);
		});
	}

	render() {
		const { profile: { isFetching, payload } } = this.props;

		if (isFetching) {
			return <div/>; // TODO: spinner
		}
		return <UserProfile user={ payload }/>;
	}
}


const mapStateToProps = (state) => {
	return {
		profile: state.profiles[state.selectedProfile] || {isFetching: true}
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		selectProfile: (userId) => dispatch(selectProfile(userId)),
		fetchProfile: (userId) => dispatch(fetchProfileIfNeeded(userId))
	};
};

const ProfileSmart = connect(
	mapStateToProps,
	mapDispatchToProps
)(Profile);


export default ProfileSmart;
