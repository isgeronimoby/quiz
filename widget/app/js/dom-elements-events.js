DGW.main.elements.frameHolder.querySelector('.dg-o-w-back-btn').addEventListener('click', function(){
    var fh = DGW.main.elements.frameHolder,
        wb = DGW.main.elements.widgetBodyWrapper;
    DGW.helpers.addClass(fh, 'dg-o-w-hidden');
    setTimeout(function(){
        fh.querySelector('.dg-o-w-iframe-holder').innerHTML = '';
        DGW.helpers.removeClass(fh, 'dg-o-w-hidden');
        wb.removeChild(fh);
    }, 300);
});