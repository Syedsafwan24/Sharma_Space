// Dynamic statistics calculator - Now fetches from database APIs
import { getBaseUrl } from '@/lib/utils';

// Calculate dynamic statistics by fetching from APIs
export const calculateDynamicStats = async () => {
	try {
		const baseUrl = getBaseUrl();

		// ...existing code...

		// Fetch data from all API endpoints with error handling
		const [projects, services, testimonials, messages, blogPosts] =
			await Promise.allSettled([
				fetch(`${baseUrl}/api/projects`).then((res) =>
					res.ok ? res.json() : []
				),
				fetch(`${baseUrl}/api/services`).then((res) =>
					res.ok ? res.json() : []
				),
				fetch(`${baseUrl}/api/testimonials`).then((res) =>
					res.ok ? res.json() : []
				),
				fetch(`${baseUrl}/api/messages`).then((res) =>
					res.ok ? res.json() : []
				),
				fetch(`${baseUrl}/api/blog-posts`).then((res) =>
					res.ok ? res.json() : []
				),
			]);

		// Extract values from settled promises
		const projectsData = projects.status === 'fulfilled' ? projects.value : [];
		const servicesData = services.status === 'fulfilled' ? services.value : [];
		const testimonialsData =
			testimonials.status === 'fulfilled' ? testimonials.value : [];
		const messagesData = messages.status === 'fulfilled' ? messages.value : [];
		const blogPostsData =
			blogPosts.status === 'fulfilled' ? blogPosts.value : [];

		return [
			{
				title: 'Total Projects',
				value: projectsData.length.toString(),
				icon: 'Package',
				color: '#4A90E2',
				description: 'Completed interior design projects',
			},
			{
				title: 'Services Offered',
				value: servicesData.length.toString(),
				icon: 'Settings',
				color: '#50E3C2',
				description: 'Professional design services',
			},
			{
				title: 'Testimonials',
				value: testimonialsData.length.toString(),
				icon: 'MessageSquare',
				color: '#B8E986',
				description: 'Client testimonials and reviews',
			},
			{
				title: 'New Inquiries',
				value: messagesData.length.toString(),
				icon: 'Mail',
				color: '#F8E71C',
				description: 'Recent contact inquiries',
			},
			{
				title: 'Blog Posts',
				value: blogPostsData.length.toString(),
				icon: 'Edit',
				color: '#7B61FF',
				description: 'Published blog articles',
			},
		];
	} catch (error) {
		console.warn('Error calculating dynamic stats:', error.message);
		return getFallbackStats();
	}
};

// Fallback stats for build time or when database is unavailable
const getFallbackStats = () => {
	return [
		{
			title: 'Total Projects',
			value: '150+',
			icon: 'Package',
			color: '#4A90E2',
			description: 'Completed interior design projects',
		},
		{
			title: 'Services Offered',
			value: '8+',
			icon: 'Settings',
			color: '#50E3C2',
			description: 'Interior design services',
		},
		{
			title: 'Happy Clients',
			value: '125+',
			icon: 'Heart',
			color: '#F5A623',
			description: 'Satisfied customers',
		},
		{
			title: 'Client Messages',
			value: '25+',
			icon: 'MessageCircle',
			color: '#FF6B6B',
			description: 'Client inquiries received',
		},
		{
			title: 'Blog Posts',
			value: '10+',
			icon: 'Edit',
			color: '#7B61FF',
			description: 'Published blog articles',
		},
	];
};

// Get individual stat by title
export const getStatByTitle = async (title) => {
	const stats = await calculateDynamicStats();
	return stats.find((stat) => stat.title === title);
};

// Get all stats with additional metadata
export const getStatsWithMetadata = async () => {
	const stats = await calculateDynamicStats();
	return {
		stats,
		metadata: {
			lastUpdated: new Date().toISOString(),
			description: 'Dynamic statistics calculated from database APIs',
			dataSources: [
				'/api/projects',
				'/api/services',
				'/api/testimonials',
				'/api/messages',
				'/api/blog-posts',
			],
			totalStats: stats.length,
		},
	};
};

// For backward compatibility - returns a promise now
export default calculateDynamicStats;
