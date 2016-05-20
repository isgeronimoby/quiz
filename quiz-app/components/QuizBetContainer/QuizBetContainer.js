import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { requestAuth, postQuizBet, fetchRewards, startSharingFacebook, startSharingTwitter } from '../../flux/actions';
import { Fetching } from '../Layout';
import QuizBet from '../QuizBet';
import BetSuccess from '../BetSuccess';
import Location from '../../lib/Location';
import '../QuizContainer/quiz.scss';

function goToQuizPage(matchId) {
	Location.push({pathname: './quiz', query: {matchId}});
}

function goToExitPage() {
	Location.push({pathname: './bet-exit',});
}


class QuizBetContainer extends Component {

	static propTypes = {
		params: PropTypes.object.isRequired,
		// from store
		isLoggedIn: PropTypes.bool.isRequired,
		points: PropTypes.number.isRequired,
		quizData: PropTypes.object.isRequired,
		openAuthPopup: PropTypes.func.isRequired,
		postQuizBet: PropTypes.func.isRequired,
	};

	state = {
		view: 'bet'
	};

	componentWillMount() {
		const { params: {matchId}, quizData: { answers } } = this.props;

		// Redirect back to quiz if no data in store (page refresh scenario is not supported)
		if (!answers) {
			goToQuizPage(matchId);
		}
	}

	nextView(view) {
		this.setState({view});
	}

	submitBet(betPoints) {
		const {
			params: {matchId},
			isLoggedIn,
			quizData: { answers },
			openAuthPopup,
			postQuizBet
			} = this.props;

		if (!isLoggedIn) {
			openAuthPopup();
		} else {
			postQuizBet(matchId, betPoints, answers).then(() => {
				this.nextView('success');
			});
		}
	}

	render() {
		const { params: {matchId}, isLoggedIn, points, quizData: { odds, betError, answers } } = this.props;
		const demoPoints = !isLoggedIn ? 10 : 0;
		const oddsList = [odds, 1];
		const { view } = this.state;
		const onSubmitBet = (betPoints) => this.submitBet(betPoints);
		const onDismissSuccess = () => goToExitPage();

		if (!answers) {
			return <Fetching />;
		}

		let View;
		if (view === 'bet') {
			View = <QuizBet
				matchId={ matchId }
				isLoggedIn={ isLoggedIn }
				points={ points }
				demoPoints={ demoPoints }
				odds={ oddsList }
				betError={ betError }
				onSubmitBet={ onSubmitBet }/>;
		}
		else if (view === 'success') {
			View = <BetSuccess onDismiss={ onDismissSuccess }/>;
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
	const matchId = state.selectedMatchId;
	const quizData = state.quizes[matchId] || {};

	return {
		isLoggedIn: state.auth.isLoggedIn,
		points: state.profile.points,
		quizData,
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		openAuthPopup: () => dispatch(requestAuth()),
		postQuizBet: (matchId, points, answers) => dispatch(postQuizBet(matchId, points, answers)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(QuizBetContainer);
