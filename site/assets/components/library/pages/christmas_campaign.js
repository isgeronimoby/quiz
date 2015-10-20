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

    // Christmas NOTIFICATION module
    // To run use next lines:
    //
    // $.fn.ChristmasNotification.show('goal');
    // to run notification in a goal mode
    // or
    // $.fn.ChristmasNotification.show(); or $.fn.ChristmasNotification.show('s');
    // or whatever to show shoot mode
    $.fn.ChristmasNotification = {
        holder: $('.christmas-dashboard .christmas-notification'),
        closeBtn: $('.christmas-dashboard .christmas-notification > .christmas-notification-close'),
        body: $('.christmas-dashboard .christmas-notification > .christmas-notification-body'),
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
    $.fn.Football = {
        startingSignedUps: Number( $('.christmas-dashboard .christmas-stats .christmas-stats-block .singed-up').html() ),
        squadRow: $('.christmas-dashboard .squad .squad-row'),
        squadEls: $('.christmas-dashboard .squad .squad-row .squad-el'),
        football: $('.christmas-dashboard .squad .squad-row .football'),
        timeBasic: 400,
        animateBall: function(player){
            this.football.removeClass('pass');
            var currentLeft = this.football.css('left');
            this.football.css('left', player * 10 + '%');
            this.football.addClass('pass');
        },
        init: function(){
            var that = this;
            var counter = 0;
            if ( that.startingSignedUps === 0 ) {
                that.football.hide();
            } else if ( that.startingSignedUps % 10 === 0 ) {
                counter = 10;
            } else {
                counter = that.startingSignedUps % 10;
            }
            for ( var i = 0; i < counter; i++ ) {
                (function (i) {
                    setTimeout(function () {
                        $(that.squadEls[i]).addClass('active');
                        that.animateBall(i + 1);
                    }, i * (that.timeBasic)); // Increasing timer for changing numbers
                    // timeEnd = i * (that.timeBasic); // Storing as variable to know the full duration
                })(i);
            }
        }
    };
    $.fn.Football.init();

});