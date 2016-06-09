import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import Location from '../lib/Location';
import { fetchProfileIfNeeded, fetchFixturesIfNeeded, fetchPlayedFixtures, fetchQuiz, selectQuiz, fetchOdds } from '../flux/actions';
import { Fetching } from '../components/Layout';
import withWelcome from '../components/withWelcome';
import QuizContainer from '../components/QuizContainer';
import QuizSummaryPlayed from '../components/QuizSummaryPlayed';
import QuizSummaryNotPlayed from '../components/QuizSummaryNotPlayed';

function goToFixturesPage() {
	Location.push({pathname: './fixtures'});
}


class Quiz extends Component {

	static title = 'Score Predictor';

	static propTypes = {
		params: PropTypes.object.isRequired,
		// from store
		isLoggedIn: PropTypes.bool.isRequired,
		isFetching: PropTypes.bool.isRequired,
		fixtureItem: PropTypes.object,
		questionData: PropTypes.object,
		isValidating: PropTypes.bool,
		odds: PropTypes.number,
		invalidOutcomes: PropTypes.array,

		fetchProfile: PropTypes.func.isRequired,
		fetchFixtures: PropTypes.func.isRequired,
		fetchPlayedFixtures: PropTypes.func.isRequired,
		fetchQuiz: PropTypes.func.isRequired,
		selectQuiz: PropTypes.func.isRequired,
		fetchOdds: PropTypes.func.isRequired,
	};

	componentWillMount() {
		const { params } = this.props;

		// Url without matchId is not supported
		if (!params || !params.matchId) {
			goToFixturesPage();
		}
	}

	async componentDidMount() {
		const { params: { matchId }, fetchFixtures, fetchQuiz, selectQuiz } = this.props;

		selectQuiz(matchId); // first select, then fetch
		fetchQuiz(matchId);
		fetchFixtures(); // for fixtureItem
		this.fetchPrivateData();
	}

	componentWillReceiveProps({ isLoggedIn }) {
		const { isLoggedIn: wasLoggedIn } = this.props;
		const justAuthorized = !wasLoggedIn && isLoggedIn;
		if (justAuthorized) {
			this.fetchPrivateData()
		}
	}

	fetchPrivateData() {
		const { fetchProfile, fetchPlayedFixtures } = this.props;
		try {
			fetchProfile(); // need points for bet, etc
			fetchPlayedFixtures(); // for fixtureItem
		} catch (e) {
			//nothing
		}
	}

	render() {
		const {
			params: { matchId },
			isFetching,
			fixtureItem,
			questionData: { startDate, teamHome, teamAway, isOpenForBetting, isEnded, maxWonOdds, maxWonPoints, questionList} = {},
			isValidating,
			odds,
			invalidOutcomes,
			fetchOdds
			} = this.props;
		const info = moment(startDate).format('D MMMM, HH:mm');
		const { betAmount, answers, isWinner } = fixtureItem;
		const isPlayed = !!betAmount;
		const _fetchOdds = (answers) => fetchOdds(matchId, answers);

		if (isFetching) {
			return <Fetching/>;
		}

		if (!isOpenForBetting && !isPlayed) {
			return (
				<QuizSummaryNotPlayed
					matchId={ matchId }
					info={ info }
					teamNames={ [teamHome, teamAway] }
					questionList={ questionList }
					maxWonOdds={ maxWonOdds }
					maxWonPoints={ maxWonPoints }
				/>
			);
		}

		if (isPlayed) {
			return (
				<QuizSummaryPlayed
					matchId={ matchId }
					info={ info }
					teamNames={ [teamHome, teamAway] }
					questionList={ questionList }
					betAmount={ betAmount }
					isWinner={ isWinner }
					isEnded={ isEnded }
					answers={ answers }
					odds={ odds }
					maxWonOdds={ maxWonOdds }
					maxWonPoints={ maxWonPoints }
					fetchOdds={ _fetchOdds }
				/>
			);
		}

		return (
			<QuizContainer
				key={`match-${matchId}`}
				matchId={ matchId }
				info={ info }
				teamNames={ [teamHome, teamAway] }
				questionList={ questionList }
				isValidating={ isValidating }
				odds={ odds }
				invalidOutcomes={ invalidOutcomes }
				fetchOdds={ _fetchOdds }
			/>
		);
	}

}

// Connect to store
//
const mapStateToProps = (state) => {
	const quiz = state.quizes[state.selectedMatchId] || {isFetching: true};
	const fixtureItem = state.fixtures.list.find(f => f.matchId === state.selectedMatchId) || {};

	return {
		isLoggedIn: state.auth.isLoggedIn,
		...quiz,
		fixtureItem,
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		fetchProfile: () => dispatch(fetchProfileIfNeeded()),
		fetchFixtures: () => dispatch(fetchFixturesIfNeeded()),
		fetchPlayedFixtures: () => dispatch(fetchPlayedFixtures()),
		fetchQuiz: (matchId) => dispatch(fetchQuiz(matchId)),
		selectQuiz: (matchId) => dispatch(selectQuiz(matchId)),
		fetchOdds: (matchId, answer) => dispatch(fetchOdds(matchId, answer)),
	};
};

export default withWelcome(connect(mapStateToProps, mapDispatchToProps)(Quiz));
