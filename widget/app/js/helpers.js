DGW.helpers.addClass = function(obj, className){
    if (!obj) return;
    if (!(new RegExp(className).test(obj.className))) {
        if (obj.className.length === 0) {
            obj.className += className;
        } else {
            obj.className += (' ' + className);
        }
    }
};

DGW.helpers.removeClass = function(obj, className) {
    obj.className = obj.className.replace(new RegExp(className), '').trim();
};

DGW.helpers.toggleClass = function(obj, className) {
    if (new RegExp(className).test(obj.className)) {
        DGW.helpers.removeClass(obj, className);
    } else {
        DGW.helpers.addClass(obj, className);
    }
};

DGW.helpers.hasClass = function(obj, className) {
    return new RegExp(className).test(obj.className);
};

DGW.helpers.isArray = function(o){
    return Object.prototype.toString.call(o) === '[object Array]';
};

DGW.helpers.isObject = function(o){
    return Object.prototype.toString.call(o) === '[object Object]';
};

DGW.helpers.drawsTimerConstr = function(params){
    var draws;
    var _second = 1000;
    var _minute = _second * 60;
    var _hour = _minute * 60;
    var _day = _hour * 24;
    var timer;

    function checkExpirationDate(draw){

        //var end = new Date(draw.dt + 'Z');
        var end = (draw.dt.substring(draw.dt.length - 1).toLowerCase() == 'z') ? new Date(draw.dt) : new Date(draw.dt + 'Z');
        var now = new Date();
        if ((end - now) > 0) {
            return true;
        } else {
            return false;
        }
    }

    function updateTime(){
        draws.forEach(function(draw){

            //var end = new Date(draw.dt + 'Z');
            var end = (draw.dt.substring(draw.dt.length - 1).toLowerCase() == 'z') ? new Date(draw.dt) : new Date(draw.dt + 'Z');

            var now = new Date();
            var distance = end - now;

            var days = Math.floor(distance / _day);
            var hours = Math.floor((distance % _day) / _hour);
            var minutes = Math.floor((distance % _hour) / _minute);
            var seconds = Math.floor((distance % _minute) / _second);

            if (distance < 0) {
                draw.elem.innerHTML = 'Draw has finished';
            } else {
                draw.elem.innerHTML = days + 'd ';
                draw.elem.innerHTML += hours + 'h ';
                draw.elem.innerHTML += minutes + 'm ';
                draw.elem.innerHTML += seconds + 's';
            }

        });
    }

    this.setDraws = function(newDraws){
        if (DGW.helpers.isArray(newDraws)) {
            draws = newDraws.filter(function(draw){
                return checkExpirationDate(draw);
            });
        }
    };

    this.push = function(draw){
        if (draw.elem && draw.dt) {
            if (checkExpirationDate(draw)) {
                draws.push(draw);
                return true;
            } else {
                return false;
            }
        }
    };

    this.start = function(){
        updateTime();
        timer = window.setInterval(updateTime, 100);
    };

    this.stop = function(){
        window.clearInterval(timer);
    };

    this.setDraws(params);
    this.start();
};

DGW.helpers.drawsTimer = new DGW.helpers.drawsTimerConstr([]);

DGW.helpers.drawIsFinished = function (draw) {
    return DGW.helpers.dateDiff(draw.EndDate) <= 0;
};

DGW.helpers.checkImagesForSrc = function(src) {
    if (src) {
        return src;
    } else {
        return DGW.global.widgetPathName + 'imgs/avatar-placeholder.png';
    }
};

DGW.helpers.imagesResponsivePaths = function(imgsCollection) {
    if (arguments.length == 0) return;
    var array = Array.prototype.slice.call(imgsCollection);
    array.forEach(function(img){
        if (img.getAttribute('data-image') != null) {
            img.src = DGW.global.widgetPathName + 'imgs/' + img.getAttribute('data-image');
        }
    });
};

DGW.helpers.centerWindowPopup = function(url, title, w, h, _callback, _win){
    var windowCheckCloseInterval;
    var fbWindow;

    if (_win) {
        fbWindow = _win;
    } else {
        fbWindow = DGW.helpers.createCenteredWindow(title, w, h);
    }
    fbWindow.location.href = url;

    // Puts focus on the newWindow
    if (window.focus) {
        fbWindow.focus();
    }

    windowCheckCloseInterval = window.setInterval(function(){
        if (fbWindow.closed) {
            clearInterval(windowCheckCloseInterval);
            fbWindow = null;
            if (_callback) _callback();
        }
    }, 50);
};

DGW.helpers.createCenteredWindow = function(title, w, h){
    // Fixes dual-screen position                         Most browsers      Firefox
    var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : screen.left;
    var dualScreenTop = window.screenTop != undefined ? window.screenTop : screen.top;
    var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
    var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;
    var left = ((width / 2) - (w / 2)) + dualScreenLeft;
    var top = ((height / 2) - (h / 2)) + dualScreenTop;

    return window.open('', title, 'menubar=no,location=no,resizable=no,scrollbars=yes,status=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);
};

DGW.helpers.getDateFromNow = (function(undefined){
    var SECOND = 1000,
        MINUTE = 60 * SECOND,
        HOUR = 60 * MINUTE,
        DAY = 24 * HOUR,
        WEEK = 7 * DAY,
        YEAR = DAY * 365,
        MONTH = YEAR / 12;

    var formats = [
        [ 0.7 * MINUTE, 'just now' ],
        [ 1.5 * MINUTE, 'a minute ago' ],
        [ 60 * MINUTE, 'minutes ago', MINUTE ],
        [ 1.5 * HOUR, 'an hour ago' ],
        [ DAY, 'hours ago', HOUR ],
        [ 2 * DAY, 'yesterday' ],
        [ 7 * DAY, 'days ago', DAY ],
        [ 1.5 * WEEK, 'a week ago'],
        [ MONTH, 'weeks ago', WEEK ],
        [ 1.5 * MONTH, 'a month ago' ],
        [ YEAR, 'months ago', MONTH ],
        [ 1.5 * YEAR, 'a year ago' ],
        [ Number.MAX_VALUE, 'years ago', YEAR ]
    ];

    function relativeDate(input,reference){
        input = (input.substring(input.length - 1).toLowerCase() == 'z') ? input : input + 'Z';
        input = new Date(input);
        !reference && ( reference = (new Date).getTime() );
        reference instanceof Date && ( reference = reference.getTime() );
        input instanceof Date && ( input = input.getTime() );

        var delta = reference - input,
            format, i, len;

        for(i = -1, len=formats.length; ++i < len;){
            format = formats[i];
            if(delta < format[0]){
                return format[2] == undefined ? format[1] : Math.round(delta/format[2]) + ' ' + format[1];
            }
        }
    }

    return relativeDate;
})();

DGW.helpers.dateDiff = function(endDate){
    endDate = (endDate.substring(endDate.length - 1).toLowerCase() == 'z') ? endDate : endDate + 'Z';
    return new Date(endDate) - new Date();
};

// TODO: remove " + 'Z' " from helpers, when server provides right time format

DGW.helpers.getURLParameter = function(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
};

DGW.helpers.console = (function(){
    return {
        log: function(){
            if (DGW.global.debug)
                console.log.apply(console, Array.prototype.slice.call(arguments));
        },
        info: function(){
            if (DGW.global.debug)
                console.info.apply(console, Array.prototype.slice.call(arguments));
        },
        warn: function(){
            if (DGW.global.debug)
                console.warn.apply(console, Array.prototype.slice.call(arguments));
        },
        error: function(){
            if (DGW.global.debug)
                console.error.apply(console, Array.prototype.slice.call(arguments));
        }
    };
})();

DGW.helpers.errorParser = function(error) {
    error = JSON.parse(error);
    var errorsArray = [];
    var errorsFields = [];
    if (error.ModelState) {
        for (var model in error.ModelState) {
            if (DGW.helpers.isArray(error.ModelState[model])) {
                error.ModelState[model].forEach(function(el){
                    errorsArray.push(el);
                });
                errorsFields.push(model.substr(6).toLowerCase());
            }
        }
    } else {
        return {messages: error.Message}
    }

    // TODO: use errorsFields as names for inputs
    return {messages: errorsArray, inputs: errorsFields}
};

DGW.helpers.insertAfter = function (newNode, referenceNode, _fallbackNode) {
    if (referenceNode) {
        referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
    } else {
        if (_fallbackNode) _fallbackNode.appendChild(newNode);
    }
};

DGW.helpers.zeroTimeout = function(callback){
    window.setTimeout(callback, 0);
};

DGW.helpers.openDataLinks = function(elems){
    var array = [];
    if (!DGW.helpers.isArray(elems)) {
        array.push(elems);
    } else {
        array = elems;
    }

    array.forEach(function(link){
        var url = DGW.global.widgetPathName + 'pages/' + link.getAttribute('data-link') + '.html';
        if (link) {
            link.addEventListener('click', function(ev){
                ev.preventDefault();
                DGW.helpers.showFramedSrc(url);
            });
        }
    });

};

DGW.helpers.showFramedSrc = function(src, domEl){
    var h = DGW.main.elements.frameHolder,
        ih = h.querySelector('.dg-o-w-iframe-holder'),
        sm = h.querySelector('.dg-o-w-submenu'),
        bb = h.querySelector('.dg-o-w-back-btn'),
        wb = DGW.main.elements.widgetBodyWrapper;
    ih.innerHTML = '';
    var iframe = document.createElement('iframe');
    DGW.main.methods.loadingStarted();
    iframe.onload = function(){
        DGW.main.methods.loadingFinished();
    };
    iframe.src = src;
    if (sm.childNodes.length > 1) sm.removeChild(sm.childNodes[sm.childNodes.length - 1]);

    if (domEl && domEl.nodeName) {
        var rightSide = document.createElement('div');
        rightSide.className = 'right-side';
        rightSide.appendChild(domEl);
        sm.appendChild(rightSide);
    }

    bb.addEventListener('click', DGW.helpers.hideFramedSrc);

    DGW.main.methods.hideNotificationBar();
    ih.appendChild(iframe);
    wb.appendChild(h);
};

DGW.helpers.hideFramedSrc = function(){
    var fh = DGW.main.elements.frameHolder,
        wb = DGW.main.elements.widgetBodyWrapper;

    if (fh.parentNode == wb) {
        DGW.helpers.addClass(fh, 'dg-o-w-hidden');
        setTimeout(function () {
            fh.querySelector('.dg-o-w-iframe-holder').innerHTML = '';
            DGW.helpers.removeClass(fh, 'dg-o-w-hidden');
            wb.removeChild(fh);
        }, 300);
    }
};

DGW.helpers.getElementsFromAllPlaces = function(selector, place){
    if (!selector) return;
    var places;

    if (place === 'main') {
        places = [
            DGW.main.elements.widgetBody,
            DGW.main.elements.pages
        ];
    } else if (place === 'side') {
        places = [
            DGW.side.elements.widgetBody
        ];
    } else {
        places = [
            DGW.main.elements.widgetBody,
            DGW.side.elements.widgetBody,
            DGW.main.elements.pages
        ];
    }

    var placesArr = [];
    var elements = [];

    places.forEach(function(place){
        if (DGW.helpers.isObject(place)) {
            for (var pl in place) {
                placesArr.push(place[pl]);
            }
        } else {
            placesArr.push(place);
        }
    });

    placesArr.forEach(function(place){
        Array.prototype.slice.call(place.querySelectorAll(selector)).forEach(function(elem){
            elements.push(elem);
        });
    });

    return elements;
};

DGW.helpers.gaCheckPut = function(name){
    name = name || DGW.global.club.name;
    if (!window.ga) {
        (function (i, s, o, g, r, a, m) {
            i['GoogleAnalyticsObject'] = r; i[r] = i[r] || function () {
                (i[r].q = i[r].q || []).push(arguments)
            }, i[r].l = 1 * new Date(); a = s.createElement(o),
                m = s.getElementsByTagName(o)[0]; a.async = 1; a.src = g; m.parentNode.insertBefore(a, m)
        })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

        DGW.helpers.gaCheckPut();
    } else {
        DGW.global.gaSend = name + '.send';
        if (ga.getByName) {
            if (!ga.getByName(name)) {
                ga('create', {
                    trackingId: 'UA-51923524-37',
                    cookieDomain: 'auto',
                    name: name
                });
            } else {
                DGW.helpers.console.log('GA is ready, DGW is created');
            }
        } else {
            var interval = window.setInterval(function(){
                if (ga.getByName) {
                    window.clearInterval(interval);
                    DGW.helpers.gaCheckPut();
                }
            }, 50);
        }
    }
};