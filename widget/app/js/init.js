window.DGW = function () {
    if (document.getElementById('dgl-gamified-widget')) {
        var key = document.getElementById('dgl-gamified-widget').getAttribute('data-key');
        if (key) {
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
                    methods: {}
                },
                states: {},
                helpers: {}
            };
        }
    }
    console.warn('No script ID or data-key attribute provided');
}();

if (!DGW) return;