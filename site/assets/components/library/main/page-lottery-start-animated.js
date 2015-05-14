jQuery(document).ready(function($){

	var startPageSlide = $('.lotteryFootballBG.animated'),
		secondSlide = startPageSlide.find('.step-two'),
		thirdSlide = startPageSlide.find('.step-three'),
		progressBar = startPageSlide.find('.progress-bar-triple .progress-fill'),
		progressBarSecondStep = startPageSlide.find('.progress-bar-triple span:nth-of-type(2)'),
		progressBarThirdStep = startPageSlide.find('.progress-bar-triple span:nth-of-type(3)'),
		startSlideOverlay = startPageSlide.find('.back-overlay'),
		startSlideHeading = startPageSlide.find('.step-two h3').add('.step-two > div > .prize-image'),
		startSlidePar = startPageSlide.find('.first-slide-holder > .step-two > p'),
		startSlideBtn = startPageSlide.find('.first-slide-holder > .step-two > a'),
		startSlideCongrats = $('.fadeTextHolder > p'),
		startSlideImage = startPageSlide.find('.first-slide-holder > .step-two > .bottom-section > div > img').add('.first-slide-holder > .step-two > div > p'),
		scrollDownChevron = startPageSlide.find('.scroll-down-holder span');


	// CHECK THE SCREEN HEIGHT TO PROPERLY POSITION FADING TEXT
	if ( startPageSlide.height() > $(window).height() ) startSlideCongrats.parent().css('top', '20%');

	// REBUILDING FIRST SCREEN TO FIT THE SCREEN
	function rebuildSlideSize() {
		if ( $(window).width() > 1000 )
			startPageSlide.height( $(window).height() - $('.navbar.toolbar').height() - 40 );
		else startPageSlide.height('auto');
	}

	//HANDLING CHEVRON CLICK TO SCROLL DOWN THE PAGE
	scrollDownChevron.click(function(){
		$('html,body').animate({ scrollTop: startPageSlide.height() + 40 }, 'slow');
	});


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
	function launchSecondStep() {
		setTimeout(function () {
			showCongratsText();
			setTimeout(function () {
				startSlideOverlay.addClass('animated');
				progressBar.addClass('half');
				setTimeout(function(){
					progressBarSecondStep.addClass('full');
				}, 1000);
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
			}, 2000);
		}, 300);
	}

	// SHOWING THIRD STEP
	function launchThirdStep(){
		setTimeout(function(){
			progressBar.addClass('full');
			secondSlide.css('opacity', 0); // temporary
			setTimeout(function(){
				progressBarThirdStep.addClass('full');
				secondSlide.hide();
				thirdSlide.fadeIn(1200);
			}, 1100);
		}, 300);
	}

	// TRIGGERING OPENING REGISTRATION FORM
	$('a.fancybox').click(function(){
		$('.fake-btn').trigger('click');
	});


	// TEMPORARY TIMEOUTS TO SEE TRANSITION IN ACTION
	// REMOVE ON PRODUCTION
	setTimeout(function(){
		launchSecondStep();
	}, 1000);
	setTimeout(function(){
		launchThirdStep();
	}, 10000);
	// END OF TEMP

	$(window).resize(function(){
		rebuildSlideSize();
	});

	// REBUILDING FIRST SCREEN TO FIT THE SCREEN
	rebuildSlideSize();
});