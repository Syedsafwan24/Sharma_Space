/**
 * Centralized Data Export Hub for Sharma Space
 *
 * This file serves as the main entry point for all mock data used throughout
 * the Sharma Space interior design website. It provides a clean, organized
 * way to import data across components while maintaining SEO compliance
 * and E-E-A-T standards.
 *
 * @version 1.0.0
 * @author Sharma Space Development Team
 * @compliance SEO 2024 Standards, E-E-A-T Guidelines
 */

// Blog Data - Empty since data is in database
// import blogUnifiedData from './blog/blogUnifiedData';

// Portfolio Data - Empty since data is in database
// import portfolioProjects from './portfolio/portfolioUnifiedData';

// Services Data - Empty since data is in database
// import servicesData from './services/services.json';

// Testimonials Data - Empty since data is in database
// import testimonials from './testimonials/testimonialsUnifiedData';

// Team Data - Keep for static team info
import teamMembersData from './team/members.json';

// Contact Data - Empty since data is in database
// import messagesJson from './contact/messages.json';

// Company Data
import companyStatsData from './company/stats.json';
import partnerBrandsData from './company/brands.json';

// Dynamic Stats - Now async
import { calculateDynamicStats, getStatsWithMetadata } from './dynamicStats';

// Blog Exports - Data is now in database
// export const blogPosts = blogUnifiedData.posts;
// export const blogCategories = blogUnifiedData.categories;
// export const blogAuthors = blogUnifiedData.authors;
// export const blogMetadata = {
//	posts: blogUnifiedData.metadata,
//	categories: blogUnifiedData.metadata,
//	authors: blogUnifiedData.metadata,
// };

// Portfolio Exports
// Data is now in database - use API endpoints instead
// export { portfolioProjects };

// Services Exports - Data is now in database
// export const services = servicesData.services;
// export const servicesMetadata = servicesData.metadata;

// Testimonials Exports - Data is now in database
// export { testimonials };

// Team Exports - Keep for static team info
export const teamMembers = teamMembersData.members;
export const teamStats = teamMembersData.stats;
export const teamMetadata = teamMembersData.metadata;

// Contact Exports - Data is now in database
// export const contactMessages = messagesJson.messages;
// export const contactStats = messagesJson.stats;
// export const contactFilters = messagesJson.filters;
// export const contactMetadata = messagesJson.metadata;

// Company Exports
export const companyStats = companyStatsData.stats;
export const companyInfo = companyStatsData.companyInfo;
export const companyAchievements = companyStatsData.achievements;
export const companyStatsMetadata = companyStatsData.metadata;

// Partner Brands Exports
export const partnerBrands = partnerBrandsData.partnerBrands;
export const brandCategories = partnerBrandsData.categories;
export const brandStats = partnerBrandsData.stats;
export const brandBenefits = partnerBrandsData.benefits;
export const brandsMetadata = partnerBrandsData.metadata;

// Dynamic Stats Exports - Now async functions
export const getDynamicStats = calculateDynamicStats;
export const getStatsWithMetadataAsync = getStatsWithMetadata;

// For backward compatibility - returns default stats (will be updated when called)
export const dynamicStats = [
	{
		title: 'Total Projects',
		value: '0',
		icon: 'Package',
		color: '#4A90E2',
		description: 'Completed interior design projects',
	},
	{
		title: 'Services Offered',
		value: '0',
		icon: 'Settings',
		color: '#50E3C2',
		description: 'Professional design services',
	},
	{
		title: 'Testimonials',
		value: '0',
		icon: 'MessageSquare',
		color: '#B8E986',
		description: 'Client testimonials and reviews',
	},
	{
		title: 'New Inquiries',
		value: '0',
		icon: 'Mail',
		color: '#F8E71C',
		description: 'Recent contact inquiries',
	},
	{
		title: 'Blog Posts',
		value: '0',
		icon: 'Edit',
		color: '#7B61FF',
		description: 'Published blog articles',
	},
];

// SEO Helper Functions
export const generateBlogPostSchema = (post) => {
	const author = getAuthorBySlug(post.author.id);
	return {
		'@context': 'https://schema.org',
		'@type': 'Article',
		headline: post.title,
		description: post.excerpt,
		image: post.mainImage.url,
		datePublished: post.publishedAt,
		dateModified: post.lastModified,
		author: {
			'@type': 'Person',
			name: author?.name || post.author.name,
			jobTitle: author?.title || post.author.specialization,
		},
		publisher: {
			'@type': 'Organization',
			name: 'Sharma Space',
			logo: {
				'@type': 'ImageObject',
				url: '/images/icon/SharmaSpace-Logo.png',
			},
		},
		mainEntityOfPage: {
			'@type': 'WebPage',
			'@id': `https://sharmaspace.in/blog/${post.slug}`,
		},
	};
};

export const generateProjectSchema = (project) => {
	return {
		'@context': 'https://schema.org',
		'@type': 'CreativeWork',
		name: project.title,
		description: project.description,
		image: project.coverImage.url,
		creator: {
			'@type': 'Organization',
			name: 'Sharma Space',
		},
		dateCreated: project.completedDate,
		locationCreated: {
			'@type': 'Place',
			name: project.location,
		},
		genre: project.category.name,
	};
};

// Data Validation - Only for static data (database data checked via APIs)
export const validateDataIntegrity = () => {
	const checks = {
		// blogPosts: blogPosts.length > 0, // In database
		// portfolioProjects: portfolioProjects.length > 0, // In database
		// services: services.length > 0, // In database
		// testimonials: testimonials.length > 0, // In database
		teamMembers: teamMembers.length > 0,
		partnerBrands: partnerBrands.length > 0,
	};

	const failedChecks = Object.entries(checks)
		.filter(([key, value]) => !value)
		.map(([key]) => key);

	if (failedChecks.length > 0) {
		console.warn('Static data integrity check failed for:', failedChecks);
	}

	return failedChecks.length === 0;
};

// Export available static data only (database data accessed via APIs)
export const allData = {
	// blog: { posts: blogPosts, categories: blogCategories, authors: blogAuthors }, // In database
	// services, // In database
	// testimonials, // In database
	team: teamMembers,
	// contact: contactMessages, // In database
	company: {
		stats: companyStats,
		info: companyInfo,
		achievements: companyAchievements,
	},
	brands: partnerBrands,
};

// Metadata for the entire data system
export const dataSystemMetadata = {
	version: '1.0.0',
	lastUpdated: '2024-05-15T10:00:00Z',
	note: 'Database entities accessed via API endpoints, not static data',
	staticEntities: {
		teamMembers: teamMembers.length,
		partnerBrands: partnerBrands.length,
	},
	databaseEntities: {
		note: 'Use API endpoints: /api/blog-posts, /api/projects, /api/services, /api/testimonials, /api/messages',
	},
	seoCompliance: '2024 Google E-E-A-T Standards',
	location: 'Bangalore, India',
	description:
		'Centralized data system for Sharma Space - database content via APIs, static content here',
};
