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
        image.src = data.ImageUrl || image.src;
    });

    profileNames.forEach(function(name){
        name.innerHTML = data.UserName;
    });

    points.confirmed.forEach(function(points){
       points.innerHTML = data.Wallet.PointsConfirmed;
    });
    points.pending.forEach(function(points){
        points.innerHTML = data.Wallet.PointsPending;
    });

    credits.confirmed.forEach(function(credits){
        credits.innerHTML = data.Wallet.CreditsConfirmed;
    });
    credits.pending.forEach(function(credits){
        credits.innerHTML = data.Wallet.CreditsPending;
    });
};


DGW.main.methods.drawsConstructor = function(drawsArr){
    var drawsList = DGW.main.elements.pages.drawsMain.querySelector('.dg-o-w-list-draws');
    drawsList.innerHTML = '';
    if (drawsArr) {
        drawsArr.forEach(function (draw) {
            var li = document.createElement('li');
            li.id = draw.DrawId;
            li.setAttribute('data-end-date', draw.EndDate);
            li.innerHTML = '<div class="dg-o-w-draw">' +
                                '<img src="' + draw.Prize.ImageUrl.replace(/api/g, 'everton') + '" />' + //TODO: ask to change this server-side
                                '<div class="dg-o-w-draw-text">' +
                                    '<h2>' + draw.Prize.Title + '</h2>' +
                                    '<h2 class="dg-o-w-draw-countdown">' + '&nbsp;' + '</h2>' +
                                    '<p>' + draw.Prize.Description + '</p>' +
                                '</div>' +
                                //'<div class="dg-o-w-draw-bet">You\'ve bet: <span>130</span> points</div>' +
                                //'<div class="dg-o-w-draw-connections"><span>2</span> of your friends</div>' +
                            '</div>';
            DGW.helpers.setDrawCountdown(draw.EndDate, li.querySelector('.dg-o-w-draw-countdown'));
            drawsList.appendChild(li);
        });
        //drawsList.querySelector('li')
    }
};


