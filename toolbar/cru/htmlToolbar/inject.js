$WG = {
	init: function () {

		$WG.adapter.addUrlChangeListener(function (tab) {
			tab.sendMessage({ msg: "UpdatePage" });
		});

		$WG.adapter.addMessageListener("GetContent",
				function (tab,data) {
					var r = new XMLHttpRequest();
					var requestUrl = $WG.adapter.getUrl(data.url);
					r.open("GET", requestUrl, true);
					r.setRequestHeader("Content-Type", " text/html");
					r.setRequestHeader("Accept", "*/*");
					
					r.onload = function (e) {
						if (r.readyState == 4) {
							var clb = data.callback;
							tab.sendMessage({ msg: "GetContentCallback", clb: clb, attr: e.currentTarget.responseText });
						}
						else {
							debugger;
						}
					};

					r.send();
				}
			);
	}
};