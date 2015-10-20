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
            if ( state === 'goal' ) {
                this.holder.removeClass('shoot').addClass('goal');
            } else {
                this.holder.removeClass('goal').addClass('shoot');
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
            if ( startingSignedUps === 0 ) {
                that.football.fadeIn(300);
                var firstPos = this.football.css('left');
                for (var i = 0; i < squadNumber+2; i++) {
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

});