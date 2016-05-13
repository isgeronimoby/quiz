import { iframeSrc, apiKey } from './config.js';
export { apiPrefix, iframeSrc, apiKey } from './config.js';
//require("imports?window=>{},this=>window!exports?window.easyXDM!./easyXDM.debug.js"); // TODO

// from index.html
export const rpc = new easyXDM.Rpc({
	remote: iframeSrc
}, {
	remote: {
		apiTunnel: {},
		writeClubCookie: {},
		readClubCookie: {}
	}
});

function fetch(options) {
	const { method = 'GET', endpoint, data } = options;
	const params = method === 'GET' ? (data || '') : JSON.stringify(data);

	return new Promise((resolve, reject) => {
		rpc.apiTunnel({
				apiKey,
				method,
				endpoint,
				params
			},
			function onSuccess(response) {
				console.log('>>success:', response);

				if (!response.error) {
					resolve(response.data);
				}
				else {
					reject(JSON.parse(response.error));
				}
			},
			function onError(response) {
				console.log('>>error:', response);
				reject(JSON.parse(response.error));
			});
	});
}

export default fetch;
