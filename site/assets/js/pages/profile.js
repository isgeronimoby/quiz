var _URL = window.URL || window.webkitURL;
var _MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024;
var _IMG_WIDTH, _IMG_HEIGHT;

$("#profile-avatar").change(function (e) {
	var file = this.files[0];

	if ((file.type ? file.type.match(/^image\/(bmp|png|jpeg)$/) : file.name.match(/\.(bmp|png|jpe?g)$/i)) && file.size <= _MAX_FILE_SIZE_BYTES)
		OpenSaveImageDialog(file);
	else
		OpenFileTypeErrorDialog();
});

$("#saveImage").click(function () {
	UploadImage();

	return false;
});

function OpenSaveImageDialog(file) {
	if (_URL === undefined) { //Do not show preview image in unsupported browsers.
		var $savePopup = $("#saveImagePopup");

		$savePopup.find(".alert.alert-danger").hide();
		$savePopup.find(".form-title > p").text("Press save to upload your new picture.");
		$savePopup.find(".pancontainer").hide();
		$savePopup.find(".noPreview").show();

		$.fancybox({
			content: $savePopup,
			afterClose: function () { $("#profile-avatar").val(""); }
		});

		return;
	}

	var image = new Image();

	image.onload = function () {
		var context = this;
		_IMG_WIDTH = context.width;
		_IMG_HEIGHT = context.height;

		var $savePopup = $("#saveImagePopup");
		$savePopup.find(".alert.alert-danger").hide();

		$.fancybox({
			content: $savePopup,
			afterClose: function () { $("#profile-avatar").val(""); }
		});

		$(".pancontainer").each(function () {
			var $this = $(this);
			var $img = $(this).find("img:eq(0)");
			$img.attr("src", context.src);

			var $pancontainer = $savePopup.find(".pancontainer");
			var ratio = Math.min(context.width, context.height) / 120;

			var pos = $this.attr("data-orient") == "center" ? "center" : [parseInt($this.attr("data-left")), parseInt($this.attr("data-top"))];
			var imageSize = [Math.round(context.width / ratio), Math.round(context.height / ratio)];
			var options = { $pancontainer: $this, pos: pos, curzoom: 1, candrag: $this.attr("data-candrag"), canzoom: $this.attr("data-canzoom"), imagesize: imageSize, wrappersize: [$this.width(), $this.height()] }
			$img.imgmover(options);
		});

		_URL.revokeObjectURL(image.src); // Clean up after yourself.
	};

	image.onerror = function (a, b) {
		var $errorPopup = $("#errorMessagePopup");

		$errorPopup.find(".alert.alert-danger").contents().filter(function () {
			return this.nodeType == 3;
		}).remove();

		$errorPopup.find(".alert.alert-danger strong").after(" " + $errorPopup.find(".alert.alert-danger").data("image-error"));
		$errorPopup.find(".alert.alert-danger").show();

		$.fancybox({
			content: $errorPopup,
			afterClose: function () { $("#profile-avatar").val(""); }
		});
	};

	image.src = _URL.createObjectURL(file);
}

function OpenFileTypeErrorDialog() {
	var $errorPopup = $("#errorMessagePopup");

	$errorPopup.find(".alert.alert-danger").contents().filter(function () {
		return this.nodeType == 3;
	}).remove();

	$errorPopup.find(".alert.alert-danger strong").after(" " + $errorPopup.find(".alert.alert-danger").data("file-type-error"));
	$errorPopup.find(".alert.alert-danger").show();

	$.fancybox({
		content: $errorPopup,
		afterClose: function () { $("#profile-avatar").val(""); }
	});
}

function UploadImage() {
	var file = document.getElementById("profile-avatar").files[0];

	var formData = new FormData();
	formData.append("Image", file);

	if (_URL !== undefined) {
		var left = $(".pancontainer img").position().left;
		var top = $(".pancontainer img").position().top;
		var width = $(".pancontainer img").width();

		var ratio = _IMG_WIDTH / width;
		left = -left * ratio;
		top = -top * ratio;
		width = 120 * ratio;

		formData.append("X", parseInt(left));
		formData.append("Y", parseInt(top));
		formData.append("Width", parseInt(width));
	}

	$(".pop-up-loader-body").show();

	$.ajax({
		type: "POST",
		url: uploadImageUrl,
		data: formData,
		dataType: "json",
		contentType: false,
		processData: false,
		success: function (response) {
			if (response.status == "success") {
				$(".profile-avatar").attr("src", response.url);
				$("a.profile > img").attr("src", response.url);

				$.fancybox.close();
				$(".pop-up-loader-body").hide();
			}
			else {
				var $savePopup = $("#saveImagePopup");
				$savePopup.find(".alert.alert-danger").contents().filter(function () {
					return this.nodeType == 3;
				}).remove();

				$savePopup.find(".alert.alert-danger strong").after(" " + response.message);
				$savePopup.find(".alert.alert-danger").show();

				$(".pop-up-loader-body").hide();
			}
		},
		error: function (error) {
			var $savePopup = $("#saveImagePopup");
			$savePopup.find(".alert.alert-danger").contents().filter(function () {
				return this.nodeType == 3;
			}).remove();

			$savePopup.find(".alert.alert-danger strong").after(" " + error.statusText);
			$savePopup.find(".alert.alert-danger").show();

			$(".pop-up-loader-body").hide();
		}
	});
};
