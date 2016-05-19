DGW.templates.side.profileInfo ='<div class="dg-side-section">' +
                                    '<div class="dg-side-user-img-holder"><img data-userstats-userimage class="dg-o-w-side-image-floating" src=""/></div>' +
                                    '<div class="dg-side-collapsed dg-side-floating-text"><p><span data-userstats-points-c class="dg-o-w-points-text">00</span></p><h5>Earn more</h5></div>' +
                                    '<div class="dg-side-content">' +
                                        '<h4 data-userstats-username>Name Surname Whatever</h4>' +
                                        '<h6><span data-userstats-points-c class="dg-o-w-points-text">00</span><br/><span data-userstats-credits-c data-round="2" class="dg-o-w-credits-text">00</span></h6>' +
                                    '</div>' +
                                '</div>' +
                                '<div data-page="earn" class="dg-side-cta-floating"><span class="dg-side-collapsed">&rarr;</span><span class="dg-side-expanded">Earn more points</span></div>';

DGW.templates.side.prizeGeneric =   '<div class="dg-side-section">' +
                                        '<div class="dg-side-img-holder"><img data-image="everton-crest-full.png" class="dg-o-w-side-image-floating" src=""/></div>' +
                                        '<div class="dg-side-content">Sign up & get +10 points</div>' +
                                    '</div>' +
                                    '<div class="dg-side-collapsed"><div data-page="profile" class="dg-side-cta">Sign Up</div></div>' +
                                    '<div class="dg-side-expanded"><div data-page="profile" class="dg-side-cta">Sign up & get +10 points</div></div>';

DGW.templates.sideWidgetCore = '<div id="dg-side-widget-wrapper">' +
                                    '<div class="dg-side-widget-body">' +
                                        '<div class="dg-side-widget-content"></div>' +
                                        '<div data-page="earn" class="dg-side-click-holder"></div>' +
                                        '<div class="dg-side-notification-holder"></div>' +
                                    '</div>' +
                                '</div>';

DGW.templates.side.draw =  '<div class="dg-side-section">' +
                                        '<img data-image="temp-green-tee.png" class="dg-side-image-bg" src=""/>' +
                                        '<div class="dg-side-content">' +
                                            '<p>Win<br/>prizes</p>' +
                                            '<div class="dg-side-cta">Play</div>' +
                                        '</div>' +
                                    '</div>' +
                                    '<div class="dg-side-bottom-floating"><div class="dg-side-progress-bar"><div class="dg-side-progress-bar-inner"></div></div></div>';

DGW.templates.side.anonymousSignUp =  '<div class="dg-side-section dg-full-size">' +
                                        '<img data-image="temp-signup-bg.png" class="dg-side-image-bg" src=""/>' +
                                        '<div class="dg-side-content">' +
                                            '<p>Join<br/>Everton<br/>&<br/><span class="dg-o-w-font-smaller dg-o-w-color-brand">get prizes</span></p>' +
                                            '<div class="dg-side-cta">Join</div>' +
                                        '</div>' +
                                    '</div>' +
                                    '<div class="dg-side-bottom-floating"><div class="dg-side-progress-bar"><div class="dg-side-progress-bar-inner"></div></div></div>';

DGW.templates.side.registeredProfile =  '<div class="dg-side-section dg-small-size">' +
                                            '<img data-userstats-userimage class="dg-side-image-bg" src=""/>' +
                                            '<div class="dg-side-content">' +
                                                '<div class="dg-side-progress-bar"><div class="dg-side-progress-bar-inner"></div></div>' +
                                                '<p data-userstats-points-c class="dg-o-w-points-text">00</p>' +
                                            '</div>' +
                                        '</div>';

DGW.templates.side.actions = {
    earn: '<div class="dg-side-bottom-floating dg-side-action" data-page="earn">Earn</div>',
    play: '<div class="dg-side-bottom-floating dg-side-action" data-page="draws">Play</div>',
    stats: '<div class="dg-side-bottom-floating dg-side-action" data-page="profile">Stats</div>'
};

DGW.templates.side.notifications = {
    winner: '<div class="dg-side-notification dg-side-claim-prize"></div>'
};