'use client';

import dynamic from 'next/dynamic';

// Lazy load heavy components that aren't immediately visible
export const LazyAboutSection = dynamic(() => import('./AboutSection'), {
	loading: () => <div className='h-96 animate-pulse bg-gray-100 rounded-lg' />,
	ssr: true,
});

export const LazyDesignInsights = dynamic(() => import('./DesignInsights'), {
	loading: () => <div className='h-64 animate-pulse bg-gray-100 rounded-lg' />,
	ssr: false, // This can be client-side only
});

export const LazyTestimonials = dynamic(() => import('./Testimonials'), {
	loading: () => <div className='h-80 animate-pulse bg-gray-100 rounded-lg' />,
	ssr: true,
});

export const LazyProcess = dynamic(() => import('./Process'), {
	loading: () => <div className='h-96 animate-pulse bg-gray-100 rounded-lg' />,
	ssr: false, // Framer Motion heavy
});

export const LazyWelcomeModal = dynamic(() => import('./WelcomeModal'), {
	loading: () => null,
	ssr: false, // Modal doesn't need SSR
});
