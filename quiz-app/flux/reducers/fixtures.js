import {
	FETCH_FIXTURES,
	FETCH_FIXTURES_SUCCESS,
	//FETCH_FIXTURES_ERROR, TODO
	FETCH_PLAYED_FIXTURES_SUCCESS,
	FETCH_PLAYED_FIXTURES_ERROR,
} from '../actions';


export function fixtures(state = {
	isFetching: false,
	didInvalidate: false,
	list: []
}, action) {
	switch (action.type) {
		// TODO - case INVALIDATE_FIXTURES:
		case FETCH_FIXTURES:
			return {
				...state,
				isFetching: true,
				didInvalidate: true,
			};
		case FETCH_FIXTURES_SUCCESS:
			return {
				...state,
				isFetching: false,
				didInvalidate: false,
				list: action.payload,
				lastUpdated: action.receivedAt,
			};
		case FETCH_PLAYED_FIXTURES_SUCCESS:
			return {
				...state,
				// Adding betAmount, isWinner, answers...
				list: state.list.map((item) => {
					const playedItem = action.payload.find(({ matchId }) => item.matchId === matchId);
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
		case FETCH_PLAYED_FIXTURES_ERROR:
			return {
				...state,
				// Removing betAmount, isWinner, answers
				list: state.list.map(({ betAmount, isWinner, answers, ...rest }) => {
					return {
						...rest
					};
				})
			};
		default:
			return state;
	}
}
