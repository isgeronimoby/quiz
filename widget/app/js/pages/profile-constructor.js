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
        if (point) {
            point.innerHTML = data.Wallet.PointsConfirmed;
        }
    });
    points.pending.forEach(function(point){
        if (point) point.innerHTML = data.Wallet.PointsPending;
    });

    credits.confirmed.forEach(function(credit){
        if (credit) {
            if (credit.getAttribute('data-round'))
                credit.innerHTML = data.Wallet.CreditsConfirmed.toFixed(credit.getAttribute('data-round'));
            else credit.innerHTML = data.Wallet.CreditsConfirmed;
        }
    });
    credits.pending.forEach(function(credit){
        if (credit) credit.innerHTML = data.Wallet.CreditsPending;
    });

    DGW.global.userStats.pointsC = data.Wallet.PointsConfirmed;
    DGW.global.userStats.pointsP = data.Wallet.PointsPending;
    DGW.global.userStats.creditsC = data.Wallet.CreditsConfirmed;
    DGW.global.userStats.creditsP = data.Wallet.CreditsPending;

    /*if (fbAddText && DGW.global.userStats.facebookId !== null) {
        fbAddText.parentNode.removeChild(fbAddText);
    }*/

    if (fbAddText) {
        if (DGW.global.userStats.facebookId !== null) {
            fbAddText.style.display = 'none';
        } else {
            fbAddText.style.display = 'block';
        }
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