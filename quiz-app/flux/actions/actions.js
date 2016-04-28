import userData from '../../components/LeaderBoardContainer/data.js'; // fake response data

export const ADD_POINTS = 'ADD_POINTS';
export const SELECT_USER = 'SELECT_USER';
export const REQUEST_USER = 'REQUEST_USER';
export const RECEIVE_USER = 'RECEIVE_USER';
export const INVALIDATE_USER = 'INVALIDATE_USER'; // TODO


const DELAY = 100;


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

function requestUser(userId) {
	return {
		type: REQUEST_USER,
		userId
	};
}


function receiveUser(userId, json) {
	return {
		type: RECEIVE_USER,
		userId,
		payload: json,
		receivedAt: Date.now()
	};
}

function fetchUser(userId) {
	return (dispatch) => {
		dispatch(requestUser(userId));

		console.log('>>TODO: fetch /user[%s]', userId);
		//fetch(`/user/${iserId}`).then(response => response.json())

		const response = userData.users.all.find(u => u.userId === userId);

		return new Promise((resolve, reject) => {
			setTimeout(() => resolve(response), DELAY);
		}).then((json) => {
			dispatch(receiveUser(userId, json));
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

