(function () {
	var getURLParameter = function (name, url) {
		if (!url) url = window.location.href;
		name = name.replace(/[\[\]]/g, "\\$&");
		var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
			results = regex.exec(url);
		if (!results) return null;
		if (!results[2]) return '';
		return decodeURIComponent(results[2].replace(/\+/g, " "));
	};
	var interval;

	var apiTunnel = function (request, onSuccess, onFailure) {
		try {
			var options = {
				type: request.method,
				url: $('#apiUrl').attr('href') + request.endpoint,
				data: request.params,
				contentType: 'application/json; charset=UTF-8',
				headers: {
					'X-Publisher-Origin': rpc.origin,
					'X-Api-Key': request.apiKey
				}
			};
			options.complete = function (xhr) {
				var response = {};
				response.status = xhr.status;

				if (xhr.status !== 200) {
					response.error = xhr.responseText;
				} else {
					response.data = xhr.responseText.length > 0 ? JSON.parse(xhr.responseText) : null;
				}
				onSuccess(response);
			};

			$.ajax(options);
		}
		catch (ex) {
			onFailure(ex.message);
		}
	};

	var cookies = {
		createCookie: function (name, value, days) {
			if (days) {
				var date = new Date(),
						expires;
				date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
				expires = '; expires=' + date.toGMTString();
			}
			else expires = '';
			document.cookie = name + '=' + value + expires + ';';
		},
		readCookie: function (name) {
			var nameEQ = name + '=';
			var ca = document.cookie.split(';');
			for (var i = 0; i < ca.length; i++) {
				var c = ca[i];
				while (c.charAt(0) == ' ') c = c.substring(1, c.length);
				if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
			}
			return null;
		},
		eraseCookie: function (name) {
			cookies.createCookie(name, '', -1);
		}
	};

	var writeClubCookie = function (cookieName, onSuccess, onFailure) {
		if (cookies.readCookie(cookieName) === null) {
			// set cookie
			cookies.createCookie(cookieName, 0, 30);
			if (cookies.readCookie(cookieName) === null) {
				// setting third-party cookies is disabled on the client
				onSuccess(false);
				return;
			}
		} else {
			// increase cookie && this user is a fan
			cookies.createCookie(cookieName, 1, 30);
		}

		onSuccess(String(cookies.readCookie(cookieName)));
	};

	var readClubCookie = function (cookieName, onSuccess, onFailure) {
		onSuccess(cookies.readCookie(cookieName));
	};



	if (getURLParameter('safarifix') !== null) {
		cookies.createCookie('safarifix', 1, 30);
		interval = setInterval(function () {
			if (cookies.readCookie('safarifix')) {
				clearInterval(interval);
				window.close();
			}
		}, 50);
	}

	var rpc = new easyXDM.Rpc({}, {
		local: {
			apiTunnel: apiTunnel,
			writeClubCookie: writeClubCookie,
			readClubCookie: readClubCookie
		}
	});
})();