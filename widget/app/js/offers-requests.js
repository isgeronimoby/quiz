DGW.global.api.requests.shareOfferFb = function(offerId){
    DGW.helpers.centerWindowPopup(DGW.global.tunnelPath.substring(DGW.global.tunnelPath.lastIndexOf('/') + 1, 0) +
    'publisher/v1/offer/facebookshare?api_key=' + DGW.global.api.apiKey + '&offerid=' + offerId, 'fbWindow', 460, 340);
};