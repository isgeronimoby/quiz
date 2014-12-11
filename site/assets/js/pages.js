$(document).ready(function () {

//	Cookies detections

	if ($.cookie) {
		function cookiesConfirm() {
//			if($('html').hasClass('no-touch')){
				if($.cookie('cookies-confirm') !== 'confirmed') {
					$.cookie('cookies-confirm', 'confirmed', { expires: 366 });
					$('.cookies-block').css('display', 'block');
					$('.main-top').addClass('cookies-true');

				}
//			}

			$('.cookies-block a').on('click', function(e) {
//				if($('html').hasClass('no-touch')){
					e.preventDefault();
					$('.main-top').removeClass('cookies-true');
					$('.cookies-block').css('display', 'none');
//				}

				var header = $('.navbar'),
					servMmes = $('.service-message');
				var height = header.height();
				servMmes.css('top', height);
			})
		}
		cookiesConfirm();

		$(window).resize(
			function(){
				cookiesConfirm();
			}
		)
	}

//	Custom popover for profile statistics

	$('.custom-popover').popover({
		trigger: 'hover'
	})

//    profile hover menu

	$('.no-touch .profile.logged-in, .no-touch .profile-hover').mouseover(function () {
		if ($(window).width() > 900) {
			$('.profile-hover').css('display', 'block');
			$('.profile.logged-in').addClass('hover');
		}
	});

	$('.no-touch .profile.logged-in, .no-touch .profile-hover').mouseout(function () {
		if ($(window).width() > 900) {
			$('.profile-hover').css('display', 'none');
			$('.profile.logged-in.hover').removeClass('hover');
		}
	});


	$('.profile.logged-in').on('click', function(e) {

		if ($(window).width() < 900 || !$('html').hasClass('no-touch')) {
			e.stopPropagation();

			if($('.profile-hover').css('display') == 'block') {
				$('.profile-hover').css('display', 'none');
				$('.profile.logged-in.hover').removeClass('hover');
			} else {
				$('.container-fluid').removeClass('menu-hidden');
				$('.profile-hover').css('display', 'block');
				$('.profile.logged-in').addClass('hover');
			}
		}
	});

	//	sign up show form slideDown
	$('.fake-btn').on('click', function(e) {
		$(this).css('display', 'none');
		$('.fancybox-wrap').addClass('custom-transition');
		$('.switch-wrapp').slideDown(300);

		setTimeout(function() {
			$.fancybox.update();
		},400);
	});

	$(".fancybox").fancybox({
		afterClose : function(){
			$('.fancybox-wrap').removeClass('custom-transition');
			$('.fake-btn').css('display', 'block');
			$('.switch-wrapp').css('display', 'none');
		}
	});

	//        Example of opening block with sharing by email tabs gift to a friend

	$('.profile-content .search-block .social .email a').on('click', function (e) {
		e.preventDefault();
		$('.profile-content .invite-by-mail').css('display', 'block');
		$('.profile-content .invite-by-social').css('display', 'none');
	});

	$('.profile-content .search-block .social .facebook a, .profile .search-block .social .twitter a').on('click', function (e) {
		e.preventDefault();
		$('.profile-content .invite-by-mail').css('display', 'none');
		$('.profile-content .invite-by-social').css('display', 'block');
	});

	//        Drop-down menu profile page for mobile optimization

	$('.drop-down-menu').on('click', function (e) {
		e.preventDefault();
		if ($('.drop-down-menu-content').hasClass('open')) {
			$('.drop-down-menu-content').removeClass('open');
			$('.drop-down-menu i').removeClass('fa-caret-up').addClass('fa-caret-down');
		} else {
			$('.drop-down-menu-content').addClass('open');
			$('.drop-down-menu i').removeClass('fa-caret-down').addClass('fa-caret-up');
		}
	});

	$('.drop-down-menu-content li a').on('click', function() {
		$('.drop-down-menu-content').removeClass('open');
		$('.drop-down-menu i').removeClass('fa-caret-up').addClass('fa-caret-down');
	});

});