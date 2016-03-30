var widgetStyles = document.createElement('link');
widgetStyles.rel = 'stylesheet';
widgetStyles.type = 'text/css';

widgetStyles.addEventListener('load', function(){
    DGW.global.methods.init();
});

var pathName = document.getElementById('dgl-gamified-widget').src;
pathName = pathName.substring(pathName.lastIndexOf('/') + 1, 0);
widgetStyles.href = pathName + 'style.min.css';

document.head.appendChild(widgetStyles);

