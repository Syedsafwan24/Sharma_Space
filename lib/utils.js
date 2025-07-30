import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
	return twMerge(clsx(inputs));
}

// Dynamic data fetching utilities - Client-side optimized
export async function fetchServices() {
	try {
		// Create absolute URL for server-side rendering
		const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 
			(typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000');
		const url = `${baseUrl}/api/services`;
		
		const response = await fetch(url, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
			next: { revalidate: 3600 }, // Cache for 1 hour
		});

		if (!response.ok) {
			console.warn('Failed to fetch services:', response.status);
			return [];
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error('Error fetching services:', error);
		return [];
	}
}

export async function fetchTestimonials() {
	try {
		// Create absolute URL for server-side rendering
		const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 
			(typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000');
		const url = `${baseUrl}/api/testimonials`;
		
		const response = await fetch(url, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
			next: { revalidate: 3600 }, // Cache for 1 hour
		});

		if (!response.ok) {
			console.warn('Failed to fetch testimonials:', response.status);
			return [];
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error('Error fetching testimonials:', error);
		return [];
	}
}

export async function fetchBlogPosts() {
	try {
		// Create absolute URL for server-side rendering
		const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 
			(typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000');
		const url = `${baseUrl}/api/blog-posts`;
		
		const response = await fetch(url, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
			next: { revalidate: 3600 }, // Cache for 1 hour
		});

		if (!response.ok) {
			console.warn('Failed to fetch blog posts:', response.status);
			return [];
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error('Error fetching blog posts:', error);
		return [];
	}
}

export async function fetchProjects() {
	try {
		// Create absolute URL for server-side rendering
		const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 
			(typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000');
		const url = `${baseUrl}/api/projects`;
		
		const response = await fetch(url, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
			next: { revalidate: 3600 }, // Cache for 1 hour
		});

		if (!response.ok) {
			console.warn('Failed to fetch projects:', response.status);
			return [];
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error('Error fetching projects:', error);
		return [];
	}
}

export async function fetchMessages() {
	try {
		const response = await fetch(
			`${process.env.NEXTAUTH_URL || 'http://localhost:3001'}/api/messages`
		);
		if (!response.ok) throw new Error('Failed to fetch messages');
		return await response.json();
	} catch (error) {
		return [];
	}
}

export async function fetchBlogPost(slug) {
	try {
		const response = await fetch(
			`${
				process.env.NEXTAUTH_URL || 'http://localhost:3001'
			}/api/blog-posts?slug=${slug}`
		);
		if (!response.ok) throw new Error('Failed to fetch blog post');
		return await response.json();
	} catch (error) {
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
				month: 'long',
				day: 'numeric',
			});
		}
		return date;
	}
	if (date instanceof Date) {
		return date.toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		});
	}
	return 'Not specified';
};

// Utility function for optimistic updates
export const optimisticUpdate = (currentData, updatedItem, isEdit = true) => {
	if (isEdit) {
		return currentData.map((item) =>
			item.id === updatedItem.id ? updatedItem : item
		);
	} else {
		return [updatedItem, ...currentData];
	}
};

// Utility function for cache-busting fetch
export const fetchWithCacheBust = async (url, options = {}) => {
	const defaultHeaders = {
		'Cache-Control': 'no-cache',
		Pragma: 'no-cache',
		'X-Requested-With': 'XMLHttpRequest',
	};

	const response = await fetch(url, {
		...options,
		headers: {
			...defaultHeaders,
			...options.headers,
		},
	});

	return response;
};
