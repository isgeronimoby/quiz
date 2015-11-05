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

$(function () {
	// validate page profile tab edit settings form Edit your personal settings
	$("#personal-settings").validate({
		rules: {
			firstname: "required",
			lastname: "required",
			username: {
				required: true,
				minlength: 2
			},
			agree: "required"
		},
		messages: {
			firstname: "Please enter your firstname",
			lastname: "Please enter your lastname",
			username: {
				required: "Please enter a username",
				minlength: "Your username must consist of at least 2 characters"
			},
			agree: "Please accept our policy"
		}
	});


	// validate page profile tab Gift your credits to a friend
	$("#gift-to-friend").validate({
		rules: {
			'send-sum': "required"
		},
		messages: {
			'send-sum': "Please enter sum"
		}
	});


	// validate page profile tab Redeem on Load
	$("#redeem-on-load").validate({
		rules: {
			'send-sum': "required"
		},
		messages: {
			'send-sum': "Please enter sum"
		}
	});


	// validate page sign up
	$("#sign-up").validate({
		rules: {
			firstname: "required",
			lastname: "required",
			username: {
				required: true,
				minlength: 2
			},
			password: {
				required: true,
				minlength: 5
			},
			confirm_password: {
				required: true,
				minlength: 5,
				equalTo: "#password"
			},
			email: {
				required: true,
				email: true
			},
			topic: {
				required: "#newsletter:checked",
				minlength: 2
			},
			agree: "required",
			'data-permission': "required"
		},
		messages: {
			firstname: "Please enter your firstname",
			lastname: "Please enter your lastname",
			username: {
				required: "Please enter a username",
				minlength: "Your username must consist of at least 2 characters"
			},
			password: {
				required: "Please provide a password",
				minlength: "Your password must be at least 5 characters long"
			},
			confirm_password: {
				required: "Please provide a password",
				minlength: "Your password must be at least 5 characters long",
				equalTo: "Please enter the same password as above"
			},
			email: "Please enter a valid email address",
			agree: "Please accept our policy",
			'data-permission': "Please accept our policy"
		}
	});

	$('.featherlight-signup-form').validate({
		rules: {
			username: {
				required: true,
				minlength: 2
			},
			email: {
				required: true,
				email: true
			},
			password: {
				required: true,
				minlength: 5
			}
		},
		messages: {
			username: {
				required: "Please enter a username",
				minlength: "Your username must consist of at least 2 characters"
			},
			password: {
				required: "Please provide a password",
				minlength: "Your password must be at least 5 characters long"
			},
			email: "Please enter a valid email address"
		}
	});

	// validate page login
	$("#login-form").validate({
		rules: {
			email: {
				required: true,
				minlength: 2
			},
			password: {
				required: true,
				minlength: 5
			}
		},
		messages: {
			email: {
				required: "Please enter a valid email",
				minlength: "Your username must consist of at least 2 characters"
			},
			password: {
				required: "Please provide a password",
				minlength: "Your password must be at least 5 characters long"
			}
		}
	});


	// validate page Forgot password
	$("#forgot-password").validate({
		rules: {
			'user-login': {
				required: true,
				minlength: 2
			}
		},
		messages: {
			'user-login': {
				required: "Please enter a username",
				minlength: "Your username must consist of at least 2 characters"
			}
		}
	});


	// validate contact page
	$("#contact-form").validate({
		rules: {
			name: {
				required: true,
				minlength: 2
			},
			email: {
				required: true,
				email: true
			},
			mess: {
				required: true,
				email: true
			}
		},
		messages: {
			name: {
				required: "Please enter a username",
				minlength: "Your username must consist of at least 2 characters"
			},
			email: "Please enter a valid email address",
			mess: {
				required: "Please enter message",
				minlength: "Your username must consist of at least 2 characters"
			}
		}
	});

});