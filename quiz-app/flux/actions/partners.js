import partnersData from '../../components/PartnersContainer/data.js'; // fake response data
// TODO- api

export const FETCH_PARTNERS = 'FETCH_PARTNERS';
export const FETCH_PARTNERS_SUCCESS = 'FETCH_PARTNERS_SUCCESS';
export const FETCH_PARTNERS_ERROR = 'FETCH_PARTNERS_ERROR'; // TODO
export const INVALIDATE_PARTNERS = 'INVALIDATE_PARTNERS'; // TODO

const DELAY = 100;

function fetchPartnersStart() {
	return {
		type: FETCH_PARTNERS,
	};
}


function fetchPartnersSuccess(json) {
	return {
		type: FETCH_PARTNERS_SUCCESS,
		payload: json,
		receivedAt: Date.now()
	};
}

function fetchPartners() {
	return (dispatch) => {
		dispatch(fetchPartnersStart());

		console.log('>>TODO: fetch /partners');

		const response = partnersData;

		return new Promise((resolve, reject) => {
			setTimeout(() => resolve(response), DELAY);
		}).then((json) => {
			dispatch(fetchPartnersSuccess(json));
		});
	};
}

function shouldFetchPartners(state) {
	const partners = state.partners;
	if (!partners.payload.length) {
		return true;
	} else if (partners.isFetching) {
		return false;
	} else {
		return partners.didInvalidate;
	}
}

export function fetchPartnersIfNeeded() {
	return (dispatch, getState) => {
		if (shouldFetchPartners(getState())) {
			return dispatch(fetchPartners());
		} else {
			return Promise.resolve();
		}
	};
}
