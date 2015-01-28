jQuery(document).ready(function($){

	var menuItems = ['Club Browser','Sponsorship','Detailed Reports','Reward Program','Foundation','Cross Platform','Contact'];
	makemenu();

	var s = 0;
	if($(window).width() > 1024) {
		s = skrollr.init({forceheight: false});
	}
	$( window ).resize(function() {
		if($(window).width() > 1024) {
			s = skrollr.init({forceheight: false});
		} else s.destroy();
	});

	$('#findMore').click(function(e){
		e.preventDefault();
		$('.contacts-holder').css('display','none');
		$('#contactContent').fadeIn(700);
	});

	var menuState = 0;
	var navigation = $('.sliding-menu nav');

	navigation.css('top',-(navigation.height()+1));
	$('.mobile-menu').click(function(e){
		var navHeight = navigation.height() + 1;
		if (menuState == 0) {
			$('.mobile-menu .menu-container .one-line').css('background-color','#333333');
			navigation.animate({top:0}, 300, function(){

			});

			menuState = 1;

		} else {
			$('.mobile-menu .menu-container .one-line').css('background-color','#aaaaaa');
			navigation.animate({top:-navHeight}, 300, function(){

			});

			menuState = 0;
		}
	});

	function menuBack() {
		if (menuState == 1) {
			navigation.animate({top:-(navigation.height()+1)}, 300);
			$('.mobile-menu .menu-container .one-line').css('background-color','#aaaaaa');
			menuState = 0;
		}
	}

	$('.full-page').click(function(e){
		e.preventDefault();
		menuBack();
	});

	$('.sliding-menu > nav > ul > li > a').click(function(e){
		menuBack();
	});


	$(window).scroll(function(e) {
		var winTop = $(window).scrollTop();
		var activeSlide = Math.floor(winTop / 1000);
		if (activeSlide > -1) {
			$('.sideMenu a').removeClass('active').eq(activeSlide).addClass('active');
			if($(window).width() > 1024) {
				window.location.hash = $('.sideMenu a.active').attr('href');
			}

		}

	});

	function makemenu() {
		$('.sideMenu ul').remove();
		$('.sideMenu').append('<ul class="nav"></ul>');

		$('.full-page').each( function (index, el) {
			$('.sideMenu > ul').append('<li><a class="sideLinks" href="#'+$(this).attr('id')+'"'+'></a></li>');
			$('.sliding-menu > nav > ul > li > a')[index].href = '#'+$(this).attr('id');
		});

		var allLinks = $('.sideLinks');
		var frameScroll = 1000;
		var frameOffset = 0;
		for(var i=0; i < allLinks.length; i++){
			allLinks[i]["curFrame"] = frameOffset;
			frameOffset += frameScroll;
		}
		allLinks.click(function(e){
			$(window).scrollTop(e.currentTarget["curFrame"]);
			setTimeout(function(){$(window).scrollTop(e.currentTarget["curFrame"] + 700);},100);
		});
		$('.bottom-arrow-separate').click(function(e){
			e.preventDefault();
			$('.sideLinks')[1].click();
		});

	}

	$(document).keydown(function(e){
		var curMenu = $('.sideMenu a.active').parent().index();
		if (curMenu == -1) $('.sideLinks')[0].click();

		if (e.keyCode == '38') {
			// UP key
			if (curMenu != 0) $($('.sideLinks')[curMenu - 1]).click();
			e.preventDefault();

		}
		else if (e.keyCode == '40') {
			// DOWN key
			if (curMenu != 6) $($('.sideLinks')[curMenu + 1]).click();
			e.preventDefault();
		}

	});


	$('a.social').click(function(){
		window.location.href = $(this).attr('href');
	});


/*	$(window).on('hashchange', function() {
		hashUrl();
	});*/

	var hashUrl = function (){
		var menuItems = $('.sideLinks');
		var curSlide = window.location.hash;
		if (curSlide == "") return;

		menuItems.each(function(){
			if ($(this).attr('href') == curSlide) {
				$(this).trigger('click');
			}
		});
	};

	hashUrl();
});