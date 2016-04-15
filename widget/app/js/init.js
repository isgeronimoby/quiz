window.DGW = function () {
    if (document.getElementById('dgl-gamified-widget')) {
        var widgetScript = document.getElementById('dgl-gamified-widget');
        var widgetPathName = widgetScript.src;
        widgetPathName = widgetPathName.substring(widgetPathName.lastIndexOf('/') + 1, 0);
        var key = widgetScript.getAttribute('data-key');
        var envPath;
        var debugMode = false;
        var widgetType = 'club';

        if (key) {

            // getting tunnel file path
            if (widgetScript.getAttribute('data-tunnel') !== null) {
                envPath = 'http://spr-api-test.cloudapp.net/tunnel.html';
                if (widgetScript.getAttribute('data-tunnel') === 'local') {
                    envPath = 'http://localhostdev/spr-api/tunnel.html';
                } else if (widgetScript.getAttribute('data-tunnel') === 'live') {
                    envPath = 'https://api.rewarded.club/tunnel.html';
                }
            } else {
                // No parameter - use production path
                envPath = 'https://api.rewarded.club/tunnel.html';
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
                    shown: false
                },
                side: {
                    methods: {},
                    elements: {}
                },
                global: {
                    type: widgetType, // sponsor || club
                    authorized: false,
                    launched: false,
                    safariFix: false,
                    activeDrawsExist: false,
                    offers: {
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
                    tunnelPath: envPath,
                    widgetPathName: widgetPathName,
                    userStats: {},
                    debug: debugMode
                },
                states: {},
                helpers: {}
            };
        }
    }
    console.warn('No script ID or data-key attribute provided');
}();

if (!DGW) return;
