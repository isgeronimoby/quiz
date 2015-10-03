// USAGE:
// $.fn.deeplinkBtnsInit(object_with_links);
/*
 ||| EXAMPLE OF REDIRECTS OBJECT |||

 Redirects = {
 iosDeeplink: 'evertonrewardstest://draw',
 iosAppstore: 'https://www.apple.com/',
 androidDeeplink: 'intent://draw#Intent;scheme=evertonrewards;package=com.sportreward.everton;end',
 androidAppstore: 'https://store.google.com/',
 other: 'https://www.yahoo.com/'
 };

 */

$(document).ready(function(){

    'use strict';

    $.fn.deeplinkBtnsInit = function(Redirects) {

        var deeplinkBtn = $('.deeplink-btn');
        var timeoutValue = 1000; // timeout before launching appstores

        // Magic on ios devices
        function appDetectionIos() {
            var timeout;

            function preventPopup() {
                clearTimeout(timeout);
                timeout = null;
                window.removeEventListener('pagehide', preventPopup);
            }

            function openApp() {
                var iframe = document.createElement('IFRAME');
                iframe.setAttribute('src', Redirects.iosDeeplink);
                iframe.style.width = 1 + 'px';
                iframe.style.height = 1 + 'px';
                iframe.style.border = 'none';
                iframe.style.display = 'none';
                document.body.appendChild(iframe);

                timeout = setTimeout(function () {
                    document.location = Redirects.iosAppstore;
                }, timeoutValue);
                window.addEventListener('pagehide', preventPopup);
            }

            openApp();
        }

        // Magic on android devices
        function appDetectionAndroid() {

            // Android chrome browser
            if (navigator.userAgent.match(/Chrome/)) {
                window.location.assign(Redirects.androidAppstore);
                setTimeout(function () {
                    window.location.assign(Redirects.androidDeeplink);
                }, timeoutValue);
            } else {
                // Older Android browser
                var iframe = document.createElement('IFRAME');
                iframe.style.width = 1 + 'px';
                iframe.style.height = 1 + 'px';
                iframe.style.border = 'none';
                iframe.style.display = 'none';
                iframe.onload = function () {
                    window.location = Redirects.androidAppstore;
                };
                iframe.setAttribute('src', Redirects.iosDeeplink);
                document.body.appendChild(iframe);
            }
        }

        // DETECTIONS:
        // also can check:  md.phone() and md.tablet()
        // docs: http://hgoebl.github.io/mobile-detect.js/doc/MobileDetect.html

        deeplinkBtn.on('click', function (e) {
            e.preventDefault();

            if (md.mobile()) {
                if (md.os() === 'iOS') {
                    appDetectionIos();
                } else if (md.os() === 'AndroidOS') {
                    appDetectionAndroid();
                } else {
                    // neither ios nor android, but mobile
                    window.top.location.href = Redirects.other;
                }
            }
        });

    }; // End of deeplink function

});