import fetch from '../../lib/fetch.js';

export const SELECT_QUIZ = 'SELECT_QUIZ';
export const FETCH_QUIZ = 'FETCH_QUIZ';
export const FETCH_QUIZ_SUCCESS = 'FETCH_QUIZ_SUCCESS';
export const FETCH_QUIZ_ERROR = 'FETCH_QUIZ_ERROR';


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
