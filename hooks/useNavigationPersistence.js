'use client';

import { useRouter } from 'next/navigation';
import { useDataCache } from '@/components/providers/data-cache-provider';
import { useEffect } from 'react';

export const useNavigationPersistence = () => {
	const router = useRouter();
	const { getData, setData } = useDataCache();

	const navigateWithCache = (href) => {
		// Store current scroll position before navigation
		if (typeof window !== 'undefined') {
			setData('scrollPosition', window.scrollY);
			setData('lastVisitedPage', window.location.pathname);
		}

		router.push(href);
	};

	const navigateBack = () => {
		router.back();
	};

	// Restore scroll position when coming back to a cached page
	useEffect(() => {
		if (typeof window !== 'undefined') {
			const savedScrollPosition = getData('scrollPosition');
			if (savedScrollPosition && window.location.pathname === '/') {
				// Small delay to ensure content is loaded
				setTimeout(() => {
					window.scrollTo(0, savedScrollPosition);
				}, 100);
			}
		}
	}, [getData]);

	return {
		navigateWithCache,
		navigateBack,
		router,
	};
};
