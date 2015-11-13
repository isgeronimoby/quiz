jQuery(document).ready(function($){

	var startPageSlide = $('.lotteryFootballBG.animated'),
		secondSlide = startPageSlide.find('.step-two'),
		thirdSlide = startPageSlide.find('.step-three'),
		stepInstall = startPageSlide.find('.step-installing'),
		stepError = startPageSlide.find('.step-error'),
		progressBar = startPageSlide.find('.progress-bar-triple .progress-fill'),
		progressBarSecondStep = startPageSlide.find('.progress-bar-triple span:nth-of-type(2)'),
		progressBarThirdStep = startPageSlide.find('.progress-bar-triple span:nth-of-type(3)'),
		dummyBlock = startPageSlide.find('.dummy-container'),
		startSlideOverlay = startPageSlide.find('.back-overlay'),
		startSlideHeading = startPageSlide.find('.step-two h3').add('.step-two > div .prize-image, .step-two .prize-image-holder').add('.step-two h1, .step-two h4'),
		startSlidePar = startPageSlide.find('.first-slide-holder > .step-two > p'),
		startSlideBtn = startPageSlide.find('.first-slide-holder > .step-two > a'),
		startSlideCongrats = $('.fadeTextHolder > p'),
		startSlideImage = startPageSlide.find('.first-slide-holder > .step-two > .bottom-section > div > img').add('.first-slide-holder > .step-two > div > p'),
		scrollDownChevron = startPageSlide.find('.scroll-down-holder span'),
		winnersSection = startPageSlide.find('.bottom-friends-holder'),
		bottomInstallBtn = $('.main-holder .row a');

	var dontChangeSlide = false;

	if ( navigator.userAgent.substr(navigator.userAgent.indexOf('MSIE') + 5, 3) <= 9 ) {
		var ie9 = true;
	}

	// REBUILDING FIRST SCREEN TO FIT THE SCREEN
	function rebuildSlideSize() {
		dummyBlock.height( secondSlide.height() );
		if ( window.innerWidth > 1080 )
			startPageSlide.height( $(window).height() - $('.navbar.toolbar').height() - 110 );
		else {
			if ( dontChangeSlide != true ) {
				startPageSlide.height('auto');
			}
		}
	}

	//HANDLING CHEVRON CLICK TO SCROLL DOWN THE PAGE
	scrollDownChevron.click(function(){
		tellMoreBtn.click();
	});

	//if (currentPlatform == 'mobile') {
	//	startSlideBtn.html('Install Browser');
	//	bottomInstallBtn.html('Install Browser');
	//}

	function showStep( step ){
		if ( step == 2 ) {

		} else if ( step == 3 ) {
			progressBar.removeClass('full');
			progressBarSecondStep.removeClass('full');
			progressBarThirdStep.removeClass('full');

			progressBar.addClass('half');
			setTimeout(function () {
				progressBarSecondStep.addClass('full');
			}, 1000);
		}
	}

	// LAUNCHING FADING TEXT
	function showCongratsText(){
		startSlideCongrats.css('display','block');
		setTimeout(function(){
			setTimeout(function(){
				startSlideCongrats.css('display','none');
				startSlideCongrats.removeClass('animated');
			}, 3500);
			startSlideCongrats.addClass('animated');
		}, 50);
	}

	// SHOWING SECOND STEP
	function launchSecondStep( step ) {
		setTimeout(function () {
			dummyBlock.hide();
			secondSlide.show();
			startSlideOverlay.addClass('animated');
			showStep( step );
			setTimeout(function () {
				startSlideHeading.addClass('animated');
				setTimeout(function () {
					startSlidePar.addClass('animated');
					startSlideImage.addClass('animated');
					setTimeout(function () {
						startSlideBtn.addClass('animated');
					}, 1000);
				}, 700);
			}, 800);
		}, 300);
	}

	// SHOWING THIRD STEP
	function launchThirdStep( step ){
		setTimeout(function(){
			showStep( step );
			startSlideOverlay.addClass('animated');
			setTimeout(function(){
				dummyBlock.hide();
				thirdSlide.fadeIn(1200);
			}, 1100);
		}, 300);
	}

	function showSlide( slide, step, congrats ){
		secondSlide.hide();
		thirdSlide.hide();
		if ( slide == 'install' ){
			if ( congrats ) {
				showCongratsText();
				setTimeout(function(){
					launchSecondStep( step );
				}, 2000);
			} else {
				launchSecondStep( step );
			}
		} else {
			if ( congrats ) {
				showCongratsText();
				setTimeout(function(){
					launchThirdStep( step );
				}, 2000);
			} else {
				launchThirdStep( step );
			}
		}
	}

	// if IE 9 or lower detected no animation, just content
	if ( !ie9 ) {
		setTimeout(function(){
			// greater than IE 9 or not IE
			if (window.location.href.lastIndexOf('installed=') > -1) {

			var installed = (window.location.href.lastIndexOf('installed=1') > -1);
			if (installed)
				startSlideCongrats.html('Congratulations!');

			bottomInstallBtn.hide();
			showSlide('signup', 3, installed);
			} else {
				showSlide( 'install', 2, true );
			}
		}, 1000);
	} else {
		//IE 9 or lower
		if (window.location.href.lastIndexOf('installed=') > -1) {
			//show sign up
			showStep( 3 );
			dummyBlock.hide();
			secondSlide.hide();
			thirdSlide.show();
			bottomInstallBtn.hide();
		} else {
			showStep( 2 );
			dummyBlock.hide();
			secondSlide.show();
		}
	}

	var tellMoreBtn = $('<div class="landing-tell-more">Tell me more</div>');
	var tellMoreBtnState = 0;
	$('.navbar.toolbar > .button-holder').append(tellMoreBtn);

	tellMoreBtn.on('click', function(){
		if ( tellMoreBtnState === 0 ) {
			$('html,body').animate({ scrollTop: startPageSlide.height() + 110 }, 'slow');
		} else {
			$('html,body').animate({ scrollTop: 0 }, 'slow');
		}
	});

	$(window).scroll(function(){
		tellMoreFunc();
	});

	function tellMoreFunc() {
		if ( $(window).scrollTop() > startPageSlide.height() ) {
			tellMoreBtnState = 1;
			tellMoreBtn.html('I\'ve got it');
		} else {
			tellMoreBtnState = 0;
			tellMoreBtn.html('Tell me more');
		}
	}

	$(window).resize(function(){
		rebuildSlideSize();
	});

	if ( winnersSection.find('ul li').length > 0 ) {
		winnersSection.show('fast');
		scrollDownChevron.parent().css('bottom', '130px');
	}

	$.fn.showMiddleState = function(step){
		// 1. step - 'install'
		// 2. step - 'error'
		var elsToHide = secondSlide.add(thirdSlide).add(progressBar.parent()).add(stepInstall).add(stepError);

		if ( window.innerWidth < 1080 ) {
			startPageSlide.height(startPageSlide.height());
			//startPageSlide.addClass('misc-states');
			dontChangeSlide = true;
		}
		elsToHide.hide();
		if ( step == 'install' ) {
			setTimeout(function(){
				showExtensionPopupFunc();
			}, 600);
			stepInstall.fadeIn(400);
		} else if ( step == 'error' ) {
			hideExtensionPopupFunc();
			stepError.fadeIn(400);
		}
	};

	bottomInstallBtn.on('click', function(){
		tellMoreBtn.click();
	});

	// REBUILDING FIRST SCREEN TO FIT THE SCREEN
	rebuildSlideSize();
});
