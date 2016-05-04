export * from './auth.js';
export * from './profile.js';
export * from './users.js';
export * from './partners.js';
export * from './fixtures.js';

export const TOGGLE_WELCOME = 'TOGGLE_WELCOME';

export function toggleWelcome(show) {
	return {
		type: TOGGLE_WELCOME,
		show
	}
}
