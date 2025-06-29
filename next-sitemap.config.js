module.exports = {
	siteUrl: 'https://sharmaspace.in',
	generateRobotsTxt: true,
	robotsTxtOptions: {
		policies: [{ userAgent: '*', allow: '/', disallow: ['/admin', '/api/*'] }],
		additionalSitemaps: ['https://sharmaspace.in/sitemap.xml'],
	},
};
