DGW.main.methods.checkSectionHeight = function() {
    var section = DGW.main.elements.widgetBody.querySelector('.dg-o-w-section');
    var sectionContent = DGW.main.elements.widgetBody.querySelector('.dg-o-w-section-content');

    if ( section.querySelector('.dg-o-w-submenu') ) {
        DGW.helpers.addClass(sectionContent, 'dg-o-w-submenu-only');
        DGW.helpers.removeClass(sectionContent, 'dg-o-w-submenu-activities');
        if ( section.querySelector('.dg-o-w-activity-slider-holder') && !DGW.helpers.hasClass(section.querySelector('.dg-o-w-activities'), 'collapsed') ) {
            DGW.helpers.addClass(sectionContent, 'dg-o-w-submenu-activities');
            DGW.helpers.removeClass(sectionContent, 'dg-o-w-submenu-only');
        }
    }
};

DGW.main.methods.changeMainState = function(state){

    // Sending analytics
    // * * * * * *

    if (!DGW.global.authorized && state === 'profile') {
        ga(DGW.global.gaSend, 'pageview', 'landing');
    } else {
        ga(DGW.global.gaSend, 'pageview', state);
    }

    // * * * * * *
    // End of analytics

    for (var item in DGW.main.elements.menuItems) {
        DGW.helpers.removeClass(DGW.main.elements.menuItems[item], 'dg-o-w-active');
    }
    DGW.helpers.removeClass(DGW.main.elements.menuItems['profile'].parentNode.parentNode, 'dg-o-w-active');

    if (state === 'profile') {
        DGW.helpers.addClass(DGW.main.elements.menuItems['profile'].parentNode.parentNode, 'dg-o-w-active');
    } else {
        DGW.helpers.addClass(DGW.main.elements.menuItems[state], 'dg-o-w-active');
    }

    if (DGW.main.elements.widgetContent.children.length > 0) {
        Array.prototype.slice.call(DGW.main.elements.widgetContent.children).forEach(function(ch){
            DGW.main.elements.widgetContent.removeChild(ch);
        });
    }

    if (DGW.main.currentState !== 'draws') {
        DGW.helpers.drawsTimer.setDraws([]);
    }
    DGW.helpers.removeClass(DGW.main.elements.widgetBody, 'profile-anon');
    switch (state) {
        case 'earn':
            if (DGW.global.authorized) {
                DGW.global.api.requests.getUserOffers(function(response){
                    DGW.main.methods.offersConstructor(response);
                    DGW.global.userStats.earnToday = response.TotalPointsReward;
                });
            } else {
                DGW.global.api.requests.getOffers(function(response){
                    DGW.main.methods.offersConstructor(response);
                });
            }
            DGW.main.elements.widgetContent.appendChild(DGW.main.elements.pages.earnMain);
            break;
        case 'draws':
            //TODO: work on this further
            if (DGW.main.currentState !== 'draws') {
                DGW.global.api.requests.getDraws(function(){
                    if (DGW.global.authorized) {
                        DGW.global.api.requests.getDrawEntries(function(){
                            DGW.main.methods.changeDrawsSubmenu(DGW.main.settings.draws.currentSubMenu);
                        });
                    } else {
                        DGW.main.methods.changeDrawsSubmenu(DGW.main.settings.draws.currentSubMenu);
                    }
                });
                DGW.main.methods.drawSubmenuReset();
            }
            DGW.main.elements.widgetContent.appendChild(DGW.main.elements.pages.drawsMain);
            break;
        case 'activities':
            if (DGW.main.elements.pages.activitiesMain.querySelector('#dg-o-w-activities-filter').value === 'all-activities') {
                DGW.global.api.requests.getAllActivities(function(response){
                    DGW.main.methods.activitiesConstructor(response.Activities);
                });
            } else {
                DGW.global.api.requests.getUserActivities(function(response){
                    DGW.main.methods.activitiesConstructor(response.Activities);
                });
            }
            DGW.global.api.requests.getLeaderboard(function(response){
                DGW.main.methods.leaderboardConstructor(response.Earners);
            });
            DGW.main.elements.widgetContent.appendChild(DGW.main.elements.pages.activitiesMain);
            break;
        case 'profile':
            if ( DGW.global.authorized ) {
                DGW.main.elements.widgetContent.appendChild(DGW.main.elements.pages.profileMain);
                DGW.global.api.requests.getUser();
                DGW.global.api.requests.getAllBadges(function(response){
                    DGW.global.userStats.badges.all = response.Badges;
                    DGW.global.api.requests.getEarnedBadges(function(response){
                        DGW.global.userStats.badges.earned = response.EarnedBadges;
                        DGW.main.methods.updateBadgesInfo();
                    });
                });
            } else {
                DGW.helpers.addClass(DGW.main.elements.widgetBody, 'profile-anon');
                DGW.main.elements.widgetContent.appendChild(DGW.main.elements.pages.loginMain);
            }
            break;
        case 'friends':
            DGW.main.elements.widgetContent.appendChild(DGW.main.elements.pages.friendsMain);
            DGW.global.api.requests.usersGet(function(response){
                DGW.main.cache.userRelations.users = response.Users;
                DGW.main.cache.userRelations.count = response.UsersCount;
                DGW.main.methods.usersConstructor(
                    Array.prototype.slice.call(DGW.main.elements.pages.friendsMain.querySelectorAll('[data-submenu]')).filter(function(el){
                        return DGW.helpers.hasClass(el, 'dg-o-w-active');
                    })[0].getAttribute('data-submenu')
                );
            });
            break;
        default:

    }

    DGW.helpers.hideFramedSrc();

    DGW.main.methods.hideNotificationBar();

    DGW.main.currentState = state;
    DGW.main.methods.setRewardedActions();
    DGW.main.methods.checkSectionHeight();
};

DGW.main.methods.initEvents = function () {
    DGW.main.methods.fillDefaultValues();

// Login header
    // handling close button
    DGW.main.elements.widget.querySelector('.dg-o-w-close').addEventListener('click', DGW.main.methods.hideWidget);

    // main widget, main menu clicks
    for (var item in DGW.main.elements.menuItems) {
        DGW.main.elements.menuItems[item].addEventListener('click', function(item){
            return function(){
                if (item == 'profileRegistered') item = 'profile';
                DGW.main.methods.changeMainState(item);
            };
        }(item));
    }

//Login page and form
    DGW.main.methods.loginInit();
//Activities page
    DGW.main.methods.activitiesInit();
//Draws page clicks
    DGW.main.methods.drawsInit();
//Profile page clicks
    DGW.main.methods.profileInit();

//Widget internal links
    DGW.helpers.openDataLinks(Array.prototype.slice.call(DGW.main.elements.widgetBody.querySelectorAll('[data-link]')));
};

DGW.main.methods.resetStates = function(){
    DGW.main.elements.widgetBody.querySelector('.dg-o-w-menu-profile .profile-menu-item img').src = DGW.helpers.checkImagesForSrc();
    DGW.main.elements.pages.activitiesMain.querySelector('#dg-o-w-activities-filter').value = 'all-activities';
    DGW.helpers.removeClass(DGW.main.elements.loginFooter, 'email-sign-up');
    DGW.helpers.removeClass(DGW.main.elements.loginFooter, 'password');
    DGW.main.methods.headerLoginHide();
    DGW.main.methods.fillDefaultValues();

    // clearing private cache
    DGW.main.cache.drawsEntries = [];
};

DGW.main.methods.fillDefaultValues = function(){

    var hiddenDrawsChkBox = DGW.main.elements.pages.drawsMain.querySelector('#dg-o-w-show-expired');
    var getWinnerInterval = setInterval(function(){
        if (DGW.global.cache.last.prize) {
            var l = DGW.main.elements.pages.loginMain.querySelector('#dg-o-w-login-prize-title');
            if (l) l.innerHTML = 'Today you can win ' + DGW.global.cache.last.prize.Title;
            clearInterval(getWinnerInterval);
        }
    }, 50);

    if (DGW.main.settings.draws.showExpired) {
        hiddenDrawsChkBox.checked = true;
        DGW.helpers.addClass(DGW.main.elements.widgetBody, 'draws-expired');
    } else {
        hiddenDrawsChkBox.checked = false;
        DGW.helpers.removeClass(DGW.main.elements.widgetBody, 'draws-expired');
    }
};

