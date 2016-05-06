import fetch from '../../lib/fetch.js';

export const SELECT_QUIZ = 'SELECT_QUIZ';
export const FETCH_QUIZ = 'FETCH_QUIZ';
export const FETCH_QUIZ_SUCCESS = 'FETCH_QUIZ_SUCCESS';
export const FETCH_QUIZ_ERROR = 'FETCH_QUIZ_ERROR';

export const FETCH_ODDS = 'FETCH_ODDS';
export const FETCH_ODDS_SUCCESS = 'FETCH_ODDS_SUCCESS';
export const FETCH_ODDS_ERROR = 'FETCH_ODDS_ERROR';


export function selectQuiz(matchId) {
	return {
		type: SELECT_QUIZ,
		matchId
	};
}

function fetchQuizStart(matchId) {
	return {
		type: FETCH_QUIZ,
		matchId
	};
}

function fetchQuizSuccess(matchId, { Questions }) {
	return {
		type: FETCH_QUIZ_SUCCESS,
		matchId,
		payload: Questions,
		receivedAt: Date.now()
	};
}

function fetchQuizError(matchId, error) {
	return {
		type: FETCH_QUIZ_ERROR,
		matchId,
		error
	};
}

export function fetchQuiz(matchId) {
	return (dispatch) => {
		dispatch(fetchQuizStart(matchId));

		return fetch({
			endpoint: 'matchquiz/GetMatchQuizEvent',
			data: {
				'MatchId': matchId
			}
		}).then((json) => {
			dispatch(fetchQuizSuccess(matchId, json));
		}).catch((error) => {
			dispatch(fetchQuizError(matchId, error)); // TODO
		});
	};
}


/*
 Odds & validation
 */

function fetchOddsStart(matchId) {
	return {
		type: FETCH_ODDS,
		matchId
	};
}

function fetchOddsSuccess(matchId, { Odds: odds }) {
	return {
		type: FETCH_ODDS_SUCCESS,
		matchId,
		odds,
		receivedAt: Date.now()
	};
}

function fetchOddsError(matchId, { InvalidAnswers: invalidOutcomes }) {
	return {
		type: FETCH_ODDS_ERROR,
		matchId,
		invalidOutcomes,
	};
}

export function fetchOdds(matchId, answers) {
	return (dispatch) => {
		dispatch(fetchOddsStart(matchId));

		const data = {
			'matchid': matchId,
			'outcomeanswers': answers
		};

		return fetch({
			method: 'POST',
			endpoint: 'matchquiz/calculateodds',
			data
		}).then((json) => {
			dispatch(fetchOddsSuccess(matchId, json));
		}).catch((error) => {
			dispatch(fetchOddsError(matchId, error)); // TODO
		});
	};
}
