DGW.main.methods.offersConstructor = function(offers) {
    var offersHolder = DGW.main.elements.pages.earnMain.querySelector('.dg-o-w-list-offers'),
        offersSubmenu = DGW.main.elements.pages.earnMain.querySelector('.dg-o-w-submenu ul'),
        offersSponsors = DGW.main.elements.pages.earnMain.querySelector('.dg-o-w-submenu select'),
        pointsSum = DGW.main.elements.pages.earnMain.querySelector('.dg-o-w-section-content h3 span');
    var lists = {
        offers: offers.Offers,
        sponsors: ['All offers'],
        categories: ['All']
    };
    var sponsorsAllString = lists.sponsors[0].toLowerCase(),
        categoriesAllString = lists.categories[0].toLowerCase();
    var currentCategory = categoriesAllString,
        currentSponsor = sponsorsAllString;

    pointsSum.innerHTML = offers.TotalPointsReward;
    DGW.global.userStats.earnToday = offers.TotalPointsReward;
    offersSubmenu.innerHTML = '';
    offersSponsors.innerHTML = '';

    lists.offers.forEach(function(offer){
        offer = offer.Offer;
        if (lists.sponsors.filter(function(sponsor){return sponsor === offer.Sponsor.Name;}).length == 0) {
            lists.sponsors.push(offer.Sponsor.Name);
        }
        if (lists.categories.filter(function(category){return category === offer.Type.Group.Name;}).length == 0) {
            lists.categories.push(offer.Type.Group.Name);
        }
    });


    lists.sponsors.forEach(function(sponsor){
        var option = document.createElement('option');
        option.innerHTML = sponsor;
        option.value = sponsor.toLowerCase();

        offersSponsors.appendChild(option);
    });

    lists.categories.forEach(function(category, ind){
        var li = document.createElement('li');
        li.innerHTML = category;
        li.addEventListener('click', function(){
            Array.prototype.slice.call(offersSubmenu.querySelectorAll('li')).forEach(function(item){
                DGW.helpers.removeClass(item, 'dg-o-w-active');
            });
            DGW.helpers.addClass(this, 'dg-o-w-active');
            currentCategory = category.toLowerCase();
            showOffersPanels(filterOffers())
        });
        if (category.toLowerCase() == 'all') {DGW.helpers.addClass(li, 'dg-o-w-active')}
        offersSubmenu.appendChild(li);
    });

    if (lists.sponsors.length > 2) {
        offersSponsors.addEventListener('change', function () {
            var that = this;
            DGW.helpers.console.log(that.value);
            currentSponsor = that.value.toLowerCase();
            showOffersPanels(filterOffers());
        });
    } else {
        offersSponsors.style.display = 'none';
    }

    function filterOffers(){
        return lists.offers.filter(function(offer){
            offer = offer.Offer;
            if (currentSponsor == sponsorsAllString &&
                currentCategory == categoriesAllString) {
                return true;
            } else if (currentSponsor == sponsorsAllString) {
                return offer.Type.Group.Name.toLowerCase() == currentCategory;
            } else if (currentCategory == categoriesAllString) {
                return offer.Sponsor.Name.toLowerCase() == currentSponsor;
            }
            return offer.Sponsor.Name.toLowerCase() == currentSponsor &&
                offer.Type.Group.Name.toLowerCase() == currentCategory;
        });
    }

    function showOffersPanels(filteredOffers) {
        offersHolder.innerHTML = '';

        filteredOffers.forEach(function (offer) {
            var recentCompleters = offer.RecentCompleters,
                completersCount = offer.TotalCompletersCount;

            offer = offer.Offer;

            var li = document.createElement('li');
            li.innerHTML =
                '<a href="" target="_blank"><div class="dg-o-w-offer">' +
                '<div class="dg-o-w-offer-left">' +
                '<img class="dg-o-w-offer-image" src="' + (offer.ImageUrl || offer.Type.ImageUrl) + '" />' +
                '<p class="dg-o-w-color-green">' + offer.PointsReward + '</p>' +
                '</div>' +
                '<div class="dg-o-w-offer-right">' +
                '<h4>' + '<img class="dg-o-w-offer-group" src="' + offer.Type.Group.ImageUrl + '"/>' + offer.Title + '</h4>' +
                '<p>' + offer.Description + '</p>' +
                '<div class="dg-o-w-users-done"></div>' +
                '</div>' +
                '</div></a>';
            if (offer.Type.Name == 'DownloadMobileApp') {
                li.querySelector('a').href = offer.CustomData.Url;
            }
            if (offer.Type.Name == 'DownloadToolbar') {
                li.querySelector('a').href = offer.CustomData.Url
                    .replace(/\{0}/, offer.Id)
                    .replace(/\{1}/, DGW.global.userStats.userId);
            }
            li.querySelector('a').addEventListener('click', function(ev){
                if (DGW.global.authorized) {
                    if (offer.Type.Name != 'DownloadMobileApp' && offer.Type.Name != 'DownloadToolbar') {
                        ev.preventDefault();
                    }
                    if (offer.Type.Name == 'FacebookShare') {
                        DGW.global.offers.requests.shareOfferFb(offer.Id);
                    } else if (offer.Type.Name == 'TwitterShare'){
                        DGW.global.offers.requests.shareOfferTw(offer.Id, offer.CustomData.Url, offer.CustomData.TweetText, offer.CustomData.Hashtags);
                    } else if (offer.Type.Name == 'WatchVideo'){
                        DGW.global.offers.requests.watchVideo(offer.Id, offer.CustomData.Url);
                    } else if (offer.Type.Name == 'DownloadToolbar') {
                        DGW.global.api.requests.trackOffer(offer.Id);
                    }

                    ga(DGW.global.gaSend, 'event', 'EarningPoints', offer.Type.Group.Name, offer.Sponsor.Name);
                } else {
                    ev.preventDefault();
                    DGW.main.methods.headerLoginShow('Enter to earn points');
                    ga(DGW.global.gaSend, 'event', 'EarningPointsAnonymous', offer.Type.Group.Name, offer.Sponsor.Name);
                }
            });



            if (recentCompleters.length > 0) {
                var usersCompletedDiv = li.querySelector('.dg-o-w-users-done');
                var playerImgsHolder = document.createElement('div');
                recentCompleters.forEach(function(user, ind){
                    if (ind > 2) return;
                    var img = document.createElement('img');
                    img.src = user.ImageUrl;

                    playerImgsHolder.appendChild(img);
                });
                usersCompletedDiv.appendChild(playerImgsHolder);

                var p = document.createElement('p');
                if (completersCount == 1) {
                    p.innerHTML = '1 user has done this';
                } else {
                    p.innerHTML = completersCount + ' users have done this';
                    p.className = ((recentCompleters.length == 2) ? 'dg-o-w-two-images' : 'dg-o-w-three-images');
                }
                usersCompletedDiv.appendChild(p);
            }


            offersHolder.appendChild(li);
        });
    }

    showOffersPanels(lists.offers);
    DGW.main.methods.setRewardedActions();
};