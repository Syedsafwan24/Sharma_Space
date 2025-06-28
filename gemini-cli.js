#!/usr/bin/env node

const { GoogleGenerativeAI } = require('@google/generative-ai');
const readline = require('readline');

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(
	process.env.GEMINI_API_KEY || 'your-api-key-here'
);

// Create readline interface
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

async function chatWithGemini() {
	const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

	console.log('🤖 Gemini CLI - Type "exit" to quit\n');

	while (true) {
		const userInput = await new Promise((resolve) => {
			rl.question('You: ', resolve);
		});

		if (userInput.toLowerCase() === 'exit') {
			console.log('Goodbye! 👋');
			rl.close();
			break;
		}

		try {
			const result = await model.generateContent(userInput);
			const response = await result.response;
			console.log('\n🤖 Gemini:', response.text(), '\n');
		} catch (error) {
			console.error('❌ Error:', error.message);
		}
	}
}

// Check if API key is set
if (!process.env.GEMINI_API_KEY) {
	console.log('⚠️  Please set your GEMINI_API_KEY environment variable');
	console.log(
		'You can get your API key from: https://makersuite.google.com/app/apikey'
	);
	console.log('\nTo set the API key, run:');
	console.log('set GEMINI_API_KEY=your-api-key-here (Windows)');
	console.log('export GEMINI_API_KEY=your-api-key-here (Mac/Linux)');
	process.exit(1);
}

chatWithGemini().catch(console.error);
