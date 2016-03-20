DGW.helpers.addClass = function(obj, className){
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

DGW.helpers.setDrawCountdown = function(dt, elem) {
    var end = new Date(dt);

    var _second = 1000;
    var _minute = _second * 60;
    var _hour = _minute * 60;
    var _day = _hour * 24;
    var timer;

    function showRemaining() {
        var now = new Date();
        var distance = end - now;
        if (distance < 0) {
            clearInterval(timer);
            elem.innerHTML = 'EXPIRED!';
            return;
        }
        var days = Math.floor(distance / _day);
        var hours = Math.floor((distance % _day) / _hour);
        var minutes = Math.floor((distance % _hour) / _minute);
        var seconds = Math.floor((distance % _minute) / _second);

        elem.innerHTML = days + 'd ';
        elem.innerHTML += hours + 'h ';
        elem.innerHTML += minutes + 'm ';
        elem.innerHTML += seconds + 's';
    }
    timer = setInterval(showRemaining, 1000);
};