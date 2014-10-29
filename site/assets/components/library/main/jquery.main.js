(function($) {
	$(function() {
		showLiveSearch();
		$('.fancybox').fancybox();
		hideInstallbar();
		showCredits();
		showNews();
		showOffers();
		controlls();
		headerPosition(); 

		function headerPosition() {
			var header = $('.navbar'),
				newsbar = $('.newsbar'),
				offers = $('.offers'),
				servMmes = $('.service-message');

			$(window).on('load resize', function(){
				var height = header.height();
				newsbar.css('top', height);
				offers.css('top', height);
				servMmes.css('top', height);
			})
		}
	
		function controlls() {
			setTimeout(function() {
				var ulHolder = $('.carousel1 .gmask').width(),
					ul = $('.carousel1 .gmask > ul').width(),
					btn1 = $('.carousel1 .btn-prev'),
					btn2 = $('.carousel1 .btn-next');

				if (ul<ulHolder){
					btn1.hide();
					btn2.hide();
				} else {
					btn1.show();
					btn2.show();
				}
			}, 1000);

			setTimeout(function() {
				var ulHolder = $('.carousel2 .gmask').width(),
					ul = $('.carousel2 .gmask > ul').width(),
					btn1 = $('.carousel2 .btn-prev'),
					btn2 = $('.carousel2 .btn-next');

				if (ul<ulHolder){
					btn1.hide();
					btn2.hide();
				} else {
					btn1.show();
					btn2.show();
				}
			}, 1000);
		}

		function showCredits() {
			var item = $('.clicker'),
				 activeclass = "activated";
			if( typeof(item) !== 'undefined'){

				item.on('click', function(e){
					e.preventDefault();
					if($(this).hasClass(activeclass)){
						$(this).removeClass(activeclass);
					} else {
						$(this).addClass(activeclass);
					}
				})
			}
		}

		function showLiveSearch() {
			var item = $('.navbar'),
				opener = $('.open-search'),
				closer = $('.close-search'),
				activeclass = "active";
			if (typeof(item) !== 'undefined') {
				opener.on('click', function(e) {
					e.preventDefault();
					if(item.hasClass(activeclass)) {
						item.removeClass(activeclass);

					} else {
						item.addClass(activeclass);
					}
				});
				closer.on('click', function(e){
					e.preventDefault();
					item.removeClass(activeclass);
				}	
				);
			}
		}
	
		function showNews() {
			var item = $('.newsbar'),
				item2 = $('.offers'),
				opener = $('.open-news'),
				opener2 = $('.open-offers'),
				activeclass = "show",
				activeTabClass = 'activatedItem';
			if( typeof(item) !== 'undefined'){

				opener.on('click', function(e){
					e.preventDefault();
					if(item.hasClass(activeclass)){
						item.removeClass(activeclass);
						opener.removeClass(activeTabClass);

					} else {
						item.addClass(activeclass);
						opener.addClass(activeTabClass);
						item2.removeClass(activeclass);
						opener2.removeClass(activeTabClass);
					}
				})
			}
		}

		function showOffers() {
			var item = $('.offers'),
				item2 = $('.newsbar'),
				opener = $('.open-offers'),
				opener2 = $('.open-news'),
				activeclass = "show",
				activeTabClass = 'activatedItem';
			if( typeof(item) !== 'undefined'){
				opener.on('click', function(e){
					e.preventDefault();
					if(item.hasClass(activeclass)){
						item.removeClass(activeclass);
						opener.removeClass(activeTabClass);
					} else {
						item.addClass(activeclass);
						opener.addClass(activeTabClass);
						item2.removeClass(activeclass);
						opener2.removeClass(activeTabClass);
					}
				})
			}
		}

		function hideInstallbar() {
			$("meta[property='sr:tracking_id']").change(function () {
				var trackingId = $(this).attr("content");
				if (trackingId)
					$('.service-message').hide();
			});
		}
		/*This area from declaration plugins*/
	})
})(jQuery);