import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { selectUser, fetchUserIfNeeded } from '../flux/actions';
import UserProfile from '../components/UserProfile';


class Profile extends Component {

	static title = 'Profile';

	static propTypes = {
		params: PropTypes.object.isRequired,
		// from store
		fetchUser: PropTypes.func.isRequired,
		selectUser: PropTypes.func.isRequired,
		user: PropTypes.object.isRequired,
	};

	componentDidMount() {
		const { params: { userId }, fetchUser, selectUser } = this.props;

		fetchUser(userId).then(() => {
			selectUser(userId);
		});
	}

	render() {
		const { user: { isFetching, payload } } = this.props;

		if (isFetching) {
			return <div/>; // TODO: spinner
		}
		return <UserProfile user={ payload }/>;
	}
}

// Connect to store
//
const mapStateToProps = (state) => {
	return {
		user: state.users[state.selectedUser] || {isFetching: true}
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		selectUser: (userId) => dispatch(selectUser(userId)),
		fetchUser: (userId) => dispatch(fetchUserIfNeeded(userId))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
