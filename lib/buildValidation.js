/**
 * Environment validation and setup for production builds
 */

function validateBuildEnvironment() {
	const warnings = [];
	const errors = [];

	// Check for critical environment variables
	if (!process.env.NEXTAUTH_SECRET && process.env.NODE_ENV === 'production') {
		if (process.env.SKIP_DB_DURING_BUILD !== 'true') {
			errors.push('NEXTAUTH_SECRET is required for production builds');
		} else {
			warnings.push('NEXTAUTH_SECRET not set, using fallback for build time');
		}
	}

	if (
		!process.env.DATABASE_URL &&
		process.env.SKIP_DB_DURING_BUILD !== 'true'
	) {
		warnings.push('DATABASE_URL not set, database operations will be skipped');
	}

	return { warnings, errors };
}

function getBuildTimeConfig() {
	return {
		skipDatabase: process.env.SKIP_DB_DURING_BUILD === 'true',
		isProduction: process.env.NODE_ENV === 'production',
		isBuild:
			process.env.NODE_ENV === 'production' ||
			process.env.SKIP_DB_DURING_BUILD === 'true',
	};
}

function logBuildStatus() {
	const config = getBuildTimeConfig();
	const { warnings, errors } = validateBuildEnvironment();

	console.log('🔧 Build Configuration:');
	console.log(`   Skip Database: ${config.skipDatabase}`);
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
