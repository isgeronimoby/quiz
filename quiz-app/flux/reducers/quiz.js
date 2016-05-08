import {
	SELECT_QUIZ,
	FETCH_QUIZ,
	FETCH_QUIZ_SUCCESS,
	FETCH_QUIZ_ERROR,
	FETCH_ODDS,
	FETCH_ODDS_SUCCESS,
	FETCH_ODDS_ERROR,
	POST_BET,
	POST_BET_SUCCESS,
	POST_BET_ERROR,
} from '../actions';


export function selectedQuiz(state = null, action) {
	switch (action.type) {
		case SELECT_QUIZ:
			return action.matchId;
		default:
			return state;
	}
}

function quizDataById(state = {
	isFetching: false,
	questionList: {},

	isValidating: false,
	odds: 0,
	answers: [],
	invalidOutcomes: [],

	isBetting: false,
	betSuccess: false,
	betError: ''
}, action) {
	switch (action.type) {
		case FETCH_QUIZ:
			return {
				...state,
				isFetching: true,
			};
		case FETCH_QUIZ_SUCCESS:
			return {
				...state,
				isFetching: false,
				questionList: action.payload,
				lastUpdated: action.receivedAt,
			};
		case FETCH_ODDS:
			return {
				...state,
				answers: action.answers,
				isValidating: true,
			};
		case FETCH_ODDS_SUCCESS:
			return {
				...state,
				isValidating: false,
				odds: action.odds,
				invalidOutcomes: [],
				lastUpdated: action.receivedAt,
			};
		case FETCH_ODDS_ERROR:
			return {
				...state,
				isValidating: false,
				odds: 0,
				invalidOutcomes: action.invalidOutcomes,
			};
		case POST_BET:
			return {
				...state,
				isBetting: true,
				betSuccess: false,
				betError: '',
			};
		case POST_BET_SUCCESS:
			return {
				...state,
				isBetting: false,
				betSuccess: true,
				betError: '',
			};
		case POST_BET_ERROR:
			return {
				...state,
				isBetting: false,
				betSuccess: false,
				betError: action.error,
			};
		default:
			return state;
	}
}

export function quizes(state = {}, action) {
	switch (action.type) {
		case FETCH_QUIZ:
		case FETCH_QUIZ_SUCCESS:
		case FETCH_ODDS:
		case FETCH_ODDS_SUCCESS:
		case FETCH_ODDS_ERROR:
		case POST_BET:
		case POST_BET_SUCCESS:
		case POST_BET_ERROR:
			return {
				...state,
				[action.matchId]: quizDataById(state[action.matchId], action)
			};
		default:
			return state;
	}
}
