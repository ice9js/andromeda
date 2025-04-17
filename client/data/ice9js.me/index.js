/**
 * External dependencies
 */
import GhostContentAPI from '@tryghost/content-api';

/**
 * Internal dependencies
 */
import { config } from 'config';

export const ghost = new GhostContentAPI({
	url: config('api.host'),
	key: config('api.key'),
	version: config('api.version'),
});
