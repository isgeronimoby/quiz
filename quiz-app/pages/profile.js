import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Location from '../lib/Location.js';
import { fetchProfileIfNeeded } from '../flux/actions';
import { Fetching } from '../components/Layout';
import UserProfile from '../components/UserProfile';


class Profile extends Component {

	static title = 'Profile';

	static propTypes = {
		// from store
		profile: PropTypes.object.isRequired,
		fetchProfile: PropTypes.func.isRequired,
	};

	componentDidMount() {
		const { fetchProfile } = this.props;
		fetchProfile();
	}

	render() {
		const { profile: { isFetching, ...rest } } = this.props;

		if (isFetching) {
			return <Fetching/>;
		}

		return <UserProfile user={ rest } />;
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
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
