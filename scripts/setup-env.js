#!/usr/bin/env node

/**
 * Environment Variable Setup Script for Amplify Deployment
 * This script checks and sets up required environment variables
 */

const fs = require('fs');
const path = require('path');

// Load environment variables from .env files
function loadEnvFile(envPath) {
	if (fs.existsSync(envPath)) {
		const envFile = fs.readFileSync(envPath, 'utf8');
		const envLines = envFile.split('\n');

		envLines.forEach((line) => {
			const trimmedLine = line.trim();
			if (trimmedLine && !trimmedLine.startsWith('#')) {
				const [key, ...valueParts] = trimmedLine.split('=');
				if (key && valueParts.length > 0) {
					const value = valueParts.join('=').replace(/^["']|["']$/g, '');
					if (!process.env[key.trim()]) {
						process.env[key.trim()] = value;
					}
				}
			}
		});
		console.log(`📄 Loaded environment variables from ${envPath}`);
	}
}

// Try to load from various .env files
const envFiles = ['.env.local', '.env.production', '.env'];

envFiles.forEach((envFile) => {
	const envPath = path.join(process.cwd(), envFile);
	loadEnvFile(envPath);
});

const requiredEnvVars = ['DATABASE_URL', 'NEXTAUTH_SECRET', 'NEXTAUTH_URL'];

const optionalEnvVars = [
	'RESEND_API_KEY',
	'EMAILJS_SERVICE_ID',
	'EMAILJS_TEMPLATE_ID',
	'EMAILJS_PUBLIC_KEY',
];

console.log('\n🔍 Checking environment variables...');

// Check required variables
let missingRequired = [];
requiredEnvVars.forEach((varName) => {
	if (!process.env[varName]) {
		missingRequired.push(varName);
	} else {
		console.log(`✅ ${varName} is set`);
	}
});

// Check optional variables
let missingOptional = [];
optionalEnvVars.forEach((varName) => {
	if (!process.env[varName]) {
		missingOptional.push(varName);
	} else {
		console.log(`✅ ${varName} is set`);
	}
});

// Report missing variables
if (missingRequired.length > 0) {
	console.log('\n❌ Missing required environment variables:');
	missingRequired.forEach((varName) => {
		console.log(`   - ${varName}`);
	});
}

if (missingOptional.length > 0) {
	console.log(
		'\n⚠️  Missing optional environment variables (features may be disabled):'
	);
	missingOptional.forEach((varName) => {
		console.log(`   - ${varName}`);
	});
}

// Set default values for missing variables to prevent build failures
if (!process.env.DATABASE_URL) {
	console.log('\n🔧 Setting temporary DATABASE_URL for build...');
	process.env.DATABASE_URL = 'postgresql://temp:temp@localhost:5432/temp';
}

if (!process.env.NEXTAUTH_SECRET) {
	console.log('🔧 Setting temporary NEXTAUTH_SECRET for build...');
	process.env.NEXTAUTH_SECRET = 'temp-secret-for-build-only';
}

if (!process.env.NEXTAUTH_URL) {
	console.log('🔧 Setting temporary NEXTAUTH_URL for build...');
	process.env.NEXTAUTH_URL = 'https://temp-url.com';
}

console.log('\n✅ Environment setup complete!');
