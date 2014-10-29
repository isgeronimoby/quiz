(function($) {
	$(function(){
        showCredits();
        showNews();
        showOffers();
        controlls();
		/*This area from init Function*/
	});

    function controlls(){
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

    function showCredits(){
        var item = $('.clicker'),
             activeclass = "activated";
        if( typeof(item) !== 'undefined'){

            item.on('click', function(e){
                e.preventDefault();
                if($(this).hasClass(activeclass)){
                    $(this).removeClass(activeclass);
                    $(this).html('click to earn LFC credits on John Lewis');
                } else {
                    $(this).addClass(activeclass);
                    $(this).html('Josh, you’re earning Liverpool FC credits');
                }
            })
        }
    }


    function showNews(){
        var item = $('.-newsbr-'),
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
    function showOffers(){
        var item = $('.offers'),
            item2 = $('.-newsbr-'),
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



	/*This area from declaration plugins*/
})(jQuery);