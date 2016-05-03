DGW.global.api.easyXDM = easyXDM.noConflict('DGW.global.api');
DGW.global.api.rpc = new DGW.global.api.easyXDM.Rpc({
    remote: DGW.global.tunnelPath
}, {
    remote: {
        apiTunnel: {},
        writeClubCookie: {},
        readClubCookie: {}
    }
});

DGW.global.api.generic = function(apiName, callback, requestBody){
    var result = {},
        method = 'GET',
        endpoint = '';
        requestBody = requestBody || '';

    switch (apiName) {
        case 'getApp':
            endpoint = 'app/getapp';
            break;
        case 'signUp':
            method = 'POST';
            endpoint = 'auth/signup';
            requestBody = JSON.stringify(requestBody);
            break;
        case 'signIn':
            method = 'POST';
            endpoint = 'auth/login';
            requestBody = JSON.stringify(requestBody);
            break;
        case 'signOut':
            method = 'POST';
            endpoint = 'auth/logout';
            break;
        case 'forgotPass':
            method = 'POST';
            endpoint = 'auth/forgotpassword';
            requestBody = JSON.stringify(requestBody);
            break;
        case 'getUser':
            endpoint = 'user/getuser';
            break;
        case 'getDraws':
            endpoint = 'draw/getdraws';
            break;
        case 'getDrawEntries':
            endpoint = 'draw/getdrawentries';
            break;
        case 'drawBet':
            method = 'POST';
            endpoint = 'draw/bet';
            requestBody = JSON.stringify(requestBody);
            break;
        case 'drawPlayers':
            endpoint = 'draw/getdrawplayers?drawid=' + requestBody;
            break;
        case 'claimPrize':
            method = 'POST';
            endpoint = 'draw/claimprize';
            requestBody = JSON.stringify(requestBody);
            break;
        case 'getAllActivities':
            endpoint = 'activity/getallactivities';
            break;
        case 'getUserActivities':
            endpoint = 'activity/getuseractivities';
            break;
        case 'getOffers':
            endpoint = 'offer/getoffers';
            break;
        case 'trackOffer':
            method = 'POST';
            endpoint = 'offer/trackoffer';
            requestBody = JSON.stringify(requestBody);
            break;
        case 'completeOffer':
            method = 'POST';
            endpoint = 'offer/completeoffer';
            requestBody = JSON.stringify(requestBody);
            break;
        case 'cancelOffer':
            method = 'POST';
            endpoint = 'offer/canceloffer';
            requestBody = JSON.stringify(requestBody);
            break;
        case 'getUserOffers':
            endpoint = 'offer/getuseroffers';
            break;
        case 'getActions':
            endpoint = 'rewardedaction/getactions';
            break;
        case 'getUserActions':
            endpoint = 'rewardedaction/getuseractions';
            break;
        case 'trackAction':
            method = 'POST';
            endpoint = 'rewardedaction/trackrewardedaction';
            requestBody = JSON.stringify(requestBody);
            break;
        case 'getLeaderboard':
            endpoint = 'leaderboard/gettopearners';
            break;
        case 'getBadges':
            endpoint = 'badge/getbadges';
            break;
        case 'getEarnedBadges':
            endpoint = 'badge/getearnedbadges';
            break;
        case 'shareRewardAction':
            endpoint = 'draw/getsharelinks?drawid=' + requestBody;
            break;
        default:
            DGW.helpers.console.log('Api default occured');
    }
    DGW.global.api.rpc.apiTunnel({
            apiKey: DGW.global.api.apiKey,
            method: method,
            endpoint: endpoint,
            params: requestBody
        },
        function onSuccess(response) {
            result = response;
            if(callback) callback(response);
            DGW.main.methods.loadingFinished();
        },
        function onError(error) {
            DGW.helpers.console.error(error.message);
            DGW.main.methods.loadingFinished();
        });
    DGW.main.methods.loadingStarted();
};


DGW.global.api.requests.safariFix = function(){
    var w = window.open(DGW.global.tunnelPath +
    '?safarifix', '_blank', 'menubar=no,location=no,resizable=no,scrollbars=no,status=no, ' +
    'width=' + 1 + ', height=' + 1 + ', top=' + 0 + ', left=' + 0);
    var interval;
    interval = setInterval(function(){
        if (w.closed) {
            window.clearInterval(interval);
            DGW.global.safariFix = true;
            DGW.global.safariFixFirstOpen = true;
            DGW.global.api.requests.checkServerAvailability();
        }
    }, 50);
};

DGW.global.api.requests.checkServerAvailability = function(){
    DGW.global.api.generic('getApp', function(result){
        if (result.error && result.status == 500) {
            DGW.helpers.console.error('checkServerAvailability no-server', result);
        } else {
            DGW.helpers.console.info('checkServerAvailability: ', result);

            //TODO: refactor later
            DGW.global.club.name = result.data.FoundationName;
            DGW.global.api.requests.getDraws(DGW.global.api.requests.initMainFlow);
        }
    });
};

DGW.global.api.requests.initMainFlow = function(){
    var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
    if (isSafari && !DGW.global.safariFix) {
        DGW.global.api.requests.readServerCookie('safarifix', function (response) {
            if (!response) {
                DGW.global.methods.safariFixInit();
            } else {
                DGW.global.safariFix = true;
                DGW.global.api.requests.checkServerAvailability();
            }
        });
    } else {
        if (DGW.global.type == 'club') {
            DGW.global.api.requests.setServerCookie(DGW.global.club.name, function (response) {
                if (response) {
                    DGW.global.methods.init();
                } else {
                    DGW.helpers.console.warn('no third party cookies enabled');
                }
            });
        } else if (DGW.global.type == 'sponsor') {
            DGW.global.api.requests.readServerCookie(DGW.global.club.name, function (response) {
                if (response == 1) {
                    DGW.global.methods.init();
                }
            });
        } else {
            DGW.helpers.console.warn('Please, add "data-type" attribute to the widget');
        }
    }
};

DGW.global.api.requests.setServerCookie = function(cookieName, _callback){
    DGW.global.api.rpc.writeClubCookie(cookieName, function onSuccess(response){
        DGW.helpers.console.info(response);
        if (_callback) _callback(response);
    });
};

DGW.global.api.requests.readServerCookie = function(cookieName, _callback){
    DGW.global.api.rpc.readClubCookie(cookieName, function onSuccess(response){
        DGW.helpers.console.info(response);
        if (_callback) _callback(response);
    });
};

DGW.global.api.requests.connectFB = function(onSuccess, onError){
    DGW.helpers.centerWindowPopup(DGW.global.envPath +
    'auth/facebook?api_key=' + DGW.global.api.apiKey, 'fbWindow', 460, 340, function(){
        if(onSuccess) onSuccess();
    });
};

DGW.global.api.requests.signUp = function(userObj, onSuccess, onError){
    DGW.global.api.generic('signUp', function(result){
        if (result.status == 200) {
            DGW.helpers.console.info('signUp: ', result.data);
            DGW.global.authorized = true;
            DGW.global.methods.authorize();
            DGW.main.methods.profileSetData(result.data);
            if (onSuccess) onSuccess(result.data);
        } else {
            DGW.global.authorized = false;
            DGW.helpers.console.error('signUp ', result.error);
            if (onError) onError(result.error);
        }
    }, {
        Username: userObj.Username,
        Email: userObj.Email,
        Password: userObj.Password
    });
};

DGW.global.api.requests.signIn = function(userObj, onSuccess, onError){
    DGW.global.api.generic('signIn', function(result){
        if (result.status == 200) {
            DGW.helpers.console.info('signIn ', result.data);
            DGW.global.methods.authorize();
            DGW.main.methods.profileSetData(result.data);
            DGW.global.authorized = true;
            if (onSuccess) onSuccess(result.data);
        } else {
            DGW.global.authorized = false;
            DGW.helpers.console.error('signIn ', result.error);
            if (onError) onError(result.error);
        }
    }, {
        Email: userObj.Email,
        Password: userObj.Password
    });
};

DGW.global.api.requests.signOut = function(){
    DGW.global.api.generic('signOut', function(){
        //TODO: review it later, maybe
        DGW.helpers.console.info('Signed out');
        DGW.global.authorized = false;
        DGW.global.methods.unAuthorize();
    });
};

DGW.global.api.requests.forgotPass = function(email, onSuccess, onError){
    DGW.global.api.generic('forgotPass', function(result){
        if (result.status == 200) {
            DGW.helpers.console.info('forgotPass ', result.data);
            if (onSuccess) onSuccess(result.data);
        } else {
            DGW.helpers.console.error('forgotPass ', result.error);
            if (onError) onError(result.error);
        }
    }, {
        Email: email
    });
};

DGW.global.api.requests.getUser = function(onSuccess, onError){
    DGW.global.api.generic('getUser', function(result){
        if (result.status == 200) {
            DGW.helpers.console.info('getUser success ', result.data);
            if (DGW.global.authorized === false) {
                DGW.global.authorized = true;
                DGW.global.methods.authorize();
            }
            DGW.main.methods.profileSetData(result.data);
            if (onSuccess) onSuccess(result.data);
        } else {
            DGW.global.authorized = false;
            DGW.global.methods.unAuthorize();
            DGW.helpers.console.error('getUser anon ', result);
            if (onError) onError(result.error);
        }
    });
};

DGW.global.api.requests.getDraws = function(onSuccess, onError){
    DGW.global.api.generic('getDraws', function(result) {
        if (result.status == 200) {
            DGW.helpers.console.info('getDraws ', result.data);
            DGW.main.cache.drawsList = result.data.Draws.sort(function(a,b){return new Date(b.EndDate) - new Date(a.EndDate)});

            DGW.global.cache.last.winner = DGW.main.cache.drawsList.filter(function(draw){return draw.Winner !== null})[0].Winner;
            DGW.global.cache.last.prize = DGW.main.cache.drawsList[0].Prize;

            if (DGW.global.authorized == true) {
                DGW.global.api.requests.getDrawEntries();
            } else {
                DGW.main.methods.drawsConstructor(DGW.main.cache);
            }
            if (onSuccess) onSuccess(result.data);
        } else {
            DGW.helpers.console.error('getDraws ', result.error);
            if (onError) onError(result.error);
        }
    });
};

DGW.global.api.requests.getDrawEntries = function(onSuccess, onError){
    DGW.global.api.generic('getDrawEntries', function(result){
        if (result.status == 200) {
            DGW.helpers.console.info('getDrawEntries ', result.data);
            DGW.main.cache.drawsEntries = result.data.DrawEntries;

            DGW.main.methods.drawsConstructor(DGW.main.cache);
            if (onSuccess) onSuccess(result.data);
        } else {
            DGW.helpers.console.error('getDrawEntries ', result.error);
            if (onError) onError(result.error);
        }
    });
};

DGW.global.api.requests.drawBet = function(drawId, pointsAmount, onSuccess, onError){
    DGW.global.api.generic('drawBet', function(result){
        if (result.status == 200) {
            DGW.helpers.console.info('drawBet ', result);
            DGW.global.api.requests.getDrawEntries();
            DGW.main.methods.updateUserInfoBet(result.data.DrawEntry, result.data.User);
            if (onSuccess) onSuccess(result.data);
        } else {
            if (onError) onError(result.error);
            DGW.helpers.console.error('drawBet ', result.error);
        }
    },{
        DrawId: drawId,
        PointsAmount: pointsAmount
    });
};

DGW.global.api.requests.drawPlayers = function(drawId, onSuccess, onError){
    DGW.global.api.generic('drawPlayers', function(result){
        if (result.status == 200) {
            DGW.helpers.console.info('drawPlayers ', result);
            if (onSuccess) onSuccess(result.data);
        } else {
            if (onError) onError(result.error);
            DGW.helpers.console.error('drawPlayers ', result.error);
        }
    }, drawId);
};

DGW.global.api.requests.claimPrize = function(drawId, address, onSuccess, onError){
    DGW.global.api.generic('claimPrize', function(result){
        if (result.status == 200) {
            if (onSuccess) onSuccess(result.data);
        } else {
            if (onError) onError(result.error);
            DGW.helpers.console.error(result.error);
        }
    },{
        DrawId: drawId,
        Address1: address.Address1,
        Address2: address.Address2,
        County: address.County,
        Postcode: address.Postcode
    });
};

DGW.global.api.requests.getAllActivities = function(onSuccess, onError){
    DGW.global.api.generic('getAllActivities', function(result){
        if (result.status == 200) {
            DGW.helpers.console.info('getAllActivities ', result.data);
            DGW.main.methods.activitiesConstructor(result.data.Activities);
            if (onSuccess) onSuccess(result.data);
        } else {
            DGW.helpers.console.error('getAllActivities ', result.error);
            if (onError) onError(result.error);
        }
    });
};

DGW.global.api.requests.getUserActivities = function(onSuccess, onError){
    DGW.global.api.generic('getUserActivities', function(result){
        if (result.status == 200) {
            DGW.helpers.console.info('getUserActivities ', result.data);
            DGW.main.methods.activitiesConstructor(result.data.Activities);
            if (onSuccess) onSuccess(result.data);
        } else {
            DGW.helpers.console.error('getUserActivities ', result.error);
            if (onError) onError(result.error);
        }
    });
};

DGW.global.api.requests.getOffers = function(onSuccess, onError){
    DGW.global.api.generic('getOffers', function(result){
        if (result.status == 200) {
            DGW.helpers.console.info('getOffers ', result.data);
            DGW.main.methods.offersConstructor(result.data);
            if (onSuccess) onSuccess(result.data);
        } else {
            DGW.helpers.console.error('getOffers ', result.error);
            if (onError) onError(result.error);
        }
    });
};

DGW.global.api.requests.getUserOffers = function(onSuccess, onError){
    DGW.global.api.generic('getUserOffers', function(result){
        if (result.status == 200) {
            DGW.helpers.console.info('getUserOffers ', result.data);
            DGW.main.methods.offersConstructor(result.data);
            DGW.global.userStats.earnToday = result.data.TotalPointsReward;
            if (onSuccess) onSuccess(result.data);
        } else {
            DGW.helpers.console.error('getUserOffers ', result.error);
            if (onError) onError(result.error);
        }
    });
};

DGW.global.api.requests.trackOffer = function(offerId, onSuccess, onError){
    DGW.global.api.generic('trackOffer', function(result){
        if (result.status == 200) {
            DGW.helpers.console.info(result.data);
            DGW.helpers.console.info('Tracking of ' + offerId + ' has started');
            if (onSuccess) onSuccess(result.data);
        } else {
            DGW.helpers.console.error('trackOffer ', result.error);
            if (onError) onError(result.error);
        }
    }, {
        OfferId: offerId
    });
};

DGW.global.api.requests.completeOffer = function(offerId, onSuccess, onError){
    DGW.global.api.generic('completeOffer', function(result){
        if (result.status == 200) {
            DGW.helpers.console.info(result.data);
            DGW.helpers.console.info('Offer ' + offerId + ' has been completed');
            DGW.global.api.requests.getUser();
            DGW.global.api.requests.getUserOffers();
            if (onSuccess) onSuccess(result.data);
        } else {
            DGW.helpers.console.error('completeOffer ', result.error);
            if (onError) onError(result.error);
        }
    }, {
        OfferId: offerId
    });
};

DGW.global.api.requests.cancelOffer = function(offerId, onSuccess, onError){
    DGW.global.api.generic('cancelOffer', function(result){
        if (result.status == 200) {
            DGW.helpers.console.info(result.data);
            DGW.helpers.console.info('Offer ' + offerId + ' has been cancelled');
            DGW.global.api.requests.getUser();
            DGW.global.api.requests.getUserOffers();
            if (onSuccess) onSuccess(result.data);
        } else {
            DGW.helpers.console.error('cancelOffer ', result.error);
            if (onError) onError(result.error);
        }
    }, {
        OfferId: offerId
    });
};

DGW.global.api.requests.getActions = function(onSuccess, onError){
    DGW.global.api.generic('getActions', function(result){
        if (result.status == 200) {
            DGW.helpers.console.info('getActions ', result.data);
            DGW.main.cache.rewardedActions = result.data.Actions;
            DGW.main.methods.setRewardedActions();
            if (onSuccess) onSuccess(result.data);
        } else {
            DGW.helpers.console.error('getActions ', result.error);
            if (onError) onError(result.error);
        }
    });
};

DGW.global.api.requests.getUserActions = function(onSuccess, onError){
    DGW.global.api.generic('getUserActions', function(result){
        if (result.status == 200) {
            DGW.helpers.console.info('getUserActions ', result.data);
            DGW.main.cache.rewardedActions = result.data.Actions;
            DGW.main.methods.setRewardedActions();
            if (onSuccess) onSuccess(result.data);
        } else {
            DGW.helpers.console.error('getUserActions ', result.error);
            if (onError) onError(result.error);
        }
    });
};

DGW.global.api.requests.trackAction = function(actionType, onSuccess, onError){
    DGW.global.api.generic('trackAction', function(result){
            if (result.status == 200) {
                DGW.helpers.console.info('trackAction ', result.data);
                DGW.global.api.requests.getUserActions();
                DGW.global.api.requests.getUser();

                if (result.data.RewardResult) {
                    // rewarded
                    //DGW.main.methods.notificationConstructor()
                    if (onSuccess) onSuccess(result.data);
                } else {

                }
            } else {
                DGW.helpers.console.error('trackAction ', result.error);
                if (onError) onError(result.error);
            }
        },
        {
            RewardedActionTypeId: actionType
        });
};


DGW.global.api.requests.getLeaderboard = function(onSuccess, onError){
    DGW.global.api.generic('getLeaderboard', function(result){
        if (result.status == 200) {
            DGW.helpers.console.info('getLeaderboard ', result.data);
            DGW.main.methods.leaderboardConstructor(result.data.Earners);
            if (onSuccess) onSuccess(result.data);
        } else {
            DGW.helpers.console.error('getLeaderboard ', result.error);
            if (onError) onError(result.error);
        }
    });
};

DGW.global.api.requests.getAllBadges = function(onSuccess, onError){
    DGW.global.api.generic('getBadges', function(result){
        if (result.status == 200) {
            DGW.helpers.console.info('getBadges ', result.data);
            DGW.global.userStats.badges.all = result.data.Badges;
            DGW.global.api.requests.getEarnedBadges();
            if (onSuccess) onSuccess(result.data);
        } else {
            DGW.helpers.console.error('getBadges ', result.error);
            if (onError) onError(result.error);
        }
    });
};

DGW.global.api.requests.getEarnedBadges = function(onSuccess, onError){
    DGW.global.api.generic('getEarnedBadges', function(result){
        if (result.status == 200) {
            DGW.helpers.console.info('getEarnedBadges ', result.data);
            DGW.global.userStats.badges.earned = result.data.EarnedBadges;
            DGW.main.methods.updateBadgesInfo();
            if (onSuccess) onSuccess(result.data);
        } else {
            DGW.helpers.console.error('getEarnedBadges ', result.error);
            if (onError) onError(result.error);
        }
    });
};

DGW.global.api.requests.shareRewardAction = function(drawId, onSuccess, onError){
    DGW.global.api.generic('shareRewardAction', function(result){
        if (result.status == 200) {
            DGW.helpers.console.info('shareRewardedAction: ', result.data);
            if (onSuccess) onSuccess(result.data);
        } else {
            DGW.helpers.console.error('shareRewardedAction: ', result.error);
            if (onError) onError(result.error);
        }
    }, drawId)
};