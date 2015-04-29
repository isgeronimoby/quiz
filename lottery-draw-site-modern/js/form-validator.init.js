$.validator.setDefaults(
	{
		submitHandler: function () {
			alert("submitted!");
		},
		showErrors: function (map, list) {
			this.currentElements.parents('label:first, div:first').find('.has-error').remove();
			this.currentElements.parents('.form-group:first').removeClass('has-error');

			$.each(list, function (index, error) {
				var ee = $(error.element);
				var eep = ee.parents('label:first').length ? ee.parents('label:first') : ee.parents('div:first');

				ee.parents('.form-group:first').addClass('has-error');
				eep.find('.has-error').remove();
				eep.append('<p class="has-error help-block">' + error.message + '</p>');
			});
			//refreshScrollers();
		}
	});

jQuery.validator.addMethod(
	"multiemails",
	function(value, element) {
		if (this.optional(element)) // return true on optional element
			return true;
		var emails = value.split(/[;,]+/); // split element by , and ;
		valid = true;
		for (var i in emails) {
			value = emails[i];
			valid = valid &&
				jQuery.validator.methods.email.call(this, $.trim(value), element);
		}
		return valid;
	},
	jQuery.validator.messages.multiemails
);

$(function () {
	$("#signUpWithEmailForm").validate({
		rules: {
			name: {
				required: true,
				minlength: 2
			},
			password: {
				required: true,
				minlength: 5
			},
			email: {
				required: true,
				email: true
			}
		},
		messages: {
			name: {
				required: "Please enter your name",
				minlength: "Your name must consist of at least 2 characters"
			},
			password: {
				required: "Please provide a password",
				minlength: "Your password must be at least 5 characters long"
			},
			email: "Please enter a valid email address"
		}
	});

	$("#connectDeviceForm").validate({
		rules: {
			'connect-email': {
				required: true,
				email: true
			}
		},
		messages: {
			'connect-email': {
				email: "Please enter a valid email address"
			}
		}
	});

	$('#provideDetailsForm').validate({
		rules: {
			'address1': {
				required: true
			}
		},
		messages: {
			'address1': "Please fill in at least first field"
		}
	});

	$("#challengeafriendForm").validate({
		rules: {
			'challenge-email': {
				required: true,
				multiemails: true
			}
		},
		messages: {
			'connect-email': {
				required: "Please enter at least one email address",
				multiemails: "Some of your emails are incorrect"
			}
		}
	});
});