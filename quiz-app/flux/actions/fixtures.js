import fetch from '../../lib/fetch.js';

export const FETCH_FIXTURES = 'FETCH_FIXTURES';
export const FETCH_FIXTURES_SUCCESS = 'FETCH_FIXTURES_SUCCESS';
export const FETCH_FIXTURES_ERROR = 'FETCH_FIXTURES_ERROR';


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
			}) => {
			return {
				matchId,
				startDate,
				teamHome,
				teamAway,
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

export function fetchFixtures() {
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
