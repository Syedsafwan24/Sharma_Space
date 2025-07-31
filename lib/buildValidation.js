/**
 * Environment validation and setup for production builds
 */

function validateBuildEnvironment() {
	const warnings = [];
	const errors = [];

	// Check for critical environment variables
	if (!process.env.NEXTAUTH_SECRET && process.env.NODE_ENV === 'production') {
		errors.push('NEXTAUTH_SECRET is required for production builds');
	} else if (!process.env.NEXTAUTH_SECRET) {
		warnings.push('NEXTAUTH_SECRET not set, using fallback for build time');
	}

	if (!process.env.DATABASE_URL) {
		warnings.push('DATABASE_URL not set, database operations will be skipped');
	}

	return { warnings, errors };
}

function getBuildTimeConfig() {
	return {
		isProduction: process.env.NODE_ENV === 'production',
		isBuild: process.env.NODE_ENV === 'production',
	};
}

function logBuildStatus() {
	const config = getBuildTimeConfig();
	const { warnings, errors } = validateBuildEnvironment();

	console.log('🔧 Build Configuration:');
	console.log(`   Production: ${config.isProduction}`);
	console.log(`   Build Mode: ${config.isBuild}`);

	if (warnings.length > 0) {
		console.warn('⚠️  Warnings:');
		warnings.forEach((warning) => console.warn(`   - ${warning}`));
	}

	if (errors.length > 0) {
		console.error('❌ Errors:');
		errors.forEach((error) => console.error(`   - ${error}`));
		if (errors.length > 0) {
			throw new Error('Build validation failed');
		}
	}

	console.log('✅ Build environment validation completed');
}

module.exports = {
	validateBuildEnvironment,
	getBuildTimeConfig,
	logBuildStatus,
};
