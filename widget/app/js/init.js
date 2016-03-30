window.DGW = function () {
    if (document.getElementById('dgl-gamified-widget')) {
        var widgetScript = document.getElementById('dgl-gamified-widget');
        var key = widgetScript.getAttribute('data-key');
        var tunnelPath;
        if (key) {
            if (widgetScript.getAttribute('data-tunnel') !== null) {
                tunnelPath = 'http://spr-api-test.cloudapp.net/tunnel.html';
                if (widgetScript.getAttribute('data-tunnel') === 'local') {
                    tunnelPath = 'http://localhostdev/spr-api/tunnel.html';
                }
            } else {
                // No parameter - use production path
                tunnelPath = 'https://api.rewarded.club/tunnel.html';
            }
            return {
                templates: {},
                main: {
                    methods: {},
                    elements: {
                        pages: {}
                    },
                    currentState: 'earn',
                    cache: {
                        drawsList: [],
                        drawsEntries: []
                    }
                },
                side: {
                    methods: {},
                    elements: {}
                },
                global: {
                    authorized: false,
                    launched: false,
                    api: {
                        apiKey: key,
                        requests: {}
                    },
                    elements: {},
                    methods: {},
                    tunnelPath: tunnelPath
                },
                states: {},
                helpers: {}
            };
        }
    }
    console.warn('No script ID or data-key attribute provided');
}();

if (!DGW) return;