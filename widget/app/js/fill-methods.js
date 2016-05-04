DGW.main.methods.setRewardedActions = function(w, a){
    if (!w) w = DGW.main.elements.widget;
    if (!a) a = DGW.main.cache.rewardedActions;
    if (w.querySelector('.dg-o-w-rewarded-action') && a.length > 0) {
        if (w.querySelector('#dg-o-w-login-fb-reward')) {
            if (a.filter(function(action){return action.Type == 'FacebookConnect'}).length > 0)
                w.querySelector('#dg-o-w-login-fb-reward').innerHTML = a.filter(function(action){return action.Type == 'FacebookConnect'})[0].PointsReward;
        }
        if (w.querySelector('#dg-o-w-friends-sign-up-reward')) {
            if (a.filter(function(action){return action.Type == 'FriendSignUp'}).length > 0)
                w.querySelector('#dg-o-w-friends-sign-up-reward').innerHTML = a.filter(function(action){return action.Type == 'FriendSignUp'})[0].PointsReward;
        }
        if (w.querySelector('#dg-o-w-facebook-like-reward')) {
            if (a.filter(function(action){return action.Type == 'FacebookShare'}).length > 0)
                w.querySelector('#dg-o-w-facebook-like-reward').innerHTML = ' and get +' + a.filter(function(action){return action.Type == 'FacebookShare'})[0].PointsReward + ' points';
            else w.querySelector('#dg-o-w-facebook-like-reward').innerHTML = '';
        }
        if (w.querySelector('#dg-o-w-tweeter-like-reward')) {
            if (a.filter(function(action){return action.Type == 'TwitterShare'}).length > 0)
                w.querySelector('#dg-o-w-tweeter-like-reward').innerHTML = ' and get +' + a.filter(function(action){return action.Type == 'TwitterShare'})[0].PointsReward + ' points';
            else w.querySelector('#dg-o-w-tweeter-like-reward').innerHTML = '';
        }
    }
};

DGW.main.methods.profileSetData = function(data, draw) {
    var pr = DGW.main.elements.pages.profileMain;
    var wb = DGW.main.elements.widgetBody;
    var sb = DGW.side.elements.widgetBody;
    var profileImageHolders = DGW.helpers.getElementsFromAllPlaces('[data-userstats-userimage]'),
        profileNames = DGW.helpers.getElementsFromAllPlaces('[data-userstats-username]'),
        friendsNumber = pr.querySelector('#profileFriendsAmount');

    var points = {
            confirmed: DGW.helpers.getElementsFromAllPlaces('[data-userstats-points-c]'),
            pending: [pr.querySelector('.dg-o-w-profile-points h5')]
        },
        credits = {
            confirmed: DGW.helpers.getElementsFromAllPlaces('[data-userstats-credits-c]'),
            pending: [pr.querySelector('.dg-o-w-profile-credits h5')]
        };

    var fbAddText = pr.querySelector('#dg-o-w-login-fb-text');

    DGW.global.userStats.userId = data.UserId;

    profileImageHolders.forEach(function(image){
        if (image) image.src = data.ImageUrl || DGW.helpers.checkImagesForSrc(image.getAttribute('src'));
    });

    DGW.global.userStats.imageUrl = data.ImageUrl || DGW.global.userStats.imageUrl;

    profileNames.forEach(function(name){
        if (name) name.innerHTML = data.UserName;
    });

    DGW.global.userStats.name = data.UserName || DGW.global.userStats.name;
    DGW.global.userStats.facebookId = data.FacebookId;

    points.confirmed.forEach(function(point){
        if (point) point.innerHTML = data.Wallet.PointsConfirmed;
    });
    points.pending.forEach(function(point){
        if (point) point.innerHTML = data.Wallet.PointsPending;
    });

    credits.confirmed.forEach(function(credit){
        if (credit) credit.innerHTML = data.Wallet.CreditsConfirmed;
    });
    credits.pending.forEach(function(credit){
        if (credit) credit.innerHTML = data.Wallet.CreditsPending;
    });

    DGW.global.userStats.pointsC = data.Wallet.PointsConfirmed;
    DGW.global.userStats.pointsP = data.Wallet.PointsPending;
    DGW.global.userStats.creditsC = data.Wallet.CreditsConfirmed;
    DGW.global.userStats.creditsP = data.Wallet.CreditsPending;

    if (fbAddText && DGW.global.userStats.facebookId !== null) {
        fbAddText.parentNode.removeChild(fbAddText);
    }

    if (DGW.global.userStats.earnToday && pr.querySelector('#dg-o-w-profile-earn-today'))
        pr.querySelector('#dg-o-w-profile-earn-today').innerHTML = 'You can <span class="dg-o-w-color-brand">earn +' + DGW.global.userStats.earnToday + ' points</span> more';

    if (draw) {
        var betPoints = DGW.main.elements.pages.singleDraw.querySelector('[data-draw-betpoints]');
        if (betPoints) {
            betPoints.innerHTML = draw.TicketsAmount || 0;
        }
    }
};


DGW.main.methods.updateBadgesInfo = function(){
    var ba = DGW.global.userStats.badges.all,
        be = DGW.global.userStats.badges.earned;
    var pr = DGW.main.elements.pages.profileMain;
    var wc = DGW.main.elements.widgetContent;
    var ul = pr.querySelector('.dg-o-w-badges-holder ul');

    ul.innerHTML = '';
    ba.forEach(function(b){
        var li = document.createElement('li');
        li.innerHTML = '<img src="' + b.ImageUrl + '" alt=""/><p class="dg-o-w-color-brand">' + b.Title + '</p>';

        if ( be.filter(function(earned){return earned.BadgeId == b.BadgeId;}).length > 0 ) {
            //badge was earned
            DGW.helpers.addClass(li, 'dg-o-w-earned');
        }

        li.addEventListener('click', function(){
            showFullBadgePage(ba, b.BadgeId);
        });

        ul.appendChild(li);
    });

    function showFullBadgePage(badges, curBadgeId){
        var submenu = '<div class="dg-o-w-submenu"><ul><li class="dg-o-w-back-draws">&larr; Back</li></ul></div>';
        var pageContent = '<div class="dg-o-w-badge-single dg-o-w-white-section">' +
            '<ul></ul><div class="dg-o-w-badge-single-left dg-o-w-arrow dg-o-w-arrow-left"></div><div class="dg-o-w-badge-single-right dg-o-w-arrow dg-o-w-arrow-right"></div></div>';
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
            if (badge.BadgeId === curBadgeId) {
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
            wc.removeChild(page);
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

DGW.main.methods.gamesConstructor = function(){
    var gamesList = DGW.main.elements.pages.drawsMain.querySelector('.dg-o-w-list-draws');
    gamesList.innerHTML = '';
    var li = document.createElement('li');
    li.innerHTML = '<h2>Sorry, but there are currently no games</h2>';
    gamesList.appendChild(li);

    DGW.helpers.removeClass(DGW.main.elements.widgetBody, 'no-active-draws');
    DGW.helpers.removeClass(DGW.main.elements.widgetBody, 'no-in-current-draws');
};

DGW.main.methods.drawsConstructor = function(cacheObj, _context){
    var drawsList = DGW.main.elements.pages.drawsMain.querySelector('.dg-o-w-list-draws');
    drawsList.innerHTML = '';
    DGW.global.activeDrawsExist = false;
    if (cacheObj) {
        cacheObj.drawsList.forEach(function (draw) {
            var li = document.createElement('li');
            //li.id = draw.DrawId;
            //li.setAttribute('data-end-date', draw.EndDate);
            var drawEntry = cacheObj.drawsEntries.filter(function(de){
                return de.DrawId == draw.DrawId;
            })[0];
            if (drawEntry) {
                var ticketsInDraw = drawEntry.TicketsAmount;
            }
            //DGW.helpers.console.log(drawEntry);
            li.innerHTML = '<div class="dg-o-w-draw">' +
                                '<div class="dg-o-w-draw-image-holder">' +
                                    '<img src="' + draw.Prize.ImageUrl + '" />' +
                                '</div>' +
                                '<div class="dg-o-w-draw-text">' +
                                    //'<h2>' + draw.Prize.Title + '</h2>' +
                                    '<h2 class="dg-o-w-draw-countdown">' + '&nbsp;' + '</h2>' +
                                    '<p>' + draw.Prize.Description + '</p>' +
                                '</div>' +
                            ((draw.Winner) ?
                                '<div class="dg-o-w-draw-list-winner"><img src="' + draw.Winner.ImageUrl + '" /><p>' + draw.Winner.UserName + ' has won</p></div>' : '') +
                            ((drawEntry != undefined) ?
                                '<div class="dg-o-w-draw-bet ' + ((draw.Winner) ? 'dg-o-w-draw-bet-second' : '') + '"><p>You\'ve placed: <span>' + ticketsInDraw + '</span> points</p></div>' : '') +
                                //'<div class="dg-o-w-draw-connections"><span>2</span> of your friends</div>' +
                            '</div>';
            if (!DGW.helpers.drawsTimer.push({dt:draw.EndDate, elem:li.querySelector('.dg-o-w-draw-countdown')})) {
                DGW.helpers.addClass(li, 'expired');
                li.querySelector('.dg-o-w-draw-countdown').innerHTML = 'Finished ' + DGW.helpers.getDateFromNow(draw.EndDate);
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
        DGW.helpers.removeClass(DGW.main.elements.widgetBody, 'no-active-draws');
        DGW.helpers.removeClass(DGW.main.elements.widgetBody, 'no-in-current-draws');
        DGW.helpers.removeClass(DGW.main.elements.widgetBody, 'close-to-finish');
        if (DGW.global.activeDrawsExist) {
            if (_context && _context == 'close-to-finish') {
                DGW.helpers.addClass(DGW.main.elements.widgetBody, 'close-to-finish');
            }
        } else {
            if (_context && _context == 'my-draws') {
                DGW.helpers.addClass(DGW.main.elements.widgetBody, 'no-in-current-draws');
                //DGW.helpers.removeClass(DGW.main.elements.widgetBody, 'no-active-draws');
            } else if (_context && _context == 'close-to-finish') {
                DGW.helpers.addClass(DGW.main.elements.widgetBody, 'close-to-finish');
            } else {
                //DGW.helpers.removeClass(DGW.main.elements.widgetBody, 'no-in-current-draws');
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

    var drawState = 'active';

    var el = DGW.main.elements.pages.singleDraw;
    var prizeSect = '<div class="dg-o-w-draw-left-side">' +
                        '<div class="prize-image"><div><img src="' + draw.Prize.ImageUrl + '" /></div></div>' +
                    '</div>';
    var shareSect = '<div class="dg-o-w-draw-share dg-o-w-draw-auth-show">' +
                        '<a href="#" class="dg-o-w-like dg-o-w-facebook-like">Share <span class="dg-o-w-rewarded-action" id="dg-o-w-facebook-like-reward"></span></a>' +
                        '<a href="#" class="dg-o-w-like dg-o-w-twitter-like">Tweet <span class="dg-o-w-rewarded-action" id="dg-o-w-tweeter-like-reward"></span></a>' +
                    '</div>';
    var submenu = '<div class="dg-o-w-submenu">' +
                        '<ul><li class="dg-o-w-back-draws">&larr; Back</li></ul><div class="right-side">' +
        (!(drawEntry != undefined && drawEntry.IsWinner) ? /*'Minimum bet is 10'*/ '' : 'You\'ve placed ' + drawEntry.TicketsAmount + ' points and won!') +
                            '</div>' +
                    '</div>';

    var playersInDraw = document.createElement('div');
        playersInDraw.className = 'dg-o-w-users-done';


    // Cleaning viewport from other sections
    if (DGW.main.elements.widgetContent.children.length > 0) {
        DGW.main.elements.widgetContent.removeChild(DGW.main.elements.widgetContent.childNodes[0]);
    }

    if (DGW.helpers.dateDiff(draw.EndDate) <= 0) {
        DGW.helpers.console.info('isdrawn: ', draw.IsDrawn);
        // Draw is finished
        if (draw.IsDrawn == false) {
            // Draw has been finished and not drawn
            drawState = 'not-drawn';
            DGW.helpers.console.info('isdrawn: ', draw.IsDrawn);
        } else {
            // Draw has been finished and drawn
            drawState = 'drawn';
            DGW.helpers.console.info(draw.IsDrawn);
            if (draw.Winner == null) {
                // No one has participated in the draw
                drawState = 'drawn-no-players';
            }
        }
    }
    //DGW.helpers.console.log('draw state: ', drawState);
    el.innerHTML =  submenu +
                    '<div class="dg-o-w-section-content">' +
                        '<div class="dg-o-w-single-draw">' +
                                prizeSect +
                            '<div class="dg-o-w-draw-right-side">' +
                                '<h2 class="dg-o-w-countdown">&nbsp;</h2>' +
                                '<h3>' + draw.Prize.Title + '</h3>' +
                                '<p>' + draw.Prize.Description + '</p>' +
                                '<div class="dg-o-w-draw-bet-info dg-o-w-draw-auth-show">' +
                                    '<div class="dg-o-w-your-bet dg-o-w-points-bet"><p>You\'ve placed <span data-draw-betpoints>' + ((drawEntry) ? drawEntry.TicketsAmount : 0 ) + '</span> points</p></div>' +
                                    // playersInDraw +
                                '</div>' +
                                ((DGW.helpers.dateDiff(draw.EndDate) > 0) ? '<h2 class="dg-o-w-draw-login-show">Please, log in to play the draw</h2>' : '') +
                                '<div class="dg-o-w-draw-bet-action dg-o-w-draw-auth-show">' +
                                    '<h5>How much do you want to place?</h5>' +
                                    '<form id="bet-form" class="dg-o-w-one-field-form">' +
                                        '<input type="number" min="1" max="1000" placeholder="50"/>' +
                                        '<input class="btn-dg-o-w btn-dg-o-w-brand" type="submit" value="Place points" />' +
                                    '</form>' +
                                    '<div id="dg-o-w-get-points-btn" class="btn-dg-o-w btn-dg-o-w-brand-l">Get additional points</div>' +
                                '</div>' +
                                    ((draw.Winner !== null) ?
                                        '<div class="dg-o-w-draw-winner"><img src="' + (draw.Winner.ImageUrl || DGW.helpers.checkImagesForSrc()) + '" /><p>' + draw.Winner.UserName + ' has won this draw. Our congratulations!</p></div>' :
                                    '') +
                                    ((drawState == 'not-drawn') ? '<p>Winner will be announced very soon!</p>' : '') +
                                    ((drawState == 'drawn-no-players') ? '<p>Unfortunately, no one has participated in this Draw</p>' : '') +
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
                        '<h2>Congratulations, you\'ve won ' + draw.Prize.Title + '!</h2>' +
                        '<p>' + draw.Prize.Description + '</p>' +
                    '<div>' +
                    '<h2 class="show-claimed">You\'ve already claimed your prize!</h2>' +
                    '<p class="hide-claimed">Put your address to get the prize</p>' +
                    '<form id="claim-prize" class="dg-o-w-form hide-claimed">' +
                        //'<select><option disabled>Select your country</option><option>UK</option><option>Ireland</option></select>' +
                        '<input type="text" name="Address1" placeholder="Address line 1" />' +
                        '<input type="text" name="Address2" placeholder="Address line 2" />' +
                        '<input type="text" name="County" placeholder="County" />' +
                        '<input type="text" name="Postcode" placeholder="Postcode" />' +
                        '<input class="btn-dg-o-w btn-dg-o-w-brand btn-dg-o-w-large" type="submit" value="Submit " />' +
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
                    '<h3>' + draw.Prize.Title + '</h3>' +
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

    if (el.querySelector('.dg-o-w-draw-bet-info')) {
        DGW.global.api.requests.drawPlayers(drawId,
            function onSuccess(result){
                if (result.RecentPlayers.length > 0) {
                    var playerImgsHolder = document.createElement('div');
                    result.RecentPlayers.forEach(function(player, ind){
                        if (ind > 2) return;
                        var img = document.createElement('img');
                        img.src = player.ImageUrl;

                        playerImgsHolder.appendChild(img);
                    });
                    playersInDraw.appendChild(playerImgsHolder);

                    var p = document.createElement('p');
                    if (result.TotalCount == 1) {
                        p.innerHTML = '1 user has done this';
                    } else {
                        p.innerHTML = result.TotalCount + ' user has done this';
                        p.className = ((result.RecentPlayers.length == 2) ? 'dg-o-w-two-images' : 'dg-o-w-three-images');
                    }
                    playersInDraw.appendChild(p);

                    el.querySelector('.dg-o-w-draw-bet-info').appendChild(playersInDraw);
                }
            }
        );
    }

    if (el.querySelector('#dg-o-w-get-points-btn')) {
        el.querySelector('#dg-o-w-get-points-btn').addEventListener('click', function(){
            DGW.main.methods.changeMainState('earn');
        });
    }

    el.querySelector('.dg-o-w-submenu li.dg-o-w-back-draws').addEventListener('click', function(){
        DGW.main.methods.changeMainState('draws');
    });

    if (el.querySelector('#bet-form')) {
        el.querySelector('#bet-form').addEventListener('submit', function (ev) {
            ev.preventDefault();
            var that = this;
            var betBtn = that.querySelector('input[type=submit]');
            var pointsToBet = +that.querySelector('input[type=number]').value;

            DGW.global.api.requests.drawBet(drawId, pointsToBet,
                function onSuccess(result){
                    betBtn.disabled = false;
                    DGW.main.methods.notificationConstructor('We\'ve received your ' + pointsToBet + ' points. Bet more!');
                    that.querySelector('input[type=number]').value = '';
                    DGW.global.api.requests.getDrawEntries();
                    DGW.main.methods.profileSetData(result.User, result.DrawEntry);
                }, function onError(result){
                    betBtn.disabled = false;
                    DGW.main.methods.notificationConstructor(DGW.helpers.errorParser(result).messages, 'error');
                });
            betBtn.disabled = true;
        });
    }
    if (el.querySelector('#claim-prize')) {
        el.querySelector('#claim-prize').addEventListener('submit', function(ev){
            ev.preventDefault();
            var that = this;
            var address = {};

            Array.prototype.slice.call(that.querySelectorAll('input:not([type=submit])')).forEach(function(field){
                if (field.value == '' && field.name != 'Address1') field.value = '-';
                address[field.name] = field.value;
            });

            DGW.global.api.requests.claimPrize(drawId, address, function onSuccess(){
                DGW.helpers.addClass(el.querySelector('.dg-o-w-single-draw'), 'claimed');
                DGW.main.methods.notificationConstructor(['We\'ve received your address', 'And will contact you very soon!']);
            }, function onError(result){
                DGW.main.methods.notificationConstructor(DGW.helpers.errorParser(result).messages, 'error');
            });
        });
    }


    if (!DGW.helpers.drawsTimer.push({dt:draw.EndDate, elem:el.querySelector('.dg-o-w-countdown')})) {
        DGW.helpers.addClass(el.querySelector('.dg-o-w-single-draw'), 'expired');
        if (el.querySelector('.dg-o-w-countdown')) {
            el.querySelector('.dg-o-w-countdown').innerHTML = 'Finished ' + String(DGW.helpers.getDateFromNow(draw.EndDate));
        }
    }

    // Setting sharing buttons
    var isWinner = false;
    if (drawEntry && drawEntry.IsWinner) isWinner = true;

    el.querySelector('.dg-o-w-like.dg-o-w-facebook-like').addEventListener('click', function(ev){
        ev.preventDefault();
        DGW.global.actions.requests.shareFb(drawId, isWinner);
    });
    el.querySelector('.dg-o-w-like.dg-o-w-twitter-like').addEventListener('click', function(ev){
        ev.preventDefault();
        DGW.global.actions.requests.shareTw(drawId, (!isWinner) ? 'Win ' : 'I\'ve just won ' + draw.Prize.Title, isWinner);
    });

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
        message += (activity.Direction === 'Outflow') ? 'spent ' : 'earned ';
        message += '<span>';
        message += activity.PointsAmount;
        message += ' points';
        message += '</span>';


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
            '<h6>' + DGW.helpers.getDateFromNow(activity.Date) + '</h6>';
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

    //lists.categories.push('All');

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
                } else {
                    ev.preventDefault();
                    DGW.main.methods.headerLoginShow('Enter to earn points');
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

DGW.main.methods.leaderboardConstructor = function(earners) {
    var s = DGW.main.elements.pages.activitiesMain;
    var ul = s.querySelector('.dg-o-w-activity-slider ul');

    ul.innerHTML = '';
    earners.forEach(function(earner){
        var li = document.createElement('li');
        li.innerHTML = '<div><img src="' + earner.ImageUrl +'"><p>' + earner.Amount + '</p></div><p class="dg-o-w-color-brand">' + earner.UserName + '</p>';

        ul.appendChild(li);
    });

    DGW.global.elements.leaderboardSlider = new Slider(ul.parentNode, {
        visibles: 5,
        controlNext: '.dg-o-w-activity-slider-next',
        controlPrev: '.dg-o-w-activity-slider-prev'
    });
};

DGW.main.methods.notificationConstructor = function(lis, _type) {
    var ul = DGW.main.elements.pages.notificationHolder.querySelector('ul');
        ul.innerHTML = '';
    if (!_type) _type = 'success';

    if (DGW.helpers.isArray(lis)) {
        lis.forEach(function(el){
            var li = document.createElement('li');
            li.innerHTML = el;
            ul.appendChild(li);
        });
        DGW.main.methods.showNotificationBar(_type);
    } else if (typeof lis == 'string'){
        var li = document.createElement('li');
        li.innerHTML = lis;
        ul.appendChild(li);
        DGW.main.methods.showNotificationBar(_type);
    } else {
        DGW.helpers.console.warn('Notification parameters are not of the type of [Array] or String');
    }
};