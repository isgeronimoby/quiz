(function ($) {
	$.sendToolbarMessage = function (message) {
		var box = [];

		try {
			var existingBoxValue = $("#toolbarMailBoxOut").val();
			if (existingBoxValue && existingBoxValue.length > 0) {
				box= JSON.parse(existingBoxValue);
			}
		}
		catch (e) {
			if (window.console && window.console.log) {
				console.log("Toolbar message box read exception");
			}
		}
		box.push(message);
		var boxValue = JSON.stringify(box);
		$("#toolbarMailBoxOut").val(boxValue);
	};

	$.getToolbarMessage = function (callback) {
		try {
			var existingBoxValue = $("#toolbarMailBoxIn").val();
			if (existingBoxValue && existingBoxValue.length > 0) {
				var existingBox = JSON.parse(existingBoxValue);
				$.each(existingBox, function (element, index) {
					callback(element);
				});
			}
		}
		catch (e) {
			if (window.console && window.console.log) {
				console.log("Toolbar message box read exception");
			}
		}
	};
}(jQuery));