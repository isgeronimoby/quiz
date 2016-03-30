var widgetStyles = document.createElement('link');
    widgetStyles.rel = 'stylesheet';
    widgetStyles.type = 'text/css';

widgetStyles.addEventListener('load', function(){
    DGW.global.methods.init();
});

widgetStyles.href = DGW.global.widgetPathName + 'style.min.css';

document.head.appendChild(widgetStyles);

