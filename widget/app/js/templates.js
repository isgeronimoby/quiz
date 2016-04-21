DGW.templates.sideWidgetCore = '<div id="dg-side-widget-wrapper">' +
                                    '<div class="dg-side-widget-body">' +
                                        '<div class="dg-side-widget-content dg-o-w-authorized">' +
                                            '<div class="dg-side-widget-content-inner">' +
                                                '<div class="dg-side-section"><div class="dg-side-img-holder no-border"><img id="dg-side-widget-userpic" class="avatar" src="" /></div>' +
                                                    '<div class="dg-side-expanded">' +
                                                        '<h4 id="dg-side-widget-name">Name Surname Whatever</h4>' +
                                                        '<h6><span id="dg-side-points">00</span> | <span id="dg-side-credits">00</span></h6>' +
                                                    '</div>' +
                                                '</div>' +
                                                '<div class="dg-side-collapsed"><p>210 pts</p></div>' +
                                                '<div class="dg-side-expanded"><p>Earned: <span>15</span> pts | left: <span>5</span>pts</p></div>' +
                                            '</div>' +
                                        '</div>' +
                                        '<div class="dg-side-widget-content dg-o-w-anonymous">' +
                                            '<div class="dg-side-widget-content-inner">' +
                                                '<div class="dg-side-section">' +
                                                    '<div class="dg-side-img-holder"><img class="dg-side-prize" src="" alt="Prize" /></div>' +
                                                    '<div class="dg-side-expanded"><p id="dg-side-widget-prize-desc"></p></div>' +
                                                '</div>' +
                                                '<div class="dg-side-collapsed"><div class="dg-side-cta">Get it</div></div>' +
                                                '<div class="dg-side-expanded"><div class="dg-side-cta">Get the prize</div></div>' +
                                            '</div>' +
                                        '</div>' +
                                        '<div class="dg-side-widget-resizer"></div>' +
                                    '</div>' +
                               '</div>';

DGW.templates.mainWidgetCore = '<div id="dg-o-w-wrapper">' +
                                    '<div class="dg-o-w-overlay">' +
                                        '<div class="dg-o-w-body">' +
                                            '<div class="dg-o-w-body-wrapper">' +
                                                '<div class="dg-o-w-header">' +
                                                    '<div class="dg-o-w-logo"></div>' +
                                                    '<div class="dg-o-w-menu">' +
                                                        '<ul><li class="earn-menu-item">Earn</li>' +
                                                        '<li class="draws-menu-item">Draws & Games</li>' +
                                                        '<li class="activities-menu-item">Activities</li></ul>' +
                                                    '</div>' +
                                                    '<div class="dg-o-w-menu-profile">' +
                                                        '<div class="profile-menu-item">' +
                                                            '<img class="avatar" src="" />' +
                                                            '<div class="profile-menu-unauthorized">' +
                                                                '<div>' +
                                                                    '<h4>Hello, guest!</h4>' +
                                                                    '<div class="dg-o-w-login-dropdown">' +
                                                                        '<a href="#">Log in by email</a>' +
                                                                        '<div class="dg-o-w-email-login-form">' +
                                                                            '<form class="shown" id="dg-o-w-form-login-top">' +
                                                                                '<label>Email <input type="email" placeholder="mail@mail.com" /></label>' +
                                                                                '<label>Password <input type="password" /></label>' +
                                                                                '<input type="submit" value="Sign In" />' +
                                                                                '<a href="#" class="">Forgot your password?</a>' +
                                                                            '</form>' +
                                                                            '<form id="dg-o-w-form-forgot-top">' +
                                                                                '<div><label>Email <input type="email" placeholder="mail@mail.com" /></label>' +
                                                                                '<input type="submit" value="Request new password" />' +
                                                                                '<a href="#" class="">&larr; Back</a></div>' +
                                                                                '<p class="success-message">Email was sent</p>' +
                                                                            '</form>' +
                                                                        '</div>' +
                                                                    '</div>' +
                                                                '</div>' +
                                                            '</div>' +
                                                            '<div class="profile-menu-authorized">' +
                                                                '<div>' +
                                                                    '<h4>Hello, Paul!</h4>' +
                                                                    '<p><span id="dg-o-w-points">25</span> | <span id="dg-o-w-credits">115.25</span></p>' +
                                                                '</div>' +
                                                            '</div>' +
                                                        '</div>' +
                                                    '</div>' +
                                                '</div>' +
                                                '<div class="dg-o-w-content"><div class="dg-o-w-section">' +
                                                    '<section></section>' +
                                                    '<footer class="dg-o-w-footer-login">' +
                                                        '<div class="footer-section footer-section-step-1">' +
                                                            '<div class="inline-part"><h3>Log in with Facebook and get +<span id="dg-o-w-login-fb-reward" class="dg-o-w-rewarded-action">30</span> points</h3></div>' +
                                                            '<div class="inline-part"><a href="#" id="dg-o-w-footer-fb-connect" class="btn-radius btn-large btn-brand">Facebook</a></div>' +
                                                            '<div class="inline-part"><p>or</p></div>' +
                                                            '<div class="inline-part"><a id="dg-o-w-footer-email-login" href="#" class="btn-radius btn-large btn-white">Sign up with email</a></div>' +
                                                        '</div>' +
                                                        '<div class="footer-section footer-section-step-2">' +
                                                            '<div>' +
                                                                '<a id="dg-o-w-footer-login-select" href="#" class="btn-back-footer">&larr; Back</a><form id="dg-o-w-footer-signup-email">' +
                                                                    '<div class="inline-part"><label>Name <input type="text" placeholder="First Name" /></label></div>' +
                                                                    '<div class="inline-part"><label>Email <input type="email" placeholder="mail@mail.com" /></label></div>' +
                                                                    '<div class="inline-part"><label>&nbsp; <input class="btn-dg-o-w-outline" type="submit" value="Submit" /></label></div>' +
                                                                '</form>' +
                                                            '</div>' +
                                                        '</div>' +
                                                        '<div class="footer-section footer-section-step-3">' +
                                                            '<div>' +
                                                                '<a id="dg-o-w-footer-login-select-2" href="#" class="btn-back-footer">&larr; Back</a><form id="dg-o-w-footer-signup-pass">' +
                                                                    '<div class="inline-part"><label>Password <input type="password" /></label></div>' +
                                                                    '<div class="inline-part"><label>&nbsp; <input class="btn-dg-o-w-outline" type="submit" value="Sign Up" /></label></div>' +
                                                                '</form>' +
                                                            '</div>' +
                                                        '</div>' +
                                                    '</footer>' +
                                                '</div></div>' +
                                            '</div>' +
                                            '<div class="dg-o-w-close">&times;</div>' +
                                            '<div class="dg-o-w-spinner">' +
                                                '<div class="sk-circle1 sk-circle"></div><div class="sk-circle2 sk-circle"></div><div class="sk-circle3 sk-circle"></div>' +
                                                '<div class="sk-circle4 sk-circle"></div><div class="sk-circle5 sk-circle"></div><div class="sk-circle6 sk-circle"></div>' +
                                                '<div class="sk-circle7 sk-circle"></div><div class="sk-circle8 sk-circle"></div><div class="sk-circle9 sk-circle"></div>' +
                                                '<div class="sk-circle10 sk-circle"></div><div class="sk-circle11 sk-circle"></div><div class="sk-circle12 sk-circle"></div>' +
                                            '</div>' +
                                        '</div>' +
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

DGW.templates.profileMain = '<div class="dg-o-w-profile">' +
                                '<div class="dg-o-w-left-side">' +
                                    '<div class="dg-o-w-image-holder"><img id="profileImage" class="avatar" src="" /></div>' +
                                    // TODO: hide until we have invite friends functionality
                                    /*
                                    '<p><span id="profileFriendsAmount">15</span> friends</p>' +
                                    */
                                '</div>' +
                                '<div class="dg-o-w-right-side">' +
                                    '<div class="dg-o-w-profile-top">' +
                                        '<div class="dg-o-w-float-left"><h3 id="profileName">Captain Deadpool</h3><h5><span id="dg-o-w-badges-earned-amount"></span> badges</h5></div>' +
                                        '<div class="dg-o-w-float-right">' +
                                            '<div class="dg-o-w-profile-points"><h3>115</h3><h5>20</h5></div>' +
                                            '<div class="dg-o-w-profile-credits"><h3>215.20</h3><h5>25.15</h5></div>' +
                                        '</div>' +
                                    '</div>' +
                                    '<div class="dg-o-w-profile-earnings-info">' +
                                        '<p class="color-brand-light">Today earned: <span>15</span> pts | left: <span>5</span>pts</p>' +
                                        '<p id="dg-o-w-login-fb-text">Get +<span class="dg-o-w-rewarded-action" id="dg-o-w-login-fb-reward">50</span> additional points by adding your other accounts from ' +
                                            '<a href="#" class="dg-o-w-fb-connect"></a></p>' +
                                    '</div>' +
                                    '<div class="dg-o-w-profile-progress"><div style="width:35%;"></div></div>' +
                                    '<div class="dg-o-w-profile-bottom">' +
                                        '<div class="dg-o-w-profile-invite dg-o-w-float-left">' +
                                            // TODO: hide until we have invite friends functionality
                                            /*
                                            '<p class="color-brand-light"><a href="#" class="btn-dg-o-w-outline">Invite more friends</a>' +
                                            ' and get +<span class="dg-o-w-rewarded-action" id="dg-o-w-friends-sign-up-reward">50</span> points for each friend</p>' +
                                            */
                                        '</div>' +
                                        '<div class="dg-o-w-profile-signout dg-o-w-float-right">' +
                                            '<p class="color-brand-light"><a id="dg-o-w-sign-out-btn" href="#">Sign out</a></p>' +
                                        '</div>' +
                                    '</div>' +
                                '</div>' +
                            '</div>' +
                            '<div class="dg-o-w-section-content content-static">' +
                                '<h3>Badges</h3>' +
                                '<div class="dg-o-w-badges-holder"><ul></ul></div>' +
                            '</div>';


DGW.templates.loginMain = '<div class="dg-o-w-login">' +
                                '<div class="dg-o-w-left-side"><div class="dg-o-w-image-holder"><div class="dg-o-w-brand-player-image"></div></div></div>' +
                                '<div class="dg-o-w-right-side">' +
                                    '<h1>Win exclusive prizes handling simple tasks</h1>' +
                                    '<div class="dg-o-w-login-winners">' +
                                        '<img class="avatar" src="" />' +
                                        '<div><h4><span></span> has won a signed t-shirt!</h4><h5>Sign up and get your own prize now</h5></div>' +
                                    '</div>' +
                                '</div>' +
                            '</div>';

DGW.templates.activitiesMain = '<div class="dg-o-w-submenu"><ul><li class="toggle-section-height"><div></div></li><li class="dg-o-w-active">Leaderboard</li></ul></div>' +
                                '<div class="dg-o-w-activities">' +
                                    '<div class="dg-o-w-activity-slider-holder">' +
                                        '<div class="dg-o-w-activity-slider-controls">' +
                                            '<div class="dg-o-w-activity-slider-prev dg-o-w-arrow dg-o-w-arrow-left"></div><div class="dg-o-w-activity-slider-next dg-o-w-arrow dg-o-w-arrow-right"></div>' +
                                        '</div>' +
                                        '<div class="dg-o-w-activity-slider"><ul></ul></div>' +
                                    '</div>' +
                                '</div>' +
                                '<div class="dg-o-w-section-content">' +
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
                                '</div>';

DGW.templates.videoHolder = '<div class="dg-o-w-video-holder"><div id="dg-o-w-video-playing"></div><div class="dg-o-w-video-text"><span></span></div></div>';

DGW.templates.notificationHolder = '<div class="dg-o-w-notification-holder"><ul></ul><div class="dg-o-w-notification-close">&times;</div></div>';