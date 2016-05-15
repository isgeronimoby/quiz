import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { requestAuth, postDrawBet, postDrawClaim } from '../../flux/actions';
import DrawWinner from '../DrawWinner';
import DrawClaimPrize from '../DrawClaimPrize';
import DrawStatic from '../DrawStatic';
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
		nextDrawItem: PropTypes.object.isRequired,
		// from store
		isLoggedIn: PropTypes.bool.isRequired,
		points: PropTypes.number.isRequired,
		openAuthPopup: PropTypes.func.isRequired,
		postDrawBet: PropTypes.func.isRequired,
		postDrawClaim: PropTypes.func.isRequired,
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

	submitClaim(formData) {
		const { drawItem: { drawId }, postDrawClaim } = this.props;

		postDrawClaim(drawId, formData)
			.then(() => {
				this.nextView('success');
			})
			.catch(() => {});
	}

	render() {
		const { isLoggedIn, points, drawItem, nextDrawItem, betError } = this.props;
		const { view } = this.state;
		const { prizeTitle, isDrawn, winner, isWinner, needToClaim } = drawItem;
		const title = (view !== 'exit') ? prizeTitle : nextDrawItem.prizeTitle;
		const demoPoints = !isLoggedIn ? 10 : 0;
		const onBetSubmit = (betPoints) => this.submitBet(betPoints);
		const onClaimSubmit = (formData) => this.submitClaim(formData);
		const onSuccessDismiss = () => this.nextView('exit');

		let View;
		if (view === 'bet') {
			if (!isDrawn) {
				View = (
					<DrawBet
						points={ points }
						demoPoints={ demoPoints }
						drawItem={ drawItem }
						betError={ betError }
						onSubmit={ onBetSubmit }/>
				);
			} else if (!winner) {
				View = (
					<DrawStatic drawItem={ drawItem } withLabel={false}>
						<h2 className="draw-claim-title">Nobody played this Draw</h2>
						<h4 className="draw-claim-subtitle">Prize will be played again after some time</h4>
					</DrawStatic>
				);
			} else if (!isWinner) {
				View = <DrawWinner drawItem={ drawItem }/>;
			} else if (needToClaim) {
				View = <DrawClaimPrize drawItem={ drawItem } onSubmit={ onClaimSubmit }/>;
			} else {
				View = (
					<DrawStatic drawItem={ drawItem } withLabel={true}>
						<h2 className="draw-claim-title">We'll contact you in 2 days</h2>
						<h4 className="draw-claim-subtitle">Prize will arrive to you in 1 month</h4>
					</DrawStatic>
				);
			}
		}
		else if (view === 'success') {
			View = <BetSuccess onDismiss={ onSuccessDismiss }/>;
		}
		else if (view === 'exit') {
			View = <DrawBetExit nextDrawItem={ nextDrawItem } />
		}

		return (
			<div className="screen">
				<HeaderOverlay title={ title }/>
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
		postDrawClaim: (drawId, formData) => dispatch(postDrawClaim(drawId, formData)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(DrawContainer);
