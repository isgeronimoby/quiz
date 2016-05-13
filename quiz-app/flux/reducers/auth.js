import {
	TOGGLE_WELCOME,

	REQUEST_AUTH,
	AUTH_CANCEL,
	AUTH_SUCCESS,
	POST_LOGIN,
	POST_LOGIN_ERROR,
	POST_SIGNUP,
	POST_SIGNUP_ERROR,
	POST_RESTORE,
	POST_RESTORE_ERROR,
	POST_RESTORE_SUCCESS,
	LOGOUT_SUCCESS,
} from '../actions';

/*
 Welcome
 */

export function showWelcomePopup(state = false, action) {
	switch (action.type) {
		case TOGGLE_WELCOME:
			return action.show;
		default:
			return state;
	}
}

/*
 Auth
 */

export function auth(state = {
	isLoggedIn: false,
	showAuthPopup: false,
	authPopupView: 'login',
	errors: {},
	isFetching: {}
}, action) {
	switch (action.type) {
		case REQUEST_AUTH:
			return {
				...state,
				showAuthPopup: true,
				authPopupView: action.authPopupView,
				errors: {},
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
				errors: {},
				isFetching: {}
			};
		case POST_LOGIN:
			return {
				...state,
				errors: {},
				isFetching: {
					login: true
				}
			};
		case POST_LOGIN_ERROR:
			return {
				...state,
				isLoggedIn: false,
				errors: {
					login: action.error
				},
				isFetching: {}
			};
		case POST_SIGNUP:
			return {
				...state,
				errors: {},
				isFetching: {
					signup: true
				}
			};
		case POST_SIGNUP_ERROR:
			return {
				...state,
				errors: {
					signup: action.error
				},
				isFetching: {}
			};
		case POST_RESTORE:
			return {
				...state,
				errors: {},
				isFetching: {
					restore: true
				}
			};
		case POST_RESTORE_SUCCESS:
			return {
				...state,
				errors: {},
				isFetching: {}
			};
		case POST_RESTORE_ERROR:
			return {
				...state,
				errors: {
					restore: action.error
				},
				isFetching: {}
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
