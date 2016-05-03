import userData from '../../components/LeaderBoardContainer/data.js'; // fake response data
// import fetch from '../../lib/fetch.js'; TODO - use api

export const SELECT_USER_PROFILE = 'SELECT_USER_PROFILE';
export const FETCH_USER_PROFILE = 'FETCH_USER_PROFILE';
export const FETCH_USER_PROFILE_SUCCESS = 'FETCH_USER_PROFILE_SUCCESS';

const DELAY = 100;

// Leadeboard
/


// User Profiles
//
export function selectUserProfile(userId) {
	return {
		type: SELECT_USER_PROFILE,
		userId
	};
}

function fetchUserProfileStart(userId) {
	return {
		type: FETCH_USER_PROFILE,
		userId
	};
}


function fetchUserProfileSuccess(userId, json) {
	return {
		type: FETCH_USER_PROFILE_SUCCESS,
		userId,
		payload: json,
		receivedAt: Date.now()
	};
}

function fetchUserProfile(userId) {
	return (dispatch) => {
		dispatch(fetchUserProfileStart(userId));

		console.log('>>TODO: fetch /user[%s]', userId);
		//fetch(`/user/${iserId}`).then(response => response.json())

		const response = userData.users.all.find(u => u.userId === userId);

		return new Promise((resolve, reject) => {
			setTimeout(() => resolve(response), DELAY);
		}).then((json) => {
			dispatch(fetchUserProfileSuccess(userId, json));
		});
	};
}

function shouldFetchUserProfile(state, userId) {
	const profile = state.userProfiles[userId];
	if (!profile) {
		return true;
	} else if (profile.isFetching) {
		return false;
	} else {
		return profile.didInvalidate;
	}
}

export function fetchUserProfileIfNeeded(userId) {
	return (dispatch, getState) => {
		if (shouldFetchUserProfile(getState(), userId)) {
			return dispatch(fetchUserProfile(userId));
		} else {
			return Promise.resolve();
		}
	};
}
