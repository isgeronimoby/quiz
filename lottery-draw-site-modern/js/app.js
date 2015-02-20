var LotteryApp = {
	overallProgress: 0,
	daysInRow: 0,
	pointsCurrent: 0,
	maxDaysInRow: 5,
	drawEndDate: '2015/12/31'
};

jQuery(document).ready(function($){

	LotteryApp.showScoreFunction = showScore;
	LotteryApp.showCurrentOptionBox = showCurOption;
	LotteryApp.muteOptionItem = muteOptionItem;
	LotteryApp.unmuteOptionItem = unmuteOptionItem;
	LotteryApp.connectSuccess = connectSuccess;

	/* CLOCKDOWN TIMER */
	$('.countdown').countdown(LotteryApp.drawEndDate, function (event) {
		$(this).html(event.strftime('<div><div><span class="numbers">%D</span><span>day%!d</span></div></div>' +
			'<div><div><span class="numbers">%H</span><span>hrs</span></div></div>' +
			'<div><div><span class="numbers">%M</span><span>mins</span></div></div>' +
			'<div><div><span class="numbers">%S</span><span>secs</span></div></div>'));
            if( $(window).width() < 900 ) {
                $('.countdown > div').css('width','20%');
            } else {
                $('.countdown > div').css('width', '24%');
            }

	});
	/* CLOCKDOWN TIMER END */

	$(window).resize(function(){
		init();
	});

	// Fancybox default values
	$('.fancybox').fancybox({
		maxWidth	: 600,
		maxHeight	: 800,
		fitToView	: false,
		width		: '100%',
		height		: 'auto',
		autoSize	: false,
		closeClick	: false,
		openEffect	: 'none',
		closeEffect	: 'none',
		autoResize: true,
		onUpdate: function() {
			$('.fancybox-inner').height('auto');
		}
	});
	// End of fancybox default values

	$('.historyBack').click(function(e){
		e.preventDefault();
		window.history.back();
	});

	$('.everton-popup-close').click(function(e){
		e.preventDefault();
		$.fancybox.close();
	});


	var textState = 0;
	var currentText = $('#aboutContainer').html();
	$('.showMoreAboutPrize').click(function(){
		if (textState == 0) {
			$('#aboutContainer').html($('#infoTextToCopy').html());
			textState = 1;
		} else {
			$('#aboutContainer').html(currentText);
			textState = 0;
		}
		$(this).css('bottom','15px');
	});


	function init(){
        $('.article > .greyBoxMobile').height($('.article >  .articleMobileImage').outerHeight() - 20);
        $('.article > .greyBoxDesktop').height($('.article >  .articleImageDesktop').outerHeight());

		if ($(window).width() > 900) {
			$($('#connectFBBox .button')[1]).width($($('#connectFBBox .button')[0]).width()+10);
		}
		if ($(window).width() < 600) {
			if ($(window).width() > $(window).height()) {
				var maxCircleSize = Math.round($(window).outerHeight() * 0.7);
				$('.circularChart').css('width', maxCircleSize).css('padding-top', maxCircleSize);
			}
		} else {

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
	}

    /************************ NEW PROGRESS CHARTS ***************************/

    var daysCircleCanvas = document.getElementById('daysCircleProgress');
    var overallCircleCanvas = document.getElementById('overallCircleProgress');

    var progressCircles = {
        days: undefined,
        days_max: LotteryApp.daysInRow / LotteryApp.maxDaysInRow,
        overall: undefined,
        overall_max: LotteryApp.overallProgress
    };

    var daysCircle;
    var overallCircle;

    $(window).resize(function(){
        circlesSize();
    });

    function circlesSize(){
        var windowWidth = $(window).width();
        var windowHeight = $(window).height();
        var maxWidth = $('.countdown').width() - 10;

        if (windowWidth < 900 && windowWidth > windowHeight) {
            maxWidth = maxWidth * 0.6;
        } else {
            maxWidth = maxWidth * 0.8;
        }

        $(daysCircleCanvas).attr('width', maxWidth);
        $(daysCircleCanvas).attr('height', maxWidth);
        $(overallCircleCanvas).attr('width', maxWidth);
        $(overallCircleCanvas).attr('height', maxWidth);
        daysCircle.stop();
        overallCircle.stop();
        drawProgressCircles();
        canvasHolderSize();
    }
    function canvasHolderSize() {
        $('.canvasHolder').width($(daysCircleCanvas).attr('width'));
        $('.canvasHolder').height($(daysCircleCanvas).attr('height'));
    }

    function drawProgressCircles(){
        daysCircle = new ProgressCircle({
            canvas: daysCircleCanvas,
            arcWidth: 5,
            gapWidth: -5,
            minRadius: $(daysCircleCanvas).attr('width') * 0.4
        });
        daysCircle.addEntry({
            fillColor: 'rgba(54, 65, 87, 1)',
            progressListener: function() {
                return 1;
            }
        }).addEntry({
            fillColor: 'rgba(189, 162, 52, 1)',
            progressListener: function() {
                return progressCircles.days;
            }
        }).start(30);
        overallCircle = new ProgressCircle({
            canvas: overallCircleCanvas,
            arcWidth: 8,
            gapWidth: -8,
            minRadius: $(overallCircleCanvas).attr('width') * 0.4 + 10
        });
        overallCircle.addEntry({
            fillColor: 'rgba(54, 65, 87, 1)',
            progressListener: function() {
                return 1;
            }
        }).addEntry({
            fillColor: 'rgba(55, 130, 215, 1)',
            progressListener: function() {
                return progressCircles.overall;
            }
        }).start(30);
    }

    // all canvases and sizes initialisation
    drawProgressCircles();
    circlesSize();
    canvasHolderSize();

    function playOverallCircleAnimation(start, end) {
        $({n: start}).animate({n: end}, {
            duration: 1500,
            step: function(now, fx) {
                progressCircles.overall = now;
            },
            easing: 'easeOutBounce'
        });
    }
    function playDaysCircleAnimation(start, end) {
        $({n: start}).animate({n: end}, {
            duration: 1500,
            step: function(now, fx) {
                progressCircles.days = now;
            },
            easing: 'easeOutBounce'
        });
    }




    /************************ NEW PROGRESS CHARTS END ***************************/

	function showScore(curOption) {

		var openFrame = $('#dashboard');

		$('section').fadeOut(5);
		$('footer').css('visibility', 'hidden');

		$('.scoreHolder').css('display','inline-block');
		$('.score').animate({'font-size': '70px', 'opacity': 1}, 500, function() {
			setTimeout(function () {
				$('.scoreHolder').css({'display': 'none'});
				$('.score').css({'opacity': 0, 'font-size': '1px'});
				$('footer').css('visibility', 'visible');
				openFrame.fadeIn(800);
				addScore(LotteryApp.pointsCurrent);
				init();
				/* CIRCLES PROGRESS */

                playOverallCircleAnimation (0, progressCircles.overall_max);
                setTimeout(function(){
                    $('.circleDaysSection').animate({'opacity': 1}, 500);
                    playDaysCircleAnimation (0, progressCircles.days_max);
                    setTimeout(function(){
                        $('html,body').animate({scrollTop: $('.earningOptions').offset().top - 100}, 2000, 'swing');
                    }, 1000);
                }, 1000);

				$('.daysPercentage').html(LotteryApp.daysInRow + '/' + LotteryApp.maxDaysInRow);
				showCurOption(curOption);
			}, 700);
		});
	}

	var clickCounter = 0;
	$('.infoBlock').click(function(e) {
		var allCirclesInfo = $('.circleSection');
		var circleToggles = $('.circleToggles li');

		if (clickCounter == 2) {
			clickCounter = 0;
		} else {
			clickCounter++;
		}

		switch (clickCounter) {
			case 0:
				allCirclesInfo.css('display', 'none');
				$('#infoOverall').fadeIn(300);
				circleToggles.removeClass('active');
				$(circleToggles[0]).addClass('active');
                playOverallCircleAnimation (0, progressCircles.overall_max);
				break;
			case 1:
				allCirclesInfo.css('display', 'none');
				$('#infoTickets').fadeIn(300);
				circleToggles.removeClass('active');
				$(circleToggles[1]).addClass('active');
                playDaysCircleAnimation (progressCircles.days_max, 0);
				break;
			case 2:
				allCirclesInfo.css('display', 'none');
				$('#infoDays').fadeIn(300);
				circleToggles.removeClass('active');
				$(circleToggles[2]).addClass('active');
                playOverallCircleAnimation (progressCircles.overall_max, 0);
                playDaysCircleAnimation (0, progressCircles.days_max);
				break;
		}
	});

	if (document.location.hash.substr(1) == 'first') {
		dashboardFirstOpen();
	} else {
		dashboardOpen();
	}

	// for opening DASHBOARD for the first time
	function dashboardFirstOpen() {
		showScore('connectFBBox');

		setTimeout(function(){
			$(window).scroll(function(){
				var earningOptions = $('.earningOptions li');
				var prize = $('.article');

				earningOptions.each(function(index){
					if(isScrolledIntoView($(this))) $(this).animate({opacity:1},600);
				});

				if (isScrolledIntoView(prize)) prize.animate({opacity:1},600);
			});
		}, 2000);
	}

	// Opening DASHBOARD any other time
	function dashboardOpen() {
		addScore(LotteryApp.pointsCurrent);
		init();

		/* CIRCLES PROGRESS */
        playOverallCircleAnimation (0, progressCircles.overall_max);
        setTimeout(function(){
            $('.circleDaysSection').animate({'opacity': 1}, 500);
            playDaysCircleAnimation (0, progressCircles.days_max);
        }, 1000);

		$('.daysPercentage').html(LotteryApp.daysInRow + '/' + LotteryApp.maxDaysInRow);

		$('.article').css('opacity','1');
		$('.earningOptions ul li').css('opacity','1');
	}

	function showCurOption(option) {
		option = $('#' + option);
		$('.curOptionBox').css('display','none');
		if (option) option.fadeIn(300);
	}

	function muteOptionItem(item) {
		item = $('#' + item);
		item.find('.tickets').addClass('muted');
		item.find('.button').addClass('muted').click(function(e){
			e.preventDefault();
		});
	}
	function unmuteOptionItem(item) {
		item = $('#' + item);
		item.find('.tickets').removeClass('muted');
		item.find('.button').removeClass('muted').unbind('click').click();
	}


	function checkEmail(email) {
		var emailReg = /^[a-zA-Z0-9._+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,4}(\.[a-zA-Z]{2,3})?(\.[a-zA-Z]{2,3})?$/;
		return !!emailReg.test(email.val());
	}

	var emailSignUpForm = $('#signUpWithEmailForm');
	var connectDeviceForm = $('#connectDeviceForm');

	emailSignUpForm.find("input[type=submit]").click(function() {
		$.ajax({
			type: "post",
			url: "signUpEmail.php",
			data: emailSignUpForm.serialize(),
			cache: false,
			success: function(data) {

			},
			error: function() {

			}
		});
		return false;
	});

	connectDeviceForm.find('input[type=submit]').click(function(){
		var email = connectDeviceForm.find('input[type=email]');

		if (checkEmail(email)) email.removeClass('inputError'); else {
			email.addClass('inputError');
			return false;
		}

		$.ajax({
			type: "post",
			url: "linkingDevice.php",
			data: connectDeviceForm.serialize(),
			cache: false,
			success: function(data) {

			},
			error: function() {

			}
		});

		return false;

	});
	emailSignUpForm.find('input').focus(function(){
		$(this).removeClass('inputError');
	});

	function connectSuccess(popupID) {
		var successPlace = $('#' + popupID);
		var successText = successPlace.find('.connectSuccessMessage');
		successPlace.find('.everton-popup-body img').hide();
		successPlace.find('.text-holder').hide();
		successText.addClass('connectSuccessMessageAnimated');
		setTimeout(function(){
			successText.addClass('connectSuccessMessageAnimationFinished').removeClass('connectSuccessMessageAnimated');
			successPlace.find('.everton-popup-body img').show();
			successPlace.find('.text-holder').show();
			successText.removeClass('connectSuccessMessageAnimationFinished');

			$.fancybox.close();
		}, 4000);
	}

    var uag = window.navigator.userAgent.toLowerCase();
    if (uag.indexOf("android") > 0){
        var androidversion = parseFloat(uag.slice(uag.indexOf("android")+8));
        if (androidversion <= 2.4) {
            $('.articleMobileImage').width($(window).width() / 2 - 10);
            $('.greyBoxMobile').width($('.articleMobileImage').width() - 10);
            $('.draw-wrapper').width($(window).width());
            $('.draw-wrapper').css('overflow','hidden');
        }
    }

	LotteryApp.muteOptionItem('exampleMutedItem');

	// GENERATING CIRCULAR CANVAS FROM IMAGE FOR AVATAR
	function renderAvatar(src) {
		var size = document.querySelector('.portraitHolder img').naturalWidth;
		src = src.attr('src');
		var c = document.getElementsByClassName("portraitHolder")[0];
		$(c).find('img').hide();
		$(c).append('<canvas id="portraitCanvas">');
		c = document.getElementById('portraitCanvas');
		c.width = size+5;
		c.height = size+5;
		var ctx = c.getContext("2d");
		var img = document.createElement('IMG');
		img.onload = function(){
			var pattern = ctx.createPattern(img, 'no-repeat');
//            ctx.drawImage(img, size/2+2, size/2+2, 70, 70);
			ctx.beginPath();
			ctx.arc(size/2+2,
					size/2+2,
					size/2,
				0,2*Math.PI);
			ctx.lineWidth = 8;
			ctx.strokeStyle = '#364158';
			ctx.stroke();
			ctx.fillStyle = pattern;
			ctx.fill();
		};
		img.src = src;
	}
	$('.portraitHolder img').load(function(){
		renderAvatar($('.portraitHolder img'));
	});

	init();
});