import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchProfileIfNeeded, fetchQuiz, selectQuiz, fetchOdds } from '../flux/actions';
import QuizContainer from '../components/QuizContainer';


class Quiz extends Component {

	static title = 'Match Quiz';

	static propTypes = {
		params: PropTypes.object.isRequired,
		// from store
		isFetching: PropTypes.bool.isRequired,
		questionData: PropTypes.object,
		isValidating: PropTypes.bool,
		odds: PropTypes.number,
		invalidOutcomes: PropTypes.array,

		fetchProfile: PropTypes.func.isRequired,
		fetchQuiz: PropTypes.func.isRequired,
		selectQuiz: PropTypes.func.isRequired,
		fetchOdds: PropTypes.func.isRequired,
	};

	async componentDidMount() {
		const { params: { matchId }, fetchProfile, fetchQuiz, selectQuiz } = this.props;

		fetchProfile(); // need points for bet
		selectQuiz(matchId); // first select, then fetch
		fetchQuiz(matchId);
	}

	render() {
		const {
			params: { matchId },
			isFetching,
			questionData: { startDate, teamHome, teamAway, questionList} = {},
			isValidating,
			odds,
			invalidOutcomes,
			fetchOdds
			} = this.props;
		const _fetchOdds = (answers) => fetchOdds(matchId, answers);

		if (isFetching) {
			return <div/>; // TODO: spinner
		}

		return (
			<QuizContainer
				key={`match-${matchId}`}
				matchId={ matchId }
				startDate={ startDate }
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
	return state.quizes[state.selectedQuiz] || {isFetching: true};
};
const mapDispatchToProps = (dispatch) => {
	return {
		fetchProfile: () => dispatch(fetchProfileIfNeeded()),
		fetchQuiz: (matchId) => dispatch(fetchQuiz(matchId)),
		selectQuiz: (matchId) => dispatch(selectQuiz(matchId)),
		fetchOdds: (matchId, answer) => dispatch(fetchOdds(matchId, answer)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
