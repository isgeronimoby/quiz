window.DGW = function () {
    if (document.getElementById('dgl-gamified-widget')) {
        var widgetScript = document.getElementById('dgl-gamified-widget');
        var widgetPathName = widgetScript.src;
        widgetPathName = widgetPathName.substring(widgetPathName.lastIndexOf('/') + 1, 0);
        var key = widgetScript.getAttribute('data-key');
        var tunnelPath;
        if (key) {
            if (widgetScript.getAttribute('data-tunnel') !== null) {
                tunnelPath = 'http://spr-api-test.cloudapp.net/tunnel.html';
                if (widgetScript.getAttribute('data-tunnel') === 'local') {
                    tunnelPath = 'http://localhostdev/spr-api/tunnel.html';
                } else if (widgetScript.getAttribute('data-tunnel') === 'live') {
                    tunnelPath = 'https://api.rewarded.club/tunnel.html';
                }
            } else {
                // No parameter - use production path
                tunnelPath = 'https://api.rewarded.club/tunnel.html';
            }
            console.log(tunnelPath);
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
                    authorized: false,
                    launched: false,
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
                    tunnelPath: tunnelPath,
                    widgetPathName: widgetPathName,
                    userStats: {}
                },
                states: {},
                helpers: {}
            };
        }
    }
    console.warn('No script ID or data-key attribute provided');
}();

if (!DGW) return;
