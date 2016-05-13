import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchDrawsIfNeeded, fetchProfileIfNeeded, fetchPlayedDraws } from '../flux/actions';
import { Fetching } from '../components/Layout';
import DrawList from '../components/DrawList';


class Draws extends Component {

	static title = 'Draws';

	static propTypes = {
		isLoggedIn: PropTypes.bool.isRequired,
		draws: PropTypes.object.isRequired,
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
		const loginOrLogout = this.props.isLoggedIn !== isLoggedIn;
		if (loginOrLogout) {
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
		isLoggedIn: state.auth.isLoggedIn,
		draws: state.draws,
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
