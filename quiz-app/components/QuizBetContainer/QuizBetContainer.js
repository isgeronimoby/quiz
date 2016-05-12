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
		fetchRewards: PropTypes.func.isRequired,
		startSharingFacebook: PropTypes.func.isRequired,
		startSharingTwitter: PropTypes.func.isRequired,

	};

	state = {
		view: 'bet'
	};

	componentDidMount() {
		this.props.fetchRewards();
	}

	componentWillReceiveProps({points}) {
		const pointsDiff = points - this.props.points;
		// TODO -show popup if we got new points
	}

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

	submitShare(name) {
		const {startSharingFacebook, startSharingTwitter} = this.props;

		if (name === 'facebook') {
			startSharingFacebook();
		} else if (name === 'twitter') {
			startSharingTwitter();
		}
	}

	goToExitPage() {
		Location.push({
			pathname: './exit',
		});
	}

	render() {
		const { isLoggedIn, points, odds, rewards } = this.props;
		const demoPoints = !isLoggedIn ? 10 : 0;
		const oddsList = [odds, 1];
		const { view } = this.state;
		const onSubmitBet = (betPoints) => this.submitBet(betPoints);
		const onSubmitShare = (name) => this.submitShare(name);

		let View;
		if (view === 'bet') {
			View = <QuizBet
				points={ points }
				demoPoints={ demoPoints }
				odds={ oddsList }
				rewards={ rewards }
				onSubmitBet={ onSubmitBet }
				onSubmitShare={ onSubmitShare }/>;
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
		rewards: state.rewards.map
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		openAuthPopup: () => dispatch(requestAuth()),
		postQuizBet: (matchId, points, answers) => dispatch(postQuizBet(matchId, points, answers)),
		fetchRewards: () => dispatch(fetchRewards()),
		startSharingFacebook: () => dispatch(startSharingFacebook()),
		startSharingTwitter: () => dispatch(startSharingTwitter()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(QuizBetContainer);
