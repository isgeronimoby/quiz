import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { requestAuth, postQuizBet, fetchRewards, startSharingFacebook, startSharingTwitter } from '../../flux/actions';
import QuizBet from '../QuizBet';
import BetSuccess from '../BetSuccess';
import Location from '../../lib/Location';
import '../QuizContainer/quiz.scss';


class QuizBetContainer extends Component {

	static propTypes = {
		params: PropTypes.object.isRequired,
		// from store
		isLoggedIn: PropTypes.bool.isRequired,
		points: PropTypes.number.isRequired,
		odds: PropTypes.number.isRequired,
		answers: PropTypes.array.isRequired,
		isBetting: PropTypes.bool.isRequired,
		betSuccess: PropTypes.bool.isRequired,
		betError: PropTypes.string.isRequired,
		openAuthPopup: PropTypes.func.isRequired,
		postQuizBet: PropTypes.func.isRequired,
	};

	state = {
		view: 'bet'
	};

	nextView(view) {
		this.setState({view});
	}

	submitBet(betPoints) {
		const { params: {matchId}, isLoggedIn, answers, openAuthPopup, postQuizBet } = this.props;

		if (!isLoggedIn) {
			openAuthPopup();
		} else {
			postQuizBet(matchId, betPoints, answers).then(() => {
				this.nextView('success');
			});
		}
	}

	goToExitPage() {
		Location.push({
			pathname: './exit',
		});
	}

	render() {
		const { isLoggedIn, points, odds } = this.props;
		const demoPoints = !isLoggedIn ? 10 : 0;
		const oddsList = [odds, 1];
		const { view } = this.state;
		const onSubmitBet = (betPoints) => this.submitBet(betPoints);

		let View;
		if (view === 'bet') {
			View = <QuizBet
				isLoggedIn={ isLoggedIn }
				points={ points }
				demoPoints={ demoPoints }
				odds={ oddsList }
				onSubmitBet={ onSubmitBet }/>;
		}
		else if (view === 'success') {
			View = <BetSuccess onDismiss={() => this.goToExitPage() }/>;
		}

		return (
			<div className="quiz">
				{ View }
			</div>
		);
	}
}


// Connect to store
//
const mapStateToProps = (state) => {
	const matchId = state.selectedQuiz;
	const quiz = state.quizes[matchId];
	const { answers, odds, isBetting, betSuccess, betError } = quiz || {};

	return {
		isLoggedIn: state.auth.isLoggedIn,
		points: state.profile.points,
		answers,
		odds,
		isBetting,
		betSuccess,
		betError,
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		openAuthPopup: () => dispatch(requestAuth()),
		postQuizBet: (matchId, points, answers) => dispatch(postQuizBet(matchId, points, answers)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(QuizBetContainer);
