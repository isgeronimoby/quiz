$(function () {
	var countdownDate = new Date($('.countdown').data('date-end'));

	if (countdownDate && countdownDate > new Date()) {
		//Init countdown
		$('.countdown').countdown(countdownDate, function (event) {
			$(this).html(event.strftime('<div><div><span class="numbers">%D</span><span>day%!d</span></div></div>' +
				'<div><div><span class="numbers">%H</span><span>hrs</span></div></div>' +
				'<div><div><span class="numbers">%M</span><span>mins</span></div></div>' +
				'<div><div><span class="numbers">%S</span><span>secs</span></div></div>'));
		}).on('finish.countdown', function (event) {
			window.location.reload();
		});
	}
});