jQuery(document).ready(function($){

    var popupLinks = document.getElementsByClassName('everton-amazing-links');
    var closeBtn = document.getElementsByClassName('everton-popup-close');
    var popupConts = document.getElementsByClassName('everton-popup-container');

    function stopEvent(evt) {
        (evt && evt.stopPropagation) ? evt.stopPropagation() : window.event.cancelBubble = true;
    }

    function showBlock(elem){
        elem.parentNode.style.display = "block";
        setTimeout(function(){
            elem.style.opacity = 1;
        }, 0);
    }

    function hideBlock(elem){
        var transDuration = 300;
        elem.style.opacity = 0;
        setTimeout(function(){
            elem.parentNode.style.display = "none";
        }, transDuration);
    }

    for (var i = 0; i < popupConts.length; i++) {
        popupConts[i].onclick = function (e) {
            stopEvent(e);
            if (e.target == this) {
                for (var i = 0; i < popupConts.length; i++) {
                    hideBlock(popupConts[i]);
                }
            }
        }
    }
    for (var i = 0; i < closeBtn.length; i++) {
        closeBtn[i].onclick = function (e) {
            e.preventDefault();
            for (var i = 0; i < popupConts.length; i++) {
                hideBlock(popupConts[i]);
            }
        }
    }
    if (popupLinks.length > 0) {
        for (var i = 0; i < popupLinks.length; i++ ) {
            popupLinks[i].onclick = function(e) {
                e.preventDefault();
                for (var i = 0; i < popupConts.length; i++ ) {
                    if (this.getAttribute("href").substring(1) == popupConts[i].id) {
                        showBlock(popupConts[i]);
                    }
                }
            }
        }
    }
});