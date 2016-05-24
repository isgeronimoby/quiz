DGW.main.methods.drawsConstructor = function(cacheObj, _context){
    var dp = DGW.main.elements.pages.drawsMain;
    var dpCont = dp.querySelector('.dg-o-w-section-content');
    var drawsList = dp.querySelector('.dg-o-w-list-draws');
    drawsList.innerHTML = '';
    DGW.global.activeDrawsExist = false;
    var showExpiredDraws = DGW.main.settings.draws.showExpired;
    var draws = [];

    var emptyMessage = '';
    var emptyMessageEl = document.createElement('div');
    DGW.helpers.addClass(emptyMessageEl, 'dg-o-w-draws-empty');

    if (dpCont.children.length > 1) dpCont.removeChild(dpCont.childNodes[1]);


    function filterDrawsByChkBox(showActiveOnly){
        if (!showExpiredDraws || showActiveOnly) {
            draws = cacheObj.drawsList.filter(function (draw) {
                return !DGW.helpers.drawIsFinished(draw);
            });
        } else {
            draws = cacheObj.drawsList;
        }
    }

    if (cacheObj) {
        if (!_context || _context == 'my-draws') filterDrawsByChkBox();
        else filterDrawsByChkBox(true);

        if (draws.length == 0) {
            if (!_context) {
                emptyMessage = 'Sorry, but there are no draws running at the moment.';
            } else {
                if (_context == 'close-to-finish') {
                    emptyMessage = 'Sorry, but seems like there are no draws that will be completed soon.';
                }
                if (_context == 'my-draws') {
                    emptyMessage = 'Hey, seems like you are not taking a part in any of running draws';
                }
            }
            emptyMessageEl.innerHTML = '<h2>' + emptyMessage + '</h2><br/><div class="dg-o-w-draws-refresh"></div>';
            emptyMessageEl.querySelector('.dg-o-w-draws-refresh').addEventListener('click', function(){
                DGW.global.api.requests.getDraws(function(){
                    if (DGW.global.authorized) {
                        DGW.global.api.requests.getDrawEntries(function(){
                            DGW.main.methods.changeDrawsSubmenu(DGW.main.settings.draws.currentSubMenu);
                        });
                    } else {
                        DGW.main.methods.changeDrawsSubmenu(DGW.main.settings.draws.currentSubMenu);
                    }
                });
            });

            dpCont.appendChild(emptyMessageEl);
        }


        draws.forEach(function (draw) {

            var li = document.createElement('li');
            var drawEntry = cacheObj.drawsEntries.filter(function (de) {
                    return de.DrawId == draw.DrawId;
                })[0] || null;
            var winnerExist = draw.Winner;
            var isWinner = (drawEntry) ? drawEntry.IsWinner : false;
            var winnerHtml = '',
                winnerInnerText = '',
                drawEntryHtml = '',
                countdownHtml = '&nbsp;';
            var activeDraw = false;

            if (drawEntry) {
                var ticketsInDraw = drawEntry.TicketsAmount;
                var secondLineClass = (winnerExist ? ' dg-o-w-draw-bet-second' : '');
                drawEntryHtml = '<div class="dg-o-w-draw-bet' + secondLineClass + '"><p>You\'ve placed: <span>' + ticketsInDraw + '</span> points</p></div>';
                if (drawEntry.IsWinner) {
                    DGW.helpers.addClass(li, 'winner');
                    if (drawEntry.NeedToClaimPrize) {
                        DGW.helpers.addClass(li, 'claim-prize');
                    }
                }
            }

            if (winnerExist) {
                winnerInnerText = (isWinner === true) ? ('You\'ve won this draw!') : (draw.Winner.UserName + ' has won');
                winnerHtml = '<div class="dg-o-w-draw-list-winner"><img src="' + draw.Winner.ImageUrl + '" />' +
                '<p>' + winnerInnerText + '</p></div>';
            }

            if (DGW.helpers.drawIsFinished(draw)) {
                DGW.helpers.addClass(li, 'expired');
                countdownHtml = 'Finished ' + DGW.helpers.getDateFromNow(draw.EndDate);
            } else {
                activeDraw = true;
            }

            li.innerHTML = '<div class="dg-o-w-draw">' +
            '<div class="dg-o-w-draw-image-holder">' +
            '<img src="' + draw.Prize.ImageUrl + '" />' +
            '</div>' +
            '<div class="dg-o-w-draw-text">' +
            '<h2 class="dg-o-w-draw-countdown">' + countdownHtml + '</h2>' +
            '<p>' + draw.Prize.Description + '</p>' +
            '</div>' +
            winnerHtml + drawEntryHtml +
            '</div>';

            if (activeDraw) DGW.helpers.drawsTimer.push({
                dt: draw.EndDate,
                elem: li.querySelector('.dg-o-w-draw-countdown')
            });

            li.addEventListener('click', function() {
                if (DGW.global.authorized || !activeDraw) DGW.main.methods.singleDrawConstructor(draw.DrawId);
                else DGW.main.methods.headerLoginShow('Please, enter to play the draw');
            });

            drawsList.appendChild(li);
        });
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
    var shareSect = '<div class="dg-o-w-draw-share dg-o-w-draw-auth-show">' +
        '<a href="#" class="dg-o-w-like dg-o-w-facebook-like">Share <span class="dg-o-w-rewarded-action" id="dg-o-w-facebook-like-reward"></span></a>' +
        '<a href="#" class="dg-o-w-like dg-o-w-twitter-like">Tweet <span class="dg-o-w-rewarded-action" id="dg-o-w-tweeter-like-reward"></span></a>' +
        '</div>';
    var submenu = '<div class="dg-o-w-submenu">' +
        '<ul><li class="dg-o-w-back-draws">&larr; Back</li></ul><div class="right-side">' +
        (!(drawEntry != undefined && drawEntry.IsWinner) ? /*'Minimum bet is 10'*/ '' : 'You\'ve placed ' + drawEntry.TicketsAmount + ' points and won!') +
        '</div>' +
        '</div>';
    var drawnState = '';

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
            drawnState = '<p>Winner will be announced very soon!</p>';
            DGW.helpers.console.info('isdrawn: ', draw.IsDrawn);
        } else {
            // Draw has been finished and drawn
            DGW.helpers.console.info(draw.IsDrawn);
            if (draw.Winner == null) {
                // No one has participated in the draw
                drawnState = '<p>Unfortunately, no one has participated in this Draw</p>';
            } else {
                drawnState = '<div class="dg-o-w-draw-winner"><img src="' + (draw.Winner.ImageUrl || DGW.helpers.checkImagesForSrc()) + '" />' +
                '<p>' + draw.Winner.UserName + ' has won this draw. Our congratulations!</p></div>';
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
    '</div>' +
    ((DGW.helpers.dateDiff(draw.EndDate) > 0) ? '<h2 class="dg-o-w-draw-login-show">Please, log in to play the draw</h2>' : '') +
    '<div class="dg-o-w-draw-bet-action dg-o-w-draw-auth-show">' +
    '<h4>How much do you want to place?</h4>' +
    '<form id="bet-form" class="dg-o-w-one-field-form">' +
    '<input type="number" min="1" max="1000" placeholder="50"/>' +
    '<input class="btn-dg-o-w btn-dg-o-w-brand" type="submit" value="Place points" />' +
    '</form>' +
    '<div id="dg-o-w-get-points-btn" class="btn-dg-o-w btn-dg-o-w-brand-l">Get additional points</div>' +
    '</div>' +
    drawnState +
    shareSect +
    '</div>' +
    '</div>' +
    '</div>';

    if (drawEntry && drawEntry.IsWinner) {
        var claimPrizeHtml = '';
        if (drawEntry.NeedToClaimPrize == true) {
            claimPrizeHtml ='<p class="hide-claimed">Put your address to get the prize</p>' +
            '<form id="claim-prize" class="dg-o-w-form hide-claimed">' +
            '<input type="text" name="Address1" placeholder="Address line 1" />' +
            '<input type="text" name="Address2" placeholder="Address line 2" />' +
            '<input type="text" name="County" placeholder="County" />' +
            '<input type="text" name="Postcode" placeholder="Postcode" />' +
            '<input class="btn-dg-o-w btn-dg-o-w-brand btn-dg-o-w-large" type="submit" value="Submit " />' +
            '</form>';
        } else {
            claimPrizeHtml ='<h2>You\'ve already claimed your prize!</h2>';
        }
        el.innerHTML = submenu +
        '<div class="dg-o-w-section-content">' +
        '<div class="dg-o-w-single-draw">' +
        prizeSect +
        '<div class="dg-o-w-draw-right-side won">' +
        '<h2>Congrats, you\'ve won!!!</h2>' +
        '<h3>' + draw.Prize.Title + '</h3>' +
        '<p>' + draw.Prize.Description + '</p>' +
        '<div>' + claimPrizeHtml + '</div>' +
        shareSect +
        '</div>' +
        '</div>' +
        '</div>';
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

                    DGW.main.cache.drawsEntries.forEach(function(de){
                        if (de.DrawId == result.DrawEntry.DrawId) de.TicketsAmount = result.DrawEntry.TicketsAmount;
                    });
                    DGW.main.methods.changeDrawsSubmenu(DGW.main.settings.draws.currentSubMenu);

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