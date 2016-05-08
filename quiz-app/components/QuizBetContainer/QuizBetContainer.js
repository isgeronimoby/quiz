import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { requestAuth, postQuizBet } from '../../flux/actions';
import QuizBet from '../QuizBet';
import BetSuccess from '../BetSuccess';
import Location from '../../lib/Location';

import '../QuizContainer/quiz.scss';


class QuizBetContainer extends Component {

	static propTypes = {
		params: PropTypes.object.isRequired,
		// from store
		isLoggedIn: PropTypes.bool.isRequired,
		maxPoints: PropTypes.number.isRequired,
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
		const { maxPoints, odds } = this.props;
		const oddsList = [odds, 1];
		const { view } = this.state;
		const onSubmit = (betPoints) => this.submitBet(betPoints);

		let View;
		if (view === 'bet') {
			View = <QuizBet points={maxPoints} odds={oddsList} onSubmit={ onSubmit }/>;
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
const mapStateToProps = (state, ownProps) => {
	const matchId = state.selectedQuiz;
	const quiz = state.quizes[matchId];
	const { answers, odds, isBetting, betSuccess, betError } = quiz || {};

	return {
		isLoggedIn: state.auth.isLoggedIn,
		maxPoints: state.profile.points,
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
