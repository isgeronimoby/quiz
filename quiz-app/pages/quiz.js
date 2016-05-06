import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchProfileIfNeeded, fetchFixtures, fetchQuiz, selectQuiz, fetchOdds } from '../flux/actions';
import QuizContainer from '../components/QuizContainer';


class Quiz extends Component {

	static title = 'Match Quiz';

	static propTypes = {
		params: PropTypes.object.isRequired,
		// from store
		fixtureItem: PropTypes.object.isRequired,
		isFetching: PropTypes.bool.isRequired,
		questionList: PropTypes.array.isRequired,
		isValidating: PropTypes.bool.isRequired,
		odds: PropTypes.number.isRequired,
		invalidOutcomes: PropTypes.array.isRequired,

		fetchProfile: PropTypes.func.isRequired,
		fetchFixtures: PropTypes.func.isRequired,
		fetchQuiz: PropTypes.func.isRequired,
		selectQuiz: PropTypes.func.isRequired,
		fetchOdds: PropTypes.func.isRequired,
	};

	async componentDidMount() {
		const { params: { matchId }, fetchProfile, fetchFixtures, fetchQuiz, selectQuiz } = this.props;

		fetchProfile(); // need points for bet
		await fetchFixtures(); // need data from list
		await fetchQuiz(matchId);
		selectQuiz(matchId);
	}

	render() {
		const {
			params: { matchId },
			fixtureItem, isFetching, questionList, isValidating, odds, invalidOutcomes, fetchOdds
			} = this.props;
		const _fetchOdds = (answers) => fetchOdds(matchId, answers);

		if (isFetching) {
			return <div/>; // TODO: spinner
		}

		return (
			<QuizContainer
				matchId={ matchId }
				questionList={ questionList }
				fixtureItem={ fixtureItem }
				isValidating={ isValidating }
				odds={ odds }
				invalidOutcomes={ invalidOutcomes}
				fetchOdds={ _fetchOdds }
			/>
		);
	}

}

// Connect to store
//
const mapStateToProps = (state) => {
	const quiz = state.quizes[state.selectedQuiz];
	const {
		isFetching = true,
		questionList = [],
		isValidating = true,
		odds = 0,
		invalidOutcomes = []
		} = quiz || {};
	const fixtureItem = state.fixtures.list.find(({ matchId }) => matchId === state.selectedQuiz) || {};

	return {
		fixtureItem,
		isFetching,
		questionList,
		odds,
		isValidating,
		invalidOutcomes,
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		fetchProfile: () => dispatch(fetchProfileIfNeeded()),
		fetchFixtures: () => dispatch(fetchFixtures()),
		fetchQuiz: (matchId) => dispatch(fetchQuiz(matchId)),
		selectQuiz: (matchId) => dispatch(selectQuiz(matchId)),
		fetchOdds: (matchId, answer) => dispatch(fetchOdds(matchId, answer)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
