const isDev = (process.env.NODE_ENV === 'development');

if (isDev) {
	module.exports = require('./config.dev.js');
} else {
	module.exports = window.config; // from index.html
}
