import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { fetchProfileIfNeeded, fetchQuiz, selectQuiz, fetchOdds } from '../flux/actions';
import { Fetching } from '../components/Layout';
import QuizContainer from '../components/QuizContainer';
import QuizSummaryPlayed from '../components/QuizSummaryPlayed';


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

		fetchProfile(); // need points for bet, etc
		selectQuiz(matchId); // first select, then fetch
		fetchQuiz(matchId);
	}

	render() {
		const {
			params: { matchId, fixtureItem },
			isFetching,
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
