jQuery(document).ready(function ($) {
	//Click install button handler
	$("[data-install-button]").click(function (e) {
		var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;

		$.ajax({
			type: "POST",
			url: campaignTrackUrl,
			data: { TypeId: 8 },
			async: !isSafari
		}).done(function (content) { });

		return true;

	});
});