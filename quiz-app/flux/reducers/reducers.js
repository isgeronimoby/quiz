import { combineReducers } from 'redux';
import { ADD_POINTS } from '../actions';


function profile(state = {
	points: 0,
	userName: '',
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


const rootReducer = combineReducers({
	profile
});

export default rootReducer;
