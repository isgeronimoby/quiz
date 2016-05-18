import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getNextDrawItem } from '../lib/utils.js';
import { fetchDrawsIfNeeded, selectDraw } from '../flux/actions';
import { Fetching } from '../components/Layout';
import QuizBetExit from '../components/QuizBetExit';

class Exit extends Component {

	static title = 'Match Quiz';

	static propTypes = {
		// from store
		nextDrawItem: PropTypes.object.isRequired,
		fetchDraws: PropTypes.func.isRequired,
	};

	componentDidMount() {
		this.props.fetchDraws(); // need to get nextDrawItem
	}

	render() {
		const { nextDrawItem } = this.props;

		if (nextDrawItem.isFetching) {
			return <Fetching/>;
		}

		return (
			<QuizBetExit nextDrawItem={ nextDrawItem }/>
		);
	}
}

// Connect to store
//
const mapStateToProps = (state) => {
	return {
		nextDrawItem: getNextDrawItem(state.draws.list) || {isFetching: true},
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		fetchDraws: () => dispatch(fetchDrawsIfNeeded()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Exit);

