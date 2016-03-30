DGW.global.api.easyXDM = easyXDM.noConflict('DGW.global.api');
DGW.global.api.rpc = new DGW.global.api.easyXDM.Rpc({
    remote: "http://spr-api-test.cloudapp.net/tunnel.html"
}, {
    remote: {
        apiTunnel: {}
    }
});

DGW.global.api.generic = function(apiName, callback, requestBody){
    var result = {},
        interval,
        method = '',
        endpoint= '';
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
            method = 'GET';
            endpoint = 'user/getuser';
            break;
        case 'getDraws':
            method = 'GET';
            endpoint = 'draw/getdraws';
            break;
        case 'getDrawEntries':
            method = 'GET';
            endpoint = 'draw/getdrawentries';
            break;
        case 'drawBet':
            method = 'POST';
            endpoint = 'draw/bet';
            requestBody = JSON.stringify(requestBody);
        case 'claimPrize':
            method = 'POST';
            endpoint = 'draw/claimprize';
            requestBody = JSON.stringify(requestBody);
            break;
    }
    DGW.global.api.rpc.apiTunnel({
            apiKey: DGW.global.api.apiKey,
            method: method,
            endpoint: endpoint,
            params: requestBody
        },
        function onSuccess(response) {
            if (response.error) {
                result.error = response.error;
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

DGW.global.api.requests.signUp = function(userObj){
    DGW.global.api.generic('signUp', function(result){
        if (!result.error) {
            console.info(result.data);
            DGW.global.authorized = true;
            DGW.global.methods.authorize();
            DGW.global.methods.profileSetData(result.data);
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
            DGW.global.methods.profileSetData(result.data);
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
                DGW.global.methods.profileSetData(result.data);
            }
        } else {
            DGW.global.authorized = false;
            console.error(result.error);
        }
        if (!DGW.global.launched) {
            // Showing side widget
            DGW.side.methods.showWidget();
            DGW.global.launched = true;
        }
    });
};

//Prefacebook loaders
(function(){
//fbAsyncInit
    window.fbAsyncInit = function () {
        FB.init({
            appId: '614550048660888',
            cookie: true,  // enable cookies to allow the server to access
            // the session
            xfbml: true,  // parse social plugins on this page
            version: 'v2.2' // use version 2.2
        });
    };

    (function (d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
})();

DGW.global.api.requests.fbConnect = function(){
    FB.login(function (response) {
            if (response.status === "connected") {
                // Logged into your app and Facebook.

                DGW.global.api.generic('facebookLogIn', function(result){
                    if (!result.error) {
                        console.info(result.data);
                    } else {
                        console.error(result.error);
                    }
                }, {
                    AccessToken: response.authResponse.accessToken,
                    ExpiresIn: response.authResponse.expiresIn
                });
            }
            else if (response.status === "not_authorized") {
                // The person is logged into Facebook, but not your app.
            }
            else {
                // The person is not logged into Facebook, so we're not sure if
                // they are logged into this app or not.
            }
        },
        { scope: "email" }
    );
};

DGW.global.api.requests.getDraws = function(){
    DGW.main.methods.loadingStarted();
    DGW.global.api.generic('getDraws', function(result) {
        if (!result.error) {
            console.info(result.data);
            DGW.main.cache.drawsList = result.data.Draws;
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