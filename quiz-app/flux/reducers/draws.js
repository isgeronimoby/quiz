import {
	FETCH_DRAWS,
	FETCH_DRAWS_SUCCESS,
	FETCH_DRAWS_ERROR,

	FETCH_PLAYED_DRAWS,
	FETCH_PLAYED_DRAWS_SUCCESS,
	FETCH_PLAYED_DRAWS_ERROR,
} from '../actions';

/*
 All Draws
 */
export function draws(state = {
	isFetching: false,
	didInvalidate: false,
	list: []
}, action) {
	switch (action.type) {
		// TODO - case INVALIDATE_DRAWS:
		case FETCH_DRAWS:
			return {
				...state,
				isFetching: true,
				didInvalidate: true,
			};
		case FETCH_DRAWS_SUCCESS:
			return {
				...state,
				isFetching: false,
				didInvalidate: false,
				list: action.payload,
				lastUpdated: action.receivedAt,
			};
		case FETCH_PLAYED_DRAWS_SUCCESS:
			return {
				...state,
				// Adding betAmount, isWinner, ...
				list: state.list.map((item) => {
					const playedItem = action.payload.find(({ drawId }) => item.drawId === drawId);
					if (playedItem) {
						return {
							...item,
							...playedItem
						};
					} else {
						return item;
					}
				}),
				lastUpdated: action.receivedAt,
			};
		case FETCH_PLAYED_DRAWS_ERROR:
			return {
				...state,
				// Removing ticketsAmount, isWinner
				list: state.list.map(({ ticketsAmount, isWinner, ...rest }) => {
					return {
						...rest
					};
				})
			};
		default:
			return state;
	}
}
