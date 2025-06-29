# Sharma Space - Next.js Interior Design Website

A modern, responsive interior design website built with Next.js 14, TypeScript, and Tailwind CSS, featuring user authentication, a protected admin dashboard, and a fully dynamic PostgreSQL database seeded with real project data.

## ✅ Recent Major Updates (December 2024)

### 🔗 Complete Link & Navigation System Overhaul

- ✅ **WelcomeModal CTA**: Fixed "Get Free Consultation" button to properly redirect to contact page
- ✅ **Navigation Social Links**: Updated all social media icons to link to actual Sharma Space accounts
- ✅ **Footer Links**: Made address, phone, and email clickable with proper functionality (tel:, mailto:, Google Maps)
- ✅ **Contact Details**: Enhanced all contact information with interactive links across components
- ✅ **Google Maps Integration**: Updated map embed to show specific office location with proper accessibility
- ✅ **External Link Security**: Added proper `target="_blank"` and `rel="noopener noreferrer"` attributes

### 🖼️ Advanced Image Optimization System

- ✅ **Modern Formats**: Implemented WebP & AVIF support with automatic browser detection and fallbacks
- ✅ **OptimizedImage Component**: Created reusable component with loading states, error handling, and quality presets
- ✅ **Smart Loading**: Progressive lazy loading with blur placeholders for enhanced UX
- ✅ **Responsive Images**: Dynamic sizing optimized for different screen breakpoints and devices
- ✅ **Performance Enhancement**: Significant reduction in bandwidth usage and faster loading times
- ✅ **Components Migrated**: Updated 10+ key components including Hero, Portfolio, Blog, Navigation, Footer, and more

### 📄 Documentation & Project Management

- ✅ **README Enhancement**: Updated with comprehensive feature documentation and setup instructions
- ✅ **TODO Management**: Reorganized and updated project status tracking with clear priorities
- ✅ **Code Quality**: Removed temporary scripts and maintained clean project structure

## Features

- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Responsive Design** optimized for all devices
- **SEO Optimized** with proper meta tags and structured data
- **Advanced Image Optimization** with WebP/AVIF formats and lazy loading
- **Performance Optimized** with modern loading strategies and code splitting
- **User Authentication** using NextAuth.js
- **Protected Admin Dashboard** for authorized users
- **PostgreSQL + Prisma** with custom client output and full data seeding
- **Interactive Contact Information** with clickable phone, email, and address links
- **Social Media Integration** with proper external linking

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- PostgreSQL (local or remote)

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd sharma-space-nextjs
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

### Database Setup (PostgreSQL & Prisma)

This project uses PostgreSQL as its database and Prisma as the ORM, with the Prisma client generated to a custom output directory (`lib/generated/prisma`).

#### 1. **Ensure PostgreSQL is running:**

If you're using a local PostgreSQL instance, make sure it's active. For Ubuntu:

```bash
sudo pg_ctlcluster 16 main start
```

For Windows, use pgAdmin or the PostgreSQL service manager.

#### 2. **Create Database and User:**

If you haven't already, create a database and a user for your application. For example:

```sql
-- Connect to your PostgreSQL server (e.g., psql -U postgres)
CREATE USER sharmaspaceadmin WITH PASSWORD 'Admin@123';
CREATE DATABASE sharma_space OWNER sharmaspaceadmin;
GRANT ALL PRIVILEGES ON DATABASE sharma_space TO sharmaspaceadmin;
```

#### 3. **Configure Environment Variables:**

Create a `.env.local` file in the root of your project (if it doesn't exist) and add your database connection string and NextAuth.js secrets. Replace `YOUR_SECRET_KEY` with a strong, randomly generated string (e.g., using `openssl rand -base64 32`).

```env
DATABASE_URL="postgresql://sharmaspaceadmin:Admin@123@localhost:5432/sharma_space"
NEXTAUTH_SECRET=YOUR_SECRET_KEY
NEXTAUTH_URL=http://localhost:3000
```

#### 4. **Prisma Migration & Client Generation:**

- **Initial migration:**

  ```bash
  npx prisma migrate dev --name init
  ```

  This will create the tables in your database and generate the Prisma client in `lib/generated/prisma`.

- **If you ever see errors like `@prisma/client did not initialize yet...`:**
  1. Delete the following folders manually:
     - `node_modules/.prisma` (inside your project root)
     - `lib/generated/prisma` (inside your project root)
  2. Reinstall dependencies and regenerate the client:
     ```bash
     npm install
     npx prisma generate
     ```

#### 5. **Seeding the Database with Dummy Data**

- The project includes a comprehensive seed script at `prisma/seed.js` that will populate your database with all the dummy data from `/app/data` (projects, blog posts, services, testimonials, messages).
- The script is written in ESM (JavaScript modules) and imports the Prisma client from the custom output directory.

**How to run the seed script:**

```bash
node prisma/seed.js
```

- You should see output like:
  ```
  Seeding started...
  Projects: 4
  BlogPosts: 2
  Services: 6
  Testimonials: 3
  Seeding complete!
  ```
- If you see errors about the Prisma client, follow the troubleshooting steps above.

#### 6. **How to Update the Seed Script**

- If you add new models to your Prisma schema or new data files to `/app/data`, update `prisma/seed.js` to import and insert the new data.
- Always regenerate the Prisma client after changing the schema:
  ```bash
  npx prisma generate
  ```
- Then update and run the seed script again.

### Running the Development Server

```bash
npx dotenv -e .env.local -- next dev
# or
npx dotenv -e .env.local -- next dev -p 4000 -H 0.0.0.0
```

Open [http://localhost:3000](http://localhost:3000) (or your specified port) in your browser.

## Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── globals.css        # Global styles
│   ├── layout.js         # Root layout
│   ├── page.js           # Home page
│   ├── about/            # About page
│   ├── services/         # Services page
│   ├── portfolio/        # Portfolio page
│   ├── blog/            # Blog page
│   ├── contact/         # Contact page
│   ├── login/           # Login page
│   ├── register/        # Registration page
│   ├── admin/           # Protected admin dashboard
│   ├── data/            # Static data files and content
│   └── api/             # API routes
│       ├── auth/        # NextAuth.js API routes
│       └── register/    # User registration API
├── components/           # Reusable components
│   ├── ui/              # Core UI components (OptimizedImage, etc.)
│   ├── about/           # About page specific components
│   ├── admin/           # Admin dashboard components
│   ├── blog/            # Blog page specific components
│   ├── contact/         # Contact page specific components
│   ├── portfolio/       # Portfolio page specific components
│   ├── services/        # Services page specific components
│   └── providers/       # Context providers and wrappers
├── lib/                 # Utility functions and configurations
│   ├── utils.js         # General utilities
│   ├── imageUtils.js    # Image optimization utilities
│   └── generated/       # Prisma client output directory
├── hooks/               # Custom React hooks
├── prisma/              # Database schema and migrations
│   ├── schema.prisma    # Database schema definition
│   ├── seed.js          # Database seeding script
│   └── migrations/      # Database migration files
└── public/             # Static assets and images
    ├── images/         # Project images and media
    └── screenshot/     # Documentation screenshots
```

## Authentication & User Management

This project implements a robust authentication system using NextAuth.js and Prisma.

- **Registration:** New users can create an account via the `/register` page. Passwords are securely hashed using `bcryptjs` before being stored in the database.
- **Login:** Users can log in via the `/login` page using their registered email and password.
- **Protected Dashboard:** The `/admin/dashboard` route is protected, requiring users to be authenticated to access it. Unauthenticated users will be redirected to the login page.
- **Logout:** A logout button is available (e.g., in the navigation bar) to sign out of the application.

## Key Features

### 🔗 Enhanced User Experience & Navigation

- **Interactive Contact Information**: Clickable phone numbers (`tel:`), email addresses (`mailto:`), and office address (Google Maps)
- **Social Media Integration**: All social links properly configured with security attributes and external targeting
- **Modal & CTA Optimization**: Welcome modal and all call-to-action buttons properly link to contact page
- **Google Maps Integration**: Interactive map showing exact office location with accessibility features
- **Secure External Links**: Proper `rel="noopener noreferrer"` attributes for all external links

### 🖼️ Advanced Image Optimization

- **Modern Formats**: Automatic WebP and AVIF delivery with intelligent fallbacks to JPEG/PNG
- **Smart Loading**: Lazy loading with blur placeholders for smooth UX and improved Core Web Vitals
- **Responsive Images**: Dynamic sizing optimized for different screen breakpoints and device types
- **Performance**: Significant reduction in bandwidth usage and faster loading times
- **Error Handling**: Graceful fallbacks for broken or missing images with proper alt text
- **Quality Presets**: Optimized compression settings for different image types (hero, thumbnail, gallery)

### 🏗️ Architecture & Development

- **Next.js 14** with App Router and Server Components
- **TypeScript** for enhanced type safety and developer experience
- **Tailwind CSS** for utility-first styling and responsive design
- **Custom Components**: Reusable UI components with proper accessibility
- **Performance Optimized**: Code splitting, tree shaking, and modern loading strategies

### 🔐 Authentication & Admin System

- **User Registration**: Secure account creation with password hashing using bcryptjs
- **NextAuth.js Integration**: Complete authentication flow with session management
- **Protected Dashboard**: Admin routes with authentication middleware and access control
- **PostgreSQL + Prisma**: Full-featured database with custom client output and comprehensive seeding
- **Role-based Access**: Secure admin functionality for content management

### 📈 SEO & Performance

- **SEO Optimization**: Proper meta tags, structured data (JSON-LD), and Open Graph support
- **Performance Optimized**: Next.js Image optimization, lazy loading, and code splitting
- **Responsive Design**: Mobile-first approach with Tailwind CSS responsive utilities
- **Accessibility**: Semantic HTML, ARIA labels, keyboard navigation, and screen reader support
- **Core Web Vitals**: Optimized for Google's performance metrics

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Other Platforms

Build the project:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

## Environment Variables

Environment variables, including your `DATABASE_URL`, `NEXTAUTH_SECRET`, and `NEXTAUTH_URL`, are configured in the `.env.local` file. Refer to the [Database Setup](#database-setup-postgresql--prisma) section for details on configuring these variables.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.
