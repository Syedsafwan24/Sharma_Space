#!/usr/bin/env node

/**
 * Build Environment Test Script
 * This script simulates the Amplify build environment to test for potential issues
 */

console.log('🧪 Testing build environment simulation...\n');

// Clear local environment to simulate Amplify
const originalEnv = { ...process.env };

// Remove local env vars to simulate Amplify environment
delete process.env.DATABASE_URL;
delete process.env.NEXTAUTH_SECRET;
delete process.env.NEXTAUTH_URL;
delete process.env.RESEND_API_KEY;

console.log('📋 Checking required environment variables:');

const requiredVars = [
	'DATABASE_URL',
	'NEXTAUTH_SECRET',
	'NEXTAUTH_URL',
	'RESEND_API_KEY',
];

let missingVars = [];

requiredVars.forEach((varName) => {
	if (!process.env[varName]) {
		console.log(`❌ ${varName} - MISSING`);
		missingVars.push(varName);
	} else {
		console.log(`✅ ${varName} - SET`);
	}
});

console.log('\n🔍 Analysis:');

if (missingVars.length > 0) {
	console.log('❌ BUILD WILL FAIL - Missing environment variables in Amplify:');
	missingVars.forEach((varName) => {
		console.log(`   - ${varName}`);
	});
	console.log('\n💡 Solution: Set these variables in AWS Amplify Console');
	console.log('   📖 See AMPLIFY_ENV_SETUP.md for detailed instructions');
} else {
	console.log('✅ All required environment variables are available');
	console.log('✅ Build should succeed');
}

// Test Resend initialization
console.log('\n🧪 Testing Resend initialization:');
try {
	const { Resend } = require('resend');
	if (!process.env.RESEND_API_KEY) {
		console.log('❌ Resend will fail - no API key');
	} else {
		const resend = new Resend(process.env.RESEND_API_KEY);
		console.log('✅ Resend initialization would succeed');
	}
} catch (error) {
	console.log('❌ Resend error:', error.message);
}

// Restore environment
Object.assign(process.env, originalEnv);

console.log('\n🎯 Next Steps:');
console.log('1. Set environment variables in AWS Amplify Console');
console.log("2. Set up cloud database (current localhost won't work)");
console.log('3. Push changes and redeploy');
console.log('4. Monitor build logs for success');
