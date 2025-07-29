'use client';

import { useEffect } from 'react';

export default function StructuredData({ type, data }) {
	useEffect(() => {
		// If data is provided directly, use it
		if (data) {
			const script = document.createElement('script');
			script.type = 'application/ld+json';
			script.text = JSON.stringify(data);
			document.head.appendChild(script);

			return () => {
				document.head.removeChild(script);
			};
		}

		// Otherwise, fetch from API
		if (type) {
			fetch(`/api/structured-data?type=${type}`)
				.then((response) => response.json())
				.then((jsonData) => {
					const script = document.createElement('script');
					script.type = 'application/ld+json';
					script.text = JSON.stringify(jsonData);
					document.head.appendChild(script);
				})
				.catch(console.error);
		}
	}, [type, data]);

	return null;
}
