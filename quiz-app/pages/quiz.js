import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import Location from '../lib/Location';
import { fetchProfileIfNeeded, fetchFixturesIfNeeded, fetchPlayedFixtures, fetchQuiz, selectQuiz, fetchOdds } from '../flux/actions';
import { Fetching } from '../components/Layout';
import withWelcome from '../components/withWelcome';
import QuizContainer from '../components/QuizContainer';
import QuizSummaryPlayed from '../components/QuizSummaryPlayed';

function goToFixturesPage() {
	Location.push({pathname: './fixtures'});
}


class Quiz extends Component {

	static title = 'Match Quiz';

	static propTypes = {
		params: PropTypes.object.isRequired,
		// from store
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

		// Url copy-paste is not supported
		if (!params || !params.matchId) {
			goToFixturesPage();
		}
	}

	async componentDidMount() {
		const { params: { matchId }, fetchProfile, fetchFixtures, fetchPlayedFixtures, fetchQuiz, selectQuiz } = this.props;

		selectQuiz(matchId); // first select, then fetch
		fetchQuiz(matchId);
		fetchFixtures(); // for fixtureItem
		try {
			fetchProfile(); // need points for bet, etc
			await fetchPlayedFixtures(); // for fixtureItem
		} catch (e) {
			//nothing
		}
	}

	render() {
		const {
			params: { matchId },
			isFetching,
			fixtureItem,
			questionData: { startDate, teamHome, teamAway, questionList} = {},
			isValidating,
			odds,
			invalidOutcomes,
			fetchOdds
			} = this.props;
		const info = moment.utc(startDate).format('D MMMM, HH:mm');
		const { betAmount, answers, isWinner } = fixtureItem;
		const isPlayed = !!betAmount;
		const _fetchOdds = (answers) => fetchOdds(matchId, answers);

		if (isFetching) {
			return <Fetching/>;
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
					answers={ answers }
					odds={ odds }
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
	const quiz = state.quizes[state.selectedQuiz] || {isFetching: true};
	const fixtureItem = state.fixtures.list.find(f => f.matchId === state.selectedQuiz) || {};

	return {
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
