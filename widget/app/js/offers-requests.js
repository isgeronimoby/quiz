DGW.global.offers.requests.shareOfferFb = function(offerId){
    DGW.helpers.centerWindowPopup(DGW.global.tunnelPath.substring(DGW.global.tunnelPath.lastIndexOf('/') + 1, 0) +
    'publisher/v1/offer/facebookshare?api_key=' + DGW.global.api.apiKey + '&offerid=' + offerId, 'fbWindow', 460, 340, function(){
        DGW.global.api.requests.getUserOffers();
    });
};

DGW.global.offers.requests.shareOfferTw = function(offerId, offerShareUrl){
    DGW.global.api.requests.trackOffer(offerId);

    DGW.helpers.centerWindowPopup('https://twitter.com/intent/tweet?text=Some+offer+text&url=' + encodeURIComponent(offerShareUrl), 'twWindow', 460, 340, function(){
        DGW.global.api.requests.completeOffer(offerId);
    });
};

DGW.global.offers.requests.watchVideo = function(offerId, videoUrl){
    var player;
    var scriptCheckingInterval, widgetShownInterval, playbackInterval;

    if (!window.YT) {
        var ytScript = document.createElement('script');

        ytScript.onload = function () {
            showVideoOffer();
        };

        ytScript.src = 'https://www.youtube.com/player_api';
        document.head.appendChild(ytScript);
    } else {
        showVideoOffer();
    }

    function onYouTubePlayerAPIReady() {
        player = new YT.Player('dg-o-w-video-playing', {
            height: DGW.main.elements.widgetBody.clientHeight,
            width: DGW.main.elements.widgetBody.clientWidth,
            videoId: DGW.helpers.getURLParameter('v', videoUrl),
            playerVars: {
                controls: 0,
                rel: 0,
                origin: window.document.origin,
                fs: 0,
                modestbranding: 1 // player that does not show a YouTube logo
            },
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
            }
        });
    }

    // autoplay video
    function onPlayerReady(event) {
        event.target.playVideo();
        DGW.global.api.requests.trackOffer(offerId);
        widgetShownInterval = window.setInterval(function(){
            if (DGW.main.shown == false) {
                hidePlayer();
                DGW.global.api.requests.cancelOffer(offerId);
            }
        }, 100);
        playbackInterval = window.setInterval(function(){
            DGW.main.elements.pages.videoHolder.querySelector('span').innerHTML =
                Math.floor(player.getDuration() - player.getCurrentTime());
        }, 1000);
        DGW.helpers.console.log('Video has started')
    }

    // when video ends
    function onPlayerStateChange(event) {
        if(event.data === 0) {
            // Video has finished
            hidePlayer();
            DGW.global.api.requests.completeOffer(offerId);
            DGW.helpers.console.log('Video has finished');
        }
    }

    function hidePlayer(){
        DGW.main.elements.widgetBody.removeChild(DGW.main.elements.pages.videoHolder);
        DGW.main.elements.pages.videoHolder.querySelector('span').innerHTML = '';
        window.clearInterval(widgetShownInterval);
        window.clearInterval(playbackInterval);
    }

    function showVideoOffer(){
        scriptCheckingInterval = window.setInterval(function(){
            if (window.YT.Player) {
                window.clearInterval(scriptCheckingInterval);
                DGW.main.elements.widgetBody.appendChild(DGW.main.elements.pages.videoHolder);
                window.setTimeout(function(){
                    onYouTubePlayerAPIReady();
                }, 0);
            }
        }, 50);
    }
};