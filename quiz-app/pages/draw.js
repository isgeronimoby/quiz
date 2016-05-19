import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchProfileIfNeeded, fetchDrawsIfNeeded, selectDraw } from '../flux/actions';
import { Fetching } from '../components/Layout';
import DrawContainer from '../components/DrawContainer';


class Draw extends Component {

	static title = ' '; // set dynamically to draw title

	static propTypes = {
		params: PropTypes.object.isRequired,
		// from store
		drawItem: PropTypes.object.isRequired,
		fetchProfile: PropTypes.func.isRequired,
		fetchDraws: PropTypes.func.isRequired,
		selectDraw: PropTypes.func.isRequired,
	};

	async componentDidMount() {
		const { params: { drawId }, fetchProfile, fetchDraws, selectDraw } = this.props;

		fetchProfile(); // need points for bet
		await fetchDraws(); // have data in list only
		selectDraw(drawId);
	}

	render() {
		const { drawItem } = this.props;

		if (drawItem.isFetching) {
			return <Fetching/>;
		}

		return (
			<DrawContainer drawItem={ drawItem }/>
		);
	}

}

// Connect to store
//
const mapStateToProps = (state) => {
	const selectedDrawItem = state.draws.list.find(({ drawId }) => drawId === state.selectedDraw);
	return {
		drawItem: selectedDrawItem || {isFetching: true},
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		fetchProfile: () => dispatch(fetchProfileIfNeeded()),
		fetchDraws: () => dispatch(fetchDrawsIfNeeded()),
		selectDraw: (matchId) => dispatch(selectDraw(matchId)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Draw);
