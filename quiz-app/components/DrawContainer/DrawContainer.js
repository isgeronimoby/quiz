import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { requestAuth, postDrawBet } from '../../flux/actions';
import DrawBet from '../DrawBet';
import BetSuccess from '../BetSuccess'; // TODO - rename
import DrawBetExit from '../DrawBetExit';
import '../Header/Header.scss';

const HeaderOverlay = ({ title }) => {
	return (
		<div className="header header-overlay">
			<div className="header-title">
				<h2>{ title }</h2>
			</div>
		</div>
	);
};

class DrawContainer extends Component {

	static propTypes = {
		drawItem: PropTypes.object.isRequired,
		// from store
		isLoggedIn: PropTypes.bool.isRequired,
		points: PropTypes.number.isRequired,
		openAuthPopup: PropTypes.func.isRequired,
		postDrawBet: PropTypes.func.isRequired,
		betError: PropTypes.string,
	};

	state = {
		view: 'bet'
	};

	nextView(view) {
		this.setState({view});
	}

	submitBet(betPoints) {
		const { drawItem: { drawId }, isLoggedIn, openAuthPopup, postDrawBet } = this.props;

		if (!isLoggedIn) {
			openAuthPopup();
		} else {
			postDrawBet(drawId, betPoints)
				.then(() => {
					this.nextView('success');
				})
				.catch(() => {});
		}
	}


	render() {
		const { isLoggedIn, points, drawItem, betError } = this.props;
		const demoPoints = !isLoggedIn ? 10 : 0;
		const { view } = this.state;
		const onBetSubmit = (betPoints) => this.submitBet(betPoints);
		const onSuccessDissmiss = () => this.nextView('exit');

		let View;
		if (view === 'bet') {
			View = <DrawBet points={ points } demoPoints={ demoPoints } drawItem={ drawItem } betError={ betError } onSubmit={ onBetSubmit }/>;
		}
		else if (view === 'success') {
			View = <BetSuccess onDismiss={ onSuccessDissmiss }/>;
		}
		else if (view === 'exit') {
			View = <DrawBetExit />
		}

		return (
			<div className="screen">
				<HeaderOverlay title={ drawItem.prizeTitle }/>
				{ View }
			</div>
		);
	}
}


// Connect to store
//
const mapStateToProps = (state) => {
	return {
		isLoggedIn: state.auth.isLoggedIn,
		points: state.profile.points,
		betError: state.draws.betError,
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		openAuthPopup: () => dispatch(requestAuth()),
		postDrawBet: (drawId, points) => dispatch(postDrawBet(drawId, points)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(DrawContainer);
