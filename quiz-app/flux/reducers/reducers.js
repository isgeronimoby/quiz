import { combineReducers } from 'redux';
import {
	ADD_POINTS,
	SELECT_PROFILE,
	INVALIDATE_PROFILE,
	REQUEST_PROFILE,
	RECEIVE_PROFILE
} from '../actions';

/*Own Profile*/

function profile(state = {
	userId: 0,
	name: 'Edward Snowden',
	picture: require("../../static/images/user-picture.jpg"),
	points: 220,
	pendingPoints: 110,
}, action) {
	switch (action.type) {
		case ADD_POINTS:
			return {
				...state,
				points: state.points + action.points,
			};
		default:
			return state;
	}
}

/*Other profiles*/


function selectedProfile(state = null, action) {
	switch (action.type) {
		case SELECT_PROFILE:
			return action.userId;
		default:
			return state;
	}
}

function profileByUserId(state = {
	isFetching: false,
	didInvalidate: false,
	data: {}
}, action) {
	switch (action.type) {
		case INVALIDATE_PROFILE:
			return {
				...state,
				didInvalidate: true,
			};
		case REQUEST_PROFILE:
			return {
				...state,
				isFetching: true,
				didInvalidate: true,
			};
		case RECEIVE_PROFILE:
			return {
				isFetching: false,
				didInvalidate: false,
				payload: action.payload,
				lastUpdated: action.receivedAt,
			};
		default:
			return state;
	}
}

function profiles(state = {}, action) {
	switch (action.type) {
		case INVALIDATE_PROFILE:
		case REQUEST_PROFILE:
		case RECEIVE_PROFILE:
			return {
				...state,
				[action.userId]: profileByUserId(state[action.userId], action)
			};
		default:
			return state;
	}
}

const rootReducer = combineReducers({
	profile,
	profiles,
	selectedProfile
});

export default rootReducer;
