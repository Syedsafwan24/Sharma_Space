'use client';

import { useState, useEffect } from 'react';
import { useDataCache } from '@/components/providers/data-cache-provider';
import {
	fetchServices,
	fetchTestimonials,
	fetchProjects,
	fetchBlogPosts,
	fetchCompanyStats,
} from '@/lib/utils';

export const useHomepageData = () => {
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

	useEffect(() => {
		if (!isClient) return;

		const loadData = async () => {
			try {
				// Check cache first
				const cachedServices = getData('services');
				const cachedTestimonials = getData('testimonials');
				const cachedProjects = getData('projects');
				const cachedBlogPosts = getData('blogPosts');
				const cachedCompanyData = getData('companyData');

				// If all data is cached, use it immediately
				if (
					cachedServices &&
					cachedTestimonials &&
					cachedProjects &&
					cachedBlogPosts &&
					cachedCompanyData
				) {
					setHomeData({
						services: cachedServices,
						testimonials: cachedTestimonials,
						projects: cachedProjects,
						blogPosts: cachedBlogPosts,
						companyData: cachedCompanyData,
						loading: false,
						error: null,
					});
					return;
				}

				// Fetch missing data
				setHomeData((prev) => ({ ...prev, loading: true }));

				const [services, testimonials, projects, blogPosts, companyData] =
					await Promise.all([
						cachedServices || fetchServices(),
						cachedTestimonials || fetchTestimonials(),
						cachedProjects || fetchProjects(),
						cachedBlogPosts || fetchBlogPosts(),
						cachedCompanyData || fetchCompanyStats(),
					]);

				// Cache the fetched data
				if (!cachedServices) setData('services', services);
				if (!cachedTestimonials) setData('testimonials', testimonials);
				if (!cachedProjects) setData('projects', projects);
				if (!cachedBlogPosts) setData('blogPosts', blogPosts);
				if (!cachedCompanyData) setData('companyData', companyData);

				setHomeData({
					services,
					testimonials,
					projects,
					blogPosts,
					companyData,
					loading: false,
					error: null,
				});
			} catch (error) {
				console.error('Error loading homepage data:', error);
				setHomeData((prev) => ({
					...prev,
					loading: false,
					error: error.message,
				}));
			}
		};

		loadData();
	}, [isClient, getData, setData]);

	return data;
};
