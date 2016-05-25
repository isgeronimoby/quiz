import fetch from '../../lib/fetch.js';
import { fetchProfileSuccess } from './profile.js';

export const SELECT_DRAW = 'SELECT_DRAW';

export const FETCH_DRAWS = 'FETCH_DRAWS';
export const FETCH_DRAWS_SUCCESS = 'FETCH_DRAWS_SUCCESS';
export const FETCH_DRAWS_ERROR = 'FETCH_DRAWS_ERROR';

export const FETCH_PLAYED_DRAWS = 'FETCH_PLAYED_DRAWS';
export const FETCH_PLAYED_DRAWS_SUCCESS = 'FETCH_PLAYED_DRAWS_SUCCESS';
export const FETCH_PLAYED_DRAWS_ERROR = 'FETCH_PLAYED_DRAWS_ERROR';

export const POST_DRAW_BET = 'POST_DRAW_BET';
export const POST_DRAW_BET_SUCCESS = 'POST_DRAW_BET_SUCCESS';
export const POST_DRAW_BET_ERROR = 'POST_DRAW_BET_ERROR';

export const POST_DRAW_CLAIM = 'POST_DRAW_CLAIM';
export const POST_DRAW_CLAIM_SUCCESS = 'POST_DRAW_CLAIM_SUCCESS';
export const POST_DRAW_CLAIM_ERROR = 'POST_DRAW_CLAIM_ERROR';


export function selectDraw(drawId) {
	return {
		type: SELECT_DRAW,
		drawId
	};
}

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
			Winner: winner,
			}) => {
			return {
				drawId,
				startDate,
				endDate,
				isDrawn,
				prizeTitle,
				prizeDescription,
				prizeImageUrl,
				winner,
			}
		}).sort((a, b) => {
			if (a.isDrawn === b.isDrawn && b.isDrawn === false) {
				// Not drawn are sorted from old to new
				return new Date(a.endDate) - new Date(b.endDate);
			} else if (a.isDrawn === b.isDrawn && b.isDrawn === true) {
				// Not drawn are sorted from new to old
				return new Date(b.endDate) - new Date(a.endDate);
			}
			// Not drawn are on top
			return a.isDrawn ? 1 : -1;
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

function fetchPlayedDrawsSuccess(json) {
	return {
		type: FETCH_PLAYED_DRAWS_SUCCESS,
		payload: json.DrawEntries.map(({
			DrawId: drawId,
			TicketsAmount: betAmount,
			IsWinner: isWinner,
			NeedToClaimPrize: needToClaim,
			}) => {
			return {
				drawId,
				betAmount,
				isWinner,
				needToClaim
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
		return fetch({
			endpoint: 'Draw/GetDrawEntries'
		}).then((json) => {
			dispatch(fetchPlayedDrawsSuccess(json));
		}).catch(({ Message: error = 'Invalid'}) => {
			dispatch(fetchPlayedDrawsError(error));
		});
	};
}


/*
 Bet
 */
function postDrawBetStart(drawId) {
	return {
		type: POST_DRAW_BET,
		drawId
	};
}

function postDrawBetSuccess(drawId) {
	return {
		type: POST_DRAW_BET_SUCCESS,
		drawId,
		receivedAt: Date.now()
	};
}

function postDrawBetError(drawId, error) {
	return {
		type: POST_DRAW_BET_ERROR,
		drawId,
		error,
	};
}

export function postDrawBet(drawId, points) {
	return (dispatch) => {
		dispatch(postDrawBetStart(drawId));

		const data = {
			'DrawId': drawId,
			'PointsAmount': points,
		};

		return fetch({
			method: 'POST',
			endpoint: 'draw/bet',
			data
		}).then((json) => {
			dispatch(postDrawBetSuccess(drawId));
			dispatch(fetchProfileSuccess(json.User));
		}).catch(({ Message: error = 'Invalid' }) => {
			dispatch(postDrawBetError(drawId, error));
			throw error;
		});
	};
}

/*Claim*/

function postDrawClaimStart(drawId) {
	return {
		type: POST_DRAW_CLAIM,
		drawId
	};
}

function postDrawClaimSuccess(drawId) {
	return {
		type: POST_DRAW_CLAIM_SUCCESS,
		drawId,
		receivedAt: Date.now()
	};
}

function postDrawClaimError(drawId, error) {
	return {
		type: POST_DRAW_CLAIM_ERROR,
		drawId,
		error,
	};
}

export function postDrawClaim(drawId, {city, address, county, postcode}) {
	return (dispatch) => {
		dispatch(postDrawClaimStart(drawId));

		const data = {
			'DrawId': drawId,
			'Address1': city,
			'Address2': address,
			'County': county,
			'Postcode': postcode,
		};

		return fetch({
			method: 'POST',
			endpoint: 'Draw/ClaimPrize',
			data
		}).then((json) => {
			dispatch(postDrawClaimSuccess(drawId));
			dispatch(fetchPlayedDrawsSuccess({
				DrawEntries: [json] // update single item
			}));
		}).catch(({ Message: error = 'Invalid' }) => {
			dispatch(postDrawClaimError(drawId, error));
			throw error;
		});
	};
}
