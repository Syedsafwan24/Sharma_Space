# Email Setup Without Domain Verification

## Problem

You need to send emails from `info@sharmaspace.in` but don't have access to verify the domain with email services.

## Solutions (No Domain Verification Required)

### Option 1: Resend with Reply-To (Currently Implemented) ✅

**What it does:**

- Emails appear to come from `onboarding@resend.dev` (verified)
- Reply-to is set to `info@sharmaspace.in`
- When users reply, it goes to your actual email

**Setup:**

1. Get Resend API key from https://resend.com
2. Add to `.env.local`:
   ```
   RESEND_API_KEY=re_your_api_key_here
   ```
3. Already implemented in your code!

**Pros:**

- ✅ Works immediately, no domain setup
- ✅ Professional appearance
- ✅ Replies go to your actual email
- ✅ Good deliverability

**Cons:**

- ❌ "From" shows resend.dev domain

---

### Option 2: EmailJS (Frontend-based)

**What it does:**

- Sends emails directly from frontend
- Uses your Gmail/Outlook account
- No backend API needed

**Setup:**

1. Create account at https://www.emailjs.com/
2. Connect your Gmail/Outlook
3. Create email template
4. Get service ID, template ID, and public key

**Environment Variables:**

```
EMAILJS_SERVICE_ID=service_xxxxxxx
EMAILJS_TEMPLATE_ID=template_xxxxxxx
EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxx
```

**Implementation:**

```javascript
// In your React component
import emailjs from '@emailjs/browser';

const sendReply = async (replyData) => {
	try {
		await emailjs.send(
			process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
			process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
			{
				to_email: replyData.email,
				from_name: 'Sharma Space',
				message: replyData.text,
				subject: 'Reply from Sharma Space',
			},
			process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
		);
		alert('Email sent successfully!');
	} catch (error) {
		alert('Failed to send email');
	}
};
```

**Pros:**

- ✅ No domain verification needed
- ✅ Uses your actual Gmail/Outlook
- ✅ Shows your real email address
- ✅ Simple setup

**Cons:**

- ❌ Sends from frontend (less secure)
- ❌ Rate limited
- ❌ Requires exposing API keys to frontend

---

### Option 3: SMTP with your existing email

**What it does:**

- Uses your existing email provider's SMTP
- Works with Gmail, Outlook, etc.

**For Gmail:**

1. Enable 2FA on your Google account
2. Generate App Password
3. Use SMTP settings

**Environment Variables:**

```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

**Implementation:**

```javascript
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransporter({
	host: process.env.SMTP_HOST,
	port: process.env.SMTP_PORT,
	secure: false,
	auth: {
		user: process.env.SMTP_USER,
		pass: process.env.SMTP_PASS,
	},
});

// In your API route
await transporter.sendMail({
	from: '"Sharma Space" <your-email@gmail.com>',
	replyTo: 'info@sharmaspace.in',
	to: userEmail,
	subject: 'Reply from Sharma Space',
	text: replyText,
});
```

**Pros:**

- ✅ Uses your existing email
- ✅ No additional service needed
- ✅ Full control

**Cons:**

- ❌ May end up in spam folder
- ❌ Limited sending rate
- ❌ Shows your personal email domain

---

### Option 4: SendGrid Free Tier

**What it does:**

- Professional email service
- 100 emails/day free
- No domain verification for basic usage

**Setup:**

1. Create SendGrid account
2. Get API key
3. Use single sender verification (just verify your email)

**Environment Variables:**

```
SENDGRID_API_KEY=SG.xxxxxxxxxxxxxxx
```

**Implementation:**

```javascript
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

await sgMail.send({
	to: userEmail,
	from: 'your-verified-email@gmail.com', // Must be verified
	replyTo: 'info@sharmaspace.in',
	subject: 'Reply from Sharma Space',
	text: replyText,
});
```

**Pros:**

- ✅ Professional service
- ✅ Good deliverability
- ✅ Free tier available

**Cons:**

- ❌ Shows verified email address only
- ❌ Limited free tier

---

## Recommended Approach

**For immediate use:** Option 1 (Resend with Reply-To) - Already implemented!

**For long-term:** Option 3 (SMTP with your Gmail) + App Password

## Quick Setup Instructions

### Current Setup (Resend):

1. Go to https://resend.com
2. Sign up for free account
3. Get API key from dashboard
4. Add to `.env.local`: `RESEND_API_KEY=your_key`
5. Test by replying to a message in admin panel

### Alternative (Gmail SMTP):

1. Go to Google Account settings
2. Enable 2-Factor Authentication
3. Generate App Password for "Mail"
4. Add to `.env.local`:
   ```
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-16-digit-app-password
   ```

Both options will send professional replies that appear to come from Sharma Space!
