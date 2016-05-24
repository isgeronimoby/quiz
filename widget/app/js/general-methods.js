// Main widget global methods
DGW.main.methods.showWidget = function(){
    DGW.helpers.zeroTimeout(function(){ DGW.main.shown = true; }); // Fixing IE button click
    DGW.helpers.removeClass(DGW.main.elements.widget, 'hiding');
    DGW.global.elements.documentBody.appendChild(DGW.main.elements.widget);
    if (DGW.main.currentState === '') {
        DGW.main.methods.changeMainState('earn');
    } else {
        DGW.main.methods.changeMainState(DGW.main.currentState);
    }
    DGW.main.methods.pageBodyLock();
};
DGW.main.methods.hideWidget = function(){
    DGW.helpers.zeroTimeout(function(){ DGW.main.shown = false; });
    DGW.helpers.addClass(DGW.main.elements.widget, 'hiding');
    setTimeout(function(){
        DGW.global.elements.documentBody.removeChild(DGW.main.elements.widget);
        ga(DGW.global.gaSend, 'pageview', 'Holder page');
    }, 310);
    DGW.main.methods.pageBodyUnlock();
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
    ga(DGW.global.gaSend, 'pageview', 'Holder page');
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
    if (DGW.main.currentState !== 'draws') {
        DGW.main.methods.changeMainState('earn');
    }
    DGW.global.api.requests.getDraws(function(){
        DGW.global.api.requests.getDrawEntries(function(){
            DGW.main.methods.changeDrawsSubmenu(DGW.main.settings.draws.currentSubMenu);
        });
    });

    DGW.side.methods.changeSideWidgetState();
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
    DGW.side.methods.hideNotification();
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

    //Initializing or checking user
    DGW.global.api.requests.getUser(
        function registered(){},
        function anonymous(){
            DGW.global.api.requests.getDraws();
            DGW.global.api.requests.getActions();
        }
    );

    if (DGW.global.safariFixFirstOpen) {
        DGW.main.methods.showWidget();
    }
};

DGW.main.methods.showNotificationBar = function(type){
    var nh = DGW.main.elements.pages.notificationHolder;
    if (!type) type = 'success';
    DGW.helpers.addClass(nh, type);
    nh.querySelector('.dg-o-w-notification-close').addEventListener('click', DGW.main.methods.hideNotificationBar);
};

DGW.main.methods.hideNotificationBar = function(){
    DGW.helpers.removeClass(DGW.main.elements.pages.notificationHolder, 'success');
    DGW.helpers.removeClass(DGW.main.elements.pages.notificationHolder, 'error');
};

DGW.main.methods.pageBodyLock = function(){
    DGW.helpers.addClass(DGW.global.elements.documentBody, 'dg-o-w-body-fixed');
};
DGW.main.methods.pageBodyUnlock = function(){
    DGW.helpers.removeClass(DGW.global.elements.documentBody, 'dg-o-w-body-fixed');
};