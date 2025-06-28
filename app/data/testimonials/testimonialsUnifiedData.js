// Unified testimonials data

const testimonials = [
	{
		id: 1,
		name: 'Priya S.',
		fullName: 'Priya Sharma',
		location: 'Mumbai',
		city: 'Mumbai',
		state: 'Maharashtra',
		rating: 5,
		date: '2024-03-15',
		projectType: 'Residential',
		projectTitle: 'Modern Apartment Design',
		image: {
			url: '/images/testimonials/priya.jpg',
			alt: 'Priya Sharma testimonial Sharma Space interior design client',
			width: 300,
			height: 300,
		},
		text: 'Sharma Space transformed our home into a dream! Their attention to detail is unmatched. Every corner of our apartment now reflects our personality while maintaining functionality. The team was professional, timely, and exceeded our expectations.',
		shortText:
			'Transformed our home into a dream! Attention to detail is unmatched.',
		featured: true,
		verified: true,
		projectDetails: {
			area: '1800 sq ft',
			duration: '3 months',
			budget: '₹25,00,000',
			services: [
				'Complete Interior Design',
				'Custom Furniture',
				'Space Planning',
			],
		},
		beforeAfter: {
			before: '/images/projects/priya-before.jpg',
			after: '/images/projects/priya-after.jpg',
		},
		videoTestimonial: 'https://youtube.com/watch?v=example1',
		tags: ['residential', 'mumbai', 'apartment', 'modern design'],
		seo: {
			schema: {
				'@type': 'Review',
				reviewRating: {
					'@type': 'Rating',
					ratingValue: 5,
					bestRating: 5,
				},
				author: {
					'@type': 'Person',
					name: 'Priya Sharma',
				},
				reviewBody:
					'Sharma Space transformed our home into a dream! Their attention to detail is unmatched.',
				itemReviewed: {
					'@type': 'Organization',
					name: 'Sharma Space',
				},
			},
		},
	},
	{
		id: 2,
		name: 'Rahul M.',
		fullName: 'Rahul Mehta',
		location: 'Delhi',
		city: 'Delhi',
		state: 'Delhi',
		rating: 5,
		date: '2024-02-20',
		projectType: 'Commercial',
		projectTitle: 'Office Redesign',
		image: {
			url: '/images/testimonials/rahul.jpg',
			alt: 'Rahul Mehta testimonial Sharma Space commercial interior design',
			width: 300,
			height: 300,
		},
		text: 'Working with Sharma Space for our office redesign was the best decision. Their team understood our brand and created a workspace that inspires creativity and collaboration. Employee satisfaction has increased significantly.',
		shortText:
			'Created a workspace that inspires creativity and collaboration.',
		featured: true,
		verified: true,
		projectDetails: {
			area: '5000 sq ft',
			duration: '4 months',
			budget: '₹40,00,000',
			services: ['Office Design', 'Brand Integration', 'Workspace Planning'],
		},
		beforeAfter: {
			before: '/images/projects/rahul-before.jpg',
			after: '/images/projects/rahul-after.jpg',
		},
		tags: ['commercial', 'delhi', 'office', 'workspace design'],
		seo: {
			schema: {
				'@type': 'Review',
				reviewRating: {
					'@type': 'Rating',
					ratingValue: 5,
					bestRating: 5,
				},
				author: {
					'@type': 'Person',
					name: 'Rahul Mehta',
				},
				reviewBody:
					'Working with Sharma Space for our office redesign was the best decision.',
				itemReviewed: {
					'@type': 'Organization',
					name: 'Sharma Space',
				},
			},
		},
	},
	{
		id: 3,
		name: 'Ananya K.',
		fullName: 'Ananya Krishnan',
		location: 'Bangalore',
		city: 'Bangalore',
		state: 'Karnataka',
		rating: 5,
		date: '2024-01-10',
		projectType: 'Residential',
		projectTitle: 'Villa Interior Design',
		image: {
			url: '/images/testimonials/ananya.jpg',
			alt: 'Ananya Krishnan testimonial Sharma Space Bangalore interior design',
			width: 300,
			height: 300,
		},
		text: "The team's professionalism and expertise made our renovation stress-free. They delivered on time and within budget, exceeding our expectations with the final result. Our villa now feels like a luxury resort.",
		shortText: 'Delivered on time and within budget, exceeding expectations.',
		featured: true,
		verified: true,
		projectDetails: {
			area: '3500 sq ft',
			duration: '5 months',
			budget: '₹45,00,000',
			services: ['Villa Design', 'Landscape Integration', 'Luxury Interiors'],
		},
		beforeAfter: {
			before: '/images/projects/ananya-before.jpg',
			after: '/images/projects/ananya-after.jpg',
		},
		tags: ['residential', 'bangalore', 'villa', 'luxury design'],
		seo: {
			schema: {
				'@type': 'Review',
				reviewRating: {
					'@type': 'Rating',
					ratingValue: 5,
					bestRating: 5,
				},
				author: {
					'@type': 'Person',
					name: 'Ananya Krishnan',
				},
				reviewBody:
					"The team's professionalism and expertise made our renovation stress-free.",
				itemReviewed: {
					'@type': 'Organization',
					name: 'Sharma Space',
				},
			},
		},
	},
	{
		id: 4,
		name: 'Vikram P.',
		fullName: 'Vikram Patel',
		location: 'Hyderabad',
		city: 'Hyderabad',
		state: 'Telangana',
		rating: 5,
		date: '2023-12-05',
		projectType: 'Residential',
		projectTitle: 'Penthouse Design',
		image: {
			url: '/images/testimonials/vikram.jpg',
			alt: 'Vikram Patel testimonial Sharma Space penthouse interior design',
			width: 300,
			height: 300,
		},
		text: 'Exceptional service from concept to completion. The designers at Sharma Space have an incredible eye for detail and truly understood our vision for our home. The result is beyond what we imagined.',
		shortText: 'Exceptional service from concept to completion.',
		featured: false,
		verified: true,
		projectDetails: {
			area: '4200 sq ft',
			duration: '6 months',
			budget: '₹60,00,000',
			services: [
				'Penthouse Design',
				'Smart Home Integration',
				'Custom Art Curation',
			],
		},
		tags: ['residential', 'hyderabad', 'penthouse', 'luxury'],
		seo: {
			schema: {
				'@type': 'Review',
				reviewRating: {
					'@type': 'Rating',
					ratingValue: 5,
					bestRating: 5,
				},
				author: {
					'@type': 'Person',
					name: 'Vikram Patel',
				},
				reviewBody: 'Exceptional service from concept to completion.',
				itemReviewed: {
					'@type': 'Organization',
					name: 'Sharma Space',
				},
			},
		},
	},
	{
		id: 5,
		name: 'Deepika R.',
		fullName: 'Deepika Reddy',
		location: 'Chennai',
		city: 'Chennai',
		state: 'Tamil Nadu',
		rating: 5,
		date: '2023-11-20',
		projectType: 'Hospitality',
		projectTitle: 'Hotel Renovation',
		image: {
			url: '/images/testimonials/deepika.jpg',
			alt: 'Deepika Reddy testimonial Sharma Space hospitality interior design',
			width: 300,
			height: 300,
		},
		text: 'Our hotel renovation was handled with utmost care and creativity. The result has been praised by all our guests, driving up our bookings significantly.',
		shortText: 'Hotel renovation handled with care and creativity.',
		featured: true,
		verified: true,
		projectDetails: {
			area: '8000 sq ft',
			duration: '8 months',
			budget: '₹1,20,00,000',
			services: ['Hotel Design', 'Guest Experience', 'Brand Integration'],
		},
		tags: ['hospitality', 'chennai', 'hotel', 'renovation'],
		seo: {
			schema: {
				'@type': 'Review',
				reviewRating: {
					'@type': 'Rating',
					ratingValue: 5,
					bestRating: 5,
				},
				author: {
					'@type': 'Person',
					name: 'Deepika Reddy',
				},
				reviewBody:
					'Our hotel renovation was handled with utmost care and creativity.',
				itemReviewed: {
					'@type': 'Organization',
					name: 'Sharma Space',
				},
			},
		},
	},
];

export default testimonials;
