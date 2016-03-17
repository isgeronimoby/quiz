window.addEventListener('load', function(){

    var body = document.body;

    var sideWidget = document.createElement('div');
        sideWidget.id = 'dg-side-widget';
        sideWidget.innerHTML = DGW.templates.sideWidgetCore;

    var mainWidget = document.createElement('div');
        mainWidget.id = 'dg-o-w';
        mainWidget.innerHTML = DGW.templates.mainWidgetCore;
    var mainWidgetBody = mainWidget.querySelector('.dg-o-w-body');

    var menuItems = {
        earn: mainWidget.querySelector('.dg-o-w-menu .earn-menu-item'),
        draws: mainWidget.querySelector('.dg-o-w-menu .draws-menu-item'),
        activities: mainWidget.querySelector('.dg-o-w-menu .activities-menu-item'),
        profile: mainWidget.querySelector('.dg-o-w-menu-profile .profile-menu-item img')
    };

    var mainWidgetContent = mainWidget.querySelector('.dg-o-w-content .dg-o-w-section section');

    var loginFooter = mainWidget.querySelector('.dg-o-w-footer-login');

    var loginMenuButton = mainWidget.querySelector('.dg-o-w-login-dropdown a');



    var earnMain = document.createElement('div');
        earnMain.innerHTML = DGW.templates.earnMain;
    var drawsMain = document.createElement('div');
        drawsMain.innerHTML = DGW.templates.drawsMain;
    var activitiesMain = document.createElement('div');
        activitiesMain.innerHTML = DGW.templates.activitiesMain;
    var profileMain = document.createElement('div');
        profileMain.innerHTML = DGW.templates.profileMain;
    var loginMain = document.createElement('div');
        loginMain.innerHTML = DGW.templates.loginMain;


    var activitiesSliderParent = activitiesMain.querySelector('.dg-o-w-activities');


    // Main widget global methods
    DGW.main.methods.showWidget = function(){
        DGW.helpers.removeClass(mainWidget, 'hiding');
        body.appendChild(mainWidget);
    };
    DGW.main.methods.hideWidget = function(){
        DGW.helpers.addClass(mainWidget, 'hiding');
        setTimeout(function(){
            body.removeChild(mainWidget);
        }, 310);
    };

    DGW.main.methods.changeMainState = function(state){
        for (item in menuItems) {
            DGW.helpers.removeClass(menuItems[item], 'dg-o-w-active');
            if (item === state) {
                DGW.helpers.addClass(menuItems[item], 'dg-o-w-active');
            }
        }
        if (mainWidgetContent.children.length > 0) {
            mainWidgetContent.removeChild(mainWidgetContent.childNodes[0]);
        }

        DGW.helpers.removeClass(mainWidgetBody, 'profile-anon');
        switch (state) {
            case 'earn':

                mainWidgetContent.appendChild(earnMain);
                break;
            case 'draws':

                mainWidgetContent.appendChild(drawsMain);
                break;
            case 'activities':

                mainWidgetContent.appendChild(activitiesMain);
                break;
            case 'profile':
                if ( DGW.global.authorized ) {
                    mainWidgetContent.appendChild(profileMain);
                } else {
                    DGW.helpers.addClass(mainWidgetBody, 'profile-anon');
                    mainWidgetContent.appendChild(loginMain);
                }
                break;
            default:

        }

        DGW.main.currentState = state;
        DGW.main.methods.checkSectionHeight();
    };

    DGW.main.methods.checkSectionHeight = function() {
        var section = mainWidgetBody.querySelector('.dg-o-w-section');
        var sectionContent = mainWidgetBody.querySelector('.dg-o-w-section-content');

        if ( section.querySelector('.dg-o-w-submenu') ) {
            DGW.helpers.addClass(sectionContent, 'dg-o-w-submenu-only');
            DGW.helpers.removeClass(sectionContent, 'dg-o-w-submenu-activities');
            if ( section.querySelector('.dg-o-w-activity-slider-holder') && !DGW.helpers.hasClass(section.querySelector('.dg-o-w-activities'), 'collapsed') ) {
                DGW.helpers.addClass(sectionContent, 'dg-o-w-submenu-activities');
                DGW.helpers.removeClass(sectionContent, 'dg-o-w-submenu-only');
            }
        }
    };



    // Side widget global methods
    DGW.side.methods.showWidget = function(){
        body.appendChild(sideWidget);
    };
    DGW.side.methods.hideWidget = function(){
        body.removeChild(sideWidget);
    };



    DGW.global.methods.init = function(){

        // Handling clicks
        sideWidget.addEventListener('click', function(){
            DGW.main.methods.showWidget();
        });
        mainWidget.querySelector('.dg-o-w-close').addEventListener('click', function(){
            DGW.main.methods.hideWidget();
        });
        loginMenuButton.addEventListener('click', function(e){
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
        activitiesMain.querySelector('.toggle-section-height').addEventListener('click', function(){
            if (DGW.helpers.hasClass(this, 'collapsed')) {
                DGW.helpers.removeClass(activitiesSliderParent, 'collapsed');
                DGW.helpers.removeClass(this, 'collapsed');
            } else {
                DGW.helpers.addClass(activitiesSliderParent, 'collapsed');
                DGW.helpers.addClass(this, 'collapsed');
            }
            DGW.main.methods.checkSectionHeight();
        });

        //Main widget, main menu clicks
        for (item in menuItems) {
            menuItems[item].addEventListener('click', function(item){
                return function(){
                    DGW.main.methods.changeMainState(item);
                };
            }(item));
        }

        //Footer login init
        loginFooter.querySelector('#dg-o-w-footer-email-login').addEventListener('click', function(ev){
            ev.preventDefault();
            DGW.helpers.addClass(loginFooter, 'email-sign-up');
        });
        loginFooter.querySelector('#dg-o-w-footer-login-select').addEventListener('click', function(ev){
            ev.preventDefault();
            DGW.helpers.removeClass(loginFooter, 'email-sign-up');
        });

        console.log(loginFooter.querySelector('#dg-o-w-footer-email-login'))

        // Showing side widget
        DGW.side.methods.showWidget();
    };

    DGW.global.methods.authorize = function(){
        DGW.helpers.addClass(mainWidgetBody, 'authorized');
        DGW.global.authorized = true;
        if (DGW.main.currentState === 'profile') {
            DGW.main.methods.changeMainState('profile');
        }
    };

    DGW.global.methods.unAuthorize = function(){
        DGW.helpers.removeClass(mainWidgetBody, 'authorized');
        DGW.global.authorized = false;
        if (DGW.main.currentState === 'profile') {
            DGW.main.methods.changeMainState('profile');
        }
    };

    DGW.global.methods.init();
});