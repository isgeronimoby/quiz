DGW.main.methods.setRewardedActions = function(w, a){
    if (!w) w = DGW.main.elements.widget;
    if (!a) a = DGW.main.cache.rewardedActions;
    if (w.querySelector('.dg-o-w-rewarded-action')) {
        if (w.querySelector('#dg-o-w-login-fb-reward'))
            w.querySelector('#dg-o-w-login-fb-reward').innerHTML = a.filter(function(action){return action.Type == 'FacebookConnect'})[0].PointsReward;
        if (w.querySelector('#dg-o-w-friends-sign-up-reward'))
            w.querySelector('#dg-o-w-friends-sign-up-reward').innerHTML = a.filter(function(action){return action.Type == 'FriendSignUp'})[0].PointsReward;
        if (w.querySelector('#dg-o-w-facebook-like-reward'))
            w.querySelector('#dg-o-w-facebook-like-reward').innerHTML = a.filter(function(action){return action.Type == 'FacebookShare'})[0].PointsReward;
        if (w.querySelector('#dg-o-w-tweeter-like-reward'))
            w.querySelector('#dg-o-w-tweeter-like-reward').innerHTML = a.filter(function(action){return action.Type == 'TwitterShare'})[0].PointsReward;
    }
};

DGW.main.methods.profileSetData = function(data) {
    var profileImageHolders = [
            DGW.main.elements.widgetBody.querySelector('.dg-o-w-menu-profile .profile-menu-item img'),
            DGW.main.elements.pages.profileMain.querySelector('#profileImage')
        ],
        profileNames = [
            DGW.main.elements.widgetBody.querySelector('.dg-o-w-menu-profile .profile-menu-authorized h4'),
            DGW.main.elements.pages.profileMain.querySelector('#profileName')
        ],
        friendsNumber = DGW.main.elements.pages.profileMain.querySelector('#profileFriendsAmount');

    var points = {
            confirmed: [
                DGW.main.elements.widgetBody.querySelector('#dg-o-w-points'),
                DGW.main.elements.pages.profileMain.querySelector('.dg-o-w-profile-points h3')
            ],
            pending: [DGW.main.elements.pages.profileMain.querySelector('.dg-o-w-profile-points h5')]
        },
        credits = {
            confirmed: [
                DGW.main.elements.widgetBody.querySelector('#dg-o-w-credits'),
                DGW.main.elements.pages.profileMain.querySelector('.dg-o-w-profile-credits h3')
            ],
            pending: [DGW.main.elements.pages.profileMain.querySelector('.dg-o-w-profile-credits h5')]
        };

    profileImageHolders.forEach(function(image){
        image.src = data.ImageUrl || DGW.helpers.checkImagesForSrc(image.getAttribute('src'));
    });

    DGW.global.userStats.imageUrl = data.ImageUrl || DGW.global.userStats.imageUrl;

    profileNames.forEach(function(name){
        name.innerHTML = data.UserName;
    });

    DGW.global.userStats.name = data.UserName || DGW.global.userStats.name;

    points.confirmed.forEach(function(point){
       point.innerHTML = data.Wallet.PointsConfirmed;
    });
    points.pending.forEach(function(point){
        point.innerHTML = data.Wallet.PointsPending;
    });

    credits.confirmed.forEach(function(credit){
        credit.innerHTML = data.Wallet.CreditsConfirmed;
    });
    credits.pending.forEach(function(credit){
        credit.innerHTML = data.Wallet.CreditsPending;
    });

    DGW.global.userStats.pointsC = data.Wallet.PointsConfirmed;
    DGW.global.userStats.pointsP = data.Wallet.PointsPending;
    DGW.global.userStats.creditsC = data.Wallet.CreditsConfirmed;
    DGW.global.userStats.creditsP = data.Wallet.CreditsPending;
};

DGW.main.methods.updateUserInfoBet = function(draw, user){
    var points = {
            confirmed: [
                DGW.main.elements.widgetBody.querySelector('#dg-o-w-points'),
                DGW.main.elements.pages.profileMain.querySelector('.dg-o-w-profile-points h3')
            ],
            pending: [DGW.main.elements.pages.profileMain.querySelector('.dg-o-w-profile-points h5')]
        },
        credits = {
            confirmed: [
                DGW.main.elements.widgetBody.querySelector('#dg-o-w-credits'),
                DGW.main.elements.pages.profileMain.querySelector('.dg-o-w-profile-credits h3')
            ],
            pending: [DGW.main.elements.pages.profileMain.querySelector('.dg-o-w-profile-credits h5')]
        };

    var betPoints = DGW.main.elements.widgetContent.querySelector('.dg-o-w-your-bet span');

    points.confirmed.forEach(function(point){
        point.innerHTML = user.Wallet.PointsConfirmed;
    });
    points.pending.forEach(function(point){
        point.innerHTML = user.Wallet.PointsPending;
    });

    credits.confirmed.forEach(function(credit){
        credit.innerHTML = user.Wallet.CreditsConfirmed;
    });
    credits.pending.forEach(function(credit){
        credit.innerHTML = user.Wallet.CreditsPending;
    });

    DGW.global.userStats.pointsC = user.Wallet.PointsConfirmed;
    DGW.global.userStats.pointsP = user.Wallet.PointsPending;
    DGW.global.userStats.creditsC = user.Wallet.CreditsConfirmed;
    DGW.global.userStats.creditsP = user.Wallet.CreditsPending;

    if (betPoints) {
        betPoints.innerHTML = draw.TicketsAmount || 0;
    } else {

    }
};

DGW.main.methods.updateBadgesInfo = function(){
    var ba = DGW.global.userStats.badges.all,
        be = DGW.global.userStats.badges.earned;
    var pr = DGW.main.elements.pages.profileMain;
    var wc = DGW.main.elements.widgetContent;
    var ul = pr.querySelector('.dg-o-w-badges-holder ul');

    pr.querySelector('#dg-o-w-badges-earned-amount').innerHTML = be.length;


    ul.innerHTML = '';
    ba.forEach(function(b){
        var li = document.createElement('li');
        li.innerHTML = '<img src="' + b.ImageUrl + '" alt=""/><p>' + b.Title + '</p>';

        if ( be.filter(function(earned){return earned.BadgeId == b.BadgeId;}).length > 0 ) {
            //badge was earned
            DGW.helpers.addClass(li, 'dg-o-w-earned');
        }

        li.addEventListener('click', function(){
            showFullBadgePage(ba, b.Id);
        });

        ul.appendChild(li);
    });

    function showFullBadgePage(badges, curBadgeId){
        var submenu = '<div class="dg-o-w-submenu"><ul><li class="dg-o-w-back-draws">&lt; Back</li></ul></div>';
        var pageContent = '<div class="dg-o-w-badge-single">' +
            //'<div class="dg-o-w-badge-single-filters">' +
            //    '<a href="#" id="dg-o-w-badges-all">All badges</a><a href="#" id="dg-o-w-badges-missed">Missed badges</a><a href="#" id="dg-o-w-badges-my">My badges</a>' +
            //'</div>' +
            '<ul></ul><div class="dg-o-w-badge-single-left"><</div><div class="dg-o-w-badge-single-right">></div></div>';
        var page = document.createElement('div');
            page.className = 'dg-o-w-badge-single-page';
            page.innerHTML = submenu + pageContent;
        var ul = page.querySelector('.dg-o-w-badge-single ul');
        var leftBtn = page.querySelector('.dg-o-w-badge-single-left'),
            rightBtn = page.querySelector('.dg-o-w-badge-single-right');

        var badgesArr = [];

        function hideBadges(){
            badgesArr.forEach(function(li){
                DGW.helpers.removeClass(li, 'dg-o-w-active');
            });
        }

        function slideBadges(direction){
            var curB = badgesArr.indexOf(badgesArr.filter(function(b, ind){
               return DGW.helpers.hasClass(b, 'dg-o-w-active');
            })[0]);

            // TODO: add slideLeft and slideRight animations
            hideBadges();
            if (direction === 'left') {
                if (curB > 0) {
                    DGW.helpers.addClass(badgesArr[curB - 1], 'dg-o-w-active');
                } else {
                    DGW.helpers.addClass(badgesArr[badgesArr.length - 1], 'dg-o-w-active');
                }
            } else {
                if (curB < badgesArr.length - 1) {
                    DGW.helpers.addClass(badgesArr[curB + 1], 'dg-o-w-active');
                } else {
                    DGW.helpers.addClass(badgesArr[0], 'dg-o-w-active');
                }
            }
        }

        badges.forEach(function(badge){
            var li = document.createElement('li');
            li.innerHTML = '<div><img src="' + badge.ImageUrl + '" /><h3>' + badge.Title + '</h3><p>' + badge.Description + '</p></div>';
            if (badge.Id === curBadgeId) {
                li.className = 'dg-o-w-active';
            }
            if ( be.filter(function(earned){return earned.BadgeId == badge.BadgeId;}).length > 0 ) {
                //badge was earned
                DGW.helpers.addClass(li, 'dg-o-w-earned');
            }
            badgesArr.push(li);
            ul.appendChild(li);
        });

        page.querySelector('.dg-o-w-submenu li').addEventListener('click', function(){
            DGW.main.elements.widgetContent.removeChild(DGW.main.elements.widgetContent.childNodes[1]);
        });

        leftBtn.addEventListener('click', function(){
            slideBadges('left');
        });
        rightBtn.addEventListener('click', function(){
            slideBadges('right');
        });

        wc.appendChild(page);
    }

};

DGW.main.methods.drawsConstructor = function(cacheObj, _context){
    var drawsList = DGW.main.elements.pages.drawsMain.querySelector('.dg-o-w-list-draws');
    drawsList.innerHTML = '';
    DGW.global.activeDrawsExist = false;
    if (cacheObj) {
        cacheObj.drawsList.forEach(function (draw) {
            var li = document.createElement('li');
            li.id = draw.DrawId;
            li.setAttribute('data-end-date', draw.EndDate);
            var drawEntry = cacheObj.drawsEntries.filter(function(de){
                return de.DrawId == draw.DrawId;
            })[0];
            if (drawEntry) {
                var ticketsInDraw = drawEntry.TicketsAmount;
            }
            //console.log(drawEntry);
            li.innerHTML = '<div class="dg-o-w-draw">' +
                                '<div class="dg-o-w-draw-image-holder">' +
                                    '<img src="' + draw.Prize.ImageUrl + '" />' +
                                '</div>' +
                                '<div class="dg-o-w-draw-text">' +
                                    //'<h2>' + draw.Prize.Title + '</h2>' +
                                    '<h2 class="dg-o-w-draw-countdown">' + '&nbsp;' + '</h2>' +
                                    '<p>' + draw.Prize.Description + '</p>' +
                                '</div>' +
                            ((drawEntry != undefined) ?
                                '<div class="dg-o-w-draw-bet">You\'ve bet: <span>' + ticketsInDraw + '</span> points</div>' :
                            '') +
                                //'<div class="dg-o-w-draw-connections"><span>2</span> of your friends</div>' +
                            '</div>';
            if (!DGW.helpers.drawsTimer.push({dt:draw.EndDate, elem:li.querySelector('.dg-o-w-draw-countdown')})) {
                DGW.helpers.addClass(li, 'expired');
                li.querySelector('.dg-o-w-draw-countdown').innerHTML = 'Finished ' + String(moment(new Date(draw.EndDate)).fromNow());
            } else {
                DGW.global.activeDrawsExist = true;
            }
            if (drawEntry && drawEntry.IsWinner) {
                DGW.helpers.addClass(li, 'winner');
                if (drawEntry.NeedToClaimPrize) {
                    DGW.helpers.addClass(li, 'claim-prize');
                }
            }
            li.addEventListener('click', function(){
                DGW.main.methods.singleDrawConstructor(draw.DrawId);
            });
            drawsList.appendChild(li);
        });

        if (DGW.global.activeDrawsExist) {
            DGW.helpers.removeClass(DGW.main.elements.widgetBody, 'no-active-draws');
            DGW.helpers.removeClass(DGW.main.elements.widgetBody, 'no-in-current-draws');
        } else {
            if (_context && _context == 'my-draws') {
                DGW.helpers.addClass(DGW.main.elements.widgetBody, 'no-in-current-draws');
            } else {
                DGW.helpers.addClass(DGW.main.elements.widgetBody, 'no-active-draws');
            }
        }
    }

    DGW.main.methods.setRewardedActions();
};

DGW.main.methods.singleDrawConstructor = function(drawId){

    var draw = DGW.main.cache.drawsList.filter(function(draws){
        return draws.DrawId === drawId;
    })[0];
    var drawEntry = DGW.main.cache.drawsEntries.filter(function(draws){
        return draws.DrawId === drawId;
    })[0];

    var el = DGW.main.elements.pages.singleDraw;
    var prizeSect = '<div class="dg-o-w-draw-left-side">' +
                        '<div class="prize-image"><div><img src="' + draw.Prize.ImageUrl + '" /></div></div>' +
                    '</div>';
    var shareSect = '<div class="dg-o-w-draw-share">' +
                        '<a href="#" class="dg-o-w-like dg-o-w-facebook-like">Share and get <span class="dg-o-w-rewarded-action" id="dg-o-w-facebook-like-reward">10</span> points</a>' +
                        '<a href="#" class="dg-o-w-like dg-o-w-twitter-like">Tweet and get <span class="dg-o-w-rewarded-action" id="dg-o-w-tweeter-like-reward">10</span> points</a>' +
                    '</div>';
    var submenu = '<div class="dg-o-w-submenu">' +
                        '<ul><li class="dg-o-w-back-draws">&lt; Back</li></ul><div class="right-side">' +
        (!(drawEntry != undefined && drawEntry.IsWinner) ? /*'Minimum bet is 10'*/ '' : 'You\'ve spent ' + drawEntry.TicketsAmount + ' points and won!') +
                            '</div>' +
                    '</div>';

    // Cleaning viewport from other sections
    if (DGW.main.elements.widgetContent.children.length > 0) {
        DGW.main.elements.widgetContent.removeChild(DGW.main.elements.widgetContent.childNodes[0]);
    }

    el.innerHTML =  submenu +
                    '<div class="dg-o-w-section-content">' +
                        '<div class="dg-o-w-single-draw">' +
                                prizeSect +
                            '<div class="dg-o-w-draw-right-side">' +
                                '<h2 class="dg-o-w-countdown">&nbsp;</h2>' +
                                '<h5>' + draw.Prize.Title + '</h5>' +
                                '<p>' + draw.Prize.Description + '</p>' +
                                '<div class="dg-o-w-draw-bet-info dg-o-w-draw-auth-show">' +
                                    '<div class="dg-o-w-your-bet">You\'ve bet <span>' + ((drawEntry) ? drawEntry.TicketsAmount : 0 ) + '</span> points</div>' +
                                    '<div class="dg-o-w-users-done">' +
                                        '<div>' +
                                            '<img src="http://lorempixel.com/70/70/people/1" />' +
                                            '<img src="http://lorempixel.com/70/70/people/2" />' +
                                            '<img src="http://lorempixel.com/70/70/people/3" />' +
                                        '</div>' +
                                        '<p>10 users have done this</p>' +
                                    '</div>' +
                                '</div>' +
                                ((moment(draw.EndDate).diff() > 0) ? '<h2 class="dg-o-w-draw-login-show">Please, log in to bet</h2>' : '') +
                                '<div class="dg-o-w-draw-bet-action dg-o-w-draw-auth-show">' +
                                    '<h5>How much do you want to bet?</h5>' +
                                    '<form id="bet-form" class="dg-o-w-one-field-form">' +
                                        '<input type="number" min="1" max="1000" placeholder="50"/>' +
                                        '<input type="submit" value="Bet points" />' +
                                        '<p class="dg-o-w-form-message">something has happened</p>' +
                                    '</form>' +
                                    '<div class="btn-dg-o-w-outline">Get additional points</div>' +
                                '</div>' +
                                    ((draw.Winner !== null) ?
                                        '<div class="dg-o-w-draw-winner"><img src="' + (draw.Winner.ImageUrl || DGW.helpers.checkImagesForSrc()) + '" /><h4>' + draw.Winner.UserName + ' has won this draw. Our congratulations!</h4></div>' :
                                    '') +
                                shareSect +
                            '</div>' +
                        '</div>' +
                    '</div>';

    if (drawEntry && drawEntry.IsWinner) {
        if (drawEntry.NeedToClaimPrize == true) {
            el.innerHTML = submenu +
            '<div class="dg-o-w-section-content">' +
                '<div class="dg-o-w-single-draw">' +
                    prizeSect +
                    '<div class="dg-o-w-draw-right-side won">' +
                        '<h2>Congrats, you\'ve won!!!</h2>' +
                        '<h5>' + draw.Prize.Title + '</h5>' +
                        '<p>' + draw.Prize.Description + '</p>' +
                    '<div>' +
                    '<h2 class="show-claimed">You\'ve already claimed your prize!</h2>' +
                    '<h5 class="hide-claimed">Put your address to get the prize</h5>' +
                    '<form id="claim-prize" class="dg-o-w-form hide-claimed">' +
                        //'<select><option disabled>Select your country</option><option>UK</option><option>Ireland</option></select>' +
                        '<input type="text" placeholder="Address line 1" />' +
                        '<input type="text" placeholder="Address line 2" />' +
                        '<input type="text" placeholder="County" />' +
                        '<input type="text" placeholder="Postcode" />' +
                        '<input type="submit" value="Submit " />' +
                        '<p class="dg-o-w-form-message">something has happened</p>' +
                    '</form>' +
                '</div>' +
                shareSect +
            '</div>' +
        '</div>' +
    '</div>';
        } else {
            el.innerHTML = submenu +
            '<div class="dg-o-w-section-content">' +
                '<div class="dg-o-w-single-draw">' +
                    prizeSect +
                    '<div class="dg-o-w-draw-right-side won">' +
                    '<h2>Congrats, you\'ve won!!!</h2>' +
                    '<h5>' + draw.Prize.Title + '</h5>' +
                    '<p>' + draw.Prize.Description + '</p>' +
                    '<div>' +
                        '<h2>You\'ve already claimed your prize!</h2>' +
                    '</div>' +
                    shareSect +
                    '</div>' +
                '</div>' +
            '</div>';
        }
    }

    el.querySelector('.dg-o-w-submenu li.dg-o-w-back-draws').addEventListener('click', function(){
        DGW.main.methods.changeMainState('draws');
    });

    if (el.querySelector('#bet-form')) {
        el.querySelector('#bet-form').addEventListener('submit', function (ev) {
            ev.preventDefault();
            var pointsToBet = +this.querySelector('input[type=number]').value;

            if (pointsToBet > 0) {
                DGW.global.api.requests.drawBet(drawId, pointsToBet);
            } else {

            }
        });
    }
    if (el.querySelector('#claim-prize')) {
        el.querySelector('#claim-prize').addEventListener('submit', function(ev){
            ev.preventDefault();
            var that = this;
            var address = '';

            Array.prototype.slice.call(that.querySelectorAll('input:not([type=submit])')).forEach(function(field){
                address += (field.placeholder + ': ');
                address += field.value;
                address += '; ';
            });

            console.log(address);

            if (address != '') {
                DGW.global.api.requests.claimPrize(drawId, address, el.querySelector('.dg-o-w-single-draw'));
            }
        });
    }


    if (!DGW.helpers.drawsTimer.push({dt:draw.EndDate, elem:el.querySelector('.dg-o-w-countdown')})) {
        DGW.helpers.addClass(el.querySelector('.dg-o-w-single-draw'), 'expired');
        if (el.querySelector('.dg-o-w-countdown')) {
            el.querySelector('.dg-o-w-countdown').innerHTML = 'Finished ' + String(moment(new Date(draw.EndDate)).fromNow());
        }
    }

    DGW.main.elements.widgetContent.appendChild(el);
    DGW.main.methods.checkSectionHeight();
    DGW.main.methods.setRewardedActions();
};


DGW.main.methods.activitiesConstructor = function(activities){
    activities.sort(function(a, b){
        return new Date(b.Date) - new Date(a.Date);
    });
    var activitiesHolder = DGW.main.elements.pages.activitiesMain.querySelector('.dg-o-w-activities-holder ul');
    activitiesHolder.innerHTML = '';

    activities.forEach(function(activity){
        var ownStats = false;
        if (!activity.User) {
            ownStats = true;
            activity.User = {
                //UserName: DGW.global.userStats.name,
                UserName: 'You',
                ImageUrl: DGW.global.userStats.imageUrl
            }
        }
        var li = document.createElement('li');
        var message = '';
        message += activity.User.UserName;
        message += (ownStats !== true) ? ' has ' : ' have ';
        message += '<span>';
        message += (activity.Direction === 'Outflow') ? 'spent ' : 'earned ';
        message += activity.PointsAmount;
        message += '</span>';
        message += ' points';

        if (activity.ActivityType === 'GamePurchase') {
            if (activity.GameOrder.GameType === 'Draw') {
                message += ' playing the draw';
                message += (' to win ' + activity.GameOrder.PrizeTitle);
            }
        }

        if (activity.ActivityType === 'RewardedActionReward') {
            switch (activity.RewardedAction.Type) {
                case 'UserRegister':
                    message += ' for joining our rewarded program';
                    break;
                case 'FacebookConnect':
                    message += ' for connecting with Facebook';
                    break;
                case 'FriendSignUp':
                    message += ' inviting a friend to our rewarding program';
                    break;
                case 'ConnectNewApp':
                    message += ' connecting another app';
                    break;
                case 'FacebookShare':
                    message += ' shouting out about us on Facebook';
                    break;
                case 'TwitterShare':
                    message += ' tweeting about us';
                    break;
                case 'CommissionConfirmed':
                    message += ' for making a great purchase';
                    break;
                default:
            }
        }

        if (activity.ActivityType === 'OfferActionReward') {
            if (activity.OfferAction.Type.Group.Name === 'Share') {
                switch (activity.OfferAction.Type.Name) {
                    case 'FacebookShare':
                        message += ' finishing Facebook share offer';
                        break;
                    case 'TwitterShare':
                        message += ' finishing Twitter share offer';
                }
            } else if (activity.OfferAction.Type.Group.Name === 'Watch') {
                message += ' watching a video';
            } else if (activity.OfferAction.Type.Group.Name === 'Discover') {
                message += ' downloading an app';
            }
        }


        if (activity.ActivityType === 'BadgeReward') {
            message += ' getting a shiny new badge "' + activity.BadgeReward.Title + '"';
        }

        li.innerHTML =
            '<div class="dg-o-w-single-activity">' +
                '<img src="' + DGW.helpers.checkImagesForSrc(activity.User.ImageUrl) + '" alt=""/>' +
                '<div class="dg-o-w-activity-message-holder">' +
                    '<p>' + message + '</p>' +
                '</div>' +
            '</div>' +
            '<h6>' + moment(new Date(activity.Date)).fromNow() + '</h6>';
        if (activity.Direction === 'Outflow') {
            DGW.helpers.addClass(li, 'spent');
        }

        activitiesHolder.appendChild(li);
    });
    DGW.main.methods.setRewardedActions();
};

DGW.main.methods.offersConstructor = function(offers) {
    var offersHolder = DGW.main.elements.pages.earnMain.querySelector('.dg-o-w-list-offers'),
        offersSubmenu = DGW.main.elements.pages.earnMain.querySelector('.dg-o-w-submenu ul'),
        offersSponsors = DGW.main.elements.pages.earnMain.querySelector('.dg-o-w-submenu select'),
        pointsSum = DGW.main.elements.pages.earnMain.querySelector('.dg-o-w-section-content h3 span');
    var lists = {
        offers: offers.Offers,
        sponsors: [],
        categories: []
    };

    pointsSum.innerHTML = offers.TotalPointsReward;
    offersSubmenu.innerHTML = '';
    offersSponsors.innerHTML = '';

    lists.categories.push('All');

    offers.Offers.forEach(function(offer){
        if (lists.sponsors.filter(function(sponsor){return sponsor.Name === offer.Sponsor.Name;}).length == 0) {
            lists.sponsors.push(offer.Sponsor);
        }
        if (lists.categories.filter(function(category){return category === offer.Type.Group.Name;}).length == 0) {
            lists.categories.push(offer.Type.Group.Name);
        }
    });

    lists.sponsors.forEach(function(sponsor){
        var option = document.createElement('option');
        option.innerHTML = sponsor.Name;
        option.value = sponsor.Name.toLowerCase();

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

            if (category.toLowerCase() == 'all') {
                showOffersPanels(lists.offers);
            } else {
                var filteredOffers = lists.offers.filter(function (offer) {
                    return offer.Type.Group.Name.toLowerCase() == category.toLowerCase();
                });
                showOffersPanels(filteredOffers);
            }
        });
        if (category.toLowerCase() == 'all') {DGW.helpers.addClass(li, 'dg-o-w-active')}
        offersSubmenu.appendChild(li);
    });

    if (lists.sponsors.length > 1) {
        offersSponsors.addEventListener('change', function () {
            var that = this;
            var filteredOffers = lists.offers.filter(function (offer) {
                return offer.Sponsor.Name.toLowerCase() == that.value;
            });
            showOffersPanels(filteredOffers);
        });
    } else {
        offersSponsors.style.display = 'none';
    }

    function showOffersPanels(filteredOffers) {
        offersHolder.innerHTML = '';

        filteredOffers.forEach(function (offer) {
            var li = document.createElement('li');

            li.innerHTML =
                '<div class="dg-o-w-offer">' +
                    '<div class="dg-o-w-offer-left">' +
                        '<img src="' + (offer.ImageUrl || 'http://lorempixel.com/100/100/sports') + '" />' +
                        '<span>' + offer.PointsReward + '</span>' +
                    '</div>' +
                    '<div class="dg-o-w-offer-right">' +
                        '<h4>' + offer.Title + '</h4>' +
                        '<h5>' + offer.Description + '</h5>' +
                        '<div class="dg-o-w-users-done">' +
                            '<div>' +
                                '<img src="http://lorempixel.com/70/70/people/1" />' +
                                '<img src="http://lorempixel.com/70/70/people/2" />' +
                                '<img src="http://lorempixel.com/70/70/people/3" />' +
                            '</div>' +
                            '<p>10 users have done this</p>' +
                        '</div>' +
                    '</div>' +
                '</div>';

                li.addEventListener('click', function(){
                    if (DGW.global.authorized) {
                        if (offer.Type.Name == 'FacebookShare') {
                            DGW.global.api.requests.shareOfferFb(offer.Id);
                        } else if (offer.Type.Name == 'TwitterShare'){
                            DGW.global.api.requests.shareOfferTw(offer.Id, offer.CustomData);
                        }

                    } else {
                        DGW.main.methods.changeMainState('profile');
                    }
                });
            offersHolder.appendChild(li);
        });
    }

    showOffersPanels(lists.offers);
    DGW.main.methods.setRewardedActions();
};

DGW.main.methods.leaderboardConstructor = function(earners) {
    var s = DGW.main.elements.pages.activitiesMain;
    var ul = s.querySelector('.dg-o-w-activity-slider ul');

    ul.innerHTML = '';
    earners.forEach(function(earner){
        var li = document.createElement('li');
        li.innerHTML = '<div><img src="' + earner.ImageUrl +'"><span>' + earner.Amount + '</span></div><h4>' + earner.UserName + '</h4>';

        ul.appendChild(li);
    });

    DGW.global.elements.leaderboardSlider = new Slider(ul.parentNode, {
        visibles: 5,
        controlNext: '.dg-o-w-activity-slider-next',
        controlPrev: '.dg-o-w-activity-slider-prev'
    });
};

