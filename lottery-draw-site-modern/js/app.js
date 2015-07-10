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
	connectFBBox: false,
	actionsList: []
};

jQuery(document).ready(function ($) {
	//Draw app API
	DrawApp.showScoreFunction = showScore;
	DrawApp.selectNextViewFunction = selectNextView;
	DrawApp.muteOptionItem = muteOptionItem;
	DrawApp.unmuteOptionItem = unmuteOptionItem;
	DrawApp.connectSuccess = connectSuccess;
	DrawApp.restoreActionsList = refreshActionsList;

	$(window).scrollTop( 0 );

	$(window).resize(function () {
		init();
	});

	var fancyboxes = $('.fancybox');

	if ( fancyboxes.length > 0 ) {
		// Fancybox default values
		fancyboxes.fancybox({
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
			},
			afterShow: function(){
				var uag = window.navigator.userAgent.toLowerCase();
				if (uag.indexOf("android") > 0) {
					var androidversion = parseFloat(uag.slice(uag.indexOf("android") + 8));
					if ( androidversion && androidversion <= 4.1 ) {
						$('body, html').scrollTop( 0 );
						$('body').addClass('androidLow');
						$('input[type="password"]').add('input[type="text"]').addClass('androidLow');
					}
				}
			},
			afterClose: function(){
				$('body').removeClass('androidLow');
			}
		});
		// End of fancybox default values
	}



	// End of fancybox default values
	$('.everton-popup-close').click(function (e) {
		e.preventDefault();
		$.fancybox.close();
	});


	function init() {
		$('.article > .greyBoxDesktop').height($('.article >  .articleImageDesktop').outerHeight());

		var mobileArticleImage = $('.article >  .articleMobileImage > img');
		var mobileArticleImageDummy = new Image();
		mobileArticleImageDummy.onload = function(){
			$('.article > .greyBoxMobile').parent().height( mobileArticleImage.height() );
			$('.article > .greyBoxMobile').height( mobileArticleImage.height() );
		};
		mobileArticleImageDummy.src = mobileArticleImage.attr('src');

		if ($(window).width() > 900) {
			$($('#connectFBBox .button')[1]).width($($('#connectFBBox .button')[0]).width() + 10);
		} else {

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
//				$('.articleMobileImage').width($(window).width() / 2 - 10);
//				$('.greyBoxMobile').width($('.articleMobileImage').width() - 10);
				$('.draw-wrapper').width($(window).width());
				$('.draw-wrapper').css('overflow', 'hidden');
				$('.thinLink h3').css('font-size','12px');
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
		return ( $(window).scrollTop() + $(window).height() > $(elem).offset().top + $(elem).height() / 2 );
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
		if ( currentPlatform == 'desktop' ) {
			circlesSize();

			$('.article > .greyBoxMobile').parent().height($('.article >  .articleMobileImage > img').height());
			$('.article > .greyBoxMobile').height($('.article >  .articleMobileImage > img').height());
		}
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

		if ( currentPlatform == 'mobile' ) {
			maxWidth = 260;
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
		if ($(this).parent().hasClass('muted'))
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
					url: twitterRewardUrl
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
		if ($(this).parent().hasClass('muted')) {
			$(this).attr('href', '');
			return false;
		}

		if (window.navigator.userAgent) {
			var ua = window.navigator.userAgent.toLowerCase();
			if (ua.indexOf("iphone") > 0 || ua.indexOf("ipad") > 0 || ua.indexOf("android") > 0) {
				$.ajax({
					type: "POST",
					url: twitterRewardUrl
				}).always(function () {
					window.top.location.href = $('.twitterShareButton').attr('href');
				});

				return false; //fallback scenario for mobile devices.
			}
		}
	});
	

	//Invite friend handler
	$('.inviteFriendButton').click(function (e) {
		if ($(this).parent().hasClass('muted')) {
			$(this).attr('href', '');
			return false;
		}

		if (window.navigator.userAgent) {
			var ua = window.navigator.userAgent.toLowerCase();
			var text = $(this).data("sms-text");

			if (ua.indexOf("iphone") > 0 || ua.indexOf("ipad") > 0) {
				var iosVer = iOSversion();
				if (iosVer[0] > 7)
					$(this).attr('href', 'sms:&body=' + encodeURIComponent(text));
				else
					$(this).attr('href', 'sms:;body=' + encodeURIComponent(text));
			} else if (ua.indexOf("android") > 0) {
				$(this).attr('href', 'sms:?body=' + encodeURIComponent(text));
			}
		}

		$.ajax({
			type: "POST",
			url: campaignTrackUrl,
			data: { TypeId: 10 }
		}).done(function (content) {

		});

		return true;
	});


	function iOSversion() {
		if (/iP(hone|od|ad|od touch)/.test(navigator.platform)) {
			// supports iOS 2.0 and later: <http://bit.ly/TJjs1V>
			var v = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
			return [parseInt(v[1], 10), parseInt(v[2], 10), parseInt(v[3] || 0, 10)];
		}
	}


	function facebookSDKShareDialog() {
		FB.ui({
			method: 'share',
			href: prizeUrl
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
				url: facebookRewardUrl
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
		var optionsList = $('.earningOptions');
		var listVisibility = false;

		$(window).scroll(function () {
			if ($(window).scrollTop() >= optionsList.offset().top / 2 - 70) {
				if ( listVisibility == false ) {
					optionsList.find('li').add('.article').each(function (ind, el) {
						setTimeout( function () {
							$(el).addClass('revealListItem');
						}, 250 * ind );
					});
					listVisibility = true;
				}
			}
		});
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
		var list = $('.earningOptions ul li'),
			listPar = list.parent();

		item = $('#' + item);
		item.addClass('muted').css('position','relative');

		var animDuration = 800;

		item.animate({
			opacity: 0,
			top: listPar.height() + listPar.offset().top - item.offset().top
		}, animDuration, function(){
			$(this).css({
				position: 'static',
				top: 'auto'
			});
		});

		list.sort(function(a, b){
			var reg = /\bmuted\b/g;
			var va = reg.test(a.className) ? 1 : 0,
				vb = reg.test(b.className) ? 1 : 0;
			return va - vb;
		});

		setTimeout(function(){
			listPar.append(list);
			list.find('.muted').click(function(e){
				e.preventDefault();
			});
			item.animate({
				opacity: 1
			}, 300);

			rewriteDrawActions();

		}, animDuration - 200);


	}

	//Unmute option item.
	function unmuteOptionItem(item) {
		item = $('#' + item);
		var listPar = item.parent();
		item.removeClass('muted').css('position','relative');;

		var animDuration = 500;

		item.animate({
			opacity: 0,
			top: listPar.offset().top - item.offset().top
		}, animDuration, function(){
			$(this).css({
				position: 'static',
				top: 'auto'
			});
		});

		setTimeout(function(){
			listPar.prepend(item);
			item.animate({
				opacity: 1
			}, 300);

			rewriteDrawActions();

		}, animDuration - 200);

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

	function rewriteDrawActions() {
		DrawApp.actionsList = [];
		var list = $('.earningOptions ul li');
		list.each(function (ind, el) {
			DrawApp.actionsList.push( $(el).attr('id') );
		});

		list.sort(function(a, b){
			var reg = /\bmuted\b/g;
			var va = reg.test(a.className) ? 1 : 0,
				vb = reg.test(b.className) ? 1 : 0;
			return va - vb;
		});

		list.parent().append(list);
	}

	function refreshActionsList( listArray ) {
		if ( listArray && listArray.length > 0 ) {
			var newList = [];
			var actionsListHolder = $('.earningOptions ul');
			listArray.forEach(function (el) {
				actionsListHolder.find('li').each(function (ind, elem) {
					if ($(elem).attr('id') == el) newList.push(elem);
				});
			});
			actionsListHolder.find('li').remove();
			actionsListHolder.append(newList);
		}
	}

	rewriteDrawActions();

});