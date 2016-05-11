import {
	FETCH_PROFILE,
	FETCH_PROFILE_SUCCESS,
	FETCH_PROFILE_ERROR,
	INVALIDATE_PROFILE,
} from '../actions';


export function profile(state = {
	isFetching: false,
	didInvalidate: false,
	userId: null,
	name: '',
	imageUrl: null,
	points: 0,
	pendingPoints: 0,
}, action) {
	switch (action.type) {
		case INVALIDATE_PROFILE:
			return {
				...state,
				didInvalidate: true,
			};
		case FETCH_PROFILE:
			return {
				...state,
				isFetching: true,
				didInvalidate: true,
			};
		case FETCH_PROFILE_SUCCESS:
			return {
				...state,
				...action.payload,
				isFetching: false,
				didInvalidate: false,
				lastUpdated: action.receivedAt,
			};
		case FETCH_PROFILE_ERROR:
			return {
				...state,
				isFetching: false,
				didInvalidate: true,
			};
		default:
			return state;
	}
}
