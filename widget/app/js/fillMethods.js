DGW.global.methods.profileSetData = function(data) {
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

    profileNames.forEach(function(name){
        name.innerHTML = data.UserName;
    });

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

    if (betPoints) {
        betPoints.innerHTML = draw.TicketsAmount || 0;
    } else {

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
                li.querySelector('.dg-o-w-draw-countdown').innerHTML = 'Finished ' + String(moment(draw.EndDate).fromNow());
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
                        '<div class="prize-image"><div><img src="' + draw.Prize.ImageUrl.replace(/api/g, 'everton') + '" /></div></div>' +
                    '</div>';
    var shareSect = '<div class="dg-o-w-draw-share">' +
                        '<a href="#" class="dg-o-w-like dg-o-w-facebook-like">Like and get 10 points</a>' +
                        '<a href="#" class="dg-o-w-like dg-o-w-twitter-like">Tweet and get 10 points</a>' +
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
            el.querySelector('.dg-o-w-countdown').innerHTML = 'Finished ' + String(moment(draw.EndDate).fromNow());
        }
    }

    DGW.main.elements.widgetContent.appendChild(el);
    DGW.main.methods.checkSectionHeight();
};
