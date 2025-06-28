# Gemini CLI Setup Guide

This guide will help you set up and use the Gemini CLI for your Sharma Space project.

## Prerequisites

- Node.js and npm installed
- A Google Gemini API key

## Setup Steps

### 1. Get Your API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated API key

### 2. Set Your API Key

**Option A: Environment Variable (Recommended)**

```bash
# Windows (PowerShell)
$env:GEMINI_API_KEY="your-api-key-here"

# Windows (Command Prompt)
set GEMINI_API_KEY=your-api-key-here

# Mac/Linux
export GEMINI_API_KEY=your-api-key-here
```

**Option B: Direct in Code (Not recommended for production)**
Edit `gemini-cli.js` and replace `'your-api-key-here'` with your actual API key.

### 3. Run the CLI

```bash
# Using npm script
npm run gemini

# Or directly
node gemini-cli.js
```

## Usage

Once running, you can:

- Type your questions or requests
- Type `exit` to quit the CLI
- The AI will respond with helpful information about your project

## Example Commands

```
You: Help me understand the project structure
You: How do I add a new page to this Next.js app?
You: What's the best way to style components in this project?
You: Explain the authentication flow
```

## Features

- Interactive chat interface
- Project-specific context awareness
- Error handling for API issues
- Easy to extend and customize

## Troubleshooting

### "API Key not set" error

Make sure you've set the `GEMINI_API_KEY` environment variable or updated the code with your key.

### "Rate limit exceeded" error

The free tier has usage limits. Consider upgrading your Google AI Studio plan.

### "Network error" error

Check your internet connection and try again.

## Customization

You can modify `gemini-config.js` to:

- Change the AI model
- Adjust temperature and token limits
- Add more project context
- Configure other settings

## Security Notes

- Never commit your API key to version control
- Use environment variables for production
- Keep your API key secure and don't share it
