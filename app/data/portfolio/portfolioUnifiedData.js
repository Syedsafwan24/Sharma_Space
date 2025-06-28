// Unified portfolio projects data

const portfolioProjects = [
	{
		id: 1,
		title: 'Modern Apartment in Mumbai',
		description:
			'A sleek, minimalist design with neutral tones and contemporary furnishings. This project transformed a standard apartment into a sophisticated living space with clean lines and thoughtful touches throughout. The design emphasizes functionality without sacrificing elegance, creating a perfect balance for modern urban living.',
		shortDescription: 'Minimalist apartment transformation in Mumbai',
		image:
			'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
		coverImage:
			'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
		slug: 'modern-apartment-mumbai',
		category: {
			id: 'residential',
			name: 'Residential',
			slug: 'residential',
			description: 'Home interior design projects across Bangalore and India',
			metaTitle:
				'Residential Interior Design Bangalore | Home Interiors | Sharma Space',
			metaDescription:
				'Residential interior design services in Bangalore. Transform your home with our expert designers. View our residential portfolio.',
			icon: 'Home',
			color: '#E63946',
			projectCount: 45,
			featured: true,
			services: [
				'Living Room Design',
				'Bedroom Design',
				'Kitchen Design',
				'Bathroom Design',
				'Home Office Design',
			],
			priceRange: '₹8,00,000 - ₹50,00,000',
			averageDuration: '2-4 months',
			keywords: [
				'residential interior design bangalore',
				'home interior design',
				'apartment design',
				'villa interior',
			],
		},
		featured: true,
		client: 'Sharma Family',
		location: 'Mumbai',
		area: '1800 sq ft',
		completedDate: '2023-09-15',
		services: ['Interior Design', 'Space Planning', 'Custom Furniture'],
		galleryImages: [
			'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
			'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
			'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
			'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
		],
		videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?si=0zWb_E_F0-lD-d0J',
	},
	{
		id: 2,
		title: 'Co-Working Space in Whitefield',
		description:
			"A vibrant, collaborative workspace designed for productivity and creativity. This modern facility provides a dynamic environment for professionals from various fields in Bangalore's tech hub.",
		shortDescription: 'Innovative co-working space in Whitefield',
		image:
			'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
		coverImage:
			'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
		slug: 'co-working-space-whitefield',
		category: {
			id: 'commercial',
			name: 'Commercial',
			slug: 'commercial',
			description: 'Office and commercial space interior design in Bangalore',
			metaTitle:
				'Commercial Interior Design Bangalore | Office Interiors | Sharma Space',
			metaDescription:
				'Commercial interior design services in Bangalore. Office design, retail spaces, co-working areas. Professional commercial interiors.',
			icon: 'Building',
			color: '#F97316',
			projectCount: 28,
			featured: true,
			services: [
				'Office Design',
				'Retail Space Design',
				'Co-working Spaces',
				'Restaurant Design',
				'Showroom Design',
			],
			priceRange: '₹15,00,000 - ₹1,00,00,000',
			averageDuration: '3-6 months',
			keywords: [
				'commercial interior design bangalore',
				'office interior design',
				'retail design',
				'workspace design',
			],
		},
		featured: true,
		client: 'TechHub Innovations',
		location: 'Whitefield, Bangalore',
		area: '6500 sq ft',
		completedDate: '2023-05-20',
		services: ['Commercial Interior', 'Workplace Design', 'Brand Integration'],
		galleryImages: [
			'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
			'https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
			'https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
		],
		videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?si=0zWb_E_F0-lD-d0J',
	},
	{
		id: 3,
		title: 'Luxury Villa in Delhi',
		description:
			'An elegant villa with contemporary design elements and luxurious finishes.',
		shortDescription: 'Luxury contemporary villa in Delhi',
		image:
			'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
		coverImage:
			'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
		slug: 'luxury-villa-delhi',
		category: {
			id: 'residential',
			name: 'Residential',
			slug: 'residential',
			description: 'Home interior design projects across Bangalore and India',
			metaTitle:
				'Residential Interior Design Bangalore | Home Interiors | Sharma Space',
			metaDescription:
				'Residential interior design services in Bangalore. Transform your home with our expert designers. View our residential portfolio.',
			icon: 'Home',
			color: '#E63946',
			projectCount: 45,
			featured: true,
			services: [
				'Living Room Design',
				'Bedroom Design',
				'Kitchen Design',
				'Bathroom Design',
				'Home Office Design',
			],
			priceRange: '₹8,00,000 - ₹50,00,000',
			averageDuration: '2-4 months',
			keywords: [
				'residential interior design bangalore',
				'home interior design',
				'apartment design',
				'villa interior',
			],
		},
		featured: false,
		client: 'Private Client',
		location: 'Delhi',
		area: '3200 sq ft',
		completedDate: '2023-11-10',
		services: ['Luxury Residential', 'Custom Millwork', 'Lighting Design'],
		galleryImages: [
			'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
			'https://images.unsplash.com/photo-1600566752355-35792bedcfea?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
			'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
		],
		videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?si=0zWb_E_F0-lD-d0J',
	},
	{
		id: 4,
		title: 'Urban Loft Renovation',
		description:
			'A modern renovation of an urban loft, blending industrial aesthetics with comfortable living spaces.',
		shortDescription: 'Industrial-style loft renovation in Pune',
		image:
			'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
		coverImage:
			'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
		slug: 'urban-loft-renovation',
		category: {
			id: 'residential',
			name: 'Residential',
			slug: 'residential',
			description: 'Home interior design projects across Bangalore and India',
			metaTitle:
				'Residential Interior Design Bangalore | Home Interiors | Sharma Space',
			metaDescription:
				'Residential interior design services in Bangalore. Transform your home with our expert designers. View our residential portfolio.',
			icon: 'Home',
			color: '#E63946',
			projectCount: 45,
			featured: true,
			services: [
				'Living Room Design',
				'Bedroom Design',
				'Kitchen Design',
				'Bathroom Design',
				'Home Office Design',
			],
			priceRange: '₹8,00,000 - ₹50,00,000',
			averageDuration: '2-4 months',
			keywords: [
				'residential interior design bangalore',
				'home interior design',
				'apartment design',
				'villa interior',
			],
		},
		featured: false,
		client: 'The Verma Residence',
		location: 'Pune',
		area: '1500 sq ft',
		completedDate: '2022-08-01',
		services: ['Renovation', 'Interior Styling', 'Space Optimization'],
		galleryImages: [
			'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
			'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
			'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
		],
		videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?si=0zWb_E_F0-lD-d0J',
	},
];

export default portfolioProjects;
