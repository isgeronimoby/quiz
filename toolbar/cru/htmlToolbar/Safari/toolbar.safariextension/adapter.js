debugger;
$WG.adapter = function () {
	
	var cookieCallback = new Array();
	safari.application.addEventListener("message",
        		  function (msgEvent) {
        		  	if (msgEvent.name == "AWINCookie") {
        		  		var domain = msgEvent.target.url.extractDomain();
        		  		msgEvent.target.close();
        		  		cookieCallback[domain] && cookieCallback[domain](msgEvent.message);
        		  	}
        		  }, false);


	document.addEventListener("DOMContentLoaded", function () {
		document.removeEventListener("DOMContentLoaded", arguments.callee, false);
		$WG.adapter.ribbonHtml = document.getElementById("wgik_ribbon").innerHTML.replace(/\s+/g, " ");
	}, false);

	return {
		getUrl: function (url) {
			var resultUrl = safari.extension.baseURI + url;
			return resultUrl;
		},
		rssIconUrl: safari.extension.baseURI + 'Images/everton-logo-for-rss.png',
		storage: localStorage,
		getCookie: function (url, callback) {
			if (!url) {
				return callback(document.cookie);
			}
			var domain = url.extractDomain();
			cookieCallback[domain] = callback;
			var newTab = safari.application.activeBrowserWindow.openTab("background");
			newTab.url = url;

		},
		setCookie: function (key, value, days) {
			var d = new Date();
			d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
			var expires = "expires=" + d.toGMTString();

			document.cookie = key + "=" + value + "; " + expires;


		},
		//ribbonHtml: document.getElementById("wgik_ribbon").innerHTML.replace(/\s+/g, " "),
		createTab: function (a) {
			if (typeof a === "string") {
				var tab = safari.application.activeBrowserWindow.openTab("background");
				tab.url = a;
			}
			else {
				var tab = a;
			}
			return {
				sendMessage: function (par) {
					tab.page.dispatchMessage(par.msg, par);
				},
				url: tab.url,
				focus: function () {
					tab.activate();
				},
				redirect: function (url) {
					tab.url = url;
				},
				close: function () {
					tab.close();
				},
			}

		},
		registerHighlight: function (callback, expression) {

			safari.application.addEventListener("navigate", function (e) {
				var tab = $WG.adapter.createTab(e.target);
				if (tab.url.match(expression)) {
					callback(tab);
				}
			});
		},
		addToolbarButtonListener:function(callback)
		{
			safari.application.addEventListener("command", function performCommand(event) {
				if (event.command == "wg-button-click") {
					var tab = $WG.adapter.createTab(event.target.browserWindow.activeTab);
					callback(tab);
				}
			}, false);
		},
		addUrlChangeListener:function(callback)
		{
			safari.application.addEventListener("navigate", function (e) {
				var tab = $WG.adapter.createTab(e.target);
				callback(tab);
				
				
			});
		},
		addMessageListener: function (message, callback) {

			safari.application.addEventListener("message",
        		  function (msgEvent) {

        		  	if (msgEvent.name == message) {
        		  		var tab = $WG.adapter.createTab(msgEvent.target)
        		  		callback(tab, msgEvent.message)
        		  	}
        		  }, false);
		},
		createXMLHttpRequest: function () {
			return new XMLHttpRequest();
		},
		createFormData: function () {
			return new FormData();
		},
		encodeURIComponent: window.encodeURIComponent
	};
}();

window.onload = function () {
	try { $WG.init(); }
	catch (e) {
		console.log(e);
	}
};