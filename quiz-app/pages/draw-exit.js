import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getNextDrawItem } from '../lib/utils.js';
import { fetchDrawsIfNeeded, selectDraw } from '../flux/actions';
import { Fetching } from '../components/Layout';
import DrawBetExit from '../components/DrawBetExit';

class Exit extends Component {

	static title = 'Score Predictor';

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
			<DrawBetExit nextDrawItem={ nextDrawItem } />
		);
	}
}

// Connect to store
//
const mapStateToProps = (state) => {
	return {
		nextDrawItem: getNextDrawItem(state.draws.list, state.selectedDrawId) || {isFetching: true},
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		fetchDraws: () => dispatch(fetchDrawsIfNeeded()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Exit);

