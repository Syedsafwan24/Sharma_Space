import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
	return twMerge(clsx(inputs));
}

// Dynamic data fetching utilities
export async function fetchServices() {
	try {
		const response = await fetch(
			`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/services`
		);
		if (!response.ok) throw new Error('Failed to fetch services');
		return await response.json();
	} catch (error) {
		console.error('Error fetching services:', error);
		return [];
	}
}

export async function fetchTestimonials() {
	try {
		const response = await fetch(
			`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/testimonials`
		);
		if (!response.ok) throw new Error('Failed to fetch testimonials');
		return await response.json();
	} catch (error) {
		console.error('Error fetching testimonials:', error);
		return [];
	}
}

export async function fetchBlogPosts() {
	try {
		const response = await fetch(
			`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/blog-posts`
		);
		if (!response.ok) throw new Error('Failed to fetch blog posts');
		return await response.json();
	} catch (error) {
		console.error('Error fetching blog posts:', error);
		return [];
	}
}

export async function fetchProjects() {
	try {
		const response = await fetch(
			`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/projects`
		);
		if (!response.ok) throw new Error('Failed to fetch projects');
		return await response.json();
	} catch (error) {
		console.error('Error fetching projects:', error);
		return [];
	}
}

export async function fetchMessages() {
	try {
		const response = await fetch(
			`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/messages`
		);
		if (!response.ok) throw new Error('Failed to fetch messages');
		return await response.json();
	} catch (error) {
		console.error('Error fetching messages:', error);
		return [];
	}
}

export async function fetchBlogPost(slug) {
	try {
		const response = await fetch(
			`${
				process.env.NEXTAUTH_URL || 'http://localhost:3000'
			}/api/blog-posts?slug=${slug}`
		);
		if (!response.ok) throw new Error('Failed to fetch blog post');
		return await response.json();
	} catch (error) {
		console.error('Error fetching blog post:', error);
		return null;
	}
}

export async function fetchCompanyStats() {
	try {
		const response = await fetch(
			`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/company-stats`
		);
		if (!response.ok) throw new Error('Failed to fetch company stats');
		return await response.json();
	} catch (error) {
		console.error('Error fetching company stats:', error);
		return {
			stats: [],
			companyInfo: {
				name: 'Sharma Space',
				founded: '2013',
				mission:
					'At Sharma Space, we believe in creating interiors that are not just beautiful but also functional.',
				description:
					'Our design philosophy centers around understanding your unique needs and preferences.',
			},
		};
	}
}

export async function fetchPartnerBrands() {
	try {
		const response = await fetch(
			`${
				process.env.NEXTAUTH_URL || 'http://localhost:3000'
			}/api/partner-brands`
		);
		if (!response.ok) throw new Error('Failed to fetch partner brands');
		return await response.json();
	} catch (error) {
		console.error('Error fetching partner brands:', error);
		return [];
	}
}

// Date formatting utility
export const formatDate = (date) => {
	if (!date) return 'Not specified';
	if (typeof date === 'string') return date;
	if (date instanceof Date) {
		return date.toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		});
	}
	return 'Not specified';
};

// Format date for blog posts (shorter format)
export const formatBlogDate = (date) => {
	if (!date) return 'Not specified';
	if (typeof date === 'string') {
		// Try to parse as ISO date string
		const parsed = new Date(date);
		if (!isNaN(parsed)) {
			return parsed.toLocaleDateString('en-US', {
				year: 'numeric',
				month: 'short',
				day: 'numeric',
			});
		}
		return date;
	}
	if (date instanceof Date) {
		return date.toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric',
		});
	}
	return 'Not specified';
};
