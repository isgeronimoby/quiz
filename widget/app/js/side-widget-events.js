DGW.side.methods.initEvents = function(){

    if (!DGW.global.launched) {
        // Showing side widget
        DGW.side.methods.showWidget();
        DGW.global.launched = true;
    }

    var initInterval;
    var wBody = DGW.side.elements.widgetBody;
    var resizerBtn = wBody.querySelector('.dg-side-widget-resizer');
    var ctas = Array.prototype.slice.call(wBody.querySelectorAll('.dg-side-cta'));
    var registeredArea = wBody.querySelector('.dg-side-widget-content.dg-o-w-authorized .dg-side-section');
    ctas.push(registeredArea);

    wBody.removeEventListener('click', DGW.global.api.requests.safariFix);

    resizerBtn.addEventListener('click', function(){
        if (DGW.helpers.hasClass(wBody, 'dg-side-widget-expanded')) {
            DGW.helpers.removeClass(wBody, 'dg-side-widget-expanded');
        } else {
            DGW.helpers.addClass(wBody, 'dg-side-widget-expanded');
        }
    });

    ctas.forEach(function(cta){
        cta.addEventListener('click', function(){
            if (!DGW.main.shown) {
                DGW.main.methods.showWidget();
            } else {
                DGW.main.methods.hideWidget();
            }
        });
    });


    initInterval = window.setInterval(function(){
        if (DGW.global.cache.last.prize) {
            window.clearInterval(initInterval);
            wBody.querySelector('.dg-side-prize').src = DGW.global.cache.last.prize.ImageUrl;
            wBody.querySelector('#dg-side-widget-prize-desc').innerHTML = DGW.global.cache.last.prize.Title;
        }
    }, 100);
};

DGW.side.methods.initSafariFixEvents = function(){
    var initInterval;
    var wBody = DGW.side.elements.widgetBody;
    DGW.side.methods.showWidget();

    wBody.addEventListener('click', DGW.global.api.requests.safariFix);

    initInterval = window.setInterval(function(){
        if (DGW.global.cache.last.prize) {
            window.clearInterval(initInterval);
            wBody.querySelector('.dg-side-prize').src = DGW.global.cache.last.prize.ImageUrl;
            wBody.querySelector('#dg-side-widget-prize-desc').innerHTML = DGW.global.cache.last.prize.Title;
        }
    }, 100);
};