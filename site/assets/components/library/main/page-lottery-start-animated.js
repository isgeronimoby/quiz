jQuery(document).ready(function($){

	var startPageSlide = $('.lotteryFootballBG.animated'),
		secondSlide = startPageSlide.find('.step-two'),
		thirdSlide = startPageSlide.find('.step-three'),
		progressBar = startPageSlide.find('.progress-bar-triple .progress-fill'),
		progressBarSecondStep = startPageSlide.find('.progress-bar-triple span:nth-of-type(2)'),
		progressBarThirdStep = startPageSlide.find('.progress-bar-triple span:nth-of-type(3)'),
		dummyBlock = startPageSlide.find('.dummy-container'),
		startSlideOverlay = startPageSlide.find('.back-overlay'),
		startSlideHeading = startPageSlide.find('.step-two h3').add('.step-two > div > .prize-image'),
		startSlidePar = startPageSlide.find('.first-slide-holder > .step-two > p'),
		startSlideBtn = startPageSlide.find('.first-slide-holder > .step-two > a'),
		startSlideCongrats = $('.fadeTextHolder > p'),
		startSlideImage = startPageSlide.find('.first-slide-holder > .step-two > .bottom-section > div > img').add('.first-slide-holder > .step-two > div > p'),
		scrollDownChevron = startPageSlide.find('.scroll-down-holder span');


	// CHECK THE SCREEN HEIGHT TO PROPERLY POSITION FADING TEXT
	if ( startPageSlide.height() > $(window).height() || currentPlatform == 'mobile' ) startSlideCongrats.parent().css('top', '200px');

	// REBUILDING FIRST SCREEN TO FIT THE SCREEN
	function rebuildSlideSize() {
		dummyBlock.height( secondSlide.height() );
		if ( $(window).width() > 1000 )
			startPageSlide.height( $(window).height() - $('.navbar.toolbar').height() - 40 );
		else startPageSlide.height('auto');
	}

	//HANDLING CHEVRON CLICK TO SCROLL DOWN THE PAGE
	scrollDownChevron.click(function(){
		$('html,body').animate({ scrollTop: startPageSlide.height() + 40 }, 'slow');
	});

	function showStep( step ){
		if ( step == 2 ) {
			progressBar.removeClass('full');
			progressBarSecondStep.removeClass('full');
			progressBarThirdStep.removeClass('full');

			progressBar.addClass('half');
			setTimeout(function () {
				progressBarSecondStep.addClass('full');
			}, 1000);
		} else if ( step == 3 ) {
			progressBarSecondStep.addClass('full');
			progressBar.addClass('full');
			setTimeout(function(){
				progressBarThirdStep.addClass('full');
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
			setTimeout(function(){
				dummyBlock.hide();
				thirdSlide.fadeIn(1200);
			}, 1100);
		}, 300);
	}

	// TRIGGERING OPENING REGISTRATION FORM
	$('a.fancybox').click(function(){
		$('.fake-btn').trigger('click');
	});


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

	setTimeout(function(){
		if ( window.location.href.substring( window.location.href.lastIndexOf('&installed') + 11 ) == 1 ) {
			//extension is installed
			startSlideCongrats.html('Congratulations!');
			showSlide( 'signup', 3, true );
		} else {
			showSlide( 'install', 2, true );
		}
	}, 1000);

	$(window).resize(function(){
		rebuildSlideSize();
	});

	// REBUILDING FIRST SCREEN TO FIT THE SCREEN
	rebuildSlideSize();
});
