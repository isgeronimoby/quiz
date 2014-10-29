

var $$ctx = (function () {

		var instance = {
			extend: function () {
				for (var i = 1; i < arguments.length; i++)
					for (var key in arguments[i])
						if (arguments[i].hasOwnProperty(key))
							arguments[0][key] = arguments[i][key];
				return arguments[0];
			}
		};
	
		var f = function (selector) {
			
			if (typeof selector === 'object' || typeof selector === 'function') {
				if (Object.prototype.toString.call(selector) === '[object NodeList]')
					this.element = Array.prototype.slice.call(selector);
				else
					this.element = selector;
			}
			else
				this.element = Array.prototype.slice.call(window.document.querySelectorAll(selector));
		};

		var chainTemplate = function (callback) {
			if (Object.prototype.toString.call(this.element) === '[object Array]') {
				for (i = 0; i < this.element.length; i++) {

					callback(this.element[i]);
				}
			} else {
				callback(this.element);
			}

			return this;
		}

		var fireChangeEvent = function (element) {
			var event; // The custom event that will be created

			if (window.document.createEvent) {
				event = window.document.createEvent("HTMLEvents");
				event.initEvent("change", true, true);
			} else {
				event = window.document.createEventObject();
				event.eventType = "change";
			}

			event.eventName = "change";

			if (window.document.createEvent) {
				element.dispatchEvent(event);
			} else {
				element.fireEvent("on" + event.eventType, event);
			}
		};

		f.prototype = instance.extend({
			each: function (callback, args) {
				var value,
					i = 0,
					length = this.element.length;


				if (Object.prototype.toString.call(this.element) === '[object Array]') {
					for (; i < length; i++) {
						value = callback.call(this.element[i], i, this.element[i]);

						if (value === false) {
							break;
						}
					}
				} else {
					for (i in this.element) {
						value = callback.call(this.element[i], i, this.element[i]);

						if (value === false) {
							break;
						}
					}
				}

				return this;
			},
			html: function () {
				var value,
					html,
					i = 0,
					length = this.element.length;



				if (Object.prototype.toString.call(this.element) === '[object Array]') {
					for (; i < length; i++) {

						html += this.element[i].innerHTML;
					}
				} else {
					html = this.element.innerHTML;
				}

				return html;
			},
			appendHtml: function (text) {
				return chainTemplate.call(this, function (elem) {
					var e = new window.DOMParser().parseFromString(text, 'text/html');
					while (e.body.firstChild) {
						elem.appendChild(e.body.firstChild);
					}
				});
			},
			prepend: function (a) {
				return chainTemplate.call(this, function (elem) {
					if (typeof a === "string") {
						var e = new window.DOMParser().parseFromString(a, 'text/html');						
						while (e.body.lastChild) {
							elem.insertBefore(e.body.lastChild, elem.firstChild);
						}
					}
					else
						elem.insertBefore(a, elem.firstChild);
				});
			},
			css: function (key, value) {
				return chainTemplate.call(this, function (elem) {
					elem.style[key] = value;
				});
			},
			attr: function (key, value) {
				if (value) {
					return chainTemplate.call(this, function (elem) {
						elem.setAttribute(key, value);
						fireChangeEvent(elem);
					});
				}
				if (this.element.length > 0)
					return this.element[0].getAttribute(key);
			},
			html: function (value) {
				if (value === undefined) {
					return this.element.innerHTML;
				}
				if (typeof value === "string") {
					this.empty();
					return this.appendHtml(value);
				}
				else {
					return chainTemplate.call(this, function (elem) {
						this.empty();
						elem.appendChild(value);
					});
				}
			},
			show: function () {
				return chainTemplate.call(this, function (elem) {
					elem.style.display = 'block';
				});
			},
			hide: function () {
				return chainTemplate.call(this, function (elem) {
					elem.style.display = 'none';
				});
			},
			animateLeft:function(from,to,fast)
			{
				if (from > to) {
					return chainTemplate.call(this, function (elem) {
						elem.style.marginLeft = from + "px";

						window.setTimeout(function () {
							var delta=Math.min(!!fast?250:5,-to+from)
							!$$ctx.$(elem).animateLeft(from - delta, to, fast);
						}, 5)
					});	
				}
			},
			animateRight: function (from, to,fast) {
				if (from < to) {
					return chainTemplate.call(this, function (elem) {
						elem.style.marginLeft = from + "px";

						window.setTimeout(function () {
							var delta = Math.min(!!fast ? 250 : 5, to - from)
							!$$ctx.$(elem).animateRight(from + delta, to,fast);
						}, 5)
					});
				}
			},
			click: function (handler) {
				return chainTemplate.call(this, function (elem) {
					var oldHandler = elem.onclick;
					elem.onclick = function (e) {
						var args = Array.prototype.slice.call(arguments, 1);
						var result=handler.call(arguments[0], args);
						var oldResult = oldHandler && oldHandler.call(arguments[0], args);
						return result && oldResult;
					}
				});
			},
			remove: function () {
				return chainTemplate.call(this, function (elem) {
					elem.parentNode.removeChild(elem);
				});
			},
			hasClass: function (cls) {
				var currentElemeent =Object.prototype.toString.call(this.element) === '[object Array]'?this.element[0]: this.element;
				return currentElemeent.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
			},
			addClass: function (cls) {
				return chainTemplate.call(this, function (elem) {				
					if (!$$ctx.$(elem).hasClass(cls)) elem.className += " " + cls;
				});
			
			},
			removeClass: function (cls) {
				return chainTemplate.call(this, function (elem) {
					if (!$$ctx.$(elem).hasClass(cls)) elem.className += " " + cls;
					if ($$ctx.$(elem).hasClass(cls)) {
						var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
						elem.className = elem.className.replace(reg, ' ');
					}
				});
			
			},
			val: function (v) {
				if (v === undefined) {
					return this.element.value;
				}
				
				return chainTemplate.call(this, function (elem) {
					elem.value = v;
					fireChangeEvent(elem);

				});
				
			},
			empty: function () {				
				return chainTemplate.call(this, function (elem) {
					while (elem.firstChild) {
						elem.removeChild(elem.firstChild);
					}
				});
			},
			width: function () {				
				return this.element[0].offsetWidth;

			}
		});

		var incrementingId = 0;

		instance=instance.extend( {
			strip: function (html) {
				if (!html) return "";
				var e = new window.DOMParser().parseFromString(html, 'text/html');
				return e.body.textContent || e.body.innerText || "";
			},
			$:function(selector){
				return new f(selector);
			},
			getId:function(element) {
				if (!element.id) {
					element.id = "wg_id_" + incrementingId++;
					// Possibly add a check if this ID really is unique
				}
				return element.id;
			},
			UpdatePage: function (request) {
				var htmlFiles = "{HTML_FILES}".split(',');
				
				if (window.document.querySelectorAll('.-gr8-switch').length == 0) {
					var links=""
					$$ctx.$(htmlFiles).each(function () {
						
						links += "<p><a href='" + $$ctx.adapter.getUrl(this + "") + "'>" + this + "" + "</a></p>";
					});
					
					$$ctx.$('body').prepend("<div class='-gr8-switch'>" + links + "</div>");

					$$ctx.$('.-gr8-switch a').click(function () {

						
						
						!$$ctx.adapter.dispatchMessage("GetContent", {
							url: "html/" + this.target.href.split('/').pop(), callback: (function (htmlText) {
								
								$$ctx.$('.-gr8-panel').remove();
									var html = htmlText.replace(/{CONTENT_PATH}/g, $$ctx.adapter.getUrl(""));
									$$ctx.$('body').prepend(html);

								
							}) + ""
						});

						return false;
					});
				}

				if (!$$ctx.$('body').attr("injected")) {
					
					!$$ctx.$('body').attr("injected", true);
					var head = window.document.getElementsByTagName('head')[0];
					var link = window.document.createElement('link');
					link.rel = 'stylesheet';
					link.type = 'text/css';
					link.href = $$ctx.adapter.getUrl("html/css/all.css");
					link.media = 'all';
					head.appendChild(link);
				}

				
			},
			GetContentCallback: function (request) {
				eval("var callback="+request.clb)
				callback(request.attr);
			},
			TestMessage: function (request) {
				$$ctx.$("meta[property='sr:tracking_id']").attr('content', request.clickRef);
				var is_guest = window.document.querySelector("meta[property='sr:is_guest']");
				if (is_guest.getAttribute('content').toLowerCase() == 'true') {					
					$$ctx.$(".additional-navigation .info-amount").html(request.credits.MoneyConfirmed.toFixed(2));
					$$ctx.$(".profile-hover .statistics .pending .sum").html(request.credits.MoneyPending.toFixed(2));
					$$ctx.$(".profile-hover .statistics .earned .sum").html(request.credits.MoneyConfirmed.toFixed(2));
					$$ctx.$(".profile-hover .statistics .donated .sum").html("£" + request.credits.FoundationDonations.toFixed(2));$$ctx.$(".profile-statistic li:nth-child(1) span.sum").html(request.credits.MoneyPending.toFixed(2));
					$$ctx.$(".profile-statistic li:nth-child(2) span.sum").html(request.credits.MoneyConfirmed.toFixed(2));
					$$ctx.$(".profile-statistic li:nth-child(3) span.sum").html("£" + request.credits.FoundationDonations.toFixed(2));
					$$ctx.$(".profile-statistic div span.sum").html(request.credits.PurchasesCount.toString());
					
				}
			},
			contentMessageListener: function () {
				try {

					var args = Array.prototype.slice.call(arguments, 1);

					if ($$ctx.hasOwnProperty(arguments[0])) {
						$$ctx[arguments[0]].apply(this, args);
					}
				}
				catch (e) {
					window.console.error("contentMessageListener error:" + e.message + "  trace:" + e.stack);
				}

				
			}
			
		});
		return instance;
	})();


