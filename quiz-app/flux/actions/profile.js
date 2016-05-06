import fetch from '../../lib/fetch.js';

export const FETCH_PROFILE = 'FETCH_PROFILE';
export const FETCH_PROFILE_SUCCESS = 'FETCH_PROFILE_SUCCESS';
export const FETCH_PROFILE_ERROR = 'FETCH_PROFILE_ERROR';
export const INVALIDATE_PROFILE = 'INVALIDATE_PROFILE';


export function invalidateProfile() {
    return {
		type: INVALIDATE_PROFILE
	}
}

function fetchProfileStart() {
	return {
		type: FETCH_PROFILE
	};
}

export function fetchProfileSuccess({
	UserId: userId,
	UserName: name,
	ImageUrl: imageUrl,
	Wallet: {
		PointsConfirmed: points,
		PointsPending: pendingPoints
		}
	}) {
	return {
		type: FETCH_PROFILE_SUCCESS,
		payload: {
			userId,
			name,
			imageUrl,
			points,
			pendingPoints,
		},
		receivedAt: Date.now()
	};
}

function fetchProfileError(error) {
	return {
		type: FETCH_PROFILE_ERROR,
		error
	};
}

function fetchProfile() {
	return (dispatch) => {
		dispatch(fetchProfileStart());

		return fetch({
			endpoint: 'user/getuser'
		}).then((json) => {
			dispatch(fetchProfileSuccess(json));
		}).catch(({ Message: error = 'Invalid'}) => {
			dispatch(fetchProfileError(error)); // TODO
		});
	};
}

function shouldFetchProfile(state) {
	const { profile, auth } = state;
	if (!auth.isLoggedIn) {
		return true;
	} else if (profile.isFetching) {
		return false;
	} else {
		return profile.didInvalidate;
	}
}

export function fetchProfileIfNeeded() {
	return (dispatch, getState) => {
		if (shouldFetchProfile(getState())) {
			return dispatch(fetchProfile());
		} else {
			return Promise.resolve();
		}
	};
}
