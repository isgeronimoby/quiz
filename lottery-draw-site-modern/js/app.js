var DrawApp = {
	ticketsCurrent: 0,
	ticketsMax: 1,
	daysInRow: 0,
	daysInRowMax: 1,
	facebookSharePauseDays: 1,
	twitterSharePauseDays: 1,
	nextFacebookShareDate: null,
	nextTwitterShareDate: null,
	scoreText: "SCORE",
	connectFBBox: false
};

jQuery(document).ready(function ($) {
	//Draw app API
	DrawApp.showScoreFunction = showScore;
	DrawApp.selectNextViewFunction = selectNextView;
	DrawApp.muteOptionItem = muteOptionItem;
	DrawApp.unmuteOptionItem = unmuteOptionItem;
	DrawApp.connectSuccess = connectSuccess;

	$(window).resize(function () {
		init();
	});

	if ( $('.fancybox').length > 0 ) {
	// Fancybox default values
	$('.fancybox').fancybox({
		maxWidth: 600,
		maxHeight: 800,
		fitToView: false,
		width: '100%',
		height: 'auto',
		autoSize: false,
		closeClick: false,
		openEffect: 'none',
		closeEffect: 'none',
		autoResize: true,
		onUpdate: function () {
			$('.fancybox-inner').height('auto');
		}
	});
		// End of fancybox default values
	}



	// End of fancybox default values
	$('.everton-popup-close').click(function (e) {
		e.preventDefault();
		$.fancybox.close();
	});

	/************ CHECKING FOR MOBILE DEVICES AND BROWSERS ************/
	window.mobilecheck = function() {
		var check = false;
		(function(a,b){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
		return check;
	};
	// Browser detection if no mobile detected -->
	if (!window.mobilecheck()) {
		var isOpera = !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
		// Opera 8.0+ (UA detection to detect Blink/v8-powered Opera)
		var isFirefox = typeof InstallTrigger !== 'undefined';   // Firefox 1.0+
		var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
		// At least Safari 3+: "[object HTMLElementConstructor]"
		var isChrome = !!window.chrome && !isOpera;              // Chrome 1+
		var isIE = /*@cc_on!@*/false || !!document.documentMode;   // At least IE6
		//show elements if desktop detected
		$('.showDesktop').css('display','inline-block');
		$('.showMobile').css('display','none');
	} else {
		//show elements if mobile detected
		$('.showMobile').css('display','inline-block');
		$('.showDesktop').css('display','none');
	}
	/*********** END OF CHECKING ***********/

	/*********** SHOW NOTIFICATIONS FOR EXTENSIONS ***********/
	function showExtensionPopup() {

		var notificationPopup = $('.extension-notification .extension-overlay .extension-notification-holder');
		var notifPopupArrow = notificationPopup.find('.extension-notification-arrow');
		var notificationText = notificationPopup.find('.extension-notification-body > h2');
		var notificationFFText = 'Almost there, click \'ALLOW\'<br/> and \'INSTALL\' to complete';

		if ( isChrome || isFirefox ) {
			if ( isChrome ) {
				notificationPopup.removeClass('winFF').addClass('winChrome');
				notifPopupArrow.removeClass('winFF').addClass('winChrome');
			} else { // is Firefox
				notificationPopup.removeClass('winChrome').addClass('winFF');
				notifPopupArrow.removeClass('winChrome').addClass('winFF');
				notificationText.html(notificationFFText);
			}

			$('.extension-notification').show();
		}
	}
	/*********** END OF NOTIFICATIONS ***********/

	var textState = 0;
	var currentText = $('#aboutContainer').html();
	$('.showMoreAboutPrize').click(function () {
		if (textState == 0) {
			$('#aboutContainer').html($('#infoTextToCopy').html());
			textState = 1;
		} else {
			$('#aboutContainer').html(currentText);
			textState = 0;
		}
		$(this).css('bottom', '15px');
	});


	function init() {
		$('.article > .greyBoxMobile').height($('.article >  .articleMobileImage').outerHeight() - 20);
		$('.article > .greyBoxDesktop').height($('.article >  .articleImageDesktop').outerHeight());

		if ($(window).width() > 900) {
			$($('#connectFBBox .button')[1]).width($($('#connectFBBox .button')[0]).width() + 10);
		}

		if ($(window).width() < 600) {
			if ($(window).width() > $(window).height()) {
				var maxCircleSize = Math.round($(window).outerHeight() * 0.7);
				$('.circularChart').css('width', maxCircleSize).css('padding-top', maxCircleSize);
			}
		} else {
			//do nothing here.
		}

		var uag = window.navigator.userAgent.toLowerCase();
		if (uag.indexOf("android") > 0) {
			var androidversion = parseFloat(uag.slice(uag.indexOf("android") + 8));
			if (androidversion <= 2.4) {
				$('.articleMobileImage').width($(window).width() / 2 - 10);
				$('.greyBoxMobile').width($('.articleMobileImage').width() - 10);
				$('.draw-wrapper').width($(window).width());
				$('.draw-wrapper').css('overflow', 'hidden');
			}
		}
	}

	//Animate score progress bar.
	function animateProgress(totalTickets) {
		for (var i = 0; i <= totalTickets; i++) {
			setTimeout(function (x) {
				return function () {
					$('.circlePercentage').html(x);
				};
			}(i), 80 * i);
		}
	}

	//Gets overall progress.
	function getOverallProgress() {
		return DrawApp.ticketsCurrent / DrawApp.ticketsMax;
	}

	//Is element in visible area.
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
		overall: undefined
	};

	var daysCircle;
	var overallCircle;

	$(window).resize(function () {
		circlesSize();
	});

	function circlesSize() {
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

	function drawProgressCircles() {
		daysCircle = new ProgressCircle({
			canvas: daysCircleCanvas,
			arcWidth: 5,
			gapWidth: -5,
			minRadius: $(daysCircleCanvas).attr('width') * 0.4
		});
		daysCircle.addEntry({
			fillColor: 'rgba(54, 65, 87, 1)',
			progressListener: function () {
				return 1;
			}
		}).addEntry({
			fillColor: 'rgba(189, 162, 52, 1)',
			progressListener: function () {
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
			progressListener: function () {
				return 1;
			}
		}).addEntry({
			fillColor: 'rgba(55, 130, 215, 1)',
			progressListener: function () {
				return progressCircles.overall;
			}
		}).start(30);
	}

	// all canvases and sizes initialisation
	drawProgressCircles();
	circlesSize();
	canvasHolderSize();

	function playOverallCircleAnimation(start, end) {
		$({ n: start }).animate({ n: end }, {
			duration: 1500,
			step: function (now, fx) {
				progressCircles.overall = now;
			},
			easing: 'easeOutBounce'
		});
	}
	function playDaysCircleAnimation(start, end) {
		$({ n: start }).animate({ n: end }, {
			duration: 1500,
			step: function (now, fx) {
				progressCircles.days = now;
			},
			easing: 'easeOutBounce'
		});
	}

	/************************ NEW PROGRESS CHARTS END ***************************/

	//Show Score! screen and open specified option.
	function showScore(curOption) {
		var openFrame = $('#dashboard');

		$('section').fadeOut(5);
		$('footer').css('visibility', 'hidden');

		$('.score').text(DrawApp.scoreText);
		$('.scoreHolder').css('display', 'inline-block');
		$('.score').animate({ 'font-size': '70px', 'opacity': 1 }, 500, function () {
			setTimeout(function () {
				$('.scoreHolder').css({ 'display': 'none' });
				$('.score').css({ 'opacity': 0, 'font-size': '1px' });
				$('footer').css('visibility', 'visible');
				openFrame.fadeIn(800);
				animateProgress(DrawApp.ticketsCurrent);
				init();
				/* CIRCLES PROGRESS */
				playOverallCircleAnimation(0, getOverallProgress());
				setTimeout(function () {
					$('.circleDaysSection').animate({ 'opacity': 1 }, 500);
					playDaysCircleAnimation(0, DrawApp.daysInRow / DrawApp.daysInRowMax);
					setTimeout(function () {
						$('html,body').animate({ scrollTop: $('.earningOptions').offset().top - 100 }, 2000, 'swing');
					}, 1000);
				}, 1000);

				$('.daysPercentage').html(DrawApp.daysInRow + '/' + DrawApp.daysInRowMax);

				selectNextView(curOption);	
			}, 700);
		});
	}

	//Circle progress bar content switcher
	var clickCounter = 0;
	$('.infoBlock').click(function (e) {
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
				playOverallCircleAnimation(0, getOverallProgress());
				break;
			case 1:
				allCirclesInfo.css('display', 'none');
				$('#infoTickets').fadeIn(300);
				circleToggles.removeClass('active');
				$(circleToggles[1]).addClass('active');
				playDaysCircleAnimation(DrawApp.daysInRow / DrawApp.daysInRowMax, 0);
				break;
			case 2:
				allCirclesInfo.css('display', 'none');
				$('#infoDays').fadeIn(300);
				circleToggles.removeClass('active');
				$(circleToggles[2]).addClass('active');
				playOverallCircleAnimation(getOverallProgress(), 0);
				playDaysCircleAnimation(0, DrawApp.daysInRow / DrawApp.daysInRowMax);
				break;
		}
	});

	var fbShareDialogOpened = false;
	//Facebook share handler
	$('.facebookShareButton').click(function (e) {
		if ($(this).hasClass('muted'))
			return false;

		if (window.navigator.userAgent) {
			var ua = window.navigator.userAgent.toLowerCase();
			if (ua.indexOf("iphone") > 0 || ua.indexOf("ipad") > 0 || ua.indexOf("android") > 0)
				return true; //fallback to the server side scenario for mobile devices.
		}

		e.preventDefault();

		if (fbShareDialogOpened)
			return false;

		fbShareDialogOpened = true;

		facebookSDKShareDialog();

		return false;
	});

	if (window.twttr) {
		twttr.ready(function (twttr) {
			twttr.events.bind('tweet', function (event) {
				$.ajax({
					type: "POST",
					url: twitterRewardUrl,
				}).done(function (content) {
					DrawApp.ticketsCurrent = content;

					var nextDate = new Date();
					nextDate.setDate(nextDate.getDate() + DrawApp.twitterSharePauseDays);
					DrawApp.nextTwitterShareDate = nextDate;
					$('.twitterShareButton').attr('href', '');

					showScore();
				});
			});
		});
	}

	//Twitter share handler
	$('.twitterShareButton').click(function (e) {
		if ($(this).hasClass('muted')) {
			$(this).attr('href', '');
			return false;
		}

		if (window.navigator.userAgent) {
			var ua = window.navigator.userAgent.toLowerCase();
			if (ua.indexOf("iphone") > 0 || ua.indexOf("ipad") > 0 || ua.indexOf("android") > 0) {
				$.ajax({
					type: "POST",
					url: twitterRewardUrl,
				}).always(function () {
					window.top.location.href = $('.twitterShareButton').attr('href');
				});

				return false; //fallback scenario for mobile devices.
			}
		}
	});
	

	function facebookSDKShareDialog() {
		FB.ui({
			method: 'share',
			href: prizeUrl,
		}, function (response) {
			fbShareDialogOpened = false;

			if (!response) {
				return;
			}
			
			if (response.error_code) {
				if (window.console && window.console.log) {
					console.log("Error occurred while sharing on Facebook: " + response.error_message);
				}
				return;
			}
				
			$.ajax({
				type: "POST",
				url: facebookRewardUrl,
			}).done(function (content) {
				DrawApp.ticketsCurrent = content;

				var nextDate = new Date();
				nextDate.setDate(nextDate.getDate() + DrawApp.facebookSharePauseDays);
				DrawApp.nextFacebookShareDate = nextDate;

				showScore();
			});
		});
	}

	function getDaysTillFacebookShare() {
		if (!DrawApp.nextFacebookShareDate)
			return 0;

		var timeDiff = DrawApp.nextFacebookShareDate.getTime() - (new Date()).getTime();
		var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

		return diffDays;
	}

	function getDaysTillTwitterShare() {
		if (!DrawApp.nextTwitterShareDate)
			return 0;

		var timeDiff = DrawApp.nextTwitterShareDate.getTime() - (new Date()).getTime();
		var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

		return diffDays;
	}

	if (document.location.hash == '#score') {
		if ("replaceState" in history) {
			history.replaceState("", document.title, window.location.pathname + window.location.search);
		}

		showScore();
	}
	else {
		animateProgress(DrawApp.ticketsCurrent);

		init();
		/* CIRCLES PROGRESS */
		playOverallCircleAnimation(0, getOverallProgress());
		setTimeout(function () {
			$('.circleDaysSection').animate({ 'opacity': 1 }, 500);
			playDaysCircleAnimation(0, DrawApp.daysInRow / DrawApp.daysInRowMax);
		}, 1000);

		$('.daysPercentage').html(DrawApp.daysInRow + '/' + DrawApp.daysInRowMax);

		selectNextView();
	}

	function selectNextView(view) {
		var fbDays = getDaysTillFacebookShare();
		var twDays = getDaysTillTwitterShare();

		//setup general state.
		if (fbDays > 0) {
			muteOptionItem('shareFacebookBoxItem');
			$('.facebookShareButton > span > span').text('Share on Facebook again in ' + fbDays + ' days');
		}

		if (twDays > 0) {
			muteOptionItem('shareTwitterBoxItem');
			$('.twitterShareButton > span > span').text('Share on Twitter again in ' + twDays + ' days');
		}

		if (DrawApp.connectFBBox)
			setCurOption('connectFBBox');
		else if (view)
			setCurOption(view);
		else if (fbDays <= 0)
			setCurOption('shareFacebookBox');
		else if (twDays <= 0)
			setCurOption('shareTwitterBox');
		else
			setCurOption('connectDeviceBox');
	}

	//Animate earning options.
	function animateEarningOptions() {
		setTimeout(function () {
			$(window).scroll(function () {
				var earningOptions = $('.earningOptions li');
				var prize = $('.article');

				earningOptions.each(function (index) {
					if (isScrolledIntoView($(this))) $(this).animate({ opacity: 1 }, 600);
				});

				if (isScrolledIntoView(prize)) prize.animate({ opacity: 1 }, 600);
			});
		}, 2000);
	}

	//Show current selected option.
	function setCurOption(option) {
		$('.earningOptions ul li').show();
		$('#' + option + 'Item').css('display', 'none');
		$('.curOptionBox').css('display', 'none');

		option = $('#' + option);
		if (option) option.fadeIn(300);

		animateEarningOptions();
	}

	//Mute option item.
	function muteOptionItem(item) {
		item = $('#' + item);
		item.find('.tickets').addClass('muted');
		item.find('.button').addClass('muted').click(function (e) {
			e.preventDefault();
		});
	}

	//Unmute option item.
	function unmuteOptionItem(item) {
		item = $('#' + item);
		item.find('.tickets').removeClass('muted');
		item.find('.button').removeClass('muted').unbind('click').click();
	}

	function connectSuccess(popupID) {
		var successPlace = $('#' + popupID);
		var successText = successPlace.find('.connectSuccessMessage');
		successPlace.find('.everton-popup-body img').hide();
		successPlace.find('.text-holder').hide();
		successText.addClass('connectSuccessMessageAnimated');
		setTimeout(function () {
			successText.addClass('connectSuccessMessageAnimationFinished').removeClass('connectSuccessMessageAnimated');
			successPlace.find('.everton-popup-body img').show();
			successPlace.find('.text-holder').show();
			successText.removeClass('connectSuccessMessageAnimationFinished');

			$.fancybox.close();
		}, 4000);
	}

	// GENERATING CIRCULAR CANVAS FROM IMAGE FOR AVATAR
	function renderAvatar(src) {
		var size = document.querySelector('.portraitHolder img').naturalWidth;
		src = src.attr('src');
		var c = document.getElementsByClassName("portraitHolder")[0];
		$(c).find('img').hide();
		$(c).append('<canvas id="portraitCanvas">');
		c = document.getElementById('portraitCanvas');
		c.width = size + 5;
		c.height = size + 5;
		var ctx = c.getContext("2d");
		var img = document.createElement('IMG');
		img.onload = function () {
			var pattern = ctx.createPattern(img, 'no-repeat');

			ctx.beginPath();
			ctx.arc(size / 2 + 2,
					size / 2 + 2,
					size / 2,
				0, 2 * Math.PI);
			ctx.lineWidth = 8;
			ctx.strokeStyle = '#364158';
			ctx.stroke();
			ctx.fillStyle = pattern;
			ctx.fill();
		};
		img.src = src;
	}

	$('.portraitHolder img').load(function () {
		setTimeout(function () {
			renderAvatar($('.portraitHolder img'));
		}, 300);
	});

	$(document).ajaxError(function (event, jqXHR, settings, exception) {
		if (jqXHR.readyState != 4)
			return;

		//ajax error handler
		switch (jqXHR.status) {
			case 401:
				if (jqXHR.getResponseHeader("RedirectUrl") !== null)
					window.location.replace(jqXHR.getResponseHeader("RedirectUrl"));
				else
					window.location.reload();
				break;
			default:
				if (window.console && window.console.log) {
					console.log("An error occurred: " + jqXHR.statusText);
				}
				break;
		}
	});
});