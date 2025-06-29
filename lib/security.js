// Security utilities for Sharma Space
import crypto from 'crypto';

// Rate limiting storage (in production, use Redis or database)
const rateLimitStore = new Map();

/**
 * Simple rate limiting implementation
 * @param {string} identifier - IP address or user identifier
 * @param {number} maxRequests - Maximum requests allowed
 * @param {number} windowMs - Time window in milliseconds
 * @returns {boolean} - Whether request is allowed
 */
export function rateLimit(identifier, maxRequests = 5, windowMs = 60000) {
	const now = Date.now();
	const windowStart = now - windowMs;
	
	// Clean old entries
	const userRequests = rateLimitStore.get(identifier) || [];
	const validRequests = userRequests.filter(time => time > windowStart);
	
	if (validRequests.length >= maxRequests) {
		return false; // Rate limit exceeded
	}
	
	// Add current request
	validRequests.push(now);
	rateLimitStore.set(identifier, validRequests);
	
	return true; // Request allowed
}

/**
 * Validate and sanitize email address
 * @param {string} email 
 * @returns {object} - { isValid: boolean, sanitized: string }
 */
export function validateEmail(email) {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	const sanitized = email.trim().toLowerCase();
	
	return {
		isValid: emailRegex.test(sanitized) && sanitized.length <= 254,
		sanitized
	};
}

/**
 * Sanitize text input to prevent XSS
 * @param {string} text 
 * @returns {string} - Sanitized text
 */
export function sanitizeText(text) {
	if (typeof text !== 'string') return '';
	
	return text
		.trim()
		.replace(/[<>]/g, '') // Remove potential HTML tags
		.substring(0, 1000); // Limit length
}

/**
 * Validate phone number (basic validation)
 * @param {string} phone 
 * @returns {object} - { isValid: boolean, sanitized: string }
 */
export function validatePhone(phone) {
	const phoneRegex = /^[\+]?[\d\s\-\(\)]{7,15}$/;
	const sanitized = phone.replace(/[^\d\+\-\(\)\s]/g, '').trim();
	
	return {
		isValid: phoneRegex.test(sanitized),
		sanitized
	};
}

/**
 * Generate CSRF token
 * @returns {string} - CSRF token
 */
export function generateCSRFToken() {
	return crypto.randomBytes(32).toString('hex');
}

/**
 * Validate CSRF token
 * @param {string} token 
 * @param {string} sessionToken 
 * @returns {boolean}
 */
export function validateCSRFToken(token, sessionToken) {
	return token && sessionToken && token === sessionToken;
}

/**
 * Get client IP address from request
 * @param {Request} req 
 * @returns {string}
 */
export function getClientIP(req) {
	const forwarded = req.headers.get('x-forwarded-for');
	const realIP = req.headers.get('x-real-ip');
	
	if (forwarded) {
		return forwarded.split(',')[0].trim();
	}
	
	if (realIP) {
		return realIP.trim();
	}
	
	return 'unknown';
}

/**
 * Validate contact form data
 * @param {object} data 
 * @returns {object} - { isValid: boolean, errors: array, sanitized: object }
 */
export function validateContactForm(data) {
	const errors = [];
	const sanitized = {};
	
	// Validate name
	if (!data.name || data.name.trim().length < 2) {
		errors.push('Name must be at least 2 characters long');
	} else {
		sanitized.name = sanitizeText(data.name);
	}
	
	// Validate email
	const emailValidation = validateEmail(data.email || '');
	if (!emailValidation.isValid) {
		errors.push('Please provide a valid email address');
	} else {
		sanitized.email = emailValidation.sanitized;
	}
	
	// Validate phone (optional)
	if (data.phone) {
		const phoneValidation = validatePhone(data.phone);
		if (!phoneValidation.isValid) {
			errors.push('Please provide a valid phone number');
		} else {
			sanitized.phone = phoneValidation.sanitized;
		}
	}
	
	// Validate message
	if (!data.message || data.message.trim().length < 10) {
		errors.push('Message must be at least 10 characters long');
	} else {
		sanitized.message = sanitizeText(data.message);
	}
	
	// Check for honeypot field (should be empty)
	if (data.honeypot && data.honeypot.trim() !== '') {
		errors.push('Spam detected');
	}
	
	return {
		isValid: errors.length === 0,
		errors,
		sanitized
	};
}
