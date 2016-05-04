import { iframeSrc, apiKey } from './config.js';
//require("imports?window=>{},this=>window!exports?window.easyXDM!./easyXDM.debug.js"); // TODO

// from index.html
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
	const { method = 'GET', endpoint, data } = options;

	return new Promise((resolve, reject) => {
		rpc.apiTunnel({
				apiKey,
				method,
				endpoint,
				params: data ? JSON.stringify(data) : ''
			},
			function onSuccess(response) {
				console.log('>>success:', response);

				if (!response.error) {
					resolve(response.data);
				}
				else {
					reject(JSON.parse(response.error).Message);
				}
			},
			function onError(error) {
				console.log('>>error:', error);
				reject(error.Message);
			});
	});
}

export default fetch;
