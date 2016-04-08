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

DGW.main.methods.addPageEvents = function () {
    // Login header
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

    DGW.main.elements.widgetBody.querySelector('#dg-o-w-form-login-top').addEventListener('submit', function(ev){
        ev.preventDefault();
        var emailF = this.querySelector('[type=email]').value,
            passF = this.querySelector('[type=password]').value;

        if (emailF != '' && passF != '' && passF.length > 5) {
            DGW.global.api.requests.signIn({
                Email: emailF,
                Password: passF
            });
        }
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
                //TODO: validation
            }
        });
        DGW.main.elements.loginFooter.querySelector('#dg-o-w-footer-signup-pass').addEventListener('submit', function(ev){
            ev.preventDefault();
            var pass = this.querySelector('[type=password]').value;
            if (pass != '' && pass.length >= 5) {
                newUser.Password = pass;
                DGW.global.api.requests.signUp(newUser);

                //TODO: preloader and success messages
                DGW.helpers.removeClass(DGW.main.elements.loginFooter, 'email-sign-up');
                DGW.helpers.removeClass(DGW.main.elements.loginFooter, 'password');
            } else {
                //TODO: validation
            }
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
        } else {
            DGW.helpers.removeClass(DGW.main.elements.widgetBody, 'draws-expired');
        }
    });

    DGW.main.elements.pages.drawsMain.querySelector('.dg-o-w-draws-refresh').addEventListener('click', function(){
        DGW.global.api.requests.getDraws();
    });

    //Draw filters
    (function(){
        var submenuItems = Array.prototype.slice.call(DGW.main.elements.pages.drawsMain.querySelectorAll('.dg-o-w-submenu ul li'));
        function removeActive(){
            submenuItems.forEach(function(item){
                DGW.helpers.removeClass(item, 'dg-o-w-active');
            });
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

                        DGW.main.methods.drawsConstructor(DGW.main.cache);
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

                        DGW.main.methods.drawsConstructor({drawsList: myDraws, drawsEntries: DGW.main.cache.drawsEntries}, 'my-draws');
                        break;
                    case 'dg-o-w-show-games':

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
    DGW.main.elements.pages.profileMain.querySelector('#dg-o-w-sign-out-btn').addEventListener('click', function (ev) {
        ev.preventDefault();
        DGW.global.api.requests.signOut();
    });
};