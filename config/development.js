/**
 * Development app settings
 */
const settings = {
	env: 'development',
	app: {
		name: 'The Missing Semicolon',
		description: 'A software engineer\'s journal. By Kuba Birecki.',
		host: 'andromeda.local',
		port: 3000,
		gtmId: 'GTM-KN4FS4P',
		disqusShortname: 'besidesprogramming-dev',
		twitterHandle: '@ice9js',
		openGraphImage: 'https://themissingsemicolon.blog/andromeda/img/open-graph-default-image.png',
		pinterestDefaultImage: 'https://themissingsemicolon.blog/andromeda/img/open-graph-default-image.png',
	},
	api: {
		key: 'f8f545cf815d33698b977cf7ca',
		host: 'https://andromeda.local/ghost/api/content',
	},
	assets: {
		host: 'https://andromeda.local',
		paths: {
			uploads: '/wp-content/uploads'
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
			url: 'https://themissingsemicolon.blog/feed/',
		},
		{
			icon: ['fab', 'discord'],
			title: 'Discord',
			url: 'https://discord.gg/MdqDBXus2Q',
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
