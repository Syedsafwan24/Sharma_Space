// Gemini Configuration
// Get your API key from: https://makersuite.google.com/app/apikey

module.exports = {
	// Set your Gemini API key here or use environment variable
	apiKey: process.env.GEMINI_API_KEY || 'your-api-key-here',

	// Model configuration
	model: 'gemini-pro',

	// Default settings
	temperature: 0.7,
	maxTokens: 1000,

	// Project context (optional)
	projectContext: `
    This is the Sharma Space project - a Next.js interior design website.
    The project uses:
    - Next.js 14 with app router
    - Tailwind CSS for styling
    - Prisma for database
    - NextAuth for authentication
    - React Query for data fetching
  `,
};
