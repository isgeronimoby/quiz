
$WG.adapter = function () {
	
	document.addEventListener("DOMContentLoaded", function () {
		document.removeEventListener("DOMContentLoaded", arguments.callee, false);
		$WG.adapter.ribbonHtml= document.getElementById("wgik_ribbon").innerHTML.replace(/\s+/g, " ");
	}, false);

	return {
		rssIconUrl: chrome.extension.getURL('images/everton-logo-for-rss.png'),
		storage: localStorage,
		getUrl: chrome.extension.getURL,
		getCookie: function (url, callback) {
			if (!url)
			{
				return callback(document.cookie);
			}
			chrome.cookies.getAll({ url: url }, function (cookie) {
				var cookieString = "";
				
				for (c in cookie)
				{
					cookieString += cookie[c].name + "=" + cookie[c].value + ";";
				}
				
				callback(cookieString);
			});

		},
		setCookie: function (key, value, days) {
			var d = new Date();
			d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
			var expires = "expires=" + d.toGMTString();

			document.cookie= key + "=" + value + "; " + expires;


		},
		
		createTab: function (a) {
			var tab = a;
			if (typeof a === "string") {
				chrome.tabs.create({ url: a }, function (t) { tab = t;});
			}
			return {
				sendMessage: function (par) {
					chrome.tabs.sendMessage(tab.id, par);
				},
				url: tab.url,
				focus: function () {
					chrome.tabs.update(tab.id, { url: tab.url, selected: true });
				},
				redirect: function (url) {
					//chrome.tabs.sendMessage(tab.id, { msg: "Redirect", url: url },null);
					debugger;
					chrome.tabs.executeScript(tab.id, { code: "window.location.href = '"+url+"';" });
				},
				close:function(){
					chrome.tabs.remove(tab.id);
				}
			}

		},
		registerHighlight: function (callback, expression) {
			try{
				chrome.webRequest.onCompleted.addListener(
					function (details) {
						if (details.url.match(expression) && details.tabId>-1) {
							chrome.tabs.get(details.tabId, function (t) {
								var tab = $WG.adapter.createTab(t);

								callback(tab);

							});
						}
					},
					{
						urls: ["<all_urls>"],
						types:["object","xmlhttprequest"]
					}
				);
			}
			catch(e){
				debugger;
				console.log(e);
			}

		},
		addToolbarButtonListener:function(callback)
		{
			if (!chrome.browserAction.onClicked.hasListeners()) {
				chrome.browserAction.onClicked.addListener(function (tb) {
					var t = $WG.adapter.createTab(tb);
					callback(t);
				});
			}
		},
		addUrlChangeListener: function (callback) {
			


			chrome.webNavigation.onTabReplaced.addListener(function (e) {
				chrome.tabs.get(e.tabId, function (tab) {
					callback($WG.adapter.createTab(tab));
				});
			});

			chrome.tabs.onUpdated.addListener(function (tabId, props, t) {
				console.log("addUrlChangeListener");
				var tab=$WG.adapter.createTab(t)
				callback(tab);
				
			});
		},
		addMessageListener: function (message, callback) {
			chrome.runtime.onMessage.addListener(
		  function (request, sender, sendResponse) {


		  	if (request.msg == message) {
		  		var tab = $WG.adapter.createTab(sender.tab);
		  		callback(tab, request.eventAttr)
		  	}

		  });
		},
		createXMLHttpRequest: function () {
			return new XMLHttpRequest();
		},
		createFormData: function () {
			return new FormData();
		},
		encodeURIComponent: window.encodeURIComponent
	}
}();

window.onload = function () {
	$WG.init(); 
};