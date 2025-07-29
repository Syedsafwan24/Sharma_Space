# Email Setup Guide - Resend Alternative to Nodemailer

## Overview

This guide explains how to set up email functionality using Resend instead of Nodemailer to send replies from `info@sharmaspace.in`.

## 1. Resend Setup (Recommended)

### Why Resend?

- ✅ Better deliverability than Gmail SMTP
- ✅ Developer-friendly API
- ✅ Built-in email templates
- ✅ Real-time analytics
- ✅ Generous free tier (3,000 emails/month)

### Setup Steps:

1. **Create Resend Account:**
   - Go to https://resend.com/
   - Sign up for free account
   - Verify your email

2. **Domain Verification:**
   - Add your domain `sharmaspace.in`
   - Add DNS records provided by Resend
   - Verify domain ownership

3. **Get API Key:**
   - Go to API Keys section
   - Create new API key
   - Copy the key

4. **Environment Variables:**
   Add to your `.env.local` file:

   ```
   RESEND_API_KEY=re_your_api_key_here
   ```

5. **Remove Old Variables:**
   You can remove these from `.env.local`:
   ```
   # GMAIL_USER=your_gmail_here
   # GMAIL_PASS=your_app_password_here
   ```

## 2. Alternative Options

### Option A: SendGrid

```bash
npm install @sendgrid/mail
```

```javascript
// api/messages/reply/route.js
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export async function POST(req) {
	const { to, subject, text, originalMessage } = await req.json();

	const msg = {
		to,
		from: 'info@sharmaspace.in',
		subject,
		text: `${text}\n\n---\nOriginal Message:\n${originalMessage || ''}`,
		html: `<p>${text.replace(/\n/g, '<br>')}</p>`,
	};

	await sgMail.send(msg);
	return new Response(JSON.stringify({ success: true }), { status: 200 });
}
```

### Option B: Amazon SES

```bash
npm install @aws-sdk/client-ses
```

```javascript
// api/messages/reply/route.js
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';

const ses = new SESClient({
	region: process.env.AWS_REGION,
	credentials: {
		accessKeyId: process.env.AWS_ACCESS_KEY_ID,
		secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
	},
});

export async function POST(req) {
	const { to, subject, text, originalMessage } = await req.json();

	const command = new SendEmailCommand({
		Source: 'info@sharmaspace.in',
		Destination: { ToAddresses: [to] },
		Message: {
			Subject: { Data: subject },
			Body: {
				Text: {
					Data: `${text}\n\n---\nOriginal Message:\n${originalMessage || ''}`,
				},
				Html: { Data: `<p>${text.replace(/\n/g, '<br>')}</p>` },
			},
		},
	});

	await ses.send(command);
	return new Response(JSON.stringify({ success: true }), { status: 200 });
}
```

### Option C: Mailgun

```bash
npm install mailgun.js form-data
```

```javascript
// api/messages/reply/route.js
import Mailgun from 'mailgun.js';
import formData from 'form-data';

const mailgun = new Mailgun(formData);
const mg = mailgun.client({
	username: 'api',
	key: process.env.MAILGUN_API_KEY,
});

export async function POST(req) {
	const { to, subject, text, originalMessage } = await req.json();

	await mg.messages.create(process.env.MAILGUN_DOMAIN, {
		from: 'Sharma Space <info@sharmaspace.in>',
		to: [to],
		subject,
		text: `${text}\n\n---\nOriginal Message:\n${originalMessage || ''}`,
		html: `<p>${text.replace(/\n/g, '<br>')}</p>`,
	});

	return new Response(JSON.stringify({ success: true }), { status: 200 });
}
```

## 3. Testing the Setup

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Start development server:**

   ```bash
   npm run dev
   ```

3. **Test the reply functionality:**
   - Go to admin dashboard
   - Navigate to messages
   - Try replying to a message
   - Check if email is sent successfully

## 4. Benefits of the New Setup

- ✅ Emails sent from `info@sharmaspace.in` instead of Gmail
- ✅ Better deliverability and spam protection
- ✅ Professional email appearance
- ✅ Better error handling and logging
- ✅ HTML email templates included
- ✅ No dependency on Gmail app passwords

## 5. Migration Checklist

- [x] Install Resend package
- [x] Update reply API route
- [x] Remove nodemailer dependency
- [x] Update environment variables
- [ ] Set up Resend account and domain
- [ ] Test email functionality
- [ ] Update production environment variables

## Support

If you encounter any issues:

1. Check Resend dashboard for delivery status
2. Verify domain DNS settings
3. Check API key permissions
4. Review server logs for errors
