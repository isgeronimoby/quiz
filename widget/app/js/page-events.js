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

    //Draws page clicks
    DGW.main.elements.pages.drawsMain.querySelector('#dg-o-w-show-expired').addEventListener('change', function (ev) {
        if (this.checked) {
            DGW.helpers.addClass(DGW.main.elements.widgetBody, 'draws-expired');
        } else {
            DGW.helpers.removeClass(DGW.main.elements.widgetBody, 'draws-expired');
        }
    });

    //Profile page clicks
    DGW.main.elements.pages.profileMain.querySelector('#dg-o-w-sign-out-btn').addEventListener('click', function (ev) {
        ev.preventDefault();
        DGW.global.api.requests.signOut();
    });
};