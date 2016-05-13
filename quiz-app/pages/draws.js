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
		profile: PropTypes.object.isRequired,
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

		const { draws: { isFetching, list }, profile } = this.props;

		if (isFetching) {
			return <Fetching/>;
		}
		return <DrawList list={ list } profile={ profile }/>;
	}
}

// Connect to store
//
const mapStateToProps = (state) => {
	return {
		isLoggedIn: state.auth.isLoggedIn,
		draws: state.draws,
		profile: state.profile,
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
