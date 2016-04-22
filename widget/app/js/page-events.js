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
    for (item in DGW.main.elements.menuItems) {
        DGW.helpers.removeClass(DGW.main.elements.menuItems[item], 'dg-o-w-active');
        DGW.helpers.removeClass(DGW.main.elements.menuItems['profile'].parentNode, 'dg-o-w-active');
        if (item === state) {
            if (state === 'profile') {
                DGW.helpers.addClass(DGW.main.elements.menuItems[item].parentNode, 'dg-o-w-active');
            } else {
                DGW.helpers.addClass(DGW.main.elements.menuItems[item], 'dg-o-w-active');
            }
        }
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
                DGW.global.api.requests.getUserOffers();
            } else {
                DGW.global.api.requests.getOffers();
            }
            DGW.main.elements.widgetContent.appendChild(DGW.main.elements.pages.earnMain);
            break;
        case 'draws':
            //TODO: work on this further
            if (DGW.main.currentState !== 'draws') {
                DGW.global.api.requests.getDraws();
                DGW.main.methods.drawSubmenuReset();
            }
            DGW.main.elements.widgetContent.appendChild(DGW.main.elements.pages.drawsMain);
            break;
        case 'activities':
            if (DGW.main.elements.pages.activitiesMain.querySelector('#dg-o-w-activities-filter').value === 'all-activities') {
                DGW.global.api.requests.getAllActivities();
            } else {
                DGW.global.api.requests.getUserActivities();
            }
            DGW.global.api.requests.getLeaderboard();
            DGW.main.elements.widgetContent.appendChild(DGW.main.elements.pages.activitiesMain);
            break;
        case 'profile':
            if ( DGW.global.authorized ) {
                DGW.main.elements.widgetContent.appendChild(DGW.main.elements.pages.profileMain);
                DGW.global.api.requests.getUser();
                DGW.global.api.requests.getAllBadges();
            } else {
                DGW.helpers.addClass(DGW.main.elements.widgetBody, 'profile-anon');
                DGW.main.elements.widgetContent.appendChild(DGW.main.elements.pages.loginMain);
            }
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
    for (item in DGW.main.elements.menuItems) {
        DGW.main.elements.menuItems[item].addEventListener('click', function(item){
            return function(){
                if (item == 'profileRegistered') item = 'profile';
                DGW.main.methods.changeMainState(item);
            };
        }(item));
    }

    // login dropdown menu
    DGW.main.elements.loginMenuButton.addEventListener('click', function (e) {
        e.preventDefault();
        var that = this;
        var form = that.parentNode.querySelector('.dg-o-w-email-login-form');
        if (DGW.helpers.hasClass(that.parentNode, 'shown')) {
            DGW.helpers.removeClass(that.parentNode, 'shown');
            setTimeout(function () {
                DGW.helpers.removeClass(form, 'visible');
            }, 310);
        } else {
            DGW.helpers.addClass(form, 'visible');
            setTimeout(function () {
                DGW.helpers.addClass(that.parentNode, 'shown');
            }, 0);
        }
    });

    // login form submit
    var topLoginForm = DGW.main.elements.widgetBody.querySelector('#dg-o-w-form-login-top');
    var topForgotForm = DGW.main.elements.widgetBody.querySelector('#dg-o-w-form-forgot-top');

    topLoginForm.addEventListener('submit', function(ev){
        ev.preventDefault();
        var emailF = this.querySelector('[type=email]').value,
            passF = this.querySelector('[type=password]').value;

            DGW.global.api.requests.signIn({
                Email: emailF,
                Password: passF
            }, function onSuccess(){
                DGW.helpers.removeClass(DGW.main.elements.loginMenuButton.parentNode, 'shown');
            }, function onError(result){
                DGW.main.methods.notificationConstructor(DGW.helpers.errorParser(result).messages, 'error');
            });
    });
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
    topLoginForm.querySelector('a').addEventListener('click', function(ev){
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
    DGW.main.elements.pages.activitiesMain.querySelector('.toggle-section-height').addEventListener('click', function () {
        if (DGW.helpers.hasClass(this, 'collapsed')) {
            DGW.helpers.removeClass(DGW.main.elements.activitiesSliderParent, 'collapsed');
            DGW.helpers.removeClass(this, 'collapsed');
        } else {
            DGW.helpers.addClass(DGW.main.elements.activitiesSliderParent, 'collapsed');
            DGW.helpers.addClass(this, 'collapsed');
        }
        DGW.main.methods.checkSectionHeight();
    });

    DGW.main.elements.pages.activitiesMain.querySelector('#dg-o-w-activities-filter').addEventListener('change', function(){
        if (this.value === 'all-activities') {
            DGW.global.api.requests.getAllActivities();
        } else {
            DGW.global.api.requests.getUserActivities();
        }
    });


//Footer login init
    DGW.main.elements.loginFooter.querySelector('#dg-o-w-footer-email-login').addEventListener('click', function (ev) {
        ev.preventDefault();
        DGW.helpers.addClass(DGW.main.elements.loginFooter, 'email-sign-up');
    });
    DGW.main.elements.loginFooter.querySelector('#dg-o-w-footer-login-select').addEventListener('click', function (ev) {
        ev.preventDefault();
        DGW.helpers.removeClass(DGW.main.elements.loginFooter, 'email-sign-up');
    });
    DGW.main.elements.loginFooter.querySelector('#dg-o-w-footer-login-select-2').addEventListener('click', function (ev) {
        ev.preventDefault();
        DGW.helpers.removeClass(DGW.main.elements.loginFooter, 'password');
    });
    (function(){
        var newUser = {};
        DGW.main.elements.loginFooter.querySelector('#dg-o-w-footer-signup-email').addEventListener('submit', function(ev){
            ev.preventDefault();
            var name = this.querySelector('[type=text]').value,
                email = this.querySelector('[type=email]').value;
            if (name != '' && email != '') {
                newUser.Username = name;
                newUser.Email = email;

                DGW.helpers.addClass(DGW.main.elements.loginFooter, 'password');
            } else {
                var errorMessage = [];
                if (name == '') errorMessage.push('Name is required field');
                if (email == '') errorMessage.push('Email is required');
                DGW.main.methods.notificationConstructor(errorMessage, 'error');
            }
        });
        DGW.main.elements.loginFooter.querySelector('#dg-o-w-footer-signup-pass').addEventListener('submit', function(ev){
            ev.preventDefault();
            var pass = this.querySelector('[type=password]').value;
                newUser.Password = pass;
                DGW.global.api.requests.signUp(newUser,
                    function onSuccess(){
                        DGW.helpers.removeClass(DGW.main.elements.loginFooter, 'email-sign-up');
                        DGW.helpers.removeClass(DGW.main.elements.loginFooter, 'password');
                    }, function onError(result){
                        DGW.main.methods.notificationConstructor(DGW.helpers.errorParser(result).messages, 'error');
                    });
        });
    })();
    DGW.main.elements.loginFooter.querySelector('#dg-o-w-footer-fb-connect').addEventListener('click', function(ev){
        ev.preventDefault();

        DGW.global.api.requests.connectFB();
    });


//Draws page clicks
    DGW.main.elements.pages.drawsMain.querySelector('#dg-o-w-show-expired').addEventListener('change', function (ev) {
        if (this.checked) {
            DGW.helpers.addClass(DGW.main.elements.widgetBody, 'draws-expired');
            DGW.main.settings.hiddenDrawsShow = true;
        } else {
            DGW.helpers.removeClass(DGW.main.elements.widgetBody, 'draws-expired');
            DGW.main.settings.hiddenDrawsShow = false;
        }
    });

    DGW.main.elements.pages.drawsMain.querySelector('.dg-o-w-draws-refresh').addEventListener('click', function(){
        DGW.global.api.requests.getDraws();
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
            if (DGW.main.settings.hiddenDrawsShow) {
                hiddenDrawsChkBox.checked = true;
                DGW.helpers.addClass(DGW.main.elements.widgetBody, 'draws-expired');
            }
            hiddenDrawsChkBox.parentNode.style.display = 'block';
        }

        submenuItems.forEach(function(item){
            item.addEventListener('click', function(){
                removeActive();
                DGW.helpers.addClass(this, 'dg-o-w-active');
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
        DGW.global.api.requests.connectFB(function onSuccess(){
            DGW.global.api.requests.getUser();
        });
    });
    DGW.main.elements.pages.profileMain.querySelector('#dg-o-w-sign-out-btn').addEventListener('click', function (ev) {
        ev.preventDefault();
        DGW.global.api.requests.signOut();
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
    DGW.main.methods.fillDefaultValues();

    // clearing private cache
    DGW.main.cache.drawsEntries = [];
};

DGW.main.methods.fillDefaultValues = function(){

    var hiddenDrawsChkBox = DGW.main.elements.pages.drawsMain.querySelector('#dg-o-w-show-expired');
    getWinnerInterval = setInterval(function(){
        if (DGW.global.cache.last.winner) {
            var l = DGW.main.elements.pages.loginMain.querySelector('.dg-o-w-login-winners');
            l.querySelector('img').src = DGW.global.cache.last.winner.ImageUrl;
            l.querySelector('h4 span').innerHTML = DGW.global.cache.last.winner.UserName;
            clearInterval(getWinnerInterval);
        }
    }, 50);

    if (DGW.main.settings.hiddenDrawsShow) {
        hiddenDrawsChkBox.checked = true;
        DGW.helpers.addClass(DGW.main.elements.widgetBody, 'draws-expired');
    } else {
        hiddenDrawsChkBox.checked = false;
        DGW.helpers.removeClass(DGW.main.elements.widgetBody, 'draws-expired');
    }
};

