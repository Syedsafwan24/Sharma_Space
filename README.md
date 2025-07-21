# Sharma Space - Next.js Interior Design Website

A modern, production-ready interior design website built with Next.js 14, TypeScript, Tailwind CSS, Prisma, and PostgreSQL. Features user authentication, a protected admin dashboard, and a fully dynamic database seeded with real project data.

---

## Features
- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Responsive Design** for all devices
- **SEO Optimized** with meta tags and structured data
- **Advanced Image Optimization** (WebP/AVIF, lazy loading)
- **User Authentication** (NextAuth.js, bcryptjs)
- **Protected Admin Dashboard**
- **PostgreSQL + Prisma** with custom client output and full data seeding
- **Interactive Contact Info** (clickable phone/email/address)
- **Social Media Integration**

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- PostgreSQL (local or remote)

### Installation
1. Clone the repository:
   ```bash
git clone <repository-url>
cd Sharma_Space
```
2. Install dependencies:
   ```bash
npm install
# or
yarn install
```

### Database Setup (PostgreSQL & Prisma)
1. **Ensure PostgreSQL is running**
2. **Create Database and User:**
   ```sql
CREATE USER sharmaspaceadmin WITH PASSWORD 'Admin@123';
CREATE DATABASE sharma_space OWNER sharmaspaceadmin;
GRANT ALL PRIVILEGES ON DATABASE sharma_space TO sharmaspaceadmin;
```
3. **Configure Environment Variables:**
   Create a `.env.local` file in the root:
   ```env
DATABASE_URL="postgresql://sharmaspaceadmin:Admin@123@localhost:5432/sharma_space"
NEXTAUTH_SECRET=YOUR_SECRET_KEY
NEXTAUTH_URL=http://localhost:3000
```
4. **Prisma Migration & Client Generation:**
   ```bash
npx prisma migrate dev --name init
```
   If you see Prisma client errors, delete `node_modules/.prisma` and `lib/generated/prisma`, then:
   ```bash
npm install
npx prisma generate
```
5. **Seed the Database:**
   ```bash
node prisma/seed.js
```
   This will populate your database with demo data from `/app/data`.

---

## Running the Development Server
```bash
npx dotenv -e .env.local -- next dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project Structure
```
├── app/                    # Next.js App Router pages & API
├── components/             # Reusable React components
├── lib/                    # Utilities & Prisma client
├── hooks/                  # Custom React hooks
├── prisma/                 # Database schema, migrations, seed
├── public/                 # Static assets & images
```

---

## Authentication & User Management
- **Registration:** `/register` page (passwords hashed with bcryptjs)
- **Login:** `/login` page
- **Protected Dashboard:** `/admin/dashboard` (requires authentication)
- **Logout:** Available in navigation

---

## Environment Variables
- `DATABASE_URL` - PostgreSQL connection string
- `NEXTAUTH_SECRET` - Secret for NextAuth.js
- `NEXTAUTH_URL` - Base URL for NextAuth.js

---

## Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Lint code
- `npm run db:push` - Push Prisma schema to DB

---

## Deployment
### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy automatically

### Other Platforms
```bash
npm run build
npm start
```

---

## License
MIT
