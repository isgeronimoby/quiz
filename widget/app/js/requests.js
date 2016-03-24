DGW.global.api.easyXDM = easyXDM.noConflict('DGW.global.api');
DGW.global.api.rpc = new DGW.global.api.easyXDM.Rpc({
    remote: "http://spr-api-test.cloudapp.net/content/tunnel.html"
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
            DGW.global.methods.authorize();
            DGW.global.methods.profileSetData(result.data);
        } else {
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
        } else {
            console.error(result.error);
        }
    }, {
        Email: userObj.Email,
        Password: userObj.Password
    });
};

DGW.global.api.requests.signOut = function(){
    DGW.global.api.generic('signOut', function(result){
        if (!result.error) {
            console.info(result.data);
            DGW.global.methods.unAuthorize();
        } else {
            console.error(result.error);
        }
    });
};

DGW.global.api.requests.getUser = function(){
    DGW.global.api.generic('getUser', function(result){
        if (!result.error) {
            console.info(result.data);
        } else {
            console.error(result.error);
        }
    });
};

DGW.global.api.requests.getDraws = function(){
    DGW.main.methods.loadingStarted();
    DGW.global.api.generic('getDraws', function(result) {
        if (!result.error) {
            console.info(result.data);

            //temp list
            var tempArr = [];
            for (var i = 0; i < 10; i++) {
                result.data.Draws[i].EndDate = new Date(
                    new Date().getTime() +
                    Math.floor(Math.random() * 120 + 1) *
                    Math.floor(Math.random() * 60 + 1) *
                    Math.floor(Math.random() * 60 + 1) * 1000);
                tempArr.push(result.data.Draws[i]);
            }
            DGW.main.methods.drawsConstructor(tempArr);
            DGW.main.methods.loadingFinished();
        } else {
            console.error(result.error);
        }
    });
};

DGW.global.api.requests.getDrawEntries = function(){
    DGW.global.api.generic('getDrawEntries', function(result){
        if (!result.error) {
            console.info(result.data);
        } else {
            console.error(result.error);
        }
    });
};

DGW.global.api.requests.drawBet = function(drawId, pointsAmount){
    DGW.global.api.generic('drawBet', function(result){
        if (!result.error) {
            console.info(result.data);
        } else {
            console.error(result.error);
        }
    },{
        DrawId: drawId,
        PointsAmount: pointsAmount
    });
};