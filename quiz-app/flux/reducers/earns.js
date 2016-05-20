import {
	FETCH_EARNS,
	FETCH_EARNS_SUCCESS,
	FETCH_EARNS_ERROR,
} from '../actions';


export function earns(state = {
	isFetching: false,
	didInvalidate: false,
	list: [],
}, action) {
	switch (action.type) {
		case FETCH_EARNS:
			return {
				...state,
				isFetching: true,
				didInvalidate: true,
			};
		case FETCH_EARNS_SUCCESS:
			return {
				...state,
				isFetching: false,
				didInvalidate: false,
				list: action.payload,
				lastUpdated: action.receivedAt,
			};
		default:
			return state;
	}
}
