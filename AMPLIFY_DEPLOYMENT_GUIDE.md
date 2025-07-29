# AWS Amplify Deployment Guide

## Current Issues Fixed

### 1. Missing Environment Variables
The build was failing due to missing `RESEND_API_KEY` and other environment variables. We've implemented graceful handling for missing variables.

### 2. SSM Secrets Setup
The SSM secrets setup was failing. This is resolved by providing fallback values and proper error handling.

### 3. Cache Issues
Cache write errors have been addressed with proper configuration.

## Required Environment Variables

### Essential (Must be set in Amplify Console)

1. **DATABASE_URL**
   ```
   postgresql://username:password@host:port/database
   ```

2. **NEXTAUTH_SECRET**
   ```
   Generate using: openssl rand -base64 32
   ```

3. **NEXTAUTH_URL**
   ```
   https://your-amplify-domain.com
   ```

### Optional (Email functionality will be disabled if not set)

4. **RESEND_API_KEY**
   ```
   re_your_resend_api_key_here
   ```

## Setting Environment Variables in Amplify

1. Go to AWS Amplify Console
2. Select your app
3. Go to "Environment variables" in the left sidebar
4. Add the following variables:

```bash
DATABASE_URL=postgresql://username:password@host:port/database
NEXTAUTH_SECRET=your-32-character-secret
NEXTAUTH_URL=https://your-app-domain.amplifyapp.com
RESEND_API_KEY=re_your_resend_api_key (optional)
```

## Database Setup Options

### Option 1: AWS RDS PostgreSQL
1. Create an RDS PostgreSQL instance
2. Configure security groups to allow Amplify access
3. Use the connection string as DATABASE_URL

### Option 2: External Database (Supabase, PlanetScale, etc.)
1. Create a database on your preferred provider
2. Get the connection string
3. Use it as DATABASE_URL

### Option 3: For Testing (Development only)
Use a local or free-tier database:
```
DATABASE_URL=postgresql://postgres:password@db.example.com:5432/sharma_space
```

## Build Process

The updated build process now:

1. **Environment Setup**: Checks and sets fallback values for missing variables
2. **Dependency Installation**: Installs npm packages
3. **Prisma Generation**: Generates Prisma client
4. **Next.js Build**: Builds the application with proper error handling

## Troubleshooting

### If build still fails:

1. **Check Environment Variables**
   - Ensure all required variables are set in Amplify Console
   - Variables are case-sensitive

2. **Database Connection**
   - Verify DATABASE_URL is correct
   - Check if database is accessible from AWS

3. **Cache Issues**
   - Try clearing the build cache in Amplify Console
   - Redeploy from a fresh commit

### Emergency Deployment (Database issues)

If database connection is causing issues, temporarily:

1. Comment out database operations in API routes
2. Use static data from `/app/data/` folders
3. Deploy successfully
4. Fix database issues
5. Restore database operations

## Monitoring

After deployment:
- Check Amplify build logs for warnings
- Test all functionality
- Monitor application logs in CloudWatch

## Performance Optimization

The build now includes:
- ISR (Incremental Static Regeneration) for dynamic pages
- Optimized caching strategy
- Graceful degradation for missing services

## Security Notes

- Never commit real environment variables to Git
- Use strong secrets for NEXTAUTH_SECRET
- Regularly rotate API keys
- Keep database credentials secure
