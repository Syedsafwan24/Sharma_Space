#!/usr/bin/env node

/**
 * Image Optimization Migration Script
 *
 * This script helps identify and update Image components across the codebase
 * to use the new OptimizedImage component with WebP support and lazy loading.
 */

import fs from 'fs';
import path from 'path';

// Components to scan
const componentsToScan = [
	'components/services/HeroService.jsx',
	'components/services/AlternatingServices.jsx',
	'components/portfolio/HeroPortfolio.jsx',
	'components/portfolio/ProjectDetails/ProjectDetailsContent.jsx',
	'components/portfolio/ProjectDetails/ProjectGallery.jsx',
	'components/portfolio/ProjectDetails/CtaSection.jsx',
	'components/blog/BlogPostHero.jsx',
	'components/blog/BlogHero.jsx',
	'components/blog/BlogSection.jsx',
	'components/contact/HeroContactHeader.jsx',
	'components/Testimonials.js',
];

// Report on current Image usage
function analyzeImageUsage() {
	componentsToScan.forEach((componentPath) => {
		const fullPath = path.join(process.cwd(), componentPath);

		if (fs.existsSync(fullPath)) {
			const content = fs.readFileSync(fullPath, 'utf8');

			// Check for Next.js Image imports
			const hasNextImageImport = content.includes(
				"import Image from 'next/image'"
			);

			// Check for Image component usage
			const imageMatches = content.match(/<Image\s/g);
			const imgMatches = content.match(/<img\s/g);
		} else {
		}
	});
}

// Generate migration checklist
function generateMigrationChecklist() {
	const checklist = [
		'✅ Updated next.config.mjs with WebP and AVIF support',
		'✅ Created OptimizedImage component with loading states',
		'✅ Created imageUtils.js with optimization helpers',
		'✅ Updated Hero.js component',
		'✅ Updated PortfolioSection.js component',
		'✅ Updated DesignInsights.js component',
		'✅ Updated ProjectCard.jsx component',
		'✅ Updated Navigation.js logo images',
		'✅ Updated Footer.js logo images',
		'✅ Updated OurJourney.js component',
		'✅ Updated BlogCard.jsx author images',
		'[ ] Update remaining service components',
		'[ ] Update remaining portfolio components',
		'[ ] Update remaining blog components',
		'[ ] Update contact page images',
		'[ ] Update testimonial images',
		'[ ] Test all optimized images in development',
		'[ ] Run Lighthouse audit for performance metrics',
		'[ ] Verify WebP format delivery in browser dev tools',
	];

	checklist.forEach((item) => console.log(item));
}

// Generate performance testing guide
function generatePerformanceTestingGuide() {
	console.log('1. **Verify WebP Format Delivery:**');
	console.log('   - Open browser dev tools');
	console.log('   - Check Network tab while loading pages');
	console.log('   - Confirm images are served as .webp format');
	console.log('');

	console.log('2. **Test Lazy Loading:**');
	console.log('   - Scroll through portfolio and blog pages slowly');
	console.log('   - Images should load as they come into viewport');
	console.log('   - Check Network tab for progressive loading');
	console.log('');

	console.log('3. **Lighthouse Audit:**');
	console.log('   - Run Lighthouse audit on key pages:');
	console.log('     * Homepage (/)');
	console.log('     * Portfolio page (/portfolio)');
	console.log('     * Blog page (/blog)');
	console.log('     * Individual project pages');
	console.log('   - Target scores: Performance 90+, Best Practices 95+');
	console.log('');

	console.log('4. **Core Web Vitals:**');
	console.log('   - LCP (Largest Contentful Paint): < 2.5s');
	console.log('   - FID (First Input Delay): < 100ms');
	console.log('   - CLS (Cumulative Layout Shift): < 0.1');
	console.log('');

	console.log('5. **Manual Testing:**');
	console.log('   - Test on slow 3G network throttling');
	console.log('   - Verify blur placeholders appear while loading');
	console.log('   - Check error handling for broken image URLs');
}

// Run analysis
analyzeImageUsage();
generateMigrationChecklist();
generatePerformanceTestingGuide();
