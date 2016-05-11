DGW.global.offers.requests.shareOfferFb = function(offerId){
    DGW.helpers.centerWindowPopup(DGW.global.envPath +
    'offer/facebookshare?api_key=' + DGW.global.api.apiKey + '&offerid=' + offerId, 'fbWindow', 460, 340, function(){
        DGW.global.api.requests.getUserOffers(function(response){
            DGW.main.methods.offersConstructor(response);
            DGW.global.userStats.earnToday = response.TotalPointsReward;
        });
    });
};
//
DGW.global.offers.requests.shareOfferTw = function(offerId, url, text, hashtags){
    DGW.global.api.requests.trackOffer(offerId);

    DGW.helpers.centerWindowPopup('https://twitter.com/intent/tweet?text=' + text +
    '&url=' + encodeURIComponent(url) + '&hashtags=' + hashtags,
        'twWindow', 460, 340, function(){
        DGW.global.api.requests.completeOffer(offerId,
            function onSuccess(){
                DGW.global.api.requests.getUserOffers(function(response){
                    DGW.main.methods.offersConstructor(response);
                    DGW.global.userStats.earnToday = response.TotalPointsReward;
                });
                DGW.main.methods.notificationConstructor('Cool, you\'ve just earned more points for Sharing on Twitter');
            });
    });
};

DGW.global.actions.requests.shareFb = function(drawId, _winner){
    var win = DGW.helpers.createCenteredWindow('shareFbAction', 460, 340);
    DGW.global.api.requests.shareRewardAction(drawId, function onSuccess(urls){
        DGW.helpers.centerWindowPopup(DGW.global.envPath +
            'rewardedaction/facebookshare?api_key=' + DGW.global.api.apiKey + '&shareurl=' + encodeURIComponent((!_winner) ? urls.ShareUrl : urls.WinnerShareUrl),
            'fbWindow2', 460, 340, function(){
                DGW.global.api.requests.getUser();
                DGW.global.api.requests.getUserActions();
        }, win);
    });
};

DGW.global.actions.requests.shareTw = function(drawId, text, _winner){
    var win = DGW.helpers.createCenteredWindow('shareTwAction', 460, 340);
    DGW.global.api.requests.shareRewardAction(drawId, function onSuccess(urls){
        DGW.helpers.centerWindowPopup('https://twitter.com/intent/tweet?text=' + text +
            '&url=' + encodeURIComponent((!_winner) ? urls.ShareUrl : urls.WinnerShareUrl) + '&hashtags=' + DGW.global.club.name,
            'twWindow2', 460, 340, function(){
                //DGW.global.api.requests.getUserActions();
                DGW.global.api.requests.trackAction(5, function onSuccess(){
                    DGW.main.methods.notificationConstructor('Cool, you\'ve just earned more points for Sharing on Twitter');
                });
            }, win);
    });
};

DGW.global.offers.requests.watchVideo = function(offerId, videoUrl){
    var player;
    var scriptCheckingInterval, widgetShownInterval, playbackInterval;
    var wCloseBtn = DGW.main.elements.widget.querySelector('.dg-o-w-close');

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
                cancelVideoOffer();
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
            DGW.global.api.requests.completeOffer(offerId, function onSuccess(){
                DGW.main.methods.notificationConstructor('Cool, you\'ve just earned more points for Watching this cool video');
            });
            DGW.helpers.console.log('Video has finished');
        }
    }

    function cancelVideoOffer(){
        DGW.global.api.requests.cancelOffer(offerId);
        hidePlayer();
    }

    function hidePlayer(){
        DGW.helpers.addClass(DGW.main.elements.pages.videoHolder.querySelector('.dg-o-w-video-holder'), 'dg-video-hidden');
        setTimeout(function(){
            DGW.main.elements.widgetBody.removeChild(DGW.main.elements.pages.videoHolder);
            DGW.helpers.removeClass(DGW.main.elements.pages.videoHolder.querySelector('.dg-o-w-video-holder'), 'dg-video-hidden');
        }, 320);
        DGW.main.elements.pages.videoHolder.querySelector('span').innerHTML = '';
        window.clearInterval(widgetShownInterval);
        window.clearInterval(playbackInterval);

        wCloseBtn.removeEventListener('click', cancelVideoOffer);
        wCloseBtn.addEventListener('click', DGW.main.methods.hideWidget);
    }

    function showVideoOffer(){
        scriptCheckingInterval = window.setInterval(function(){
            if (window.YT.Player) {
                window.clearInterval(scriptCheckingInterval);
                DGW.main.elements.widgetBody.appendChild(DGW.main.elements.pages.videoHolder);

                wCloseBtn.removeEventListener('click', DGW.main.methods.hideWidget);
                wCloseBtn.addEventListener('click', cancelVideoOffer);
                window.setTimeout(function(){
                    onYouTubePlayerAPIReady();
                }, 0);
            }
        }, 50);
    }
};

DGW.global.offers.requests.openExternalLink = function(src){
    DGW.helpers.showFramedSrc(src);
};