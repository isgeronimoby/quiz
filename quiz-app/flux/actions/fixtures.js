import fetch from '../../lib/fetch.js';

export const FETCH_FIXTURES = 'FETCH_FIXTURES';
export const FETCH_FIXTURES_SUCCESS = 'FETCH_FIXTURES_SUCCESS';
export const FETCH_FIXTURES_ERROR = 'FETCH_FIXTURES_ERROR';

export const FETCH_PLAYED_FIXTURES = 'FETCH_PLAYED_FIXTURES';
export const FETCH_PLAYED_FIXTURES_SUCCESS = 'FETCH_PLAYED_FIXTURES_SUCCESS';
export const FETCH_PLAYED_FIXTURES_ERROR = 'FETCH_PLAYED_FIXTURES_ERROR';

/*
 All fixtures
 */
function fetchFixturesStart() {
	return {
		type: FETCH_FIXTURES
	};
}

function fetchFixturesSuccess(json) {
	return {
		type: FETCH_FIXTURES_SUCCESS,
		payload: json.Fixtures.map(({
			MatchId: matchId,
			StartDate: startDate,
			HomeTeam: teamHome,
			AwayTeam: teamAway,
			IsOpenForBetting: isOpenForBetting,
			IsEnded: isEnded
			}) => {
			return {
				matchId,
				startDate,
				teamHome,
				teamAway,
				isOpenForBetting,
				isEnded
			}
		}),
		receivedAt: Date.now()
	};
}

function fetchFixturesError(error) {
	return {
		type: FETCH_FIXTURES_ERROR,
		error
	};
}

function fetchFixtures() {
	return (dispatch) => {
		dispatch(fetchFixturesStart());

		return fetch({
			endpoint: 'matchquiz/getfixtures'
		}).then((json) => {
			dispatch(fetchFixturesSuccess(json));
		}).catch(({ Message: error = 'Invalid'}) => {
			dispatch(fetchFixturesError(error)); // TODO
		});
	};
}

function shouldFetchFixtures(state) {
	const { fixtures } = state;
	if (!fixtures.list.length) {
		return true;
	} else if (fixtures.isFetching) {
		return false;
	} else {
		return fixtures.didInvalidate;
	}
}

export function fetchFixturesIfNeeded() {
	return (dispatch, getState) => {
		if (shouldFetchFixtures(getState())) {
			return dispatch(fetchFixtures());
		} else {
			return Promise.resolve();
		}
	};
}

/*
 User completed fixtures
 */
function fetchPlayedFixturesStart() {
	return {
		type: FETCH_PLAYED_FIXTURES
	};
}

function fetchPlayedFixturesSuccess(json) {
	return {
		type: FETCH_PLAYED_FIXTURES_SUCCESS,
		payload: json.MatchQuizEntries.map(({
			MatchId: matchId,
			BetAmount: betAmount,
			IsWinner: isWinner,
			WonAmount: wonAmount,
			Answers
			}) => {
			return {
				matchId,
				betAmount,
				isWinner,
				wonAmount,
				answers: Answers.map(({ OutcomeId: outcomeId, QuestionId: questionId }) => {
					return {
						outcomeId,
						questionId
					};
				})
			}
		}),
		receivedAt: Date.now()
	};
}

function fetchPlayedFixturesError(error) {
	return {
		type: FETCH_PLAYED_FIXTURES_ERROR,
		error
	};
}

export function fetchPlayedFixtures() {
	return (dispatch) => {
		//dispatch(fetchPlayedFixturesStart());

		return fetch({
			endpoint: 'matchquiz/getmatchquizentries'
		}).then((json) => {
			dispatch(fetchPlayedFixturesSuccess(json));
		}).catch(({ Message: error = 'Invalid'}) => {
			dispatch(fetchPlayedFixturesError(error));
		});
	};
}
