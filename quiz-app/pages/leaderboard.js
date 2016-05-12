import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchUserList } from '../flux/actions';
import { Fetching } from '../components/Layout';
import LeaderBoardContainer from '../components/LeaderBoardContainer';


class Leaders extends Component {

	static title = 'Leaderboard';

	static propTypes = {
		userList: PropTypes.object.isRequired,
		fetchUserList: PropTypes.func.isRequired,
	};

	componentDidMount() {
		this.props.fetchUserList();
	}

	render() {
		const { userList: { isFetching, list } } = this.props;

		if (isFetching) {
			return <Fetching/>;
		}
		return (
			<LeaderBoardContainer list={ list }/>
		);
	}

}

// Connect to store
//
const mapStateToProps = (state) => {
	return {
		userList: state.userList
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		fetchUserList: () => dispatch(fetchUserList())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Leaders);
