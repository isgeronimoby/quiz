import fetch, { apiPrefix, apiKey } from '../../lib/fetch.js';
import { Window } from '../../lib/utils.js';
import { fetchProfile, fetchProfileSuccess } from './profile.js';

const popup = new Window();

export const FETCH_EARNS = 'FETCH_EARNS';
export const FETCH_EARNS_SUCCESS = 'FETCH_EARNS_SUCCESS';
export const FETCH_EARNS_ERROR = 'FETCH_EARNS_ERROR';


/*
 All earns
 */

function fetchEarnsStart() {
	return {
		type: FETCH_EARNS
	};
}

function fetchEarnsSuccess(json) {
	return {
		type: FETCH_EARNS_SUCCESS,
		payload: json.Offers.map(({
			Offer: {
				Id: earnId,
				Type: {
					Group: {
						Name: type
						},
					Name: subType,
					ImageUrl: imageUrl
					},
				Title: title,
				Description: description,
				PointsReward: earnPoints,
				CustomData: customData,
				}
			}) => {
			return {
				earnId,
				type,
				subType,
				imageUrl,
				title,
				description,
				earnPoints,
				customData,
			}
		}),
		receivedAt: Date.now()
	};
}

function fetchEarnsError(error) {
	return {
		type: FETCH_EARNS_ERROR,
		error
	};
}

function fetchEarns() {
	return (dispatch) => {
		dispatch(fetchEarnsStart());

		return fetch({
			endpoint: 'Offer/GetOffers'
		}).then((json) => {
			dispatch(fetchEarnsSuccess(json));
		}).catch(({ Message: error = 'Invalid'}) => {
			dispatch(fetchEarnsError(error)); // TODO
		});
	};
}

function shouldFetchEarns(state) {
	const { draws } = state;
	if (!draws.list.length) {
		return true;
	} else if (draws.isFetching) {
		return false;
	} else {
		return draws.didInvalidate;
	}
}

export function fetchEarnsIfNeeded() {
	return (dispatch, getState) => {
		if (shouldFetchEarns(getState())) {
			return dispatch(fetchEarns());
		} else {
			return Promise.resolve();
		}
	};
}

/*
 User completed earns
 */
export function fetchPlayedEarns() {
	return (dispatch) => {
		return fetch({
			endpoint: 'Offer/GetUserOffers'
		}).then((json) => {
			dispatch(fetchEarnsSuccess(json)); // just replaces all-items list
		}).catch(({ Message: error = 'Invalid'}) => {
			// Nothing
		});
	};
}


/*
 Start earning flow
 */
function postTrackOffer(earnId) {
	return (dispatch) => {
		return fetch({
			method: 'POST',
			endpoint: 'Offer/TrackOffer',
			data: {
				'OfferId': earnId,
			}
		}).then((json) => {
			dispatch(fetchProfileSuccess(json.User));
		});
	};
}

function postCompleteOffer(earnId) {
	return (dispatch) => {
		return fetch({
			method: 'POST',
			endpoint: 'Offer/CompleteOffer',
			data: {
				'OfferId': earnId,
			}
		}).then(() => {
			dispatch(fetchProfile());
			dispatch(fetchPlayedEarns());
		}).catch(() => {
			//TODO
		});
	};
}

// TODO - why needed?
function postCancelOffer(earnId) {
	return fetch({
		method: 'POST',
		endpoint: 'Offer/CancelOffer',
		data: {
			'OfferId': earnId,
		}
	});
}

export function startEarnSharingTwitter(earnId, customData) {
	return (dispatch) => {
		const { Hashtags, TweetText, Url } = customData;
		const url = `https://twitter.com/intent/tweet?text=${ encodeURI(TweetText) }&url=${ encodeURIComponent(Url) }&hashtags=${ Hashtags }`;
		const title = 'Twitter';

		dispatch(postTrackOffer(earnId));

		popup.open({url, title}, () => {
			dispatch(postCompleteOffer(earnId));
		});
	};
}

export function startEarnSharingFacebook(earnId, customData) {
	return (dispatch) => {
		const { Url } = customData; // TODO - unused?
		const url = `${apiPrefix}Offer/FacebookShare?api_key=${apiKey}&OfferId=${ encodeURIComponent(earnId) }`;
		const title = 'Facebook';

		//console.log('>>[%s]', url);

		popup.open({url, title}, () => {
			dispatch(fetchProfile());
			dispatch(fetchPlayedEarns());
		});
	};
}
