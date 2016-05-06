import fetch from '../../lib/fetch.js';
import { fetchProfileSuccess } from './profile.js'

export const REQUEST_AUTH = 'REQUEST_AUTH';
export const AUTH_CANCEL = 'AUTH_CANCEL';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';

export const POST_LOGIN = 'POST_LOGIN';
export const POST_LOGIN_ERROR = 'POST_LOGIN_ERROR';
export const POST_SIGNUP = 'POST_SIGNUP';
export const POST_SIGNUP_ERROR = 'POST_SIGNUP_ERROR';

export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';


export function requestAuth(authPopupView = 'signup') {
	return {
		type: REQUEST_AUTH,
		authPopupView
	};
}

export function cancelAuth() {
	return {
		type: AUTH_CANCEL
	};
}

export function successAuth() {
	return {
		type: AUTH_SUCCESS
	};
}

/*
 Login
 */

function postLoginStart() {
	return {
		type: POST_LOGIN
	};
}

function postLoginError(error) {
	return {
		type: POST_LOGIN_ERROR,
		error
	};
}

export function postLogin({email, password}) {
	return (dispatch) => {
		dispatch(postLoginStart());

		return fetch({
			method: 'POST',
			endpoint: 'auth/login',
			data: {
				Email: email,
				Password: password,
			}
		}).then((json) => {
			dispatch(fetchProfileSuccess(json));
			dispatch(successAuth());
		}).catch(({ Message: error = 'Invalid'}) => {
			dispatch(postLoginError(error));
		});
	};
}


/*
 Signup
 */

function postSignupStart() {
	return {
		type: POST_SIGNUP
	};
}

function postSignupError(error) {
	return {
		type: POST_SIGNUP_ERROR,
		error
	};
}

export function postSignup({name, email, password}) {
	return (dispatch) => {
		dispatch(postSignupStart());

		return fetch({
			method: 'POST',
			endpoint: 'auth/signup',
			data: {
				UserName: name,
				Email: email,
				Password: password,
			}
		}).then((json) => {
			dispatch(fetchProfileSuccess(json));
			dispatch(successAuth());
		}).catch(({ Message: error = 'Invalid'}) => {
			dispatch(postSignupError(error));
		});
	};
}
