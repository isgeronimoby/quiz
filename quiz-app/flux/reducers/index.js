import { combineReducers } from 'redux';
import { showWelcomePopup, auth } from './auth.js';
import { profile } from './profile.js';
import { fixtures } from './fixtures.js';
import { quizes, selectedMatchId } from './quiz.js';
import { partners } from './partners.js';
import { userList, userProfiles, selectedUserProfile } from './users.js';
import { draws, selectedDrawId } from './draws.js';
import { rewards } from './rewards.js';
import { earns } from './earns.js';


const rootReducer = combineReducers({
	showWelcomePopup,
	auth,
	profile,
	fixtures,
	quizes,
	selectedMatchId,
	draws,
	selectedDrawId,
	rewards,
	earns,

	// Somewhat shaky:
	partners,
	userList,
	userProfiles,
	selectedUserProfile,
});

export default rootReducer;
