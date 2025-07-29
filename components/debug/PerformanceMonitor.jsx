'use client';

import { useEffect } from 'react';

const PerformanceMonitor = ({ componentName = 'Unknown' }) => {
	useEffect(() => {
		if (process.env.NODE_ENV === 'development') {
			// Measure Largest Contentful Paint (LCP)
			const observer = new PerformanceObserver((list) => {
				const entries = list.getEntries();
				const lastEntry = entries[entries.length - 1];

				if (lastEntry) {
					console.log(
						`🎯 [${componentName}] LCP: ${lastEntry.startTime.toFixed(2)}ms`
					);

					// Good LCP should be under 2.5s (2500ms)
					if (lastEntry.startTime > 2500) {
						console.warn(
							`⚠️ [${componentName}] LCP is slow (${lastEntry.startTime.toFixed(
								2
							)}ms)`
						);
					} else {
						console.log(
							`✅ [${componentName}] LCP is good (${lastEntry.startTime.toFixed(
								2
							)}ms)`
						);
					}
				}
			});

			try {
				observer.observe({ entryTypes: ['largest-contentful-paint'] });
			} catch (e) {
				console.log('LCP observer not supported');
			}

			// Measure First Contentful Paint (FCP)
			const fcpObserver = new PerformanceObserver((list) => {
				const entries = list.getEntries();
				entries.forEach((entry) => {
					if (entry.name === 'first-contentful-paint') {
						console.log(
							`🎨 [${componentName}] FCP: ${entry.startTime.toFixed(2)}ms`
						);
					}
				});
			});

			try {
				fcpObserver.observe({ entryTypes: ['paint'] });
			} catch (e) {
				console.log('FCP observer not supported');
			}

			// Measure loading resources
			const resourceObserver = new PerformanceObserver((list) => {
				const entries = list.getEntries();
				const imageEntries = entries.filter(
					(entry) =>
						entry.initiatorType === 'img' ||
						entry.name.includes('images.unsplash.com')
				);

				imageEntries.forEach((entry) => {
					const loadTime = entry.responseEnd - entry.startTime;
					console.log(
						`🖼️ [${componentName}] Image loaded: ${entry.name
							.split('/')
							.pop()} in ${loadTime.toFixed(2)}ms`
					);

					if (loadTime > 1000) {
						console.warn(
							`⚠️ [${componentName}] Slow image: ${
								entry.name
							} (${loadTime.toFixed(2)}ms)`
						);
					}
				});
			});

			try {
				resourceObserver.observe({ entryTypes: ['resource'] });
			} catch (e) {
				console.log('Resource observer not supported');
			}

			return () => {
				observer.disconnect();
				fcpObserver.disconnect();
				resourceObserver.disconnect();
			};
		}
	}, [componentName]);

	return null; // This component doesn't render anything
};

export default PerformanceMonitor;
