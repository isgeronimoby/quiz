import { iframeSrc, apiKey } from './config.js';
//require("imports?window=>{},this=>window!exports?window.easyXDM!./easyXDM.debug.js"); // TODO

// Loaded in index.html
const rpc = new easyXDM.Rpc({
	remote: iframeSrc
}, {
	remote: {
		apiTunnel: {},
		//writeClubCookie: {},
		//readClubCookie: {}
	}
});

function fetch(options) {
	const { method = 'GET', endpoint, body } = options;

	return new Promise((resolve, reject) => {
		rpc.apiTunnel({
				apiKey,
				method,
				endpoint,
				params: body ? JSON.stringify(body) : ''
			},
			function onSuccess(response) {
				//console.log('>>success:', response);
				resolve(response.data);
			},
			function onError(error) {
				//console.log('>>error:', error);
				reject(error.message);
			});
	});
}

export default fetch;
