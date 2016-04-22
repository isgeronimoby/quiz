var widgetStyles = document.createElement('link');
    widgetStyles.rel = 'stylesheet';
    widgetStyles.type = 'text/css';

widgetStyles.addEventListener('load', function(){
    DGW.global.api.requests.checkServerAvailability();
});

widgetStyles.href = DGW.global.widgetPathName + 'style.min.css';


var lastLinkElement = document.head.getElementsByTagName('link')[document.head.getElementsByTagName('link').length - 1];



DGW.helpers.insertAfter(widgetStyles, lastLinkElement, document.head);

window.dgwActivateDebugMode = function(){
    DGW.global.debug = true;
};

