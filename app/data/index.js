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

// Blog Data
import blogUnifiedData from './blog/blogUnifiedData';

// Portfolio Data
import portfolioProjects from './portfolio/portfolioUnifiedData';

// Services Data
import servicesData from './services/services.json';

// Testimonials Data
import testimonials from './testimonials/testimonialsUnifiedData';

// Team Data
import teamMembersData from './team/members.json';

// Contact Data
import messagesJson from './contact/messages.json';

// Company Data
import companyStatsData from './company/stats.json';
import partnerBrandsData from './company/brands.json';

// Dynamic Stats
import { calculateDynamicStats, getStatsWithMetadata } from './dynamicStats';

// Blog Exports
export const blogPosts = blogUnifiedData.posts;
export const blogCategories = blogUnifiedData.categories;
export const blogAuthors = blogUnifiedData.authors;
export const blogMetadata = {
	posts: blogUnifiedData.metadata,
	categories: blogUnifiedData.metadata,
	authors: blogUnifiedData.metadata,
};

// Portfolio Exports
export { portfolioProjects };

// Services Exports
export const services = servicesData.services;
export const servicesMetadata = servicesData.metadata;

// Testimonials Exports
export { testimonials };
export const testimonialsStats = testimonials.stats;
export const testimonialsMetadata = testimonials.metadata;

// Team Exports
export const teamMembers = teamMembersData.members;
export const teamStats = teamMembersData.stats;
export const teamMetadata = teamMembersData.metadata;

// Contact Exports
export const contactMessages = messagesJson.messages;
export const contactStats = messagesJson.stats;
export const contactFilters = messagesJson.filters;
export const contactMetadata = messagesJson.metadata;

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

// Dynamic Stats Exports
export const dynamicStats = calculateDynamicStats();
export const statsWithMetadata = getStatsWithMetadata();

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

// Data Validation
export const validateDataIntegrity = () => {
	const checks = {
		blogPosts: blogPosts.length > 0,
		portfolioProjects: portfolioProjects.length > 0,
		services: services.length > 0,
		testimonials: testimonials.length > 0,
		teamMembers: teamMembers.length > 0,
		partnerBrands: partnerBrands.length > 0,
	};

	const failedChecks = Object.entries(checks)
		.filter(([key, value]) => !value)
		.map(([key]) => key);

	if (failedChecks.length > 0) {
		console.warn('Data integrity check failed for:', failedChecks);
	}

	return failedChecks.length === 0;
};

// Export all data for debugging/development
export const allData = {
	blog: { posts: blogPosts, categories: blogCategories, authors: blogAuthors },
	services,
	testimonials,
	team: teamMembers,
	contact: contactMessages,
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
	totalEntities: {
		blogPosts: blogPosts.length,
		portfolioProjects: portfolioProjects.length,
		services: services.length,
		testimonials: testimonials.length,
		teamMembers: teamMembers.length,
		contactMessages: contactMessages.length,
		partnerBrands: partnerBrands.length,
	},
	seoCompliance: '2024 Google E-E-A-T Standards',
	location: 'Bangalore, India',
	description:
		'Centralized mock data system for Sharma Space interior design website',
};
