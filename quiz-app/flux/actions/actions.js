import userData from '../../components/LeaderBoardContainer/data.js'; // fake response data

export const ADD_POINTS = 'ADD_POINTS';
export const SELECT_PROFILE = 'SELECT_PROFILE';
export const REQUEST_PROFILE = 'REQUEST_PROFILE';
export const RECEIVE_PROFILE = 'RECEIVE_PROFILE';
export const INVALIDATE_PROFILE = 'INVALIDATE_PROFILE'; // TODO


const DELAY = 100;


export function addPoints(points) {
	return {
		type: ADD_POINTS,
		points
	};
}


/*
 User profiles
 */

export function selectProfile(userId) {
	return {
		type: SELECT_PROFILE,
		userId
	};
}

function requestProfile(userId) {
	return {
		type: REQUEST_PROFILE,
		userId
	};
}


function receiveProfile(userId, json) {
	return {
		type: RECEIVE_PROFILE,
		userId,
		payload: json,
		receivedAt: Date.now()
	};
}

function fetchProfile(userId) {
	return (dispatch) => {
		dispatch(requestProfile(userId));

		console.log('>>TODO: fetch /profile[%s]', userId);
		//fetch(`/profile/${iserId}`).then(response => response.json())

		const response = userData.users.all.find(u => u.userId === userId);

		return new Promise((resolve, reject) => {
			setTimeout(() => resolve(response), DELAY);
		}).then((json) => {
			dispatch(receiveProfile(userId, json));
		});
	};
}

function shouldFetchProfile(state, userId) {
	const profile = state.profiles[userId];
	if (!profile) {
		return true;
	} else if (profile.isFetching) {
		return false;
	} else {
		return profile.didInvalidate;
	}
}

export function fetchProfileIfNeeded(userId) {
	return (dispatch, getState) => {
		if (shouldFetchProfile(getState(), userId)) {
			return dispatch(fetchProfile(userId));
		} else {
			return Promise.resolve();
		}
	};
}

