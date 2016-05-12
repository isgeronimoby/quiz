import fetch from '../../lib/fetch.js';
import { Window } from '../../lib/utils.js';
import { fetchProfileSuccess } from './profile.js';

export const FETCH_REWARDS = 'FETCH_REWARDS';
export const FETCH_REWARDS_SUCCESS = 'FETCH_REWARDS_SUCCESS';
export const FETCH_REWARDS_ERROR = 'FETCH_REWARDS_ERROR';

const REWARD_FACEBOOK_SHARE_TYPE = 'MatchQuizFacebookShare';
const REWARD_FACEBOOK_SHARE_ID = 8;
const REWARD_TWITTER_SHARE_TYPE = 'MatchQuizTwitterShare';
const REWARD_TWITTER_SHARE_ID = 9;

const popup = new Window();


function fetchRewardsStart() {
	return {
		type: FETCH_REWARDS
	};
}

function fetchRewardsSuccess(json) {
	return {
		type: FETCH_REWARDS_SUCCESS,
		payload: json.Actions.reduce((acc, {
			Id: rewardId,
			PointsReward: rewardPoints,
			Type: rewardType,
			}) => {
			switch (rewardType) {
				case REWARD_FACEBOOK_SHARE_TYPE:
					return {
						...acc,
						facebookShare: {
							rewardId,
							rewardPoints
						}
					};
				case REWARD_TWITTER_SHARE_TYPE:
					return {
						...acc,
						twitterShare: {
							rewardId,
							rewardPoints
						}
					};
				default:
					return acc;
			}
		}, {}),
		receivedAt: Date.now()
	};
}

function fetchRewardsError(error) {
	return {
		type: FETCH_REWARDS_ERROR,
		error
	};
}

export function fetchRewards() {
	return (dispatch) => {
		dispatch(fetchRewardsStart());

		return fetch({
			endpoint: 'rewardedaction/getuseractions'
		}).then((json) => {
			dispatch(fetchRewardsSuccess(json));
		}).catch(({ Message: error = 'Invalid'}) => {
			dispatch(fetchRewardsError(error)); // TODO
			throw error;
		});
	};
}

function postTrackRewards(typeId) {
	return (dispatch) => {
		return fetch({
			method: 'POST',
			endpoint: 'rewardedaction/trackrewardedaction',
			data: {
				'RewardedActionTypeId': typeId,
			}
		}).then((json) => {
			dispatch(fetchRewards()).then(() => {
				dispatch(fetchProfileSuccess(json.User));
			});
		});
	};
}

export function startSharingFacebook() {
	return (dispatch) => {
		const { origin } = document.location;
		const url = `http://www.facebook.com/sharer/sharer.php?u=${ encodeURIComponent(origin) }`;
		const title = 'Facebook';

		popup.open({url, title}, () => {
			dispatch(postTrackRewards(REWARD_FACEBOOK_SHARE_ID));
		});
	};
}

export function startSharingTwitter() {
	return (dispatch) => {
		const tweet = 'I have just predicted this match, can you predict better?';
		const { origin } = document.location;
		const url = `https://twitter.com/intent/tweet?text=${ encodeURI(tweet) }&url=${ encodeURIComponent(origin) }&hashtags=everton,matchquiz`;
		const title = 'Twitter';

		popup.open({url, title}, () => {
			dispatch(postTrackRewards(REWARD_TWITTER_SHARE_ID));
		});
	};
}
