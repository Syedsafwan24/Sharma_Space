// Dynamic statistics calculator - Now fetches from database APIs

const getBaseUrl = () => {
	if (typeof window === 'undefined') {
		// On the server
		return process.env.NEXTAUTH_URL || 'http://localhost:3000';
	}
	// On the client
	return '';
};

// Calculate dynamic statistics by fetching from APIs
export const calculateDynamicStats = async () => {
	try {
		const baseUrl = getBaseUrl();
		// Fetch data from all API endpoints
		const [projects, services, testimonials, messages, blogPosts] =
			await Promise.all([
				fetch(`${baseUrl}/api/projects`).then((res) => res.json()),
				fetch(`${baseUrl}/api/services`).then((res) => res.json()),
				fetch(`${baseUrl}/api/testimonials`).then((res) => res.json()),
				fetch(`${baseUrl}/api/messages`).then((res) => res.json()),
				fetch(`${baseUrl}/api/blog-posts`).then((res) => res.json()),
			]);

		return [
			{
				title: 'Total Projects',
				value: projects.length.toString(),
				icon: 'Package',
				color: '#4A90E2',
				description: 'Completed interior design projects',
			},
			{
				title: 'Services Offered',
				value: services.length.toString(),
				icon: 'Settings',
				color: '#50E3C2',
				description: 'Professional design services',
			},
			{
				title: 'Testimonials',
				value: testimonials.length.toString(),
				icon: 'MessageSquare',
				color: '#B8E986',
				description: 'Client testimonials and reviews',
			},
			{
				title: 'New Inquiries',
				value: messages.length.toString(),
				icon: 'Mail',
				color: '#F8E71C',
				description: 'Recent contact inquiries',
			},
			{
				title: 'Blog Posts',
				value: blogPosts.length.toString(),
				icon: 'Edit',
				color: '#7B61FF',
				description: 'Published blog articles',
			},
		];
	} catch (error) {
		console.error('Error calculating dynamic stats:', error);
		// Return default stats if API calls fail
		return [
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
	}
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
