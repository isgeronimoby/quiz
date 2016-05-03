import { combineReducers } from 'redux';
import {
	FETCH_PROFILE,
	FETCH_PROFILE_SUCCESS,
	FETCH_PROFILE_ERROR,

	SELECT_USER,
	FETCH_USER,
	FETCH_USER_SUCCESS,
	INVALIDATE_USER,

	FETCH_PARTNERS,
	FETCH_PARTNERS_SUCCESS,
	FETCH_PARTNERS_ERROR,
	INVALIDATE_PARTNERS,
} from '../actions';

/*
 Profile
 */

function profile(state = {
	isLoggedIn: false,
	userId: null,
	name: '',
	imageUrl: null,
	points: 0,
	pendingPoints: 0,
}, action) {
	switch (action.type) {
		case FETCH_PROFILE_SUCCESS:
			return {
				...action.payload,
				isLoggedIn: true,
				lastUpdated: action.receivedAt,
			};
		case FETCH_PROFILE_ERROR:
			return {
				...state,
				isLoggedIn: false,
			};
		default:
			return state;
	}
}

/*
 Users
 */

function selectedUser(state = null, action) {
	switch (action.type) {
		case SELECT_USER:
			return action.userId;
		default:
			return state;
	}
}

function userById(state = {
	isFetching: false,
	didInvalidate: false,
	payload: {}
}, action) {
	switch (action.type) {
		case INVALIDATE_USER:
			return {
				...state,
				didInvalidate: true,
			};
		case FETCH_USER:
			return {
				...state,
				isFetching: true,
				didInvalidate: true,
			};
		case FETCH_USER_SUCCESS:
			return {
				isFetching: false,
				didInvalidate: false,
				payload: action.payload,
				lastUpdated: action.receivedAt,
			};
		default:
			return state;
	}
}

function users(state = {}, action) {
	switch (action.type) {
		case INVALIDATE_USER:
		case FETCH_USER:
		case FETCH_USER_SUCCESS:
			return {
				...state,
				[action.userId]: userById(state[action.userId], action)
			};
		default:
			return state;
	}
}


/*
 Users
 */

function partners(state = {
	isFetching: false,
	didInvalidate: false,
	payload: []
}, action) {
	switch (action.type) {
		case INVALIDATE_PARTNERS:
			return {
				...state,
				didInvalidate: true,
			};
		case FETCH_PARTNERS:
			return {
				...state,
				isFetching: true,
				didInvalidate: true,
			};
		case FETCH_PARTNERS_SUCCESS:
			return {
				isFetching: false,
				didInvalidate: false,
				payload: action.payload,
				lastUpdated: action.receivedAt,
			};
		default:
			return state;
	}
}


const rootReducer = combineReducers({
	profile,
	users,
	selectedUser,
	partners
});

export default rootReducer;
