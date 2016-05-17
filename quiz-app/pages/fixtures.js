import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchFixturesIfNeeded, fetchProfileIfNeeded, fetchPlayedFixtures } from '../flux/actions';
import { Fetching } from '../components/Layout';
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
		const { fetchFixtures, fetchProfile, fetchPlayedFixtures } = this.props;
		try {
			fetchFixtures();
			await fetchProfile();
			fetchPlayedFixtures();
		} catch (e) {
			//nothing
		}
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
			return <Fetching/>;
		}

		if (list.length === 0) {
			return <div className="text-regular text-center">No items</div>; // TODO - design
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
