$(document).on("click", ".fbAuth", function (event) {
	var token = $("#RegistrationToken").val();

	var href = $(this).attr("href");
	if (href.indexOf("?") > -1)
		$(this).attr("href", href + "&RegistrationToken=" + token);
	else
		$(this).attr("href", href + "?RegistrationToken=" + token);
});