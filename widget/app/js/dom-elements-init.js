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
DGW.main.elements.activitiesSliderParent = DGW.main.elements.pages.activitiesMain.querySelector('.dg-o-w-activities');
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

DGW.main.elements.frameHolder = document.createElement('div');
DGW.main.elements.frameHolder.className = 'dg-o-w-frame-holder';
DGW.main.elements.frameHolder.innerHTML = '<div class="dg-o-w-submenu"><div class="dg-o-w-back-btn">&larr; Back</div></div>' +
                                          '<div class="dg-o-w-iframe-holder"></div>';