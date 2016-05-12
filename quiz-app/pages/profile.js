import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Location from '../lib/Location.js';
import { fetchProfileIfNeeded, postLogout } from '../flux/actions';
import { Fetching } from '../components/Layout';
import UserProfile from '../components/UserProfile';


class Profile extends Component {

	static title = 'Profile';

	static propTypes = {
		params: PropTypes.object.isRequired,
		// from store
		profile: PropTypes.object.isRequired,
		fetchProfile: PropTypes.func.isRequired,
		postLogout: PropTypes.func.isRequired,
	};

	componentDidMount() {
		const { params: { userId }, fetchProfile } = this.props;

		// TODO - others profiles

		fetchProfile();
	}

	handleLogout() {
		this.props.postLogout().then(() => {
			Location.goBack();
		});
	}

	render() {
		const { profile: { isFetching, ...rest } } = this.props;
		const onLogout = () => this.handleLogout();

		if (isFetching) {
			return <Fetching/>;
		}

		return <UserProfile user={ rest } onLogout={ onLogout }/>;
	}
}

// Connect to store
//
const mapStateToProps = (state) => {
	return {
		profile: state.profile
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		fetchProfile: () => dispatch(fetchProfileIfNeeded()),
		postLogout: () => dispatch(postLogout()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
