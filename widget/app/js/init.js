var DGW = function () {
    if (document.getElementById('dgl-gamified-widget')) {
        var widgetScript = document.getElementById('dgl-gamified-widget');
        var widgetPathName = widgetScript.src;
        widgetPathName = widgetPathName.substring(widgetPathName.lastIndexOf('/') + 1, 0);
        var key = widgetScript.getAttribute('data-key');
        var envPath, tunnelPath;
        var debugMode = false;
        var widgetType = 'club';

        if (key) {

            // getting tunnel file path
            if (widgetScript.getAttribute('data-tunnel') !== null) {
                tunnelPath = 'http://spr-api-test.cloudapp.net/core/v1/xdm/tunnel';
                envPath = tunnelPath.substring(tunnelPath.lastIndexOf('/xdm/') + 1, 0);
                if (widgetScript.getAttribute('data-tunnel') === 'local') {
                    tunnelPath = 'http://localhostdev/spr-api/core/v1/xdm/tunnel';
                    envPath = tunnelPath.substring(tunnelPath.lastIndexOf('/xdm/') + 1, 0);
                } else if (widgetScript.getAttribute('data-tunnel') === 'live') {
                    tunnelPath = 'https://api.rewarded.club/core/v1/xdm/tunnel';
                    envPath = tunnelPath.substring(tunnelPath.lastIndexOf('/xdm/') + 1, 0);
                }
            } else {
                // No parameter - use production path
                tunnelPath = 'https://api.rewarded.club/core/v1/xdm/tunnel';
                envPath = tunnelPath.substring(DGW.global.tunnelPath.lastIndexOf('/xdm/') + 1, 0);
            }

            // checking for debug mode
            if (widgetScript.getAttribute('data-debug') !== null) {
                debugMode = widgetScript.getAttribute('data-debug') !== 'false';
            }

            // checking for type
            if (widgetScript.getAttribute('data-type') !== null && widgetScript.getAttribute('data-type') !== '') {
                widgetType = widgetScript.getAttribute('data-type');
            }
            return {
                templates: {},
                main: {
                    methods: {},
                    elements: {
                        pages: {}
                    },
                    currentState: '',
                    cache: {
                        drawsList: [],
                        drawsEntries: [],
                        rewardedActions: []
                    },
                    shown: false,
                    settings: {
                        hiddenDrawsShow: true
                    }
                },
                side: {
                    methods: {},
                    elements: {}
                },
                global: {
                    type: widgetType, // sponsor || club
                    club: {
                        name: 'TEST_CLUB'
                    },
                    authorized: false,
                    launched: false,
                    safariFix: false,
                    activeDrawsExist: false,
                    offers: {
                        requests: {}
                    },
                    actions: {
                        requests: {}
                    },
                    api: {
                        apiKey: key,
                        requests: {}
                    },
                    cache: {
                        last: {}
                    },
                    elements: {},
                    methods: {},
                    tunnelPath: tunnelPath,
                    envPath: envPath,
                    widgetPathName: widgetPathName,
                    userStats: {},
                    debug: debugMode,
                    safariFixFirstOpen: false
                },
                states: {},
                helpers: {}
            };
        }
    }
    console.warn('No script ID or data-key attribute provided');
}();

if (!DGW) return;
