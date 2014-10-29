$WG.adapter = function () {
	

	var shutdownFunctions = [];


	
    
	//getting ribbon html
    var r = Components.classes["@mozilla.org/xmlextras/xmlhttprequest;1"].createInstance(Components.interfaces.nsIXMLHttpRequest);
    r.open("GET", "chrome://wg/content/templates.html", false);
    r.setRequestHeader("Content-Type", "text/html");
    r.send();
    var ribbonHtml = r.responseText.replace(/\s+/g, " ")
    r = null;


    var win;

    var messageListeners = [];
    
    return {
    	getUrl: function (url) { return 'chrome://wg/content/' + url; },
    	rssIconUrl: 'chrome://wg/content/images/everton-logo-for-rss.png',
    	
    	ribbonHtml: ribbonHtml,
    	createTab: function (a) {
    		if (typeof a === "string") {
    			var browser = win.gBrowser.addTab(a).linkedBrowser;
    		}
    		else {
    			var browser = a;
    		}

    		
    		return {
    			sendMessage: function (par) {
    				browser.messageManager.sendAsyncMessage("WG.Message", par);
    			},
    			url: browser.currentURI.spec,
    			focus: function () {
    				WGik.show(tab);
    			},
    			redirect: function (url) {
    				browser.contentWindow.location.href = url;
    			},
    			close:function()
    			{
    				browser.contentWindow.close();
    			}
    		}
    	},
    	registerHighlight: function (callback, expression) {
    		console.log("==== registerHighlight");
    		var httpObs = {
    			observe: function (aSubject, aTopic, aData) {
    				if (aTopic == 'http-on-modify-request') {

    					
    					/*start - do not edit here*/
    					var oHttp = aSubject.QueryInterface(Components.interfaces.nsIHttpChannel); //i used nsIHttpChannel but i guess you can use nsIChannel, im not sure why though
    					if (oHttp.URI.spec.match(expression) && oHttp.referrer && oHttp.referrer.spec.match(expression)) {
    						//console.log("==== HTTP OBSERVE: " + oHttp.referrer.spec);
    						var interfaceRequestor = oHttp.notificationCallbacks.QueryInterface(Components.interfaces.nsIInterfaceRequestor);
    						//var DOMWindow = interfaceRequestor.getInterface(Components.interfaces.nsIDOMWindow); //not to be done anymore because: https://developer.mozilla.org/en-US/docs/Updating_extensions_for_Firefox_3.5#Getting_a_load_context_from_a_request //instead do the loadContext stuff below
    						var loadContext;
    						try {
    							loadContext = interfaceRequestor.getInterface(Components.interfaces.nsILoadContext);
    						} catch (ex) {
    							try {
    								loadContext = aSubject.loadGroup.notificationCallbacks.getInterface(Components.interfaces.nsILoadContext);
    								//in ff26 aSubject.loadGroup.notificationCallbacks was null for me, i couldnt find a situation where it wasnt null, but whenever this was null, and i knew a loadContext is supposed to be there, i found that "interfaceRequestor.getInterface(Components.interfaces.nsILoadContext);" worked fine, so im thinking in ff26 it doesnt use aSubject.loadGroup.notificationCallbacks anymore, but im not sure
    							} catch (ex2) {
    								loadContext = null;
    								//this is a problem i dont know why it would get here
    							}
    						}
    						/*end do not edit here*/
    						/*start - do all your edits below here*/
    						var url = oHttp.URI.spec; //can get url without needing loadContext
    						if (loadContext) {

    							var contentWindow = loadContext.associatedWindow; //this is the HTML window of the page that just loaded
    							//aDOMWindow this is the firefox window holding the tab
    							var aDOMWindow = contentWindow.top.QueryInterface(Ci.nsIInterfaceRequestor).getInterface(Ci.nsIWebNavigation).QueryInterface(Ci.nsIDocShellTreeItem).rootTreeItem.QueryInterface(Ci.nsIInterfaceRequestor).getInterface(Ci.nsIDOMWindow);
    							var gBrowser = aDOMWindow.gBrowser; //this is the gBrowser object of the firefox window this tab is in
    							var aTab = gBrowser._getTabForContentWindow(contentWindow.top); //this is the clickable tab xul element, the one found in the tab strip of the firefox window, aTab.linkedBrowser is same as browser var above //can stylize tab like aTab.style.backgroundColor = 'blue'; //can stylize the tab like aTab.style.fontColor = 'red';
    							var browser = aTab.linkedBrowser; //this is the browser within the tab //this is what the example in the previous section gives
    							//end getting other useful stuff

    							callback($WG.adapter.createTab(browser));
    						} else {
    							debugger;
    							Components.utils.reportError('EXCEPTION: Load Context Not Found!!');
    							//this is likely no big deal as the channel proably has no associated window, ie: the channel was loading some resource. but if its an ajax call you may end up here
    						}
    					}
    				}
    			}
    		};
    		

    		observerService.addObserver(httpObs, 'http-on-modify-request', false);

    		shutdownFunctions.push(function () {
    			debugger;
    			observerService.removeObserver(httpObs, 'http-on-modify-request');
    		});
    		
    	},
    	addToolbarButtonListener:function(callback)
    	{
    		var document = win.document;
    		if (!document) {
    			return;
    		}

    		var urlbarContainer = document.getElementById("nav-bar");//"urlbar-container");
    		if (!urlbarContainer) {
    			return;
    		}
    		var btn = document.createElement('toolbarbutton');
    		btn.setAttribute('id', 'mybutton-id');
    		btn.setAttribute('type', 'button');
    		// the toolbarbutton-1 class makes it look like a traditional button
    		btn.setAttribute('class', 'toolbarbutton-1');
    		// the data.url is relative to the data folder
    		btn.setAttribute('image', 'chrome://wg/content/images/tb-logo-small.png');
    		btn.setAttribute('orient', 'horizontal');
    		// this text will be shown when the toolbar is set to text or text and iconss
    		btn.setAttribute('label', 'My Button');

    		btn.addEventListener('click', function (event) {

    			var tabBrowser = win.gBrowser.getBrowserForDocument(win.gBrowser.contentDocument)
    			var browser = win.getBrowser();    			
    			var tab = $WG.adapter.createTab(tabBrowser);
    			callback(tab);
    		}, false)
    		//urlbarContainer.parentNode.insertBefore(btn, urlbarContainer.nextSibling);

    		urlbarContainer.appendChild(btn);
    		shutdownFunctions.push(function () {
    			debugger;
    			urlbarContainer.removeChild(btn);
    		});
    	},
    	addEventListener:function(win,event,handler)
    	{
    		console.log("====add event listener");
    		win.gBrowser.addEventListener(event, handler, true);
    		shutdownFunctions.push(function () {
    			debugger;
    			win.gBrowser.removeEventListener(event, handler);
    		});
		},
    	load:function(activeWindow)
    	{
    		console.log("====load function");
    		if (!$WG)
    		{
    			console.log("==== $WG is null return;");
    			return;
    		}
    		try {
    			
    			win = activeWindow;
    			$WG.adapter.addEventListener(win, "load", function (event) {
    				console.log("==== addEventListener load");
    				try {
    					var tabBrowser = win.gBrowser.getBrowserForDocument(event.target);
    					if (tabBrowser && event.originalTarget.nodeName == "#document") {

    						console.log("==== adapter load. is injected: " + tabBrowser.injected + "   --   version --------" + $WG.version);
    						if (!tabBrowser.injected) {



    							tabBrowser.deleteWGMessageListeners && tabBrowser.deleteWGMessageListeners();

    							for (i = 0; i < messageListeners.length; i++) {
    								var handler = messageListeners[i];
    								tabBrowser.messageManager.addMessageListener(handler.message, handler.callback);
    							}


    							tabBrowser.deleteWGMessageListeners = function () {
    								for (i = 0; i < messageListeners.length; i++) {
    									var handler = messageListeners[i];
    									tabBrowser.messageManager.removeMessageListener(handler.message, handler.listener);
    								}
    							}


    							
    							tabBrowser.messageManager.loadFrameScript("chrome://wg/content/inject_content.js?{BUILD_VERSION}", true);
    							tabBrowser.messageManager.loadFrameScript("chrome://wg/content/content.adapter.js?{BUILD_VERSION}", true);
    							console.log("load frmae scripts: chrome://wg/content/content.adapter.js?{BUILD_VERSION}");
    							tabBrowser.injected = true;

    							shutdownFunctions.push(function () {
    								debugger;
    								$WG.adapter.createTab(tabBrowser).sendMessage({ msg: "Dispose" });
    								tabBrowser.injected = false;
    							});

    						}
    					}
    				}
    				catch (e) {
    					debugger;
    					console.log("==== error:"+e.message);
    				}

    			});
    		}
    		catch(e)
    		{

    			debugger;
    			console.log("==== error:" + e.message);
    		}
    	},
    	addUrlChangeListener:function(callback)
    	{
    		$WG.adapter.addEventListener(win, "load", function (event) {
    			//console.log("==== adapter addUrlChangeListener.  version " + $WG.version);
    			var tabBrowser = win.gBrowser.getBrowserForDocument(event.target);
    			
    			if (tabBrowser && event.originalTarget.nodeName == "#document") {
					callback($WG.adapter.createTab(tabBrowser));	
    			}
    		});
    	},
    	addMessageListener:function(message,callback)
    	{    		
    		messageListeners.push({
    			message: message, callback: function (a) {
    				//console.log("==== MESSGAE LISTENER: " + message+"   ----   "+a.target+"   ------    "+a.data);
    				tab = $WG.adapter.createTab(a.target);
    				callback(tab, a.data);
    			}
    		});
    	},
    	createXMLHttpRequest: function () {
    		//return new XSLTProcessor();
    		return Components.classes["@mozilla.org/xmlextras/xmlhttprequest;1"].createInstance(Components.interfaces.nsIXMLHttpRequest);
    	},
    	createFormData: function () {
    		return Components.classes["@mozilla.org/files/formdata;1"]
                         .createInstance(Components.interfaces.nsIDOMFormData);
    	},
    	shutDown: function () {
    		try {
    			debugger;
    			while (shutdownFunctions.length > 0)
    			{
					
    				var fnc = shutdownFunctions.pop();
    				fnc.call(this);
    			}
    		}
    		catch(e)
    		{
    			debugger;
    		}
    	},
    	encodeURIComponent:this.encodeURIComponent

    };
}();


