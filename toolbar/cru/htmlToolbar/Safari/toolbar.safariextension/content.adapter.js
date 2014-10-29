DOMParser.prototype.parseFromString = function (markup, type) {
	var real_parseFromString = DOMParser.prototype.parseFromString;
	if (/^\s*text\/html\s*(?:;|$)/i.test(type)) {
		var doc = document.implementation.createHTMLDocument("");
		var doc_elt = doc.documentElement;
		var first_elt;

		doc_elt.innerHTML = markup;
		first_elt = doc_elt.firstElementChild;

		if (doc_elt.childElementCount === 1 && first_elt.localName.toLowerCase() === "html") {
			doc.replaceChild(first_elt, doc_elt);
		}

		return doc;
	} else {
		return real_parseFromString.apply(this, arguments);
	}
};

$$ctx.adapter = $$ctx.adapter || {
	dispatchMessage: function (message, attribute) {
		safari.self.tab.dispatchMessage(message, attribute);
	},
	iconUrl: safari.extension.baseURI + 'Images/29x31.png',
	ribbonIconUrl: safari.extension.baseURI + 'Images/logo.png',
	getUrl: function (url) {
		var resultUrl = safari.extension.baseURI + url;
		return resultUrl;
	},
	OAuthRedirect: function () {
		window.location = safari.extension.baseURI + 'oauth2.html' + params;
	},
	addListener: function () {
		safari.self.addEventListener("message",
			function (msgEvent) {				
				var request = msgEvent.message;
				$$ctx.contentMessageListener(msgEvent.name, request);
			}, false
		);
	}
}

try {
	if(window.self === window.top){
		$$ctx.adapter.addListener();
	}
} catch (e) {
	debugger;
}

if (window.location.href.indexOf("http://www.awin1.com") > -1) {
    safari.self.tab.dispatchMessage("AWINCookie", document.cookie);
}




