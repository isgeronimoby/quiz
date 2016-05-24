import fetch, { apiPrefix, iframeSrc, apiKey, rpc } from '../../lib/fetch.js';
import { Window, isSafari } from '../../lib/utils.js';
import { fetchProfile, fetchProfileSuccess } from './profile.js'
const popup = Window();


export const TOGGLE_WELCOME = 'TOGGLE_WELCOME';

export const REQUEST_AUTH = 'REQUEST_AUTH';
export const AUTH_CANCEL = 'AUTH_CANCEL';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';

export const POST_LOGIN = 'POST_LOGIN';
export const POST_LOGIN_ERROR = 'POST_LOGIN_ERROR';
export const POST_SIGNUP = 'POST_SIGNUP';
export const POST_SIGNUP_ERROR = 'POST_SIGNUP_ERROR';
export const POST_RESTORE = 'POST_RESTORE';
export const POST_RESTORE_ERROR = 'POST_RESTORE_ERROR';
export const POST_RESTORE_SUCCESS = 'POST_RESTORE_SUCCESS';

export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

export const SAFARI_COOKIE_HACKED = 'SAFARI_COOKIE_HACKED';


/*
 Welcome popup
 */
export function toggleWelcome(show) {
	return {
		type: TOGGLE_WELCOME,
		show
	}
}

/*
 Common Auth
 */
function requestAuthPopup(authPopupView = 'signup') {
	return {
		type: REQUEST_AUTH,
		authPopupView
	};
}

function safariCookieHack() {
	return {
		type: SAFARI_COOKIE_HACKED
	};
}

function requestAuthWithSafariFix(authPopupView) {
	return (dispatch, getState) => {
		const { auth: {safariCookieHacked} } = getState();

		if (safariCookieHacked) {
			return dispatch(requestAuthPopup(authPopupView));
		}

		rpc.readClubCookie('safarifix', (res) => {
			const done = () => {
				dispatch(safariCookieHack());
				dispatch(requestAuthPopup(authPopupView));
			};

			if (res) {
				return done();
			}

			// Open window on target domain and let it set cookie (i.e. visit it) and close itself.
			// A hack for Safari that do not allow setting cookies to unvisited domains, thus breaking session cookies.
			//
			const url = `${iframeSrc}?safarifix`; // the page detects this flag, sets 'safarifix' cookie and closes itself
			const settings = 'menubar=no,location=no,resizable=no,scrollbars=no,status=no,width=1,height=1,top=0,left=0';

			setTimeout(done, 500); // Hack for iPhone, no timers are firing after popup.open call for unknown reason

			// Assume cookie is set after window is closed
			popup.open({url, settings}, done);
		});
	};
}

export function requestAuth(authPopupView) {
	return (dispatch) => {
		if (!isSafari) {
			dispatch(requestAuthPopup(authPopupView));
		} else {
			dispatch(requestAuthWithSafariFix(authPopupView));
		}
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

/*
 Restore
 */
function postRestoreStart() {
	return {
		type: POST_SIGNUP
	};
}

function postRestoreError(error) {
	return {
		type: POST_RESTORE_ERROR,
		error
	};
}
function postRestoreSuccess() {
	return {
		type: POST_RESTORE_SUCCESS,
		// TODO: need to show some success message - need deign
	};
}

export function postRestore({email}) {
	return (dispatch) => {
		dispatch(postRestoreStart());

		return fetch({
			method: 'POST',
			endpoint: 'auth/forgotpassword',
			data: {
				Email: email,
			}
		}).then((json) => {
			dispatch(postRestoreSuccess());
		}).catch(({ Message: error = 'Invalid'}) => {
			dispatch(postRestoreError(error));
			throw error;
		});
	};
}


/*
 Logout
 */
function postLogoutSuccess() {
	return {
		type: LOGOUT_SUCCESS,
	};
}

export function postLogout() {
	return (dispatch) => {
		return fetch({
			method: 'POST',
			endpoint: 'auth/logout',
			data: {}
		}).then((json) => {
			dispatch(postLogoutSuccess());
		})
	};
}

/*
 Facebook
 */

export function authWithFacebook() {
	return (dispatch) => {
		const url = `${apiPrefix}auth/facebook?api_key=${apiKey}`;

		popup.open({url}, () => {
			dispatch(fetchProfile());
		});
	};
}
