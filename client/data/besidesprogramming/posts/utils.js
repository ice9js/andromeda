/**
 * External dependencies
 */
import { get, map, merge, pick, tap } from 'lodash';

export const parseResponse = (response) => ({
	items: map(response.data.posts, (post) => ({
		...pick(post, ['id', 'slug', 'next', 'previous']),
		title: post.title,
		link: post.url,
		date: post.published_at,
		modified: post.updated_at,
		// add a default image as well
		image: post.feature_image,
		content: post.html,
		excerpt: post.excerpt,
		author: post.primary_author.name,
	})),
	total: response.data.meta.pagination.total,
	totalPages: response.data.meta.pagination.pages,
});
