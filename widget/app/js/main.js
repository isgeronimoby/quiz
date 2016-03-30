DGW.global.elements.documentBody = document.body;

DGW.side.elements.widget = document.createElement('div');
    DGW.side.elements.widget.id = 'dg-side-widget';
    DGW.side.elements.widget.innerHTML = DGW.templates.sideWidgetCore;

DGW.main.elements.widget = document.createElement('div');
    DGW.main.elements.widget.id = 'dg-o-w';
    DGW.main.elements.widget.innerHTML = DGW.templates.mainWidgetCore;
DGW.main.elements.widgetBody = DGW.main.elements.widget.querySelector('.dg-o-w-body');

DGW.main.elements.menuItems = {
    earn: DGW.main.elements.widget.querySelector('.dg-o-w-menu .earn-menu-item'),
    draws: DGW.main.elements.widget.querySelector('.dg-o-w-menu .draws-menu-item'),
    activities: DGW.main.elements.widget.querySelector('.dg-o-w-menu .activities-menu-item'),
    profile: DGW.main.elements.widget.querySelector('.dg-o-w-menu-profile .profile-menu-item img')
};

DGW.main.elements.widgetContent = DGW.main.elements.widget.querySelector('.dg-o-w-content .dg-o-w-section section');

DGW.main.elements.loginFooter = DGW.main.elements.widget.querySelector('.dg-o-w-footer-login');

DGW.main.elements.loginMenuButton = DGW.main.elements.widget.querySelector('.dg-o-w-login-dropdown a');


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

DGW.main.elements.activitiesSliderParent = DGW.main.elements.pages.activitiesMain.querySelector('.dg-o-w-activities');


// Main widget global methods
DGW.main.methods.showWidget = function(){
    DGW.helpers.removeClass(DGW.main.elements.widget, 'hiding');
    DGW.global.elements.documentBody.appendChild(DGW.main.elements.widget);
    DGW.main.methods.changeMainState(DGW.main.currentState);
};
DGW.main.methods.hideWidget = function(){
    DGW.helpers.addClass(DGW.main.elements.widget, 'hiding');
    setTimeout(function(){
        DGW.global.elements.documentBody.removeChild(DGW.main.elements.widget);
    }, 310);
};

DGW.main.methods.changeMainState = function(state){
    for (item in DGW.main.elements.menuItems) {
        DGW.helpers.removeClass(DGW.main.elements.menuItems[item], 'dg-o-w-active');
        DGW.helpers.removeClass(DGW.main.elements.menuItems['profile'].parentNode, 'dg-o-w-active');
        if (item === state) {
            if (state === 'profile') {
                DGW.helpers.addClass(DGW.main.elements.menuItems[item].parentNode, 'dg-o-w-active');
            } else {
                DGW.helpers.addClass(DGW.main.elements.menuItems[item], 'dg-o-w-active');
            }
        }
    }
    if (DGW.main.elements.widgetContent.children.length > 0) {
        DGW.main.elements.widgetContent.removeChild(DGW.main.elements.widgetContent.childNodes[0]);
    }

    if (DGW.main.currentState !== 'draws') {
        DGW.helpers.drawsTimer.setDraws([]);
    }
    DGW.helpers.removeClass(DGW.main.elements.widgetBody, 'profile-anon');
    switch (state) {
        case 'earn':

            DGW.main.elements.widgetContent.appendChild(DGW.main.elements.pages.earnMain);
            break;
        case 'draws':
            //TODO: work on this further
            if (DGW.main.currentState !== 'draws') {
                DGW.global.api.requests.getDraws();
            }
            DGW.main.elements.widgetContent.appendChild(DGW.main.elements.pages.drawsMain);
            break;
        case 'activities':

            DGW.main.elements.widgetContent.appendChild(DGW.main.elements.pages.activitiesMain);
            break;
        case 'profile':
            if ( DGW.global.authorized ) {
                DGW.main.elements.widgetContent.appendChild(DGW.main.elements.pages.profileMain);
            } else {
                DGW.helpers.addClass(DGW.main.elements.widgetBody, 'profile-anon');
                DGW.main.elements.widgetContent.appendChild(DGW.main.elements.pages.loginMain);
            }
            break;
        default:

    }

    DGW.main.currentState = state;
    DGW.main.methods.checkSectionHeight();
};

DGW.main.methods.loadingStarted = function(){
    DGW.helpers.addClass(DGW.main.elements.widgetBody, 'loading');
};
DGW.main.methods.loadingFinished = function(){
    DGW.helpers.removeClass(DGW.main.elements.widgetBody, 'loading');
};


// Side widget global methods
DGW.side.methods.showWidget = function(){
    DGW.global.elements.documentBody.appendChild(DGW.side.elements.widget);
};
DGW.side.methods.hideWidget = function(){
    DGW.global.elements.documentBody.removeChild(DGW.side.elements.widget);
};


DGW.global.methods.init = function(){

    // Handling clicks
    DGW.side.elements.widget.addEventListener('click', function(){
        DGW.main.methods.showWidget();
    });
    DGW.main.elements.widget.querySelector('.dg-o-w-close').addEventListener('click', function(){
        DGW.main.methods.hideWidget();
    });

    DGW.main.methods.addPageEvents();

    //Main widget, main menu clicks
    for (item in DGW.main.elements.menuItems) {
        DGW.main.elements.menuItems[item].addEventListener('click', function(item){
            return function(){
                DGW.main.methods.changeMainState(item);
            };
        }(item));
    }

    //Initializing or checking user
    DGW.global.api.requests.getUser();
};

DGW.global.methods.authorize = function(){
    DGW.helpers.addClass(DGW.main.elements.widgetBody, 'authorized');
    DGW.global.authorized = true;
    if (DGW.main.currentState === 'profile') {
        DGW.main.methods.changeMainState('profile');
    } else if (DGW.main.currentState === 'draws') {
        DGW.global.api.requests.getDraws();
    }
};

DGW.global.methods.unAuthorize = function(){
    DGW.helpers.removeClass(DGW.main.elements.widgetBody, 'authorized');
    DGW.global.authorized = false;
    if (DGW.main.currentState === 'profile') {
        DGW.main.methods.changeMainState('profile');
    }
};
