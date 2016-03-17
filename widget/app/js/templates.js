DGW.templates.sideWidgetCore = '<div id="dg-side-widget-wrapper">' +
                                    '<div class="dg-side-widget-body"></div>' +
                               '</div>';

DGW.templates.mainWidgetCore = '<div id="dg-o-w-wrapper">' +
                                    '<div class="dg-o-w-overlay">' +
                                        '<div class="dg-o-w-body">' +
                                            '<div class="dg-o-w-header">' +
                                                '<div class="dg-o-w-logo">' +
                                                    '<img src="./imgs/everton-logo.jpg" alt="Club Logo" />' +
                                                '</div>' +
                                                '<div class="dg-o-w-menu">' +
                                                    '<ul><li class="earn-menu-item">Earn</li>' +
                                                    '<li class="draws-menu-item">Draws & Games</li>' +
                                                    '<li class="activities-menu-item">Activities</li></ul>' +
                                                '</div>' +
                                                '<div class="dg-o-w-menu-profile">' +
                                                    '<div class="profile-menu-item">' +
                                                        '<div class="profile-menu-unauthorized">' +
                                                            '<img src="http://lorempixel.com/100/100/cats" />' +
                                                            '<div>' +
                                                                '<h4>Hello, guest!</h4>' +
                                                                '<div class="dg-o-w-login-dropdown">' +
                                                                    '<a href="#">Log in by email</a>' +
                                                                    '<div class="dg-o-w-email-login-form">' +
                                                                        '<form>' +
                                                                            '<label>Email <input type="email" placeholder="mail@mail.com" /></label>' +
                                                                            '<label>Password <input type="password" /></label>' +
                                                                            '<input type="submit" value="Sign In" />' +
                                                                            '<a href="#" class="">Forgot your password?</a>' +
                                                                        '</form>' +
                                                                    '</div>' +
                                                                '</div>' +
                                                            '</div>' +
                                                        '</div>' +
                                                        '<div class="profile-menu-authorized">' +
                                                            '<img src="http://lorempixel.com/100/100/cats" />' +
                                                            '<div>' +
                                                                '<h4>Hello, Paul!</h4>' +
                                                                '<p><span id="dg-o-w-points">25</span> points | <span id="dg-o-w-credits">115.25</span> credits</p>' +
                                                            '</div>' +
                                                        '</div>' +
                                                    '</div>' +
                                                '</div>' +
                                            '</div>' +
                                            '<div class="dg-o-w-content"><div class="dg-o-w-section">' +
                                                '<section></section>' +
                                                '<footer class="dg-o-w-footer-login">' +
                                                    '<div class="footer-section footer-section-step-1">' +
                                                        '<div class="inline-part"><h3>Log in with Facebook and get +10 points</h3></div>' +
                                                        '<div class="inline-part"><a href="#" class="btn-radius btn-large btn-brand">Facebook</a></div>' +
                                                        '<div class="inline-part"><p>or</p></div>' +
                                                        '<div class="inline-part"><a id="dg-o-w-footer-email-login" href="#" class="btn-radius btn-large btn-white">Sign up with email</a></div>' +
                                                    '</div>' +
                                                    '<div class="footer-section footer-section-step-2">' +
                                                        '<a id="dg-o-w-footer-login-select" href="#" class="btn-back-footer">&larr; Back</a><form>' +
                                                            '<div class="inline-part"><label>Name <input type="text" placeholder="First Name" /></label></div>' +
                                                            '<div class="inline-part"><label>Email <input type="email" placeholder="mail@mail.com" /></label></div>' +
                                                            '<div class="inline-part"><label>Password <input type="password" /></label></div>' +
                                                            '<div class="inline-part"><label>&nbsp; <input class="btn-dg-o-w-outline" type="submit" value="Sign Up" /></label></div>' +
                                                        '</form>' +
                                                    '</div>' +
                                                '</footer>' +
                                            '</div></div>' +
                                            '<div class="dg-o-w-close">&times;</div>' +
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
                        '<div class="dg-o-w-section-content dg-o-w-submenu-exist">' +
                            '<h3>Complete the tasks and earn +500 points today</h3>' +
                            '<ul class="dg-o-w-list-offers">' +
                                '<li></li><li></li><li></li><li></li><li></li><li></li><li></li></ul>' +
                        '</div>';

DGW.templates.drawsMain = '<div class="dg-o-w-submenu">' +
                            '<ul><li class="dg-o-w-active">All draws</li><li>Finished soon</li>' +
                                '<li>My draws</li><li>Games</li></ul>' +
                            '<label class="checkbox-slider">Show finished draws <input type="checkbox" class="ios-switch bigswitch" /><div><div></div></div></label>' +
                        '</div>' +
                        '<div class="dg-o-w-section-content dg-o-w-submenu-exist">' +
                            '<h3>Available draws</h3>' +
                            '<ul class="dg-o-w-list-draws">' +
                                '<li></li><li></li><li></li><li></li><li></li><li></li><li></li>' +
                            '</ul>' +
                        '</div>';

DGW.templates.profileMain = '<div class="dg-o-w-profile">' +
                                '<div class="dg-o-w-left-side">' +
                                    '<div class="dg-o-w-image-holder"><img src="http://lorempixel.com/500/500/cats" /></div>' +
                                    '<p><span>15</span> friends</p>' +
                                '</div>' +
                                '<div class="dg-o-w-right-side">' +
                                    '<div class="dg-o-w-profile-top">' +
                                        '<div class="dg-o-w-float-left"><h3>Captain Deadpool</h3><h5>2 badges</h5></div>' +
                                        '<div class="dg-o-w-float-right">' +
                                            '<div class="dg-o-w-profile-points"><h3>115</h3><h5>20</h5></div>' +
                                            '<div class="dg-o-w-profile-credits"><h3>215.20</h3><h5>25.15</h5></div>' +
                                        '</div>' +
                                    '</div>' +
                                    '<div class="dg-o-w-profile-earnings-info">' +
                                        '<p class="color-brand-light">Today earned: <span>15</span> pts | left: <span>5</span>pts</p>' +
                                        '<p>Get +10 additional points by adding your other accounts from ' +
                                            '<a href="#" class="facebook">f</a> and <a href="#" class="twitter">t</a></p>' +
                                    '</div>' +
                                    '<div class="dg-o-w-profile-progress"><div style="width:35%;"></div></div>' +
                                    '<div class="dg-o-w-profile-bottom">' +
                                        '<div class="dg-o-w-profile-invite dg-o-w-float-left">' +
                                            '<p class="color-brand-light"><a href="#" class="btn-dg-o-w-outline">Invite more friends</a>' +
                                            ' and get <span>+50</span> points for each friend</p>' +
                                        '</div>' +
                                        '<div class="dg-o-w-profile-signout dg-o-w-float-right">' +
                                            '<p class="color-brand-light"><a href="#">Sign out</a></p>' +
                                        '</div>' +
                                    '</div>' +
                                '</div>' +
                            '</div>' +
                            '<div class="dg-o-w-section-content">' +
                                '<h3>Badges</h3>' +
                                '<div class="dg-o-w-badges-holder"><ul></ul></div>' +
                            '</div>';


DGW.templates.loginMain = '<div class="dg-o-w-login">' +
                                '<div class="dg-o-w-left-side"><div class="dg-o-w-image-holder"><img src="./imgs/kevin-mirallas.png" /></div></div>' +
                                '<div class="dg-o-w-right-side">' +
                                    '<h1>Win exclusive prizes handling simple tasks</h1>' +
                                    '<a href="#" class="btn-radius btn-large btn-brand-3d">Join now</a>' +
                                    '<div class="dg-o-w-login-winners">' +
                                        '<img src="http://lorempixel.com/100/100/cats" />' +
                                        '<div><h4>Daniel won a signed t-shirt!</h4><h5>Sign up and get your own prize now</h5></div>' +
                                    '</div>' +
                                '</div>' +
                            '</div>';

DGW.templates.activitiesMain = '<div class="dg-o-w-submenu"><ul><li class="toggle-section-height"><div></div></li><li class="dg-o-w-active">Leaderboard</li></ul></div>' +
                                '<div class="dg-o-w-activities">' +
                                    '<div class="dg-o-w-activity-slider-holder">' +
                                        '<div class="dg-o-w-activity-slider-controls">' +
                                            '<div class="dg-o-w-activity-slider-prev"><</div><div class="dg-o-w-activity-slider-next">></div>' +
                                        '</div>' +
                                        '<div class="dg-o-w-activity-slider"><ul></ul></div>' +
                                    '</div>' +
                                '</div>' +
                                '<div class="dg-o-w-section-content dg-o-w-submenu-activities">' +
                                    '<div class="dg-o-w-activities-header">' +
                                        '<p class="dg-o-w-float-left">Activities for today</p>' +
                                        '<p class="dg-o-w-floating-link"><a href="#">Invite more friends</a> and get +50 points for each</p>' +
                                        '<select class="dg-o-w-float-right">' +
                                            '<option>All activities</option>' +
                                        '</select>' +
                                    '</div>' +
                                    '<div class="dg-o-w-activities-holder"><ul></ul></div>' +
                                '</div>';
