DGW.global.api.easyXDM = easyXDM.noConflict('DGW.global.api');
DGW.global.api.rpc = new DGW.global.api.easyXDM.Rpc({
    remote: DGW.global.tunnelPath
}, {
    remote: {
        apiTunnel: {}
    }
});

DGW.global.api.generic = function(apiName, callback, requestBody){
    var result = {},
        interval,
        method = 'GET',
        endpoint = '';
        requestBody = requestBody || '';

    switch (apiName) {
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
        case 'facebookLogIn':
            method = 'POST';
            endpoint = 'auth/facebookconnect';
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
        case 'claimPrize':
            method = 'POST';
            endpoint = 'draw/claimprize';
            requestBody = JSON.stringify(requestBody);
            break;
        case 'getAllActivities':
            endpoint = 'activityfeed/getallactivities';
            break;
        case 'getUserActivities':
            endpoint = 'activityfeed/getuseractivities';
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
        case 'getUserOffers':
            endpoint = 'offer/getuseroffers';
            break;
        case 'getActions':
            endpoint = 'rewardedaction/getactions';
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
        default:
    }
    DGW.global.api.rpc.apiTunnel({
            apiKey: DGW.global.api.apiKey,
            method: method,
            endpoint: endpoint,
            params: requestBody
        },
        function onSuccess(response) {
            if (response.error) {
                result.error = response;
            } else if (response.data !== null) {
                result.data = response.data;
            } else {
                if (result !== undefined)
                    result = null;
            }
        },
        function onError(error) {
            console.error(error.message);
        });

    interval = setInterval(function(){
        if (result === null || result === undefined) {
            clearInterval(interval);
            console.log('no data');
            callback(result);
        } else if ( Object.keys(result).length > 0 ) {
            clearInterval(interval);
            callback(result);
        }  else {
            console.log('retrieving data');
        }
    }, 500);
};

DGW.global.api.requests.checkServerAvailability = function(){
    DGW.global.api.generic('getUser', function(result){
        if (!result.error) {
            DGW.global.methods.init();
            console.info(result.data);
        } else {
            if (result.error.status != 500) {
                DGW.global.methods.init();
                console.info(result.data);
            }
            console.error(result);
        }
    });
};

DGW.global.api.requests.signUp = function(userObj){
    DGW.global.api.generic('signUp', function(result){
        if (!result.error) {
            console.info(result.data);
            DGW.global.authorized = true;
            DGW.global.methods.authorize();
            DGW.main.methods.profileSetData(result.data);
        } else {
            DGW.global.authorized = false;
            console.error(result.error);
        }
    }, {
        Username: userObj.Username,
        Email: userObj.Email,
        Password: userObj.Password
    });
};

DGW.global.api.requests.signIn = function(userObj){
    DGW.global.api.generic('signIn', function(result){
        if (!result.error) {
            console.info(result.data);
            DGW.global.methods.authorize();
            DGW.main.methods.profileSetData(result.data);
            DGW.global.authorized = true;
        } else {
            DGW.global.authorized = false;
            console.error(result.error);
        }
    }, {
        Email: userObj.Email,
        Password: userObj.Password
    });
};

DGW.global.api.requests.signOut = function(){
    DGW.global.api.generic('signOut', function(result){
        //TODO: review it later, maybe
        console.info('Signed out');
        DGW.global.authorized = false;
        DGW.global.methods.unAuthorize();
    });
};

DGW.global.api.requests.getUser = function(){
    DGW.global.api.generic('getUser', function(result){
        if (!result.error) {
            console.info(result.data);
            if (DGW.global.authorized === false) {
                DGW.global.authorized = true;
                DGW.global.methods.authorize();
            }
            DGW.main.methods.profileSetData(result.data);
        } else {
            if (result.error.status == 500) {
                console.log('error error error');
            } else {
                DGW.global.authorized = false;
            }
            console.error(result);
        }
        if (!DGW.global.launched) {
            // Showing side widget
            DGW.side.methods.showWidget();
            DGW.global.launched = true;
        }
    });
};

DGW.global.api.requests.getDraws = function(){
    DGW.main.methods.loadingStarted();
    DGW.global.api.generic('getDraws', function(result) {
        if (!result.error) {
            console.info(result.data);
            DGW.main.cache.drawsList = result.data.Draws.sort(function(a,b){return new Date(b.EndDate) - new Date(a.EndDate)});
            if (DGW.global.authorized == true) {
                DGW.global.api.requests.getDrawEntries();
            } else {
                DGW.main.methods.drawsConstructor(DGW.main.cache);
                DGW.main.methods.loadingFinished();
            }
        } else {
            console.error(result.error);
        }
    });
};

DGW.global.api.requests.getDrawEntries = function(){
    DGW.global.api.generic('getDrawEntries', function(result){
        if (!result.error) {
            console.info(result.data);
            DGW.main.cache.drawsEntries = result.data.DrawEntries;

            DGW.main.methods.drawsConstructor(DGW.main.cache);
            DGW.main.methods.loadingFinished();
        } else {
            console.error(result.error);
        }
    });
};

DGW.global.api.requests.drawBet = function(drawId, pointsAmount){
    DGW.global.api.generic('drawBet', function(result){
        if (!result.error) {
            console.log(result);
            DGW.global.api.requests.getDrawEntries();
            DGW.main.methods.updateUserInfoBet(result.data.DrawEntry, result.data.User);
        } else {
            console.error(result.error);
        }
    },{
        DrawId: drawId,
        PointsAmount: pointsAmount
    });
};

DGW.global.api.requests.claimPrize = function(drawId, address, el){
    DGW.global.api.generic('claimPrize', function(result){
        if (!result.error) {
            DGW.helpers.addClass(el, 'claimed');
        } else {
            console.error(result.error);
        }
    },{
        DrawId: drawId,
        Address1: address
    });
};

DGW.global.api.requests.connectFB = function(){
    DGW.helpers.centerWindowPopup(DGW.global.tunnelPath.substring(DGW.global.tunnelPath.lastIndexOf('/') + 1, 0) +
    'publisher/v1/auth/facebook?api_key=' + DGW.global.api.apiKey, 'fbWindow', 460, 340);
};

DGW.global.api.requests.getAllActivities = function(){
    DGW.main.methods.loadingStarted();
    DGW.global.api.generic('getAllActivities', function(result){
        if (!result.error) {
            console.info(result.data);
            DGW.main.methods.activitiesConstructor(result.data.Activities);
            DGW.main.methods.loadingFinished();
        } else {
            console.error(result.error);
        }
    });
};

DGW.global.api.requests.getUserActivities = function(){
    DGW.main.methods.loadingStarted();
    DGW.global.api.generic('getUserActivities', function(result){
        if (!result.error) {
            console.info(result.data);
            DGW.main.methods.loadingFinished();
            DGW.main.methods.activitiesConstructor(result.data.Activities);
        } else {
            console.error(result.error);
        }
    });
};

DGW.global.api.requests.getOffers = function(){
    DGW.main.methods.loadingStarted();
    DGW.global.api.generic('getOffers', function(result){
        if (!result.error) {
            console.info(result.data);
            DGW.main.methods.loadingFinished();
            DGW.main.methods.offersConstructor(result.data);
        } else {
            console.error(result.error);
        }
    });
};

DGW.global.api.requests.getUserOffers = function(){
    DGW.main.methods.loadingStarted();
    DGW.global.api.generic('getUserOffers', function(result){
        if (!result.error) {
            console.info(result.data);
            DGW.main.methods.loadingFinished();
            DGW.main.methods.offersConstructor(result.data);
        } else {
            console.error(result.error);
        }
    });
};

DGW.global.api.requests.trackOffer = function(offerId){
    DGW.global.api.generic('getOffers', function(result){
        if (!result.error) {
            console.info(result.data);
        } else {
            console.error(result.error);
        }
    }, {
        OfferId: offerId
    });
};

DGW.global.api.requests.completeOffer = function(offerId){
    DGW.global.api.generic('completeOffer', function(result){
        if (!result.error) {
            console.info(result.data);
        } else {
            console.error(result.error);
        }
    }, {
        OfferId: offerId
    });
};

DGW.global.api.requests.getActions = function(){
    DGW.global.api.generic('getActions', function(result){
        if (!result.error) {
            console.info(result.data);
            DGW.main.cache.rewardedActions = result.data.Actions;
            DGW.main.methods.setRewardedActions();
        } else {
            console.error(result.error);
        }
    });
};

DGW.global.api.requests.getLeaderboard = function(){
    DGW.global.api.generic('getLeaderboard', function(result){
        if (!result.error) {
            console.info(result.data);
            DGW.main.methods.leaderboardConstructor(result.data.Earners);
        } else {
            console.error(result.error);
        }
    });
};

DGW.global.api.requests.getAllBadges = function(){
    DGW.global.api.generic('getBadges', function(result){
        if (!result.error) {
            console.info(result.data);
            DGW.global.userStats.badges.all = result.data.Badges;
            DGW.global.api.requests.getEarnedBadges();
        } else {
            console.error(result.error);
        }
    });
};

DGW.global.api.requests.getEarnedBadges = function(){
    DGW.global.api.generic('getEarnedBadges', function(result){
        if (!result.error) {
            console.info(result.data);
            DGW.global.userStats.badges.earned = result.data.EarnedBadges;
            DGW.main.methods.updateBadgesInfo();
        } else {
            console.error(result.error);
        }
    });
};