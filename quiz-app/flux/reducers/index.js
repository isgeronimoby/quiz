import { combineReducers } from 'redux';
import { showWelcomePopup, auth } from './auth.js';
import { profile } from './profile.js';
import { fixtures } from './fixtures.js';
import { quizes, selectedQuiz } from './quiz.js';
import { partners } from './partners.js';
import { userList, userProfiles, selectedUserProfile } from './users.js';
import { draws, selectedDraw } from './draws.js';


const rootReducer = combineReducers({
	showWelcomePopup,
	auth,
	profile,
	fixtures,
	quizes,
	selectedQuiz,
	draws,
	selectedDraw,

	// Somewhat shaky:
	partners,
	userList,
	userProfiles,
	selectedUserProfile,
});

export default rootReducer;
