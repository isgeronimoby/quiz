debugger;

$$ctx.adapter = $$ctx.adapter || {
	dispatchMessage: function (message, attribute) {
		sendSyncMessage(message, attribute)
	},
	iconUrl: 'chrome://wg/content/images/29x31.png',
	version: '{VERSION}',
	ribbonIconUrl: 'chrome://wg/content/images/logo.png',
	getUrl: function (url) { return 'chrome://wg/content/' + url; },
	OAuthRedirect: function () {
		sendSyncMessage("OAutFinish", "http://fake.com" + params);
	},
	addListener: function () {
		var messageHandler;
		messageHandler=function (msgEvent) {
				try {
					
					var request = msgEvent.data;
					if (request.msg === "Dispose") {
						removeMessageListener("WG.Message", messageHandler);
					}
					else {
						$$ctx.contentMessageListener(request.msg, request);		
					}
				}
				catch (e) {
					window.console.error("message handler error");
				}
			}
		addMessageListener("WG.Message", messageHandler);
	}
}

$$ctx.adapter.addListener();

let gmm = Cc["@mozilla.org/globalmessagemanager;1"].getService(Ci.nsIMessageListenerManager);
var window = content.window;