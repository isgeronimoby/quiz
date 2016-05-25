import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchFixturesIfNeeded, fetchPlayedFixtures } from '../flux/actions';
import withWelcome from '../components/withWelcome';
import { Fetching } from '../components/Layout';
import Location from '../lib/Location';

const MIN_DELAY = 2000;

function goToQuizPage(matchId) {
	Location.push({pathname: './quiz', query: {matchId}});
}

function goToFixturesPage() {
	Location.push({pathname: './fixtures',});
}

class Index extends Component {

	static title = 'Score Predictor';

	static propTypes = {
		// from store
		fixtureList: PropTypes.array.isRequired,
		fetchFixtures: PropTypes.func.isRequired,
		fetchPlayedFixtures: PropTypes.func.isRequired,
	};

	async componentDidMount() {
		const { fetchFixtures, fetchPlayedFixtures } = this.props;

		try {
			fetchFixtures();
			await fetchPlayedFixtures(); // need to know which quizes are played
		} catch (e) {
			//nothing
		}
		setTimeout(() => this.visitFirstPlayableQuizOrList(), MIN_DELAY);
	}

	visitFirstPlayableQuizOrList() {
		const firstNotPlayedQuiz = this.props.fixtureList.find(({ isOpenForBetting, betAmount }) => isOpenForBetting && !betAmount);

		if (firstNotPlayedQuiz) {
			goToQuizPage(firstNotPlayedQuiz.matchId);
		} else {
			goToFixturesPage();
		}
	}

	render() {
		return (
			<Fetching/>
		);
	}
}

// Connect to store
//
const mapStateToProps = (state) => {
	return {
		fixtureList: state.fixtures.list,
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		fetchFixtures: () => dispatch(fetchFixturesIfNeeded()),
		fetchPlayedFixtures: () => dispatch(fetchPlayedFixtures()),
	};
};

export default withWelcome(connect(mapStateToProps, mapDispatchToProps)(Index));

