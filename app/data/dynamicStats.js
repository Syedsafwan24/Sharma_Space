// Dynamic statistics calculator
import portfolioProjects from './portfolio/portfolioUnifiedData';
import { services } from './services/services.json';
import testimonials from './testimonials/testimonialsUnifiedData';
import messagesJson from './contact/messages.json';
import blogUnifiedData from './blog/blogUnifiedData';

// Calculate dynamic statistics
export const calculateDynamicStats = () => {
	return [
		{
			title: 'Total Projects',
			value: portfolioProjects.length.toString(),
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
			value: messagesJson.messages.length.toString(),
			icon: 'Mail',
			color: '#F8E71C',
			description: 'Recent contact inquiries',
		},
		{
			title: 'Blog Posts',
			value: blogUnifiedData.posts.length.toString(),
			icon: 'Edit',
			color: '#7B61FF',
			description: 'Published blog articles',
		},
	];
};

// Get individual stat by title
export const getStatByTitle = (title) => {
	const stats = calculateDynamicStats();
	return stats.find((stat) => stat.title === title);
};

// Get all stats with additional metadata
export const getStatsWithMetadata = () => {
	return {
		stats: calculateDynamicStats(),
		metadata: {
			lastUpdated: new Date().toISOString(),
			description: 'Dynamic statistics calculated from actual data sources',
			dataSources: [
				'portfolioProjects from portfolioUnifiedData.js',
				'services from services.json',
				'testimonials from testimonialsUnifiedData.js',
				'messages from messages.json',
				'blogPosts from blogUnifiedData.js',
			],
			totalStats: calculateDynamicStats().length,
		},
	};
};

export default calculateDynamicStats;
