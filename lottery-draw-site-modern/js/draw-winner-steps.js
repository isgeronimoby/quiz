$(document).ready(function(){

	$('#show-details-btn').click(function(e){
		e.preventDefault();

		$(this).hide();
		$('.details-form-block').fadeIn(300);
	});


	if($('.scoreHolder').length > 0) {
		$('footer').css('visibility', 'hidden');
		$('.scoreHolder').css('display', 'inline-block');
		$('.score').animate({ 'font-size': '30px', 'opacity': 1 }, 500, function () {
			setTimeout(function () {
				$('.scoreHolder').css({ 'display': 'none' });
				$('.score').css({ 'opacity': 0, 'font-size': '1px' });
				$('footer').css('visibility', 'visible');
				$('.winnerSection').fadeIn(300);
			}, 500);
		});
	}
});