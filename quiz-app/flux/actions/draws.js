import fetch from '../../lib/fetch.js';

export const FETCH_DRAWS = 'FETCH_DRAWS';
export const FETCH_DRAWS_SUCCESS = 'FETCH_DRAWS_SUCCESS';
export const FETCH_DRAWS_ERROR = 'FETCH_DRAWS_ERROR';

export const FETCH_PLAYED_DRAWS = 'FETCH_PLAYED_DRAWS';
export const FETCH_PLAYED_DRAWS_SUCCESS = 'FETCH_PLAYED_DRAWS_SUCCESS';
export const FETCH_PLAYED_DRAWS_ERROR = 'FETCH_PLAYED_DRAWS_ERROR';

/*
 All draws
 */
function fetchDrawsStart() {
	return {
		type: FETCH_DRAWS
	};
}

function fetchDrawsSuccess(json) {
	return {
		type: FETCH_DRAWS_SUCCESS,
		payload: json.Draws.map(({
			DrawId: drawId,
			StartDate: startDate,
			EndDate: endDate,
			IsDrawn: isDrawn,
			Prize: {
				Title: prizeTitle,
				Description: prizeDescription,
				ImageUrl: prizeImageUrl,
				},
			}) => {
			return {
				drawId,
				startDate,
				endDate,
				isDrawn,
				prizeTitle,
				prizeDescription,
				prizeImageUrl,
			}
		}),
		receivedAt: Date.now()
	};
}

function fetchDrawsError(error) {
	return {
		type: FETCH_DRAWS_ERROR,
		error
	};
}

function fetchDraws() {
	return (dispatch) => {
		dispatch(fetchDrawsStart());

		return fetch({
			endpoint: 'Draw/GetDraws'
		}).then((json) => {
			dispatch(fetchDrawsSuccess(json));
		}).catch(({ Message: error = 'Invalid'}) => {
			dispatch(fetchDrawsError(error)); // TODO
		});
	};
}

function shouldFetchDraws(state) {
	const { draws } = state;
	if (!draws.list.length) {
		return true;
	} else if (draws.isFetching) {
		return false;
	} else {
		return draws.didInvalidate;
	}
}

export function fetchDrawsIfNeeded() {
	return (dispatch, getState) => {
		if (shouldFetchDraws(getState())) {
			return dispatch(fetchDraws());
		} else {
			return Promise.resolve();
		}
	};
}

/*
 User completed draws
 */
function fetchPlayedDrawsStart() {
	return {
		type: FETCH_PLAYED_DRAWS
	};
}

function fetchPlayedDrawsSuccess(json) {
	return {
		type: FETCH_PLAYED_DRAWS_SUCCESS,
		payload: json.DrawEntries.map(({
			DrawId: drawId,
			TicketsAmount: ticketsAmount,
			IsWinner: isWinner,
			}) => {
			return {
				drawId,
				ticketsAmount,
				isWinner,
			}
		}),
		receivedAt: Date.now()
	};
}

function fetchPlayedDrawsError(error) {
	return {
		type: FETCH_PLAYED_DRAWS_ERROR,
		error
	};
}

export function fetchPlayedDraws() {
	return (dispatch) => {
		//dispatch(fetchPlayedDrawsStart());

		return fetch({
			endpoint: 'Draw/GetDrawEntries'
		}).then((json) => {
			dispatch(fetchPlayedDrawsSuccess(json));
		}).catch(({ Message: error = 'Invalid'}) => {
			dispatch(fetchPlayedDrawsError(error));
		});
	};
}
