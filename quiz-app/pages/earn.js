import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchEarnsIfNeeded, fetchProfileIfNeeded, fetchPlayedEarns } from '../flux/actions';
import { Fetching } from '../components/Layout';
import EarnContainer from '../components/EarnContainer';


class Earns extends Component {

	static title = 'Earn';

	static propTypes = {
		// from store
		isLoggedIn: PropTypes.bool.isRequired,
		earns: PropTypes.object.isRequired,
		fetchProfile: PropTypes.func.isRequired,
		fetchEarns: PropTypes.func.isRequired,
		fetchPlayedEarns: PropTypes.func.isRequired,
	};

	async componentDidMount() {
		this.props.fetchEarns();
		try {
			await this.props.fetchProfile();
			this.props.fetchPlayedEarns();
		} catch (e) {}
	}


	render() {
		const { earns: { isFetching, list } } = this.props;

		if (isFetching) {
			return <Fetching/>;
		}

		return (
			<EarnContainer earnList={ list } />
		);
	}
}

// Connect to store
//
const mapStateToProps = (state) => {
	return {
		isLoggedIn: state.auth.isLoggedIn,
		earns: state.earns,
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		fetchProfile: () => dispatch(fetchProfileIfNeeded()), // top-level page needs profile
		fetchEarns: () => dispatch(fetchEarnsIfNeeded()),
		fetchPlayedEarns: () => dispatch(fetchPlayedEarns()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Earns);
