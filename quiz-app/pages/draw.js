import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchProfileIfNeeded, fetchDrawsIfNeeded, selectDraw } from '../flux/actions';
import DrawContainer from '../components/DrawContainer';


class Draw extends Component {

	static title = ' '; // set dynamically to draw title

	static propTypes = {
		params: PropTypes.object.isRequired,
		// from store
		maxPoints: PropTypes.number.isRequired,
		drawItem: PropTypes.object.isRequired,
		isBetting: PropTypes.bool.isRequired,

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
		const { params: { drawId }, maxPoints, drawItem } = this.props;

		if (drawItem.isFetching) {
			return <div/>; // TODO: spinner
		}

		return (
			<DrawContainer points={ maxPoints } drawItem={ drawItem } />
		);
	}

}

// Connect to store
//
const mapStateToProps = (state) => {
	return {
		maxPoints: state.profile.points,
		drawItem: state.draws.list.find(({ drawId }) => drawId === state.selectedDraw) || { isFetching: true },
		isBetting: false, // TODO
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
