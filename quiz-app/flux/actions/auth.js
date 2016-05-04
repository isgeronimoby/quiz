import fetch from '../../lib/fetch.js';
import { fetchProfileSuccess } from './profile.js'

export const REQUEST_AUTH = 'REQUEST_AUTH';
export const AUTH_CANCEL = 'AUTH_CANCEL';

export const POST_LOGIN = 'POST_LOGIN';
//export const POST_LOGIN_SUCCESS = 'POST_LOGIN_SUCCESS';
export const POST_LOGIN_ERROR = 'POST_LOGIN_ERROR';

export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_ERROR = 'AUTH_ERROR';
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

function successAuth() {
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
			//dispatch(fetchProfileSuccess(json));
			dispatch(successAuth());
		}).catch((error) => {
			dispatch(postLoginError(error));
		});
	};
}
