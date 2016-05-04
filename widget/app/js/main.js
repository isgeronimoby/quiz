DGW.global.elements.documentBody = document.body;

DGW.side.elements.widget = document.createElement('div');
    DGW.side.elements.widget.id = 'dg-side-widget';
    DGW.side.elements.widget.innerHTML = DGW.templates.sideWidgetCore;
DGW.side.elements.widgetBody = DGW.side.elements.widget.querySelector('.dg-side-widget-body');

DGW.main.elements.widget = document.createElement('div');
    DGW.main.elements.widget.id = 'dg-o-w';
    DGW.main.elements.widget.innerHTML = DGW.templates.mainWidgetCore;
DGW.main.elements.widgetBody = DGW.main.elements.widget.querySelector('.dg-o-w-body');
DGW.main.elements.widgetBodyWrapper = DGW.main.elements.widgetBody.querySelector('.dg-o-w-body-wrapper');

DGW.main.elements.menuItems = {
    earn: DGW.main.elements.widget.querySelector('.dg-o-w-menu .earn-menu-item'),
    draws: DGW.main.elements.widget.querySelector('.dg-o-w-menu .draws-menu-item'),
    activities: DGW.main.elements.widget.querySelector('.dg-o-w-menu .activities-menu-item'),
    profile: DGW.main.elements.widget.querySelector('.dg-o-w-menu-profile .profile-menu-item img'),
    profileRegistered: DGW.main.elements.widget.querySelector('.dg-o-w-menu-profile .profile-menu-item .profile-menu-authorized')
};

DGW.main.elements.widgetContent = DGW.main.elements.widget.querySelector('.dg-o-w-content .dg-o-w-section section');
DGW.main.elements.widgetWrapper = DGW.main.elements.widget.querySelector('.dg-o-w-body-wrapper');

DGW.main.elements.loginFooter = DGW.main.elements.widget.querySelector('.dg-o-w-footer-login');

DGW.main.elements.loginMenuButton = DGW.main.elements.widget.querySelector('#dg-o-w-login-trigger');


DGW.main.elements.pages.earnMain = document.createElement('div');
    DGW.main.elements.pages.earnMain.innerHTML = DGW.templates.earnMain;
DGW.main.elements.pages.drawsMain = document.createElement('div');
    DGW.main.elements.pages.drawsMain.innerHTML = DGW.templates.drawsMain;
DGW.main.elements.pages.activitiesMain = document.createElement('div');
    DGW.main.elements.pages.activitiesMain.innerHTML = DGW.templates.activitiesMain;
DGW.main.elements.pages.profileMain = document.createElement('div');
    DGW.main.elements.pages.profileMain.innerHTML = DGW.templates.profileMain;
DGW.main.elements.pages.loginMain = document.createElement('div');
    DGW.main.elements.pages.loginMain.innerHTML = DGW.templates.loginMain;

DGW.main.elements.pages.singleDraw = document.createElement('div');

DGW.main.elements.pages.videoHolder = document.createElement('div');
    DGW.main.elements.pages.videoHolder.innerHTML = DGW.templates.videoHolder;

DGW.main.elements.pages.notificationHolder = document.createElement('div');
    DGW.main.elements.pages.notificationHolder.innerHTML = DGW.templates.notificationHolder;
    DGW.main.elements.pages.notificationHolder = DGW.main.elements.pages.notificationHolder.querySelector('div');

DGW.main.elements.activitiesSliderParent = DGW.main.elements.pages.activitiesMain.querySelector('.dg-o-w-activities');


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
};
DGW.main.methods.hideWidget = function(){
    DGW.helpers.zeroTimeout(function(){ DGW.main.shown = false; });
    DGW.helpers.addClass(DGW.main.elements.widget, 'hiding');
    setTimeout(function(){
        DGW.global.elements.documentBody.removeChild(DGW.main.elements.widget);
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
        DGW.global.api.requests.getDraws();
    } else if (DGW.main.currentState === 'earn') {
        DGW.global.api.requests.getUserOffers();
    }

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
    DGW.side.methods.initEvents();
    DGW.main.methods.initEvents();

    // adding notification panel to the DOM (hidden)
    DGW.main.elements.widgetWrapper.appendChild(DGW.main.elements.pages.notificationHolder);

    // filling user default data
    DGW.global.methods.userStatsReset();

    // requesting basic apis to get some cached data
    DGW.global.api.requests.getDraws();
    DGW.global.api.requests.getActions();

    //Initializing or checking user
    DGW.global.api.requests.getUser();

    if (DGW.global.safariFixFirstOpen) {
        DGW.main.methods.showWidget();
    }
};

DGW.global.methods.safariFixInit = function(){
    DGW.side.methods.initSafariFixEvents();
};

DGW.main.methods.showNotificationBar = function(type){
    if (!type) type = 'success';
    DGW.helpers.addClass(DGW.main.elements.pages.notificationHolder, type);
};

DGW.main.methods.hideNotificationBar = function(){
    DGW.helpers.removeClass(DGW.main.elements.pages.notificationHolder, 'success');
    DGW.helpers.removeClass(DGW.main.elements.pages.notificationHolder, 'error');
};