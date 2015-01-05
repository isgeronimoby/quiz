var showScore;

$(document).ready(function(){
//    var maxScore = +($('.ballScore').html());



    function scoreScreen(maxBalls) {
//        $('.ballScore').html(0);
        if ($(window).width() <= 1024) {
            ballFadeInMiddleOfScreenAndBottom();
            setTimeout(function () {
                scoreFadeInMiddle(60);
                setTimeout(function(){
                    addScore(maxBalls);
                }, 300);
            }, 600);
        } else {
            ballKickedIntoGoals();
            setTimeout(function () {
                scoreFadeInMiddle(120);
                setTimeout(function(){
                    addScore(maxBalls);
                }, 300);
            }, 600);
        }
    }

    showScore = scoreScreen;

    function addScore(maxBalls){
        for (var i = 0; i <= maxBalls; i++) {
            setTimeout(function(x) {
                return function() {
                    $('.ballScore').html(x);
                };
            }(i), 50*i);
        }
    }

    function scoreFadeInMiddle(fontSize) {
        $('.scoreHolder').css('display','inline-block');
        var word = $('.scoreHolder').find('span');
        word.animate({'font-size': fontSize + 'px', 'opacity': 1}, 400, 'easeOutSine', function(){
            setTimeout(function(){
               word.animate({'opacity': 0}, 300, 'easeOutSine');
            }, 1500);
        });

    }



    function ballFadeInMiddleOfScreenAndBottom() {
        $('#ballFadeInTrigger').trigger('click');
        $('.footballHolder').css('display','inline-block');
        setTimeout(function(){
            $('#goldenBall').css('display','inline-block');
            $('.goldenBallDummy').css('display','none');
//            addScore();
        },700);
        setTimeout(function(){
            $('.footballHolder').css('display','none');
        },1200);
    }

    function ballKickedIntoGoals() {
        var contWidth = $('.pageFooter .container');
        var width = ($('.pageFooter').width() - contWidth.width())/2;
        width = width + contWidth.width() - 390;
        var height = $(window).height() - 70;

        var ballAbs = $('#goldenBallAbs');

        ballAbs.animate({left: width, top: [height, 'easeOutBounce']}, 800, 'easeOutSine', function(){
            $(this).css('display','none');
            $('#goldenBall').css('display','inline-block');
            $('.goldenBallDummy').css('display','none');
        });
        setTimeout(function(){
            ballAbs.addClass('ballRotates');
        },10);
/*        setTimeout(function(){
            addScore();
        },400);*/
    }

    $('#test01').click(function(e){
        ballFadeInMiddleOfScreenAndBottom();
    });

    /* **************************************************************** */
    $('#techAdditions').append('<span id="earnMoreTrigger"></span>');

    AniJS.createAnimation([{
        event: 'click',
        eventTarget: '#earnMoreTrigger',
        behaviorTarget: '.earnMoreContainer',
        behavior: 'bounce animated',
        before: function(e, animationContext){
            animationContext.run()
        }
    }]);

    setInterval(function(){
        $('#earnMoreTrigger').trigger('click');
    }, 10000);
    /* **************************************************************** */
    /* **************************************************************** */
    $('#techAdditions').append('<span id="ballFadeInTrigger"></span>');

    AniJS.createAnimation([{
        event: 'click',
        eventTarget: '#ballFadeInTrigger',
        behaviorTarget: '#footballFadeIn',
        behavior: 'zoomOutDown animated',
        before: function(e, animationContext){
            animationContext.run()
        }
    }]);
    /* **************************************************************** */
    /* **************************************************************** */
    $('#techAdditions').append('<span id="scoreFadeInTrigger"></span>');

    AniJS.createAnimation([{
        event: 'click',
        eventTarget: '#scoreFadeInTrigger',
        behaviorTarget: '#scoreFadeIn',
        behavior: 'zoomOut animated',
        before: function(e, animationContext){
            animationContext.run()
        }
    }]);
    /* **************************************************************** */

    $('#test02').click(function(e){
        $('#goldenBall').css('display','inline-block');
        $('.goldenBallDummy').css('display','none');
        setTimeout(function(){
            addScore();
        },400);
    });



    $('#test03').click(function(e){
        ballKickedIntoGoals();
    });




    // Temporary buttons for changing states
    $('section').each(function(){
        var sections = $(this).attr('id');

        $('#stateHolder').append('<button id="btn_' + sections + '">'+ sections +'</button><br/>');

        $('#btn_' + sections).click(function(){
            $('section').css('display', 'none');

            $('#' + sections).fadeIn(400);
            $('.overlay').fadeOut(100); //Delete on production
        });
    });

    function startClock(clock) {
        var today = new Date();
        var bigDay = new Date("December 31, 2014");
        var timeLeft = (bigDay.getTime() - today.getTime());

        var clock = new FlipClock($(clock), {
            clockFace: 'DailyCounter',
            countdown: true
        });
        clock.setTime(Math.floor(timeLeft / 1000));
        clock.start();
    }

    startClock('.countdownClock');
    startClock('.countdownClock2');


    $('.countdown').countdown('2015/12/31', function(event) {
        $(this).html(event.strftime('<div><span class="numbers">%D</span><span>day%!d</span></div>' +
            '<div><span class="numbers">%H</span><span>hrs</span></div>' +
            '<div><span class="numbers">%M</span><span>mins</span></div>' +
            '<div><span class="numbers">%S</span><span>secs</span></div>'));
    });


    $('#mobMenu').click(function(){
        $('.overlay').fadeIn(300);
    });


    // Input check and AJAX forms
    $('#showLinkPopup').click(function(e){
        e.preventDefault();
        $('#screenEnterEmailForLinking').fadeIn(300);
        $('#screenLinkDevice').css('display','none');
    });

    $("#submitEmail").click(function() {
        var email   = $('#emailLinking input[type=email]');
        var emailReg = /^[a-zA-Z0-9._+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,4}(\.[a-zA-Z]{2,3})?(\.[a-zA-Z]{2,3})?$/;

        // client-side validation
        if(emailReg.test(email.val()) == false) {
            email.addClass('inputError');
            return false;
        } else {
            email.removeClass('inputError');
        }

        $.ajax({
            type: "post",
            url: "save-email.php",
            data: $('#emailLinking').serialize(),
            cache: false,
            success: function(data) {

            },
            error: function() {

            }
        });
        return false;
    });

    $('#emailLinking input[type=email]').focus(function(){
        $(this).removeClass('inputError');
    });


    // Signing Up with email
    $('#btnSignUpEmail').click(function(e){
        e.preventDefault();
        $('#screenMailAuthorizationPopup').fadeIn(300);
        $('#screenFBConnect').css('display','none');
    });
    $('#screenMailAuthorizationPopup .btnClose').click(function(e){
        e.preventDefault();
        $('#screenMailAuthorizationPopup').fadeOut(200);
        $('#screenFBConnect').css('display','inline-block');
    });

    $("#signUp").click(function() {
        var email   = $('#screenMailAuthorizationPopup input[type=email]');
        var pass   = $('#screenMailAuthorizationPopup input[type=password]');
        var emailReg = /^[a-zA-Z0-9._+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,4}(\.[a-zA-Z]{2,3})?(\.[a-zA-Z]{2,3})?$/;

        // client-side validation
        function checkFields() {
            if(emailReg.test(email.val()) == false) {
                email.addClass('inputError');
            } else {
                email.removeClass('inputError');
            }

            if (pass.val() < 1) {
                pass.addClass('inputError');
            }else {
                pass.removeClass('inputError');
            }
            return false;
        }

        if(checkFields() == false) return false;

        $.ajax({
            type: "post",
            url: "save-email.php",
            data: $('#emailLinking').serialize(),
            cache: false,
            success: function(data) {

            },
            error: function() {

            }
        });
        return false;
    });

    $('#screenMailAuthorizationPopup input[type=email]').focus(function(){
        $(this).removeClass('inputError');
    });
    $('#screenMailAuthorizationPopup input[type=password]').focus(function(){
        $(this).removeClass('inputError');
    });
});