var widgetStyles = document.createElement('link');
widgetStyles.rel = 'stylesheet';
widgetStyles.type = 'text/css';

widgetStyles.addEventListener('load', function(){
    DGW.global.methods.init();
});
//widgetStyles.href = 'dist/style.min.css';
widgetStyles.href = 'http://football.cool-link.com/widget/build/style.min.css';
document.head.appendChild(widgetStyles);

