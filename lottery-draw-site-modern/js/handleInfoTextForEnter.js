$(function(){
	var textState = 0;
	var currentText = $('#aboutContainer').html();
	$('.showMoreAboutPrize').click(function () {
		if (textState == 0) {
			$('#aboutContainer').html($('#infoTextToCopy').html());
			textState = 1;
		} else {
			$('#aboutContainer').html(currentText);
			textState = 0;
		}
	});
});