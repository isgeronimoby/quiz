
const {interfaces: Ci,	utils: Cu} = Components;
Cu.import('resource://gre/modules/Services.jsm');
var Cc = Components.classes;

///startRefactoring
var observerService = Cc["@mozilla.org/observer-service;1"].getService(Components.interfaces.nsIObserverService);

let wm = Cc["@mozilla.org/appshell/window-mediator;1"].getService(Ci.nsIWindowMediator);

///endRefactoring

function install(data, reason) {
}


 
function uninstall() {

}



 


function loadIntoWindow(window) {
    try {
		
    	console.log("try load");
    	var rnd=parseInt((Math.random() * 100), 10);
    	Services.scriptloader.loadSubScript("chrome://wg/content/inject.js?"+rnd, this, "UTF-8");
    	Services.scriptloader.loadSubScript("chrome://wg/content/adapter.js?"+rnd, this, "UTF-8");
    	console.log("load chrome://wg/content/inject.js?"+rnd);
        $WG.adapter.load(window);
        $WG.init();
		
        

    }
    catch(e)
    {
    	console.log(e);
        debugger;
	    
    }
    
}

let console = (Cu.import("resource://gre/modules/devtools/Console.jsm", {})).console;


var windowListener = {
    onOpenWindow: function (aWindow) {
        // Wait for the window to finish loading
        let domWindow = aWindow.QueryInterface(Ci.nsIInterfaceRequestor).getInterface(Ci.nsIDOMWindowInternal || Ci.nsIDOMWindow);
        domWindow.addEventListener("load", function () {
            domWindow.removeEventListener("load", arguments.callee, false); //this removes this load function from the window
            //window has now loaded now do stuff to it
            //as example this will add a function to listen to tab select and will fire alert in that window
            if (domWindow.gBrowser && domWindow.gBrowser.tabContainer) {
                loadIntoWindow(domWindow);
            }
        }, false);
    },
    onCloseWindow: function(aWindow) { },
    onWindowTitleChange: function(aWindow, aTitle) { }
};

function startup(aData, aReason) {

	console.log("start");
    //css sheet loading common.css and content.css	
    var sss = Components.classes["@mozilla.org/content/style-sheet-service;1"]
    .getService(Components.interfaces.nsIStyleSheetService);
    var ios = Components.classes["@mozilla.org/network/io-service;1"]
        .getService(Components.interfaces.nsIIOService);

    //var skinUri = ios.newURI("chrome://wg/content/skin.css", null, null);
    //sss.loadAndRegisterSheet(skinUri, sss.USER_SHEET);

    //var fontUri = ios.newURI("chrome://wg/content/font.content.css", null, null);
    //sss.loadAndRegisterSheet(fontUri, sss.USER_SHEET);

    //var uri = ios.newURI("chrome://wg/content/content.css", null, null);
    //sss.loadAndRegisterSheet(uri, sss.USER_SHEET);

    //var uriCommon = ios.newURI("chrome://wg/content/common.css", null, null);
    //sss.loadAndRegisterSheet(uriCommon, sss.USER_SHEET);


    
    
    
    // Load into any existing windows
    let enumerator = wm.getEnumerator("navigator:browser");
    while (enumerator.hasMoreElements()) {
        console.log("windows loop");
        let win = enumerator.getNext();//.QueryInterface(Ci.nsIDOMWindow);
        loadIntoWindow(win);
    }
    console.log("continue");
    // Load into any new windows
    wm.addListener(windowListener);
}

 
function shutdown(data, reason) {
	$WG&&$WG.adapter&&$WG.adapter.shutDown();
	$WG=null;
	
	delete $WG;
	console.log("clean:"+!$WG);
	debugger;
	wm.removeListener(windowListener);

	//css sheet loading common.css and content.css	
	var sss = Components.classes["@mozilla.org/content/style-sheet-service;1"]
    .getService(Components.interfaces.nsIStyleSheetService);
	var ios = Components.classes["@mozilla.org/network/io-service;1"]
        .getService(Components.interfaces.nsIIOService);

	//var skinUri = ios.newURI("chrome://wg/content/skin.css", null, null);
	//sss.unregisterSheet(skinUri, sss.USER_SHEET);

	//var fontUri = ios.newURI("chrome://wg/content/font.content.css", null, null);
	//sss.unregisterSheet(fontUri, sss.USER_SHEET);

	//var uri = ios.newURI("chrome://wg/content/content.css", null, null);
	//sss.unregisterSheet(uri, sss.USER_SHEET);

	//var uriCommon = ios.newURI("chrome://wg/content/common.css", null, null);
	//sss.unregisterSheet(uriCommon, sss.USER_SHEET);
}


