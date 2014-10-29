
$$ctx.adapter = $$ctx.adapter || {
	dispatchMessage: function (message, attribute) {
		chrome.runtime.sendMessage({ msg: message, eventAttr: attribute });
	},
	iconUrl: chrome.extension.getURL('images/29x31.png'),
	ribbonIconUrl: chrome.extension.getURL('images/logo.png'),
	getUrl: chrome.extension.getURL,
	addListener: function () {
		chrome.runtime.onMessage.addListener(
			function (request, sender, sendResponse) {
				$$ctx.contentMessageListener.call(this, request.msg, request);
		});
	}
}

$$ctx.adapter.addListener();


