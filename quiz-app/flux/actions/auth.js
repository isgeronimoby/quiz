import fetch from '../../lib/fetch.js';

export const REQUEST_AUTH = 'REQUEST_AUTH';
export const AUTH_CANCEL = 'AUTH_CANCEL';
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
