'use client';

import { useEffect } from 'react';

const PerformanceMonitor = () => {
	useEffect(() => {
		// Only run in development
		if (process.env.NODE_ENV !== 'development') return;

		// Monitor LCP (Largest Contentful Paint)
		const observer = new PerformanceObserver((list) => {
			for (const entry of list.getEntries()) {
				if (entry.entryType === 'largest-contentful-paint') {
					console.log('🎯 LCP:', entry.startTime.toFixed(2), 'ms');
					if (entry.startTime > 2500) {
						console.warn('⚠️ LCP is above 2.5s - needs optimization');
					} else {
						console.log('✅ LCP is good!');
					}
				}

				if (entry.entryType === 'navigation') {
					console.log('🚀 Navigation Timing:', {
						domContentLoaded:
							entry.domContentLoadedEventEnd - entry.domContentLoadedEventStart,
						loadComplete: entry.loadEventEnd - entry.loadEventStart,
						firstByte: entry.responseStart - entry.requestStart,
					});
				}

				if (entry.entryType === 'paint') {
					console.log(`🎨 ${entry.name}:`, entry.startTime.toFixed(2), 'ms');
				}
			}
		});

		// Observe LCP
		observer.observe({ entryTypes: ['largest-contentful-paint'] });
		observer.observe({ entryTypes: ['navigation'] });
		observer.observe({ entryTypes: ['paint'] });

		// Monitor resource loading
		const resourceObserver = new PerformanceObserver((list) => {
			for (const entry of list.getEntries()) {
				if (
					entry.name.includes('Hero-Background') ||
					entry.name.includes('AboutSection')
				) {
					console.log('📸 Critical Image Load:', {
						name: entry.name.split('/').pop(),
						duration: entry.duration.toFixed(2) + 'ms',
						size: entry.transferSize
							? (entry.transferSize / 1024).toFixed(2) + 'KB'
							: 'cached',
					});
				}
			}
		});

		resourceObserver.observe({ entryTypes: ['resource'] });

		return () => {
			observer.disconnect();
			resourceObserver.disconnect();
		};
	}, []);

	return null;
};

export default PerformanceMonitor;
