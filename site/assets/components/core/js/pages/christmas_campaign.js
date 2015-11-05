$(document).ready(function(){
    'use strict';
    //snowStorm.snowColor = '#99ccff';   // blue-ish snow!?
    //snowStorm.flakesMaxActive = 120;    // show more snow on screen at once


    //Scrolling screen to desired element using its ID
    function scrollToElement(aid) {
        var aTag = $("[id='" + aid + "']");
        $('html,body').animate({ scrollTop: aTag.offset().top - 40 },'slow');
    }

    //Clicking Tell-me-more button, and scrolling screen to it
    $('.scroll-page').on('click', function(e){
        e.preventDefault();
        scrollToElement($(this).attr('href').substring(1));
    });

    var christmasDashboard = $('.christmas-dashboard'),
        startingSignedUps = Number(
            christmasDashboard.find('.christmas-stats .christmas-stats-block .made-purchases').html()
        ),
        squadNumber = christmasDashboard.find('.squad .squad-row .squad-el').length;
    // Christmas NOTIFICATION module
    // To run use next lines:
    //
    // $.fn.ChristmasNotification.show('goal');
    // to run notification in a goal mode
    // or
    // $.fn.ChristmasNotification.show(); or $.fn.ChristmasNotification.show('s');
    // or whatever to show shoot mode
    $.fn.ChristmasNotification = {
        holder: christmasDashboard.find('.christmas-notification'),
        closeBtn: christmasDashboard.find('.christmas-notification > .christmas-notification-close'),
        body: christmasDashboard.find('.christmas-notification > .christmas-notification-body'),
        show: function(state){
            this.holder.attr('class', 'christmas-notification');
            if ( state === 'goal' ) {
                this.holder.addClass('goal');
            } else if ( state === 'again' ) {
                this.holder.addClass('again');
            } else if ( state === 'error' ) {
                this.holder.addClass('error');
            } else {
                this.holder.addClass('shoot');
            }
            this.holder.addClass('shown');
        },
        close: function(){
            this.holder.removeClass('shown');
        },
        init: function(){
            var that = this;
            this.closeBtn.on('click', function(){
                that.close();
            });
        }
    };
    $.fn.ChristmasNotification.init();


    // Football row animation
    var FootballAnimation = {
        squadEls: christmasDashboard.find('.squad .squad-row .squad-el'),
        football: christmasDashboard.find('.squad .squad-row .football'),
        squadCount: christmasDashboard.find('.squad .squad-class'),
        inviteTitle: christmasDashboard.find('.sign-up > h2'),
        inviteArrow: christmasDashboard.find('.sign-up .invite-arrow'),
        timeBasic: 400,
        animateBall: function(player){
            this.football.removeClass('pass');
            var currentLeft = this.football.css('left');
            this.football.css('left', player * (100 / squadNumber) + '%');
            this.football.addClass('pass');
        },
        init: function(){
            var that = this;
            var counter = 0;
            //that.squadEls.css('max-width', 100 / squadNumber + '%');
            // uncomment if squad number is differ from 10
            that.squadCount.html((startingSignedUps === 0) ? 1 : Math.ceil(startingSignedUps / squadNumber));
            if ( startingSignedUps === 0 ) {
                that.inviteTitle.html('Invite a friend to start your squad');
                that.football.fadeIn(300);
                var firstPos = this.football.css('left');
                for (var i = 0; i < squadNumber+5; i++) {
                    (function (i) {
                        setTimeout(function () {
                            that.animateBall(i + 1);
                        }, i * (that.timeBasic));
                        // timeEnd = i * (that.timeBasic); // Storing as variable to know the full duration
                    })(i);
                }
            }
            if ( startingSignedUps !== 0 ) {
                that.football.fadeIn(300);
                if ( startingSignedUps % squadNumber === 0 ) {
                    counter = squadNumber;
                    that.inviteArrow.hide();
                } else {
                    counter = startingSignedUps % squadNumber;
                }
                if ( counter > 0 ) {
                    for (var i = 0; i < counter; i++) {
                        (function (i) {
                            setTimeout(function () {
                                $(that.squadEls[i]).addClass('active');
                                that.animateBall(i + 1);
                            }, i * (that.timeBasic));
                            // timeEnd = i * (that.timeBasic); // Storing as variable to know the full duration
                        })(i);
                    }
                    that.inviteArrow.css('left', (counter + 1) * 10 - 6 + '%');
                }
            }
        }
    };
    FootballAnimation.init();


    // Filling trophies list
    var Trophies = {
        trophies: christmasDashboard.find('.trophies .trophies-list .trophy'),
        init: function(){
             for(var i = 0; i < Math.floor(startingSignedUps / squadNumber); i++ ) {
                 $(this.trophies[i]).addClass('active');
             }
        }
    };
    Trophies.init();


    // On invited friends landing page, changing states for installation process
    // 'install' or 'error' or empty to hide everything
    $.fn.showMiddleState = function(state) {
        var overlay = $('.christmas-page .service-states');
        switch (state) {
            case 'install':
                showExtensionPopupFunc();
                overlay.removeClass('install error');
                overlay.addClass('install');
                break;
            case 'error':
                hideExtensionPopupFunc();
                overlay.removeClass('install error');
                overlay.addClass('error');
                break;
            default:
                hideExtensionPopupFunc();
                overlay.removeClass('install error');
        }
        overlay.find('.overflow-close').on('click', function(){
            $.fn.showMiddleState();
        });
    };

    //Changing fan's phrases
    (function fanShouts(){
        var fanObj = christmasDashboard.find('.sign-up > .fan-shouts');
        setInterval(function(){
            var num = Math.floor(Math.random() * 6) + 1;
            fanObj.attr('class', 'fan-shouts');
            switch (num) {
                case 6:
                    fanObj.addClass('six');
                    break;
                case 5:
                    fanObj.addClass('five');
                    break;
                case 4:
                    fanObj.addClass('four');
                    break;
                case 3:
                    fanObj.addClass('three');
                    break;
                case 2:
                    fanObj.addClass('two');
                    break;
                default:
                    fanObj.addClass('one');
            }
        }, 7000);
    })();

    $('[data-toggle="tooltip"]').tooltip();

});