DGW.main.methods.loginInit = function(){

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

    //Footer login init
    DGW.main.elements.loginFooter.querySelector('#dg-o-w-footer-email-login').addEventListener('click', function (ev) {
        ev.preventDefault();
        DGW.main.methods.headerLoginShow();
    });
    DGW.main.elements.loginFooter.querySelector('#dg-o-w-footer-fb-connect').addEventListener('click', function(ev){
        ev.preventDefault();
        DGW.global.api.requests.connectFB();
    });
};