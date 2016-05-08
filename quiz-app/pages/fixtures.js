import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchFixturesIfNeeded, fetchProfileIfNeeded, fetchPlayedFixtures } from '../flux/actions';
import FixtureList from '../components/FixtureList';


class Fixtures extends Component {

	static title = 'Fixtures';

	static propTypes = {
		fixtures: PropTypes.object.isRequired,
		isLoggedIn: PropTypes.bool.isRequired,
		fetchProfile: PropTypes.func.isRequired,
		fetchFixtures: PropTypes.func.isRequired,
		fetchPlayedFixtures: PropTypes.func.isRequired,
	};

	async componentDidMount() {
		this.props.fetchFixtures();
		await this.props.fetchProfile();
		this.props.fetchPlayedFixtures();
	}

	componentWillReceiveProps({isLoggedIn}) {
		const authorized = !this.props.isLoggedIn && isLoggedIn;
		if (authorized) {
			this.props.fetchPlayedFixtures();
		}
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
		fixtures: state.fixtures,
		isLoggedIn: state.auth.isLoggedIn,
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		fetchProfile: () => dispatch(fetchProfileIfNeeded()), // top-level page needs profile
		fetchFixtures: () => dispatch(fetchFixturesIfNeeded()),
		fetchPlayedFixtures: () => dispatch(fetchPlayedFixtures()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Fixtures);
