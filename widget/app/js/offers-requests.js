DGW.global.api.requests.shareOfferFb = function(offerId){
    DGW.helpers.centerWindowPopup(DGW.global.tunnelPath.substring(DGW.global.tunnelPath.lastIndexOf('/') + 1, 0) +
    'publisher/v1/offer/facebookshare?api_key=' + DGW.global.api.apiKey + '&offerid=' + offerId, 'fbWindow', 460, 340, function(){
        DGW.global.api.requests.getUserOffers();
    });
};

DGW.global.api.requests.shareOfferTw = function(offerId, offerShareUrl){
    DGW.global.api.requests.trackOffer(offerId);

    DGW.helpers.centerWindowPopup('https://twitter.com/intent/tweet?text=Some+offer+text&url=' + encodeURIComponent(offerShareUrl), 'twWindow', 460, 340, function(){
        DGW.global.api.requests.completeOffer(offerId);
        DGW.global.api.requests.getUserOffers();
    });
};