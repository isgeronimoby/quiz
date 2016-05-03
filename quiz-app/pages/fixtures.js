import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchFixtures } from '../flux/actions';
import FixtureList from '../components/FixtureList';


class Fixtures extends Component {

	static title = 'Fixtures';

	static propTypes = {
		fixtures: PropTypes.object.isRequired,
		fetchFixtures: PropTypes.func.isRequired,
	};

	componentDidMount() {
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
		fetchFixtures: () => dispatch(fetchFixtures())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Fixtures);
