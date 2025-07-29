# How to Verify Domain sharmaspace.in with Resend

## Step 1: Access Resend Dashboard

1. Go to https://resend.com/
2. Log into your account
3. Navigate to **Domains** section in the sidebar

## Step 2: Add Your Domain

1. Click **"Add Domain"** button
2. Enter: `sharmaspace.in`
3. Click **"Add Domain"**

## Step 3: DNS Records to Add

Resend will provide you with DNS records that need to be added to your domain's DNS settings. You'll typically need to add these records:

### SPF Record (TXT)

```
Host: @
Type: TXT
Value: v=spf1 include:_spf.resend.com ~all
```

### DKIM Record (TXT)

```
Host: resend._domainkey
Type: TXT
Value: [Provided by Resend - unique key]
```

### DMARC Record (TXT) - Optional but recommended

```
Host: _dmarc
Type: TXT
Value: v=DMARC1; p=quarantine; rua=mailto:dmarc@sharmaspace.in
```

## Step 4: Where to Add DNS Records

### If you're using common providers:

#### **Cloudflare:**

1. Go to Cloudflare Dashboard
2. Select your domain `sharmaspace.in`
3. Go to **DNS** section
4. Click **"Add record"**
5. Add each record type (TXT) with the values from Resend

#### **Namecheap:**

1. Go to Namecheap Dashboard
2. Find your domain and click **"Manage"**
3. Go to **Advanced DNS** tab
4. Add new TXT records with the values from Resend

#### **GoDaddy:**

1. Go to GoDaddy DNS Management
2. Select your domain
3. Add new TXT records in DNS settings

#### **Google Domains:**

1. Go to Google Domains
2. Select your domain
3. Go to **DNS** tab
4. Add custom resource records (TXT type)

## Step 5: Verification Process

1. After adding DNS records, go back to Resend dashboard
2. Click **"Verify Domain"** button
3. Wait for verification (can take 24-48 hours)
4. You'll get email confirmation when verified

## Step 6: Update Your Code

Once verified, update the reply route to use your domain:

```javascript
// In app/api/messages/reply/route.js
const { data, error } = await resend.emails.send({
	from: 'Sharma Space <info@sharmaspace.in>', // Now this will work!
	to: [to],
	subject: subject,
	// ... rest of your email content
});
```

## Step 7: Test Your Setup

1. Once domain is verified in Resend dashboard
2. Try sending a reply from admin panel
3. Email should now be sent successfully from `info@sharmaspace.in`

## Common Issues & Solutions

### DNS Propagation Delay

- DNS changes can take 24-48 hours to propagate globally
- Use online DNS checkers to verify records are active

### Record Format

- Make sure there are no extra quotes or spaces
- Some providers auto-add quotes, some don't
- Follow the exact format shown in Resend dashboard

### TTL Settings

- Set TTL to 300 (5 minutes) initially for faster testing
- Change to 3600 (1 hour) after verification

## Who Can Help You Add DNS Records?

If you don't have access to DNS settings:

- **Domain registrar** (where you bought sharmaspace.in)
- **Hosting provider** (if different from registrar)
- **Web developer/admin** who manages your domain
- **IT support** if it's a business domain

## Alternative: Ask for Help

If you can't access DNS settings yourself:

1. Screenshot the DNS records from Resend dashboard
2. Send to whoever manages your domain
3. Ask them to add these TXT records
4. Wait for verification email from Resend

Once domain is verified, you'll be able to send emails from `info@sharmaspace.in` to any recipient!
