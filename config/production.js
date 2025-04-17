/**
 * Production app settings
 */
const settings = {
	env: 'production',
	app: {
		name: 'ice9js | Kuba Birecki',
		description: 'A software engineer\'s journal.',
		host: 'https://ice9js.me',
		port: 3000,
		gtmId: 'GTM-KN4FS4P',
		disqusShortname: 'besidesprogramming',
		discourseUrl: 'https://community.ice9js.me/',
		twitterHandle: '@ice9js',
		openGraphImage: 'https://ice9js.me/andromeda/img/open-graph-default-image.png',
		pinterestDefaultImage: 'https://ice9js.me/andromeda/img/open-graph-default-image.png',
	},
	api: {
		key: '874b5e900f560e2c3297d463ff',
		host: 'https://ice9js.me',
		version: 'v5.0',
	},
	assets: {
		host: 'https://ice9js.me',
		paths: {
			uploads: ''
		},
	},
	photon: {
		enabled: false,
		host: 'https://i0.wp.com',
		sizes: [ 380, 570, 768, 960, 1150, 1920, 2550 ],
	},
	posts: {
		perPage: 10,

		categories: {
			thoughts: {
				id: 'thoughts',
				label: 'Thoughts',
				url: '/thoughts',
			},
			programming: {
				id: 'programming',
				label: 'Programming',
				url: '/programming',
			},
			travel: {
				id: 'travel',
				label: 'Travel',
				url: '/travel',
			},
			photos: {
				id: 'photos',
				label: 'Photos',
				url: '/photos',
			},
		},
	},
	socialLinks: [
		{
			icon: 'rss',
			title: 'RSS Feed',
			url: 'https://ice9js.me/rss/',
		},
		{
			icon: ['fab', 'discord'],
			title: 'Discord',
			url: 'https://discord.ice9js.me',
		},
		{
			icon: ['fab', 'instagram'],
			title: 'Instagram',
			url: 'https://www.instagram.com/ice9js/',
		},
		{
			icon: ['fab', 'twitter'],
			title: 'Twitter',
			url: 'https://twitter.com/ice9js',
		},
		{
			icon: ['fab', 'facebook-f'],
			title: 'Facebook',
			url: 'https://www.facebook.com/themissingsemicolon/',
		},
	],
};

export default settings;
