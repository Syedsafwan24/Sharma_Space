'use client';

import { useState, useEffect, useCallback } from 'react';
import { useDataCache } from '@/components/providers/data-cache-provider';

// Priority-based data fetching for better performance
const FETCH_PRIORITY = {
	HIGH: ['services', 'projects'], // Critical for business
	MEDIUM: ['testimonials', 'companyData'], // Important but not critical
	LOW: ['blogPosts'], // Nice to have
};

export const useOptimizedHomepageData = () => {
	const { getData, setData, isClient } = useDataCache();
	const [data, setHomeData] = useState({
		services: [],
		testimonials: [],
		projects: [],
		blogPosts: [],
		companyData: { stats: [], companyInfo: {} },
		loading: true,
		error: null,
	});

	// Memoized fetch functions to prevent unnecessary re-renders
	const fetchWithRetry = useCallback(async (fetchFn, retries = 2) => {
		for (let i = 0; i <= retries; i++) {
			try {
				return await fetchFn();
			} catch (error) {
				if (i === retries) throw error;
				await new Promise((resolve) => setTimeout(resolve, 1000 * (i + 1)));
			}
		}
	}, []);

	const updateDataField = useCallback(
		(field, value) => {
			setHomeData((prev) => ({ ...prev, [field]: value }));
			setData(field, value);
		},
		[setData]
	);

	useEffect(() => {
		if (!isClient) return;

		let isMounted = true;

		const loadDataWithPriority = async () => {
			try {
				// Check cache first and load immediately if available
				const cachedData = {};
				let hasAllCachedData = true;

				[
					...FETCH_PRIORITY.HIGH,
					...FETCH_PRIORITY.MEDIUM,
					...FETCH_PRIORITY.LOW,
				].forEach((key) => {
					const cached = getData(key);
					if (cached) {
						cachedData[key] = cached;
					} else {
						hasAllCachedData = false;
					}
				});

				// If we have cached data, show it immediately
				if (Object.keys(cachedData).length > 0) {
					setHomeData((prev) => ({
						...prev,
						...cachedData,
						loading: !hasAllCachedData,
					}));
				}

				// If all data is cached, we're done
				if (hasAllCachedData) return;

				// Import fetch functions dynamically to reduce initial bundle
				const {
					fetchServices,
					fetchProjects,
					fetchTestimonials,
					fetchCompanyStats,
					fetchBlogPosts,
				} = await import('@/lib/utils');

				// Fetch high priority data first
				const highPriorityPromises = [];

				if (!cachedData.services) {
					highPriorityPromises.push(
						fetchWithRetry(fetchServices).then((result) => {
							if (isMounted) updateDataField('services', result);
						})
					);
				}

				if (!cachedData.projects) {
					highPriorityPromises.push(
						fetchWithRetry(fetchProjects).then((result) => {
							if (isMounted) updateDataField('projects', result);
						})
					);
				}

				// Wait for high priority data
				await Promise.allSettled(highPriorityPromises);

				// Fetch medium priority data
				const mediumPriorityPromises = [];

				if (!cachedData.testimonials) {
					mediumPriorityPromises.push(
						fetchWithRetry(fetchTestimonials).then((result) => {
							if (isMounted) updateDataField('testimonials', result);
						})
					);
				}

				if (!cachedData.companyData) {
					mediumPriorityPromises.push(
						fetchWithRetry(fetchCompanyStats).then((result) => {
							if (isMounted) updateDataField('companyData', result);
						})
					);
				}

				await Promise.allSettled(mediumPriorityPromises);

				// Fetch low priority data last
				if (!cachedData.blogPosts) {
					fetchWithRetry(fetchBlogPosts)
						.then((result) => {
							if (isMounted) updateDataField('blogPosts', result);
						})
						.catch((err) => console.warn('Blog posts fetch failed:', err));
				}

				if (isMounted) {
					setHomeData((prev) => ({ ...prev, loading: false }));
				}
			} catch (error) {
				console.error('Error loading homepage data:', error);
				if (isMounted) {
					setHomeData((prev) => ({
						...prev,
						loading: false,
						error: error.message,
					}));
				}
			}
		};

		loadDataWithPriority();

		return () => {
			isMounted = false;
		};
	}, [isClient, getData, setData, fetchWithRetry, updateDataField]);

	return data;
};
