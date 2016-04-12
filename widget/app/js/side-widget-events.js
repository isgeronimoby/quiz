DGW.side.methods.initEvents = function(){
    var wBody = DGW.side.elements.widgetBody;
    var resizerBtn = wBody.querySelector('.dg-side-widget-resizer');
    var ctas = Array.prototype.slice.call(wBody.querySelectorAll('.dg-side-cta'));
    var registeredArea = wBody.querySelector('.dg-side-widget-content.dg-o-w-authorized .dg-side-section');
    ctas.push(registeredArea);

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

};