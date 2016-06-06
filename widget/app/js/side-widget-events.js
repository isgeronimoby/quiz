DGW.side.methods.ctaClick = function(){
    if (this.getAttribute('data-page') != null) {
        DGW.main.currentState = this.getAttribute('data-page');
    }
    if (!DGW.main.shown) {
        DGW.main.methods.showWidget();
    } else {
        DGW.main.methods.changeMainState(DGW.main.currentState);
    }
};

DGW.side.methods.initEvents = function(){
    if (!DGW.global.launched) {
        // Showing side widget
        DGW.side.methods.showWidget();
        DGW.global.launched = true;

        // Sending event with load time
        ga(DGW.global.gaSend, {
            hitType: 'event',
            eventCategory: 'TimeTrack',
            eventAction: 'WidgetLoadTime',
            eventValue: (new Date()).getTime() - DGW.global.loadTime
        });
        DGW.helpers.console.info('Script loading time: ' + ((new Date()).getTime() - DGW.global.loadTime) + 'ms');
    }

    var wBody = DGW.side.elements.widgetBody;
    var cta = wBody.querySelector('.dg-side-click-holder');

    wBody.removeEventListener('click', DGW.global.api.requests.safariFix);

    if (cta) {
        cta.addEventListener('click', DGW.side.methods.ctaClick);
    }

    DGW.helpers.imagesResponsivePaths(wBody.querySelectorAll('[data-image]'));
};

DGW.side.methods.initSafariFixEvents = function(){
    var wBody = DGW.side.elements.widgetBody;
    DGW.side.methods.showWidget();

    wBody.addEventListener('click', DGW.global.api.requests.safariFix);

    DGW.helpers.imagesResponsivePaths(wBody.querySelectorAll('[data-image]'));
};

DGW.side.methods.changeSideWidgetState = function(state) {
    var swc = DGW.side.elements.widgetContent;
    var wb = DGW.side.elements.widgetBody;
    var cc = wb.querySelector('.dg-side-click-holder');
    var mainCta;

    var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;

    swc.innerHTML = '';

    //TODO: TEMP place with randomized states
    /*var states = ['profile', 'draws'];
    if(!state) state = states[Math.round(Math.random())];*/
    var actions = ['earn', 'play'];
    var curAction = actions[Math.floor(Math.random() * actions.length)];

    switch(state){
        case 'draws':
            cc.setAttribute('data-page', 'draws');
            swc.innerHTML = DGW.templates.side.draw;
            break;
        default:
            // PROFILE or SIGNUP pages
            cc.setAttribute('data-page', 'profile');
            if (DGW.global.authorized) {
                swc.innerHTML = DGW.templates.side.registeredProfile;
                swc.innerHTML += DGW.templates.side.actions[curAction];
            } else {
                swc.innerHTML = DGW.templates.side.draw;
            }
    }

    mainCta = swc.querySelector('[data-page]');
    if (mainCta) cc.setAttribute('data-page', mainCta.getAttribute('data-page'));

    if (isSafari && !DGW.global.safariFix) {
        DGW.side.methods.initSafariFixEvents();
    } else {
        DGW.side.methods.initEvents();
    }
};

DGW.side.methods.showNotification = function(notification) {
    var wb = DGW.side.elements.widgetBody;
    var nh = wb.querySelector('.dg-side-notification-holder');
    nh.innerHTML = DGW.templates.side.notifications[notification];
};

DGW.side.methods.hideNotification = function() {
    DGW.side.elements.widgetBody.querySelector('.dg-side-notification-holder').innerHTML = '';
};