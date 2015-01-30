var LotteryApp = {
	overallProgress: 0,
	daysInRow: 0,
	pointsCurrent: 0,
	maxDaysInRow: 3,
	drawEndDate: '2015/12/31'
};

jQuery(document).ready(function($){

	LotteryApp.showScoreFunction = showScore;
	LotteryApp.showCurrentOptionBox = showCurOption;
	LotteryApp.muteOptionItem = muteOptionItem;
	LotteryApp.unmuteOptionItem = unmuteOptionItem;

	/* CLOCKDOWN TIMER */
	$('.countdown').countdown(LotteryApp.drawEndDate, function (event) {
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
		// add it if needed later
		// $('.footer.showDesktop').addClass('footerAbsolute');
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

	function showScore(curOption) {
/*        if (!openFrame) openFrame = 'dashboard';
		openFrame = $('#' + openFrame);*/
		var openFrame = $('#dashboard');
		circleDays.animate(0,{duration: 1});
		circleOverall.animate(0,{duration: 1});

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
				circleOverall.animate(LotteryApp.overallProgress, function () {
					$('.circleDaysSection').animate({'opacity': 1}, 500);
					circleDays.animate(LotteryApp.daysInRow / LotteryApp.maxDaysInRow, function () {
						//$('body').scrollTop($('.earningOptions').offset().top - 300)
						$('html,body').animate({scrollTop: $('.earningOptions').offset().top - 100}, 2000, 'swing');
					});
				});

				$('.daysPercentage').html(LotteryApp.daysInRow + '/' + LotteryApp.maxDaysInRow);
				showCurOption(curOption);
			}, 700);
		});
	}

	var clickCounter = 0;
	$('.newCircleDummy').click(function(e) {
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
				circleOverall.animate(LotteryApp.overallProgress, {duration: 1000});
				break;
			case 1:
				allCirclesInfo.css('display', 'none');
				$('#infoTickets').fadeIn(300);
				circleToggles.removeClass('active');
				$(circleToggles[1]).addClass('active');
				circleDays.animate(0);
				break;
			case 2:
				allCirclesInfo.css('display', 'none');
				$('#infoDays').fadeIn(300);
				circleToggles.removeClass('active');
				$(circleToggles[2]).addClass('active');
				console.log(circleOverall.duration);
				circleOverall.animate(0, {duration: 800});
				circleDays.animate(LotteryApp.daysInRow / LotteryApp.maxDaysInRow);
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
		//Creating sticky footer
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
		circleDays.animate(0,{duration: 1});
		circleOverall.animate(0,{duration: 1});

		addScore(LotteryApp.pointsCurrent);
		init();
		/* CIRCLES PROGRESS */
		circleOverall.animate(LotteryApp.overallProgress, function () {
			$('.circleDaysSection').animate({'opacity': 1}, 500);
			circleDays.animate(LotteryApp.daysInRow / LotteryApp.maxDaysInRow, function () { });
		});

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
/*
		console.log($(this));
		var name     = emailSignUpForm.find('input[name=name]');
		var email    = emailSignUpForm.find('input[type=email]');
		var pass     = emailSignUpForm.find('input[type=password]');

		// client-side validation
		function checkFields() {

			if (checkEmail(email)) email.removeClass('inputError'); else email.addClass('inputError');

			if (name.val() < 1) {
				name.addClass('inputError');
			}else {
				name.removeClass('inputError');
			}

			if (pass.val() < 1) {
				pass.addClass('inputError');
			}else {
				pass.removeClass('inputError');
			}
			return false;
		}

		if(checkFields() == false) return false;
*/

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

	LotteryApp.muteOptionItem('exampleMutedItem');
	init();
});
