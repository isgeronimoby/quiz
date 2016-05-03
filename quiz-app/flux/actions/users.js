import userData from '../../components/LeaderBoardContainer/data.js'; // fake response data
// import fetch from '../../lib/fetch.js'; TODO - use api

export const SELECT_USER = 'SELECT_USER';
export const FETCH_USER = 'FETCH_USER';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const FETCH_USER_ERROR = 'FETCH_USER_ERROR'; // TODO
export const INVALIDATE_USER = 'INVALIDATE_USER'; // TODO

const DELAY = 100;


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
