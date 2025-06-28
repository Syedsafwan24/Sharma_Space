import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from '@/lib/generated/prisma';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        console.log('Attempting to authorize...');
        console.log('Credentials received:', credentials);

        if (!credentials?.email || !credentials?.password) {
          console.log('Missing email or password.');
          throw new Error("Please enter both email and password.");
        }

        try {
          const user = await prisma.user.findUnique({ where: { email: credentials.email } });

          if (!user) {
            console.log('User not found for email:', credentials.email);
            throw new Error("No user found with this email.");
          }

          console.log('User found:', user.email);
          const isPasswordValid = await bcrypt.compare(credentials.password, user.password);

          if (!isPasswordValid) {
            console.log('Password validation failed for user:', user.email);
            throw new Error("Incorrect password.");
          }

          console.log('Authorization successful for user:', user.email);
          return { id: user.id, name: user.name, email: user.email };
        } catch (error) {
          console.error('Database error during authorization:', error);
          throw new Error("Authentication failed. Please try again.");
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };