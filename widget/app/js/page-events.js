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

    ga(DGW.global.gaSend, 'pageview', state);

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
            break;
        default:

    }

    Array.prototype.slice.call(DGW.main.elements.widgetContent.querySelectorAll('.avatar')).forEach(function(img){
        img.src = DGW.helpers.checkImagesForSrc(img.getAttribute('src'));
    });

    DGW.main.methods.hideNotificationBar();

    DGW.main.currentState = state;
    DGW.main.methods.setRewardedActions();
    DGW.main.methods.checkSectionHeight();
};

DGW.main.methods.initEvents = function () {
    DGW.main.methods.fillDefaultValues();

// Login header
    // filling avatar images with default pictures
    Array.prototype.slice.call(DGW.main.elements.widget.querySelectorAll('.avatar')).forEach(function(img){
        img.src = DGW.helpers.checkImagesForSrc(img.getAttribute('src'));
    });

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

    // login dropdown menu
    (function headerLoginFormTriggers(){
        var link = DGW.main.elements.loginMenuButton;
        var linkP = link.parentNode;
        var form = linkP.querySelector('.dg-o-w-email-login-form');
        var formClose = form.querySelector('#dg-o-w-header-form-close');
        var heading = form.querySelector('#dg-o-w-login-heading');

        DGW.main.methods.headerLoginShow = function(headingText){
            headingText = headingText || 'Welcome!';
            heading.innerHTML = headingText;
            DGW.helpers.addClass(form, 'visible');
            setTimeout(function () {
                DGW.helpers.addClass(linkP, 'shown');
                form.querySelector('input').focus();
            }, 100);
        };
        DGW.main.methods.headerLoginHide = function(){
            DGW.helpers.removeClass(linkP, 'shown');
            setTimeout(function () {
                DGW.helpers.removeClass(form, 'visible');
                Array.prototype.slice.call(form.querySelectorAll(':not([type=submit])'))
                    .forEach(function(input){
                        input.value = '';
                    });
                DGW.main.methods.headerLoginReset();
            }, 310);
        };

        function triggerLoginForm(){
            if (DGW.helpers.hasClass(linkP, 'shown')) {
                DGW.main.methods.headerLoginHide();
            } else {
                DGW.main.methods.headerLoginShow();
            }
        }


        link.addEventListener('click', triggerLoginForm);
        formClose.addEventListener('click', DGW.main.methods.headerLoginHide);
    })();

    DGW.main.elements.widget.querySelector('#dg-o-w-header-fb-connect').addEventListener('click', function(ev){
        ev.preventDefault();
        DGW.global.api.requests.connectFB();
    });

    // login form submit
    var topLoginForm = DGW.main.elements.widgetBody.querySelector('#dg-o-w-form-login-top');
    var topForgotForm = DGW.main.elements.widgetBody.querySelector('#dg-o-w-form-forgot-top');

    (function topLoginInit(){
        var noUserRXP = /not\sfound/;
        var emailF = topLoginForm.querySelector('[type=email]'),
            passF = topLoginForm.querySelector('[type=password]'),
            nameF = topLoginForm.querySelector('[type=text]'),
            btn = topLoginForm.querySelector('[type=submit]');
        var btnVal = btn.value;
        var trySignIn = function(ev){
                ev.preventDefault();
                DGW.main.methods.hideNotificationBar();
                DGW.global.api.requests.signIn({
                    Email: emailF.value,
                    Password: passF.value
                }, function onSuccess(){
                    DGW.main.methods.notificationConstructor(['Welcome back, ' + DGW.global.userStats.name, 'Have a look at our new offers!']);
                }, function onError(result){
                    var err = DGW.helpers.errorParser(result).messages;
                    if (noUserRXP.test(err)) {
                        DGW.helpers.removeClass(nameF.parentNode, 'dg-o-w-hidden');
                        nameF.focus();
                        topLoginForm.removeEventListener('submit', trySignIn);
                        topLoginForm.addEventListener('submit', trySignUp);
                        btn.value = 'Sign up with email';
                    } else {
                        DGW.main.methods.notificationConstructor(err, 'error');
                    }
                });
            },
            trySignUp = function(ev){
                ev.preventDefault();

                DGW.main.methods.hideNotificationBar();
                DGW.global.api.requests.signUp({
                    Email: emailF.value,
                    Password: passF.value,
                    Username: nameF.value
                }, function onSuccess(){
                    DGW.main.methods.notificationConstructor(['Hi, ' + nameF.value + '! ', 'Welcome to ' + DGW.global.club.name + ' rewarded widget.']);
                }, function onError(result){
                    var err = DGW.helpers.errorParser(result).messages;
                    DGW.main.methods.notificationConstructor(err, 'error');
                });
            };

        topLoginForm.addEventListener('submit', trySignIn);

        DGW.main.methods.headerLoginReset = function(){
            topLoginForm.removeEventListener('submit', trySignUp);
            topLoginForm.addEventListener('submit', trySignIn);
            DGW.helpers.addClass(nameF.parentNode, 'dg-o-w-hidden');
            btn.value = btnVal;
        };
    })();

    topForgotForm.addEventListener('submit', function(ev){
        ev.preventDefault();
        var that = this;
        var emailF = that.querySelector('[type=email]').value;
        DGW.global.api.requests.forgotPass(emailF,
            function onSuccess(){
                DGW.main.methods.notificationConstructor('Check your email to confirm the new password.');
            }, function onError(result){
                DGW.main.methods.notificationConstructor(DGW.helpers.errorParser(result).messages, 'error');
            });
    });
    topLoginForm.querySelector('#dg-o-w-header-forgot-pass').addEventListener('click', function(ev){
        ev.preventDefault();
        DGW.helpers.removeClass(topLoginForm, 'shown');
        DGW.helpers.addClass(topForgotForm, 'shown');
    });
    topForgotForm.querySelector('a').addEventListener('click', function(ev){
        ev.preventDefault();
        DGW.helpers.removeClass(topForgotForm, 'shown');
        DGW.helpers.addClass(topLoginForm, 'shown');
    });

//Activities page
    DGW.main.elements.pages.activitiesMain.querySelector('#dg-o-w-activities-filter').addEventListener('change', function(){
        if (this.value === 'all-activities') {
            DGW.global.api.requests.getAllActivities(function(response){
                DGW.main.methods.activitiesConstructor(response.Activities);
            });
        } else {
            DGW.global.api.requests.getUserActivities(function(response){
                DGW.main.methods.activitiesConstructor(response.Activities);
            });
        }
    });


//Footer login init
    DGW.main.elements.loginFooter.querySelector('#dg-o-w-footer-email-login').addEventListener('click', function (ev) {
        ev.preventDefault();
        DGW.main.methods.headerLoginShow();
    });
    DGW.main.elements.loginFooter.querySelector('#dg-o-w-footer-fb-connect').addEventListener('click', function(ev){
        ev.preventDefault();
        DGW.global.api.requests.connectFB();
    });

// widget internal links
    DGW.helpers.openDataLinks(Array.prototype.slice.call(DGW.main.elements.widgetBody.querySelectorAll('[data-link]')));


//Draws page clicks
    DGW.main.elements.pages.drawsMain.querySelector('#dg-o-w-show-expired').addEventListener('change', function (ev) {
        DGW.main.settings.draws.showExpired = this.checked;
        DGW.main.methods.changeDrawsSubmenu(DGW.main.settings.draws.currentSubMenu);
    });

//Draw filters
    (function(){
        var hiddenDrawsChkBox = DGW.main.elements.pages.drawsMain.querySelector('#dg-o-w-show-expired');
        var submenuItems = Array.prototype.slice.call(DGW.main.elements.pages.drawsMain.querySelectorAll('.dg-o-w-submenu ul li'));
        function removeActive(){
            submenuItems.forEach(function(item){
                DGW.helpers.removeClass(item, 'dg-o-w-active');
            });
        }

        function hideFinishedDraws(){
            hiddenDrawsChkBox.checked = false;
            DGW.helpers.removeClass(DGW.main.elements.widgetBody, 'draws-expired');
            hiddenDrawsChkBox.parentNode.style.display = 'none';
        }
        function showFinishedDraws(){
            if (DGW.main.settings.draws.showExpired) {
                hiddenDrawsChkBox.checked = true;
                DGW.helpers.addClass(DGW.main.elements.widgetBody, 'draws-expired');
            }
            hiddenDrawsChkBox.parentNode.style.display = 'block';
        }

        DGW.main.methods.changeDrawsSubmenu = function(state){
            submenuItems.filter(function(item){
                return item.id == state;
            })[0].click();
        };

        submenuItems.forEach(function(item){
            item.addEventListener('click', function(){
                removeActive();
                DGW.helpers.addClass(this, 'dg-o-w-active');
                DGW.main.settings.draws.currentSubMenu = this.id;
                switch (this.id) {
                    case 'dg-o-w-show-all-draws':
                        DGW.main.cache.drawsList.sort(function(a,b){
                            return new Date(b.EndDate) - new Date(a.EndDate)
                        });

                        showFinishedDraws();

                        DGW.main.methods.drawsConstructor(DGW.main.cache);
                        break;
                    case 'dg-o-w-show-finished-soon':
                        var expArr = DGW.main.cache.drawsList.filter(function(draw){
                            return DGW.helpers.dateDiff(draw.EndDate) <= 0;
                        });
                        var actArr = DGW.main.cache.drawsList.filter(function(draw){
                            return DGW.helpers.dateDiff(draw.EndDate) > 0;
                        }).sort(function(a, b){
                            return new Date(a.EndDate) - new Date(b.EndDate);
                        });

                        DGW.main.cache.drawsList = actArr.concat(expArr);

                        hideFinishedDraws();
                        DGW.main.methods.drawsConstructor(DGW.main.cache, 'close-to-finish');
                        break;
                    case 'dg-o-w-show-my-draws':
                        var myDraws = [];
                        DGW.main.cache.drawsEntries.forEach(function(drawE){
                            DGW.main.cache.drawsList.filter(function(draw){
                                if (draw.DrawId == drawE.DrawId) {
                                    myDraws.push(draw);
                                }
                            });
                        });
                        DGW.main.cache.drawsList = DGW.main.cache.drawsList.sort(function(a,b){
                            return new Date(b.EndDate) - new Date(a.EndDate)
                        });

                        showFinishedDraws();
                        DGW.main.methods.drawsConstructor({drawsList: myDraws, drawsEntries: DGW.main.cache.drawsEntries}, 'my-draws');
                        break;
                    case 'dg-o-w-show-games':
                        hideFinishedDraws();
                        DGW.main.methods.gamesConstructor();
                        break;
                }
            });
        });
        DGW.main.methods.drawSubmenuReset = function(){
            removeActive();
            DGW.helpers.addClass(DGW.main.elements.pages.drawsMain.querySelector('#dg-o-w-show-all-draws'), 'dg-o-w-active');
        };
    })();

//Profile page clicks
    DGW.main.elements.pages.profileMain.querySelector('#dg-o-w-login-fb-text').addEventListener('click', function(){
        DGW.global.api.requests.connectFB();
    });
    DGW.main.elements.pages.profileMain.querySelector('#dg-o-w-sign-out-btn').addEventListener('click', function (ev) {
        ev.preventDefault();
        DGW.global.api.requests.signOut();
    });

    DGW.helpers.getElementsFromAllPlaces('[data-page]', 'main').forEach(function(el){
        el.addEventListener('click', function(ev){
            ev.preventDefault();
            DGW.main.methods.changeMainState(el.getAttribute('data-page'));
        });

    });

//Notification clicks
    DGW.main.elements.pages.notificationHolder.querySelector('.dg-o-w-notification-close').addEventListener('click', function(){
        DGW.main.methods.hideNotificationBar();
    });

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

