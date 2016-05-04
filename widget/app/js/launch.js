var widgetStyles = document.createElement('link');
    widgetStyles.rel = 'stylesheet';
    widgetStyles.type = 'text/css';

widgetStyles.addEventListener('load', function(){
    DGW.global.api.requests.checkServerAvailability();
});

widgetStyles.href = DGW.global.widgetPathName + 'style.min.css';


var lastLinkElement = document.head.getElementsByTagName('link')[document.head.getElementsByTagName('link').length - 1];


if (window.innerWidth > 1024) DGW.helpers.insertAfter(widgetStyles, lastLinkElement, document.head);
else DGW.helpers.console.info('Widget: Mobile screen size, no widget allowed');

if (DGW.global.debug) window.DGW = DGW;

window.dgwActivateDebugMode = function(){
    DGW.global.debug = true;
};