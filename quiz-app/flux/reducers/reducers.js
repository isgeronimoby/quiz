import { combineReducers } from 'redux';
import {
	FETCH_PROFILE,
	FETCH_PROFILE_SUCCESS,
	FETCH_PROFILE_ERROR,

	FETCH_USER_PROFILE,
	FETCH_USER_PROFILE_SUCCESS,
	SELECT_USER_PROFILE,

	FETCH_PARTNERS,
	FETCH_PARTNERS_SUCCESS,
	FETCH_PARTNERS_ERROR,
	INVALIDATE_PARTNERS,

	FETCH_FIXTURES,
	FETCH_FIXTURES_SUCCESS,
	FETCH_FIXTURES_ERROR,

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

function selectedUserProfile(state = null, action) {
	switch (action.type) {
		case SELECT_USER_PROFILE:
			return action.userId;
		default:
			return state;
	}
}

function userById(state = {
	isFetching: false,
	payload: {}
}, action) {
	switch (action.type) {
		case FETCH_USER_PROFILE:
			return {
				...state,
				isFetching: true,
			};
		case FETCH_USER_PROFILE_SUCCESS:
			return {
				isFetching: false,
				payload: action.payload,
				lastUpdated: action.receivedAt,
			};
		default:
			return state;
	}
}

function userProfiles(state = {}, action) {
	switch (action.type) {
		case FETCH_USER_PROFILE:
		case FETCH_USER_PROFILE_SUCCESS:
			return {
				...state,
				[action.userId]: userById(state[action.userId], action)
			};
		default:
			return state;
	}
}

/*
 Partners
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


/*
 Fixtures
 */
function fixtures(state= {
	isFetching: false,
	list: []
}, action) {
	switch (action.type) {
		case FETCH_FIXTURES:
			return {
				...state,
				isFetching: true
			};
		case FETCH_FIXTURES_SUCCESS:
			return {
				isFetching: false,
				list: action.payload,
				lastUpdated: action.receivedAt,
			};
		default:
			return state;
	}
}


const rootReducer = combineReducers({
	profile,
	fixtures,
	userProfiles,
	selectedUserProfile,
	partners
});

export default rootReducer;
