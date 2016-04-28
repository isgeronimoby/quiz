import { combineReducers } from 'redux';
import {
	ADD_POINTS,
	SELECT_USER,
	INVALIDATE_USER,
	REQUEST_USER,
	RECEIVE_USER
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

/*
 Users
 */

function selectedUser(state = null, action) {
	switch (action.type) {
		case SELECT_USER:
			return action.userId;
		default:
			return state;
	}
}

function userById(state = {
	isFetching: false,
	didInvalidate: false,
	data: {}
}, action) {
	switch (action.type) {
		case INVALIDATE_USER:
			return {
				...state,
				didInvalidate: true,
			};
		case REQUEST_USER:
			return {
				...state,
				isFetching: true,
				didInvalidate: true,
			};
		case RECEIVE_USER:
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

function users(state = {}, action) {
	switch (action.type) {
		case INVALIDATE_USER:
		case REQUEST_USER:
		case RECEIVE_USER:
			return {
				...state,
				[action.userId]: userById(state[action.userId], action)
			};
		default:
			return state;
	}
}

const rootReducer = combineReducers({
	profile,
	users,
	selectedUser
});

export default rootReducer;
