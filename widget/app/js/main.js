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

DGW.main.elements.activitiesSliderParent = DGW.main.elements.pages.activitiesMain.querySelector('.dg-o-w-activities');


// Main widget global methods
DGW.main.methods.showWidget = function(){
    DGW.helpers.removeClass(DGW.main.elements.widget, 'hiding');
    DGW.global.elements.documentBody.appendChild(DGW.main.elements.widget);
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
        if (item === state) {
            DGW.helpers.addClass(DGW.main.elements.menuItems[item], 'dg-o-w-active');
        }
    }
    if (DGW.main.elements.widgetContent.children.length > 0) {
        DGW.main.elements.widgetContent.removeChild(DGW.main.elements.widgetContent.childNodes[0]);
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

DGW.main.methods.checkSectionHeight = function() {
    var section = DGW.main.elements.widgetBody.querySelector('.dg-o-w-section');
    var sectionContent = DGW.main.elements.widgetBody.querySelector('.dg-o-w-section-content');

    if ( section.querySelector('.dg-o-w-submenu') ) {
        DGW.helpers.addClass(sectionContent, 'dg-o-w-submenu-only');
        DGW.helpers.removeClass(sectionContent, 'dg-o-w-submenu-activities');
        if ( section.querySelector('.dg-o-w-activity-slider-holder') && !DGW.helpers.hasClass(section.querySelector('.dg-o-w-activities'), 'collapsed') ) {
            DGW.helpers.addClass(sectionContent, 'dg-o-w-submenu-activities');
            DGW.helpers.removeClass(sectionContent, 'dg-o-w-submenu-only');
        }
    }
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
    DGW.main.elements.loginMenuButton.addEventListener('click', function(e){
        e.preventDefault();
        var that = this;
        var form = that.parentNode.querySelector('.dg-o-w-email-login-form');
        if (DGW.helpers.hasClass(that.parentNode, 'shown')) {
            DGW.helpers.removeClass(that.parentNode, 'shown');
            setTimeout(function(){
                DGW.helpers.removeClass(form, 'visible');
            }, 310);
        } else {
            DGW.helpers.addClass(form, 'visible');
            setTimeout(function(){
                DGW.helpers.addClass(that.parentNode, 'shown');
            }, 0);

        }
    });
    DGW.main.elements.pages.activitiesMain.querySelector('.toggle-section-height').addEventListener('click', function(){
        if (DGW.helpers.hasClass(this, 'collapsed')) {
            DGW.helpers.removeClass(DGW.main.elements.activitiesSliderParent, 'collapsed');
            DGW.helpers.removeClass(this, 'collapsed');
        } else {
            DGW.helpers.addClass(DGW.main.elements.activitiesSliderParent, 'collapsed');
            DGW.helpers.addClass(this, 'collapsed');
        }
        DGW.main.methods.checkSectionHeight();
    });

    //Main widget, main menu clicks
    for (item in DGW.main.elements.menuItems) {
        DGW.main.elements.menuItems[item].addEventListener('click', function(item){
            return function(){
                DGW.main.methods.changeMainState(item);
            };
        }(item));
    }

    //Footer login init
    DGW.main.elements.loginFooter.querySelector('#dg-o-w-footer-email-login').addEventListener('click', function(ev){
        ev.preventDefault();
        DGW.helpers.addClass(DGW.main.elements.loginFooter, 'email-sign-up');
    });
    DGW.main.elements.loginFooter.querySelector('#dg-o-w-footer-login-select').addEventListener('click', function(ev){
        ev.preventDefault();
        DGW.helpers.removeClass(DGW.main.elements.loginFooter, 'email-sign-up');
    });

    // Showing side widget
    DGW.side.methods.showWidget();
};

DGW.global.methods.authorize = function(){
    DGW.helpers.addClass(DGW.main.elements.widgetBody, 'authorized');
    DGW.global.authorized = true;
    if (DGW.main.currentState === 'profile') {
        DGW.main.methods.changeMainState('profile');
    }
};

DGW.global.methods.unAuthorize = function(){
    DGW.helpers.removeClass(DGW.main.elements.widgetBody, 'authorized');
    DGW.global.authorized = false;
    if (DGW.main.currentState === 'profile') {
        DGW.main.methods.changeMainState('profile');
    }
};

DGW.global.methods.init();