'use strict';
var NotificationPopup = {
    notifHolder: $('.notification-holder'),
    prizeImageBtn: $('.notification-holder .action-holder'),
    closeBtn: $('.notification-holder .notification-close'),
    notificationBody: $('.notification-holder .notification-body'),
    ticketsAnimation: $('.notification-holder .tickets-animation'),

    showFull: function(){
        this.notificationBody.removeClass('collapsed');
    },
    close: function(){
        this.notificationBody.addClass('collapsed');
    },
    addTickets: function(ticketsToAdd){
        var that = this,
            tickets = this.notificationBody.find('.tickets'),
            ticketsNumber = +tickets.html(),
            timeEnd = 0,
            timeBasic = 180;

        that.ticketsAnimation.css('display', 'block');
        setTimeout(function(){
            that.notifHolder.addClass('adding-tickets');
            setTimeout(function(){
                for ( var i = 0; i < ticketsToAdd; i++ ) {
                    (function(i) {
                        setTimeout(function(){
                            tickets.html(++ticketsNumber);
                        }, i * (timeBasic + 20)); // Increasing timer for changing numbers
                        timeEnd = i * (timeBasic + 20); // Storing as variable to know the full duration
                    })(i);
                }
                setTimeout(function(){
                    that.ticketsAnimation.css('display', 'none');
                }, timeBasic / 2); // Timer before removing tickets
                setTimeout(function(){
                    that.notifHolder.removeClass('adding-tickets');
                    setTimeout(function(){
                        that.prizeImageBtn.click();
                    }, timeBasic * 2); // Delay before openning the popup
                }, timeEnd); // Timer before removing tickets animation
            }, timeBasic * 5); // Duration of flying tickets animation visibility
        }, 10);
    },
    init: function(){
        var that = this;
        that.prizeImageBtn.on('click', function(){
            that.showFull();
        });
        that.closeBtn.on('click', function(){
            that.close();
        });
        that.notifHolder.addClass('show-draw-popup');
        setTimeout(function(){
            that.notifHolder.addClass('shown');
        }, 1000); // delay before showing the popup
    }
};

//NotificationPopup.init();
//NotificationPopup.addTickets(10);