$(document).ready(function() {

    'use strict';
    var navigation = $('#navigation');
    var mobMenu = $('#mobile-menu');
    var gamifiedScreens = $('.middle-phone-holder');
    var sideDashboard = $('.animated-screens');
    var sections = $('.section');
    var anchors = [
        'browsers', 'big-data', 'sponsors', 'rewards', 'gamification-01', 'gamification-02', 'gamification-03', 'connectivity', 'foundation', 'cross-platform', 'reporting', 'testimonial', 'contacts'
    ];

    anchors.forEach(function(elem, index){
        navigation.append('<li data-menuanchor="' + elem +
        '"><a href="#' + elem + '"><span></span></a></li>');
        mobMenu.find('ul').append('<li><a href="#' + elem + '">' + elem.toUpperCase() + '</a></li>');
    });

    if ( $(window).width() > 800 ) {
        $('#fullpage').fullpage({
            anchors: anchors,
            menu: '#navigation',
            verticalCentered: false,
            sectionsColor: [],
            loopBottom: false,
            onLeave: function (index, nextIndex, direction) {
                if (nextIndex < 5 || nextIndex > 7) {
                    if (gamifiedScreens.css('display') !== 'none') {
                        gamifiedScreens.removeClass('visible');
                        setTimeout(function () {
                            gamifiedScreens.css('display', 'none');
                        }, 250);
                    }
                }
                if ((direction == 'down' && nextIndex === 5) || (direction == 'up' && nextIndex === 7)) {

                    if (gamifiedScreens.css('display') === 'none') {
                        gamifiedScreens.css('display', 'block');
                        setTimeout(function () {
                            gamifiedScreens.addClass('visible');
                        }, 100);
                    }
                }
            },
            afterLoad: function (anchorLink, index) {

                var gamifiedScreensText01 = $('.gamify-01');
                var gamifiedScreensText02 = $('.gamify-02');
                if (index >= 5 && index <= 7) {
                    if (gamifiedScreens.css('display') === 'none') {
                        gamifiedScreens.css('display', 'block');
                        setTimeout(function () {
                            gamifiedScreens.addClass('visible');
                        }, 100);
                    }
                }

                if (index === 6) {
                    sideDashboard.addClass('animated');
                    gamifiedScreensText01.addClass('animated');
                    gamifiedScreensText02.removeClass('animated');
                } else if (index !== 4 || index !== 6) {
                    sideDashboard.removeClass('animated');
                    gamifiedScreensText02.removeClass('animated');
                    gamifiedScreensText01.removeClass('animated');
                }

                if (index === 7) {
                    if (sideDashboard.hasClass('animated')) {
                        sideDashboard.addClass('next-animation');
                    } else {
                        sideDashboard.addClass('animated').addClass('next-animation');
                    }
                    gamifiedScreensText02.addClass('animated');
                    gamifiedScreensText01.removeClass('animated');
                } else {
                    sideDashboard.removeClass('next-animation');
                }

            }
        });
    } else {
        anchors.forEach(function(elem, index){
            sections.each(function(ind, sect){
                if ( index === ind ) {
                    $(sect).attr('id', elem);
                }
            });
        });
    }

    $('.to-top').on('click', function(e){
        e.preventDefault();

        navigation.find('li a')[0].click();
    });


    // Contacts trigger
    var contactBefore = $('#contactBefore'),
        contactBtn = $('#findMore'),
        contacts = $('#contactContent');

    contactBtn.on('click', function(e){
        e.preventDefault();

        contactBefore.hide();
        contacts.fadeIn(300);
    });

});


