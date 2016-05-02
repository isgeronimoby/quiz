import userData from '../../components/LeaderBoardContainer/data.js'; // fake response data
import partnersData from '../../components/PartnersContainer/data.js'; // fake response data

// Profile
export const FETCH_PROFILE = 'FETCH_PROFILE';
export const FETCH_PROFILE_SUCCESS = 'FETCH_PROFILE_SUCCESS';
export const FETCH_PROFILE_ERROR = 'FETCH_PROFILE_ERROR';
export const ADD_POINTS = 'ADD_POINTS';
// Users
export const SELECT_USER = 'SELECT_USER';
export const FETCH_USER = 'FETCH_USER';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const FETCH_USER_ERROR = 'FETCH_USER_ERROR'; // TODO
export const INVALIDATE_USER = 'INVALIDATE_USER'; // TODO
// Partners
export const FETCH_PARTNERS = 'FETCH_PARTNERS';
export const FETCH_PARTNERS_SUCCESS = 'FETCH_PARTNERS_SUCCESS';
export const FETCH_PARTNERS_ERROR = 'FETCH_PARTNERS_ERROR'; // TODO
export const INVALIDATE_PARTNERS = 'INVALIDATE_PARTNERS'; // TODO


const DELAY = 100;

/*
 Profile
 */

function fetchProfileStart() {
	return {
		type: FETCH_PROFILE
	};
}

function fetchProfileSuccess(json) {
	return {
		type: FETCH_PROFILE_SUCCESS,
		payload: json,
		receivedAt: Date.now()
	};
}

function fetchProfileError() {
	return {
		type: FETCH_PROFILE_ERROR
	};
}

export function fetchProfile() {
	return (dispatch) => {
		dispatch(fetchProfileStart());

		return new Promise((resolve, reject) => {
			//setTimeout(() => resolve(response), DELAY);
			setTimeout(() => reject(), DELAY); // emul not-authenticated
		}).then((json) => {
			dispatch(fetchProfileSuccess(json));
		}).catch(() => {
			dispatch(fetchProfileError());
		});
	};
}

export function addPoints(points) {
	return {
		type: ADD_POINTS,
		points
	};
}

/*
 Users
 */

export function selectUser(userId) {
	return {
		type: SELECT_USER,
		userId
	};
}

export function invalidateUser(userId) {
	return {
		type: INVALIDATE_USER,
		userId
	};
}

function fetchUserStart(userId) {
	return {
		type: FETCH_USER,
		userId
	};
}


function fetchUserSuccess(userId, json) {
	return {
		type: FETCH_USER_SUCCESS,
		userId,
		payload: json,
		receivedAt: Date.now()
	};
}

function fetchUser(userId) {
	return (dispatch) => {
		dispatch(fetchUserStart(userId));

		console.log('>>TODO: fetch /user[%s]', userId);
		//fetch(`/user/${iserId}`).then(response => response.json())

		const response = userData.users.all.find(u => u.userId === userId);

		return new Promise((resolve, reject) => {
			setTimeout(() => resolve(response), DELAY);
		}).then((json) => {
			dispatch(fetchUserSuccess(userId, json));
		});
	};
}

function shouldFetchUser(state, userId) {
	const profile = state.users[userId];
	if (!profile) {
		return true;
	} else if (profile.isFetching) {
		return false;
	} else {
		return profile.didInvalidate;
	}
}

export function fetchUserIfNeeded(userId) {
	return (dispatch, getState) => {
		if (shouldFetchUser(getState(), userId)) {
			return dispatch(fetchUser(userId));
		} else {
			return Promise.resolve();
		}
	};
}

/*
 Partners
 */


function fetchPartnersStart() {
	return {
		type: FETCH_PARTNERS,
	};
}


function fetchPartnersSuccess(json) {
	return {
		type: FETCH_PARTNERS_SUCCESS,
		payload: json,
		receivedAt: Date.now()
	};
}

function fetchPartners(userId) {
	return (dispatch) => {
		dispatch(fetchPartnersStart());

		console.log('>>TODO: fetch /partners');

		const response = partnersData;

		return new Promise((resolve, reject) => {
			setTimeout(() => resolve(response), DELAY);
		}).then((json) => {
			dispatch(fetchPartnersSuccess(json));
		});
	};
}

function shouldFetchPartners(state) {
	const partners = state.partners;
	if (!partners.payload.length) {
		return true;
	} else if (partners.isFetching) {
		return false;
	} else {
		return partners.didInvalidate;
	}
}

export function fetchPartnersIfNeeded() {
	return (dispatch, getState) => {
		if (shouldFetchPartners(getState())) {
			return dispatch(fetchPartners());
		} else {
			return Promise.resolve();
		}
	};
}
