// Fallback data when database is unavailable
export const fallbackProjects = [
	{
		id: 1,
		title: 'Modern Apartment in Mumbai',
		description:
			'A sleek, minimalist design with neutral tones and contemporary furnishings.',
		shortDescription: 'Minimalist apartment transformation in Mumbai',
		image: '/images/placeholder.svg',
		coverImage: '/images/placeholder.svg',
		slug: 'modern-apartment-mumbai',
		category: 'Residential',
		featured: true,
		client: 'Sharma Family',
		location: 'Mumbai',
		area: '1800 sq ft',
		completedDate: '2023-09-15',
		services: ['Interior Design', 'Space Planning', 'Custom Furniture'],
		galleryImages: [],
		videoUrl: null,
	},
	{
		id: 2,
		title: 'Co-Working Space in Whitefield',
		description:
			'A vibrant, collaborative workspace designed for productivity and creativity.',
		shortDescription: 'Innovative co-working space in Whitefield',
		image: '/images/placeholder.svg',
		coverImage: '/images/placeholder.svg',
		slug: 'co-working-space-whitefield',
		category: 'Commercial',
		featured: true,
		client: 'TechHub Innovations',
		location: 'Whitefield, Bangalore',
		area: '6500 sq ft',
		completedDate: '2023-05-20',
		services: ['Commercial Interior', 'Workplace Design', 'Brand Integration'],
		galleryImages: [],
		videoUrl: null,
	},
	{
		id: 3,
		title: 'Luxury Villa in Delhi',
		description:
			'An elegant villa with contemporary design elements and luxurious finishes.',
		shortDescription: 'Luxury contemporary villa in Delhi',
		image: '/images/placeholder.svg',
		coverImage: '/images/placeholder.svg',
		slug: 'luxury-villa-delhi',
		category: 'Residential',
		featured: false,
		client: 'The Verma Residence',
		location: 'Delhi',
		area: '3200 sq ft',
		completedDate: '2023-11-10',
		services: ['Luxury Residential', 'Custom Millwork', 'Lighting Design'],
		galleryImages: [],
		videoUrl: null,
	},
];

export const fallbackTestimonials = [
	{
		id: 1,
		name: 'Priya S.',
		fullName: 'Priya Sharma',
		location: 'Mumbai',
		rating: 5,
		date: '2023-12-01',
		projectType: 'Residential',
		image: { url: '/images/placeholder.svg' },
		text: 'Sharma Space transformed our home into a dream! Their attention to detail is unmatched.',
		featured: true,
		verified: true,
	},
	{
		id: 2,
		name: 'Rahul M.',
		fullName: 'Rahul Mehta',
		location: 'Delhi',
		rating: 5,
		date: '2023-11-15',
		projectType: 'Commercial',
		image: { url: '/images/placeholder.svg' },
		text: 'Working with Sharma Space for our office redesign was the best decision.',
		featured: true,
		verified: true,
	},
];

export const fallbackBlogPosts = [
	{
		id: '1',
		slug: 'modern-interior-design-trends-2024',
		title: '5 Trends in Modern Interior Design for 2024',
		metaTitle: '5 Modern Interior Design Trends 2024 | Bangalore Experts',
		metaDescription:
			"Discover 2024's top interior design trends from Bangalore's leading designers.",
		date: '2024-05-15',
		category: 'TRENDS',
		featured: true,
		image: { url: '/images/placeholder.svg' },
		excerpt: 'Discover the latest trends shaping modern interior spaces...',
		authorName: 'Sharma Space Team',
		authorImage: '/images/placeholder.svg',
	},
];

export const fallbackServices = [
	{
		id: 1,
		title: 'Residential Design',
		description:
			'Complete home interior design solutions for apartments, villas, and independent houses.',
		icon: 'Home',
		featured: true,
		category: 'residential',
		priceRange: '₹8,00,000 - ₹50,00,000',
		duration: '2-4 months',
	},
	{
		id: 2,
		title: 'Commercial Design',
		description:
			'Office spaces, retail stores, restaurants, and other commercial interior solutions.',
		icon: 'Building',
		featured: true,
		category: 'commercial',
		priceRange: '₹15,00,000 - ₹1,00,00,000',
		duration: '3-6 months',
	},
	{
		id: 3,
		title: 'Modular Kitchen',
		description:
			'Custom modular kitchen designs with premium fittings and smart storage solutions.',
		icon: 'ChefHat',
		featured: true,
		category: 'kitchen',
		priceRange: '₹2,00,000 - ₹8,00,000',
		duration: '3-6 weeks',
	},
];
