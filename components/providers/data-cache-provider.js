'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const DataCacheContext = createContext();

export const useDataCache = () => {
	const context = useContext(DataCacheContext);
	if (!context) {
		throw new Error('useDataCache must be used within DataCacheProvider');
	}
	return context;
};

export const DataCacheProvider = ({ children }) => {
	const [cache, setCache] = useState({});
	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		setIsClient(true);
		// Load cache from sessionStorage on mount
		if (typeof window !== 'undefined') {
			const savedCache = sessionStorage.getItem('sharma-space-cache');
			if (savedCache) {
				try {
					setCache(JSON.parse(savedCache));
				} catch (error) {
					console.warn('Failed to parse cache from sessionStorage:', error);
				}
			}
		}
	}, []);

	// Save cache to sessionStorage whenever it changes
	useEffect(() => {
		if (isClient && Object.keys(cache).length > 0) {
			sessionStorage.setItem('sharma-space-cache', JSON.stringify(cache));
		}
	}, [cache, isClient]);

	const setData = (key, data, ttl = 1800000) => {
		// 30 minutes default TTL
		const expiry = Date.now() + ttl;
		setCache((prev) => ({
			...prev,
			[key]: {
				data,
				expiry,
			},
		}));
	};

	const getData = (key) => {
		const item = cache[key];
		if (!item) return null;

		if (Date.now() > item.expiry) {
			// Data expired, remove it
			setCache((prev) => {
				const newCache = { ...prev };
				delete newCache[key];
				return newCache;
			});
			return null;
		}

		return item.data;
	};

	const clearCache = () => {
		setCache({});
		if (typeof window !== 'undefined') {
			sessionStorage.removeItem('sharma-space-cache');
		}
	};

	const value = {
		setData,
		getData,
		clearCache,
		isClient,
	};

	return (
		<DataCacheContext.Provider value={value}>
			{children}
		</DataCacheContext.Provider>
	);
};
