import fetch from '../../lib/fetch.js';

export const FETCH_PROFILE = 'FETCH_PROFILE';
export const FETCH_PROFILE_SUCCESS = 'FETCH_PROFILE_SUCCESS';
export const FETCH_PROFILE_ERROR = 'FETCH_PROFILE_ERROR';


function fetchProfileStart() {
	return {
		type: FETCH_PROFILE
	};
}

function fetchProfileSuccess({
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

function fetchProfileError() {
	return {
		type: FETCH_PROFILE_ERROR
	};
}

export function fetchProfile() {
	return (dispatch) => {
		dispatch(fetchProfileStart());

		return fetch({
			endpoint: 'user/getuser'
		}).then((json) => {
			dispatch(fetchProfileSuccess(json));
		}).catch(() => {
			dispatch(fetchProfileError()); // TODO
		});
	};
}
