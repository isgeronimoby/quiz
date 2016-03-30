$(function () {
	$(".partnerLink").click(function () {
		var trackingId = $("meta[property='sr:tracking_id']").attr("content");
		if (!trackingId)
			return;

		var guestMode = $("meta[property='sr:is_guest']").attr("content");
		if (guestMode) {
			var partnerUrl = $(this).closest(".partnerHolder").children("input[name='NextUrl']").val();
			if (partnerUrl) {
				var url = $.validator.format(partnerUrl);
				partnerUrl = url(trackingId);

				$(this).removeClass("fancybox");
				$(this).attr("href", partnerUrl);
			}			
		}

		//Toolbar event.
		$.sendToolbarMessage({
			type: "PARTNER_LINK_CLICK",
			value: $(this).data("pid")
		});
	});
});