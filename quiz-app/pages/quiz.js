import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchFixtures, fetchQuiz, selectQuiz } from '../flux/actions';
import QuizContainer from '../components/QuizContainer';


class Quiz extends Component {

	static title = 'Match Quiz';

	static propTypes = {
		params: PropTypes.object.isRequired,
		// from store
		fetchFixtures: PropTypes.func.isRequired,
		fetchQuiz: PropTypes.func.isRequired,
		selectQuiz: PropTypes.func.isRequired,
		quiz: PropTypes.object.isRequired,
		fixtureItem: PropTypes.object.isRequired,
	};

	async componentDidMount() {
		const { params: { matchId }, fetchFixtures, fetchQuiz, selectQuiz } = this.props;

		await fetchFixtures(); // need data from list
		await fetchQuiz(matchId);
		selectQuiz(matchId);
	}

	render() {
		const { quiz: { isFetching, questionList }, fixtureItem } = this.props;

		if (isFetching) {
			return <div/>; // TODO: spinner
		}

		return (
			<QuizContainer questionList={ questionList } fixtureItem={ fixtureItem }/>
		);
	}

}

// Connect to store
//
const mapStateToProps = (state) => {
	return {
		quiz: state.quizes[state.selectedQuiz] || {isFetching: true},
		fixtureItem: state.fixtures.list.find(({ matchId }) => matchId === state.selectedQuiz) || {},
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		fetchFixtures: () => dispatch(fetchFixtures()),
		fetchQuiz: (matchId) => dispatch(fetchQuiz(matchId)),
		selectQuiz: (matchId) => dispatch(selectQuiz(matchId))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
