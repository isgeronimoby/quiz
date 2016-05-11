// Main widget global methods
DGW.main.methods.showWidget = function(){
    DGW.helpers.zeroTimeout(function(){ DGW.main.shown = true; }); // Fixing IE button click
    DGW.helpers.removeClass(DGW.main.elements.widget, 'hiding');
    DGW.helpers.addClass(DGW.global.elements.documentBody, 'dg-o-w-body-fixed');
    DGW.global.elements.documentBody.appendChild(DGW.main.elements.widget);
    if (DGW.main.currentState === '') {
        DGW.main.methods.changeMainState('earn');
    } else {
        DGW.main.methods.changeMainState(DGW.main.currentState);
    }
};
DGW.main.methods.hideWidget = function(){
    DGW.helpers.zeroTimeout(function(){ DGW.main.shown = false; });
    DGW.helpers.addClass(DGW.main.elements.widget, 'hiding');
    setTimeout(function(){
        DGW.global.elements.documentBody.removeChild(DGW.main.elements.widget);
        DGW.helpers.removeClass(DGW.global.elements.documentBody, 'dg-o-w-body-fixed');
    }, 310);
};

DGW.main.methods.loadingStarted = function(){
    DGW.helpers.addClass(DGW.main.elements.widgetBody, 'dg-o-w-loading');
};
DGW.main.methods.loadingFinished = function(){
    DGW.helpers.removeClass(DGW.main.elements.widgetBody, 'dg-o-w-loading');
};


// Side widget global methods
DGW.side.methods.showWidget = function(){
    DGW.global.elements.documentBody.appendChild(DGW.side.elements.widget);
};
DGW.side.methods.hideWidget = function(){
    DGW.global.elements.documentBody.removeChild(DGW.side.elements.widget);
};


DGW.global.methods.authorize = function(){
    DGW.main.methods.resetStates();
    DGW.helpers.addClass(DGW.main.elements.widgetBody, 'authorized');
    DGW.global.authorized = true;
    DGW.helpers.addClass(DGW.side.elements.widgetBody, 'dg-o-w-authorized');
    // ********
    if (DGW.main.currentState === 'profile') {
        DGW.main.methods.changeMainState('profile');
        // ********
    } else if (DGW.main.currentState === 'draws') {
        DGW.global.api.requests.getDraws(function(){
            DGW.global.api.requests.getDrawEntries(function(){
                DGW.main.methods.changeDrawsSubmenu(DGW.main.settings.draws.currentSubMenu);
            });
        });
    } else if (DGW.main.currentState === 'earn') {
        DGW.global.api.requests.getUserOffers();
    }

    DGW.side.methods.changeSideWidgetState('profile');

    DGW.global.api.requests.getUserActions();
};

DGW.global.methods.unAuthorize = function(){
    DGW.helpers.removeClass(DGW.main.elements.widgetBody, 'authorized');
    DGW.helpers.removeClass(DGW.side.elements.widgetBody, 'dg-o-w-authorized');
    DGW.global.authorized = false;
    if (DGW.main.currentState === 'profile') {
        DGW.main.methods.changeMainState('profile');
    }
    DGW.main.methods.resetStates();
    DGW.global.methods.userStatsReset();

    DGW.side.methods.changeSideWidgetState();
};

DGW.global.methods.userStatsReset = function(){
    DGW.global.userStats.userId = '';
    DGW.global.userStats.imageUrl = DGW.helpers.checkImagesForSrc();
    DGW.global.userStats.name = 'Guest';
    DGW.global.userStats.facebookId = null;
    DGW.global.userStats.pointsC = 0;
    DGW.global.userStats.pointsP = 0;
    DGW.global.userStats.creditsC = 0;
    DGW.global.userStats.creditsP = 0;
    DGW.global.userStats.earnToday = null;
    DGW.global.userStats.badges = {
        all: {},
        earned: {}
    };
};

DGW.global.methods.init = function(){


    // initialising widget events
    //DGW.side.methods.initEvents();
    DGW.main.methods.initEvents();

    // adding notification panel to the DOM (hidden)
    DGW.main.elements.widgetWrapper.appendChild(DGW.main.elements.pages.notificationHolder);

    // filling user default data
    DGW.global.methods.userStatsReset();

    // requesting basic apis to get some cached data
    DGW.global.api.requests.getDraws(function(){
        if (DGW.global.authorized) {
            DGW.global.api.requests.getDrawEntries(function(){
                DGW.main.methods.changeDrawsSubmenu(DGW.main.settings.draws.currentSubMenu);
            });
        } else {
            DGW.main.methods.changeDrawsSubmenu(DGW.main.settings.draws.currentSubMenu);
        }
    });
    DGW.global.api.requests.getActions();

    //Initializing or checking user
    DGW.global.api.requests.getUser();

    if (DGW.global.safariFixFirstOpen) {
        DGW.main.methods.showWidget();
    }
};

DGW.main.methods.showNotificationBar = function(type){
    if (!type) type = 'success';
    DGW.helpers.addClass(DGW.main.elements.pages.notificationHolder, type);
};

DGW.main.methods.hideNotificationBar = function(){
    DGW.helpers.removeClass(DGW.main.elements.pages.notificationHolder, 'success');
    DGW.helpers.removeClass(DGW.main.elements.pages.notificationHolder, 'error');
};