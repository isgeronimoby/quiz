import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchDrawsIfNeeded, fetchProfileIfNeeded, fetchPlayedDraws } from '../flux/actions';
import { Fetching } from '../components/Layout';
import DrawList from '../components/DrawList';


class Draws extends Component {

	static title = 'Draws';

	static propTypes = {
		draws: PropTypes.object.isRequired,
		isLoggedIn: PropTypes.bool.isRequired,
		fetchProfile: PropTypes.func.isRequired,
		fetchDraws: PropTypes.func.isRequired,
		fetchPlayedDraws: PropTypes.func.isRequired,
	};

	async componentDidMount() {
		this.props.fetchDraws();
		await this.props.fetchProfile();
		this.props.fetchPlayedDraws();
	}

	componentWillReceiveProps({isLoggedIn}) {
		const authorized = !this.props.isLoggedIn && isLoggedIn;
		if (authorized) {
			this.props.fetchPlayedDraws();
		}
	}

	render() {

		const { draws: { isFetching, list } } = this.props;

		if (isFetching) {
			return <Fetching/>;
		}
		return <DrawList list={ list }/>;
	}
}

// Connect to store
//
const mapStateToProps = (state) => {
	return {
		draws: state.draws,
		isLoggedIn: state.auth.isLoggedIn,
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		fetchProfile: () => dispatch(fetchProfileIfNeeded()), // top-level page needs profile
		fetchDraws: () => dispatch(fetchDrawsIfNeeded()),
		fetchPlayedDraws: () => dispatch(fetchPlayedDraws()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Draws);
