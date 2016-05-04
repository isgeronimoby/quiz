import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchFixtures, fetchProfileIfNeeded } from '../flux/actions';
import FixtureList from '../components/FixtureList';


class Fixtures extends Component {

	static title = 'Fixtures';

	static propTypes = {
		fixtures: PropTypes.object.isRequired,
		fetchProfile: PropTypes.func.isRequired,
		fetchFixtures: PropTypes.func.isRequired,
	};

	componentDidMount() {
		this.props.fetchProfile();
		this.props.fetchFixtures();
	}

	render() {
		const { fixtures: { isFetching, list } } = this.props;

		if (isFetching) {
			return <div/>; // TODO: spinner
		}
		return <FixtureList list={ list }/>;
	}
}

// Connect to store
//
const mapStateToProps = (state) => {
	return {
		fixtures: state.fixtures
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		fetchProfile: () => dispatch(fetchProfileIfNeeded()), // top-level page needs profile
		fetchFixtures: () => dispatch(fetchFixtures()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Fixtures);
