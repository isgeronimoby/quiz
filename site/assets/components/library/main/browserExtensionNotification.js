var showExtensionPopupFunc;
$(function(){
	if ( currentPlatform == 'desktop' ) {
		var isOpera = !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
		// Opera 8.0+ (UA detection to detect Blink/v8-powered Opera)
		var isFirefox = typeof InstallTrigger !== 'undefined';   // Firefox 1.0+
		var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
		// At least Safari 3+: "[object HTMLElementConstructor]"
		var isChrome = !!window.chrome && !isOpera;              // Chrome 1+
		var isIE = /*@cc_on!@*/false || !!document.documentMode;   // At least IE6

		var isMac = navigator.platform.toUpperCase().indexOf('MAC')>=0;
	}

	/*********** SHOW NOTIFICATIONS FOR EXTENSIONS ***********/
	function showExtensionPopup() {
		var notificationFFText = 'Almost there, click \'ALLOW\'<br/> and \'INSTALL\' to complete';
		var notificationSafariText = 'Almost there, now open <br/>the extension file to complete';
		var notificationPopup = $('.extension-notification .extension-overlay .extension-notification-holder');
		var notifPopupArrow = notificationPopup.find('.extension-notification-arrow');
		var notificationText = notificationPopup.find('.extension-notification-body > h2');

		if ( isChrome || isFirefox || isSafari ) {
			if ( isChrome ) {
				notificationPopup.removeClass('winFF').addClass('winChrome');
				if (!isMac) {
					notifPopupArrow.removeClass('winFF').removeClass('macChrome').addClass('winChrome');
				} else { // Chrome on Mac
					notifPopupArrow.removeClass('winFF').removeClass('winChrome').addClass('macChrome');
				}
			} else if ( isSafari ) {
				if ( !isMac ) {
					notificationPopup.addClass('winSafari');
					notificationText.html(notificationSafariText);
				} else { // Safari on Mac
					notificationPopup.addClass('macSafari');
				}
				notifPopupArrow.hide();

			} else { // is Firefox
				notificationPopup.removeClass('winChrome').addClass('winFF');
				notifPopupArrow.removeClass('winChrome').addClass('winFF');
				notificationText.html(notificationFFText);
			}
			$('.extension-notification').show();
		}
	}

	showExtensionPopupFunc = showExtensionPopup;
});
/*********** END OF NOTIFICATIONS ***********/
$(document).ready(function(){
	if ( currentPlatform == 'desktop' ) {
		$('section').hide();
		$('.loading-holder').show();
	}
});