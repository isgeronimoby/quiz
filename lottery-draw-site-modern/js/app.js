var overallProgress = 0;
var daysInRow = 0;
var pointsCurrent = 0;

$(document).ready(function(){

    window.scrollTo(0,0);
    var body = document.documentElement;
    if (body.requestFullscreen) {
        body.requestFullscreen();
    } else if (body.webkitrequestFullscreen) {
        body.webkitrequestFullscreen();
    } else if (body.mozrequestFullscreen) {
        body.mozrequestFullscreen();
    } else if (body.msrequestFullscreen) {
        body.msrequestFullscreen();
    }



    /* CLOCKDOWN TIMER */
    $('.countdown').countdown('2015/12/31', function(event) {
        $(this).html(event.strftime('<div><div><span class="numbers">%D</span><span>day%!d</span></div></div>' +
            '<div><div><span class="numbers">%H</span><span>hrs</span></div></div>' +
            '<div><div><span class="numbers">%M</span><span>mins</span></div></div>' +
            '<div><div><span class="numbers">%S</span><span>secs</span></div></div>'));
    });
    /* CLOCKDOWN TIMER END */

    $(window).resize(function(){
        init();
    });

    function init(){
        $('.article > .articleImage').height($('.article > .greyBox').outerHeight());

        if ($(window).width() < 600) {
            if ($(window).width() > $(window).height()) {
                var maxCircleSize = Math.round($(window).outerHeight() * 0.7);
                $('.circularChart').css('width', maxCircleSize).css('padding-top', maxCircleSize);
            }
        }
    }

    function addScore(maxBalls){
        for (var i = 0; i <= maxBalls; i++) {
            setTimeout(function(x) {
                return function() {
                    $('.circlePercentage').html(x);
                };
            }(i), 80*i);
        }
    }

    function isScrolledIntoView(elem) {
        var docViewTop = $(window).scrollTop();
        var docViewBottom = docViewTop + $(window).height();
        var elemTop = $(elem).offset().top;
        var elemBottom = elemTop + $(elem).height();
        return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
//        return ((docViewTop < elemTop) && (docViewBottom > elemBottom));
    }



    $('#btnEnterDraw').click(function(e){
        e.preventDefault();
        $('#enterDraw').css('display','none');

/*        if (screenfull.enabled) {
            screenfull.request();
        } else {
            // Ignore or do something else
        }*/

        $('.scoreHolder').css('display','inline-block');
        $('.score').animate({'font-size': '70px', 'opacity': 1},500, function(){
            setTimeout(function(){
                $('.scoreHolder').css('display','none');

                $('#dashboard').fadeIn(800);
                /* CIRCLES PROGRESS */
                var circleOverall = new ProgressBar.Circle('#overallProgressCircle', {
                    color: '#3782d7',
                    strokeWidth: 3,
                    easing: 'bounce',
                    duration: 1500
                });
                var circleDays = new ProgressBar.Circle('#daysProgressCircle', {
                    color: '#bda234',
                    strokeWidth: 2,
                    easing: 'bouncePast'
                });

                addScore(pointsCurrent);
                circleOverall.animate(overallProgress, function() {
                    $('.circleDaysSection').animate({'opacity':1}, 500);
                    circleDays.animate(daysInRow, function() {
                        //$('body').scrollTop($('.earningOptions').offset().top - 300)
                        $('html,body').animate({scrollTop: $('.earningOptions').offset().top - 100}, 2000,'swing');
                    });

                });

                $('.daysPercentage').html(Math.floor(4 * daysInRow) + '/4');

                var clickCounter = 0;
                $('.newCircleDummy').click(function(e){
                    console.log(e);
                    console.log($(this));
                    var allCirclesInfo = $('.circleSection');
                    var circleToggles = $('.circleToggles li');

                    if (clickCounter == 2) {
                        clickCounter = 0;
                    } else {
                        clickCounter++;
                    }

                    switch (clickCounter) {
                        case 0:
                            allCirclesInfo.css('display','none');
                            $('#infoOverall').fadeIn(300);
                            circleToggles.removeClass('active');
                            $(circleToggles[0]).addClass('active');
                            circleOverall.animate(overallProgress, {duration: 1000});
                            break;
                        case 1:
                            allCirclesInfo.css('display','none');
                            $('#infoTickets').fadeIn(300);
                            circleToggles.removeClass('active');
                            $(circleToggles[1]).addClass('active');
                            circleDays.animate(0);
                            break;
                        case 2:
                            allCirclesInfo.css('display','none');
                            $('#infoDays').fadeIn(300);
                            circleToggles.removeClass('active');
                            $(circleToggles[2]).addClass('active');
                            console.log(circleOverall.duration);
                            circleOverall.animate(0, {duration: 800});
                            circleDays.animate(daysInRow);
                            break;
                    }
                });
                /* CIRCLES PROGRESS END */

                /* ElEMENTS APPEARANCE ON SCROLLING */
                $(window).scroll(function(){
                    var connectFB = $('#connectFBBox');
                    var earningOptions = $('.earningOptions li');
                    var prize = $('.article');

                    if (isScrolledIntoView(connectFB)) connectFB.animate({opacity:1},600);

                    earningOptions.each(function(index){
                        if(isScrolledIntoView($(this))) $(this).animate({opacity:1},600);
                    });

                    if (isScrolledIntoView(prize)) prize.animate({opacity:1},600);
                });
                /* ElEMENTS APPEARANCE ON SCROLLING END */

                init();
            }, 700);
        });

    });

    init();
});
