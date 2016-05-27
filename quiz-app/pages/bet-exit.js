import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getLatestStartedDrawItem } from '../lib/utils.js';
import { fetchDrawsIfNeeded } from '../flux/actions';
import { Fetching } from '../components/Layout';
import QuizBetExit from '../components/QuizBetExit';


class BetExit extends Component {

	static title = 'Score Predictor';

	static propTypes = {
		// from store
		latestDrawItem: PropTypes.object.isRequired,
		fetchDraws: PropTypes.func.isRequired,
	};

	componentDidMount() {
		this.props.fetchDraws(); // need to get nextDrawItem
	}

	render() {
		const { latestDrawItem } = this.props;

		if (latestDrawItem.isFetching) {
			return <Fetching/>;
		}

		return (
			<QuizBetExit latestDrawItem={ latestDrawItem }/>
		);
	}
}


// Connect to store
//
const mapStateToProps = (state) => {
	return {
		latestDrawItem: getLatestStartedDrawItem(state.draws.list) || {isFetching: true},
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		fetchDraws: () => dispatch(fetchDrawsIfNeeded()),
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(BetExit);

