DGW.templates.spinner = '<div class="dg-o-w-spinner">' +
                            '<div class="sk-circle1 sk-circle"></div><div class="sk-circle2 sk-circle"></div><div class="sk-circle3 sk-circle"></div>' +
                            '<div class="sk-circle4 sk-circle"></div><div class="sk-circle5 sk-circle"></div><div class="sk-circle6 sk-circle"></div>' +
                            '<div class="sk-circle7 sk-circle"></div><div class="sk-circle8 sk-circle"></div><div class="sk-circle9 sk-circle"></div>' +
                            '<div class="sk-circle10 sk-circle"></div><div class="sk-circle11 sk-circle"></div><div class="sk-circle12 sk-circle"></div>' +
                        '</div>';

DGW.templates.loginFooter = '<footer class="dg-o-w-footer-login">' +
                                '<div class="footer-section">' +
                                    '<div class="inline-part inline-table dg-o-w-text-left"><p>Get started now and earn first <span id="dg-o-w-login-fb-reward" class="dg-o-w-rewarded-action dg-o-w-points">30</span></p>' +
                                    '<h5 class="dg-o-w-color-grey">We\'ll never send you any spam.</h5></div>' +
                                    '<div class="inline-part inline-table"><a href="#" id="dg-o-w-footer-fb-connect" class="btn-dg-o-w btn-dg-o-w-brand btn-dg-o-w-large">Connect with Facebook</a></div>' +
                                    '<div class="inline-part inline-table"><p>or</p></div>' +
                                    '<div class="inline-part inline-table"><a id="dg-o-w-footer-email-login" href="#" class="btn-dg-o-w btn-dg-o-w-brand-l btn-dg-o-w-large">Enter with email</a></div>' +
                                '</div>' +
                            '</footer>';

DGW.templates.header = '<div class="dg-o-w-header">' +
                            '<div class="dg-o-w-logo"></div>' +
                            '<div class="dg-o-w-menu">' +
                            '<ul><li class="earn-menu-item">Earn</li>' +
                                '<li class="draws-menu-item">Draws & Games</li>' +
                                '<li class="activities-menu-item">Activities</li></ul>' +
                            '</div>' +
                            '<div class="dg-o-w-menu-profile">' +
                                '<div class="profile-menu-item">' +
                                    '<img data-userstats-userimage class="avatar" src="" />' +
                                    '<div class="profile-menu-unauthorized">' +
                                        '<div>' +
                                            '<h4>Hello, guest!</h4>' +
                                            '<div class="dg-o-w-login-dropdown">' +
                                                '<a href="#" id="dg-o-w-login-trigger">Enter & get started</a>' +
                                                '<div class="dg-o-w-email-login-form">' +
                                                    '<form class="shown" id="dg-o-w-form-login-top">' +
                                                        '<h2 id="dg-o-w-login-heading">Welcome!</h2>' +
                                                        '<div id="dg-o-w-header-fb-connect" class="btn-dg-o-w btn-dg-o-w-brand btn-dg-o-w-large">Connect with Facebook</div>' +
                                                        '<label><input type="email" placeholder="Email" /></label>' +
                                                        '<label><input type="password" placeholder="Password"/></label>' +
                                                        '<label class="dg-o-w-hidden"><input type="text" placeholder="Hello, what\'s your name?"/></label>' +
                                                        '<input class="btn-dg-o-w btn-dg-o-w-brand-l btn-dg-o-w-large" type="submit" value="Enter with email" />' +
                                                        '<a href="#" id="dg-o-w-header-forgot-pass" class="">Forgot your password?</a>' +
                                                    '</form>' +
                                                    '<form id="dg-o-w-form-forgot-top">' +
                                                        '<h2>Forgot password?</h2>' +
                                                        '<div><label><input type="email" placeholder="Email" /></label>' +
                                                        '<input class="btn-dg-o-w btn-dg-o-w-brand btn-dg-o-w-large" type="submit" value="Request new password" />' +
                                                        '<a href="#" class="">&larr; Back</a></div>' +
                                                        '<p class="success-message">Email was sent</p>' +
                                                    '</form>' +
                                                    '<div class="dg-o-w-header-form-close" id="dg-o-w-header-form-close">&times;</div>' +
                                                '</div>' +
                                            '</div>' +
                                        '</div>' +
                                    '</div>' +
                                    '<div class="profile-menu-authorized">' +
                                        '<div>' +
                                            '<h4 data-userstats-username>Hello, Paul!</h4>' +
                                            '<p><span data-userstats-points-c>25</span> | <span data-userstats-credits-c>115.25</span></p>' +
                                        '</div>' +
                                    '</div>' +
                                '</div>' +
                            '</div>' +
                        '</div>';

DGW.templates.mainWidgetCore = '<div id="dg-o-w-wrapper">' +
                                    '<div class="dg-o-w-overlay">' +
                                        '<div class="dg-o-w-body">' +
                                            '<div class="dg-o-w-body-wrapper">' +
                                                DGW.templates.header +
                                                '<div class="dg-o-w-content"><div class="dg-o-w-section">' +
                                                    '<section></section>' +
                                                    DGW.templates.loginFooter +
                                                '</div></div>' +
                                            '</div>' +
                                            '<div class="dg-o-w-close">&times;</div>' +
                                            DGW.templates.spinner +
                                        '<footer class="dg-o-w-main-footer">Powered by Loyalty Rewarded, 2016 &nbsp;&nbsp;-&nbsp;&nbsp; <a data-link="faq" href="#">FAQ</a></footer></div>' +
                                    '</div>' +
                                '</div>';

DGW.templates.earnMain = '<div class="dg-o-w-submenu">' +
                            '<ul><li class="dg-o-w-active">All</li>' +
                                '<li>Share</li>' +
                                '<li>Watch</li>' +
                                '<li>Visit</li>' +
                                '<li>Download</li>' +
                                '<li>Invite</li></ul>' +
                            '<select><option>All sponsors</option>' +
                                '<option>Coca-Cola</option>' +
                                '<option>Nike</option>' +
                                '<option>Telco</option></select>' +
                        '</div>' +
                        '<div class="dg-o-w-section-content">' +
                            '<h3>Complete the tasks and earn +<span></span> points today</h3>' +
                            '<ul class="dg-o-w-list-offers"></ul>' +
                        '</div>';

DGW.templates.drawsMain = '<div class="dg-o-w-submenu">' +
                            '<ul><li class="dg-o-w-active" id="dg-o-w-show-all-draws">All draws</li><li id="dg-o-w-show-finished-soon">Finished soon</li>' +
                                '<li id="dg-o-w-show-my-draws">My draws</li><li id="dg-o-w-show-games">Games</li></ul>' +
                            '<label class="checkbox-slider">Show finished draws <input id="dg-o-w-show-expired" type="checkbox" class="ios-switch bigswitch" /><div><div></div></div></label>' +
                        '</div>' +
                        '<div class="dg-o-w-section-content">' +
                            '<div class="dg-o-w-draws-active">' +
                            '<ul class="dg-o-w-list-draws"></ul></div>' +
                            '<div class="dg-o-w-draws-no-active"><h2>Sorry, but there are no draws running at the moment.</h2><br/><div class="dg-o-w-draws-refresh"></div></div>' +
                            '<div class="dg-o-w-draws-no-in-draws"><h2>Seems like you don\'t playing any current draw :(</h2></div>' +
                        '</div>';

DGW.templates.profileMain = '<div class="dg-o-w-profile dg-o-w-white-section">' +

                                '<div class="dg-o-w-profile-stats">' +
                                    '<div class="dg-o-w-image-holder"><img data-userstats-userimage class="avatar" src="" /></div>' +
                                    '<div class="dg-o-w-profile-stats-holder">' +
                                        '<h3 data-userstats-username class="dg-o-w-profile-name">Captain Deadpool</h3>' +
                                        '<div class="dg-o-w-profile-stats-holder-rest">' +
                                            //'<div class="dg-o-w-profile-stats-inner"><div><h3 class="dg-o-w-color-brand">210</h3><p>friends</p></div><div class="dg-o-w-profile-stats-pend"><p>19</p></div></div>' +
                                            //'<div class="dg-o-w-profile-stats-inner"><div><h3 class="dg-o-w-color-brand">20</h3><p>groups</p></div><div class="dg-o-w-profile-stats-pend"><p>3</p></div></div>' +
                                            '<div class="dg-o-w-profile-stats-inner"><div class="dg-o-w-profile-stats-icon dg-o-w-points-icon"></div><div><h3 data-userstats-points-c>520</h3><p>points</p></div></div>' +
                                            '<div class="dg-o-w-profile-stats-inner"><div class="dg-o-w-profile-stats-icon dg-o-w-credits-icon"></div><div><h3 data-userstats-credits-c>40</h3><p>credits</p></div></div>' +
                                        '</div>' +
                                    '</div>' +
                                '</div>' +

                                '<div class="dg-o-w-profile-text-block">' +
                                    '<p id="dg-o-w-login-fb-text">Get +<span class="dg-o-w-rewarded-action" id="dg-o-w-login-fb-reward">50</span> additional points by adding your other accounts from ' +
                                        '<a href="#" class="dg-o-w-fb-connect"></a></p>' +
                                '</div>' +

                                '<div class="dg-o-w-profile-text-block">' +
                                    '<p id="dg-o-w-profile-earn-today">&nbsp;</p>' +
                                '</div>' +

                                '<div class="dg-o-w-profile-progress"><div style="width:35%;"></div></div>' +

                                '<div class="dg-o-w-profile-signout dg-o-w-float-right">' +
                                    '<p class="dg-o-w-color-brand-light"><a id="dg-o-w-sign-out-btn" href="#">Sign out</a></p>' +
                                '</div>' +
                            '</div>' +
                            '<div class="dg-o-w-section-content content-static dg-o-w-white-section dg-o-w-blocks-margin">' +
                                '<div class="dg-o-w-badges-holder"><ul></ul></div>' +
                            '</div>';


DGW.templates.loginMain = '<div class="dg-o-w-login">' +
                                '<div class="dg-o-w-login-holder"><div class="dg-o-w-login-holder-content">' +
                                    '<h1>Win exclusive prizes handling simple tasks</h1>' +
                                    '<h4>Become a part of the team</h4>' +
                                '</div></div>' +
                                '<h4 class="dg-o-w-login-prize-title" id="dg-o-w-login-prize-title"></h4>' +
                            '</div>';

DGW.templates.activitiesMain = '<div class="dg-o-w-submenu"><ul>' +
                                    '<li class="dg-o-w-active">Leaderboard</li></ul></div>' +
                                '<div class="dg-o-w-section-scroller">' +
                                    '<div class="dg-o-w-activities dg-o-w-white-section">' +
                                        '<div class="dg-o-w-activity-slider-holder">' +
                                            '<div class="dg-o-w-activity-slider-controls">' +
                                                '<div class="dg-o-w-activity-slider-prev dg-o-w-arrow dg-o-w-arrow-left"></div><div class="dg-o-w-activity-slider-next dg-o-w-arrow dg-o-w-arrow-right"></div>' +
                                            '</div>' +
                                            '<div class="dg-o-w-activity-slider"><ul></ul></div>' +
                                        '</div>' +
                                    '</div>' +
                                    '<div class="dg-o-w-section-content content-static dg-o-w-white-section">' +
                                        '<div class="dg-o-w-activities-header">' +
                                            '<p class="dg-o-w-float-left">Activities for today</p>' +
                                            // TODO: don't show until we have invite friends functionality
                                            // '<p class="dg-o-w-floating-link"><a href="#">Invite more friends</a> and get +<span id="dg-o-w-friends-sign-up-reward" class="dg-o-w-rewarded-action">50</span> points for each</p>' +
                                            '<select id="dg-o-w-activities-filter" class="dg-o-w-float-right">' +
                                                '<option value="all-activities">All activities</option>' +
                                                '<option value="my-activities">My Activities</option>' +
                                            '</select>' +
                                        '</div>' +
                                        '<div class="dg-o-w-activities-holder"><ul></ul></div>' +
                                    '</div>' +
                                '</div>';

DGW.templates.videoHolder = '<div class="dg-o-w-video-holder"><div id="dg-o-w-video-playing"></div><div class="dg-o-w-video-text"><span></span></div></div>';

DGW.templates.notificationHolder = '<div class="dg-o-w-notification-holder"><ul></ul><div class="dg-o-w-notification-close">&times;</div></div>';