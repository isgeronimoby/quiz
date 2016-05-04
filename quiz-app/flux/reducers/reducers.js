import { combineReducers } from 'redux';
import {
	REQUEST_AUTH,
	AUTH_CANCEL,
	AUTH_SUCCESS,
	AUTH_ERROR,
	LOGOUT_SUCCESS,

	FETCH_PROFILE,
	FETCH_PROFILE_SUCCESS,
	FETCH_PROFILE_ERROR,
	INVALIDATE_PROFILE,

	FETCH_FIXTURES,
	FETCH_FIXTURES_SUCCESS,
	//FETCH_FIXTURES_ERROR,

	FETCH_USER_LIST,
	FETCH_USER_LIST_SUCCESS,
	//FETCH_USER_LIST_ERROR - TODO

	FETCH_USER_PROFILE,
	FETCH_USER_PROFILE_SUCCESS,
	SELECT_USER_PROFILE,

	FETCH_PARTNERS,
	FETCH_PARTNERS_SUCCESS,
	//FETCH_PARTNERS_ERROR,

} from '../actions';

/*
 Auth
 */

function auth(state = {
	isLoggedIn: false,
	showAuthPopup: false,
	authPopupView: 'login'
}, action) {
	switch (action.type) {
		case REQUEST_AUTH:
			return {
				...state,
				showAuthPopup: true,
				authPopupView: action.authPopupView
			};
		case AUTH_CANCEL:
			return {
				...state,
				showAuthPopup: false,
			};
		case AUTH_SUCCESS:
			return {
				...state,
				isLoggedIn: true,
				showAuthPopup: false,
			};
		case LOGOUT_SUCCESS:
			return {
				...state,
				isLoggedIn: false
			};
		default:
			return state;
	}
}

/*
 Profile
 */

function profile(state = {
	didInvalidate: false,
	userId: null,
	name: '',
	imageUrl: null,
	points: 0,
	pendingPoints: 0,
}, action) {
	switch (action.type) {
		case INVALIDATE_PROFILE:
		case FETCH_PROFILE:
			return {
				...state,
				didInvalidate: true,
			};
		case FETCH_PROFILE_SUCCESS:
			return {
				...action.payload,
				didInvalidate: false,
				lastUpdated: action.receivedAt,
			};
		case FETCH_PROFILE_ERROR:
			return {
				...state,
				didInvalidate: true,
			};
		default:
			return state;
	}
}

/*
 Fixtures
 */
function fixtures(state = {
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

/*
 User List
 */
function userList(state = {
	isFetching: false,
	list: []
}, action) {
	switch (action.type) {
		case FETCH_USER_LIST:
			return {
				...state,
				isFetching: true
			};
		case FETCH_USER_LIST_SUCCESS:
			return {
				isFetching: false,
				list: action.payload,
				lastUpdated: action.receivedAt,
			};
		default:
			return state;
	}
}

/*
 User Profiles
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
	user: {}
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
				user: action.payload,
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
	list: []
}, action) {
	switch (action.type) {
		case FETCH_PARTNERS:
			return {
				...state,
				isFetching: true,
			};
		case FETCH_PARTNERS_SUCCESS:
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
	auth,
	profile,
	fixtures,
	userList,
	userProfiles,
	selectedUserProfile,
	partners
});

export default rootReducer;
