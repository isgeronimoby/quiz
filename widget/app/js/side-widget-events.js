DGW.side.methods.initEvents = function(){

    if (!DGW.global.launched) {
        // Showing side widget
        DGW.side.methods.showWidget();
        DGW.global.launched = true;
    }

    var initInterval;
    var wBody = DGW.side.elements.widgetBody;
    var resizerBtn = wBody.querySelector('.dg-side-widget-resizer');
    var ctas = Array.prototype.slice.call(wBody.querySelectorAll('.dg-side-cta, .dg-side-cta-floating'));
    var registeredArea = wBody.querySelector('.dg-side-click-holder');
    ctas.push(registeredArea);

    wBody.removeEventListener('click', DGW.global.api.requests.safariFix);

    var sideWidgetCollapse = function(){
        DGW.helpers.zeroTimeout(function(){DGW.helpers.removeClass(wBody, 'dg-side-widget-expanded');});
    };
    var sideWidgetExpand = function(){
        DGW.helpers.zeroTimeout(function(){DGW.helpers.addClass(wBody, 'dg-side-widget-expanded')});
    };

    resizerBtn.addEventListener('click', sideWidgetCollapse);

    ctas.forEach(function(cta){
        if (cta) {
            cta.addEventListener('click', function () {
                if (cta.getAttribute('data-page') != null) {
                    DGW.main.currentState = cta.getAttribute('data-page');
                }
                if (!DGW.main.shown) {
                    DGW.main.methods.showWidget();
                    sideWidgetExpand();
                } else {
                    DGW.main.methods.changeMainState(DGW.main.currentState);
                    sideWidgetExpand();
                }
            });
        }
    });

    DGW.helpers.imagesResponsivePaths(wBody.querySelectorAll('[data-image]'));

    initInterval = window.setInterval(function(){
        if (DGW.global.cache.last.prize) {
            window.clearInterval(initInterval);
            if (wBody.querySelector('.dg-side-prize'))
                wBody.querySelector('.dg-side-prize').src = DGW.global.cache.last.prize.ImageUrl;
            if (wBody.querySelector('#dg-side-widget-prize-desc'))
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
            if (wBody.querySelector('.dg-side-prize'))
                wBody.querySelector('.dg-side-prize').src = DGW.global.cache.last.prize.ImageUrl;
            if (wBody.querySelector('#dg-side-widget-prize-desc'))
                wBody.querySelector('#dg-side-widget-prize-desc').innerHTML = DGW.global.cache.last.prize.Title;
        }
    }, 100);
};