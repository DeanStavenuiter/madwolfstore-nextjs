import { mergeAnonymousCartIntoUserCart } from '@/lib/db/cart';
import { prisma } from '@/lib/db/prisma';
import { env } from '@/lib/env';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';
import { NextAuthOptions } from 'next-auth';
import { Adapter } from 'next-auth/adapters';
import NextAuth from 'next-auth/next';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma as PrismaClient) as Adapter,
  pages: {
    signIn: '/auth/signIn',
  },
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'credentials',
      type: 'credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'example@example.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(
        credentials: Record<'email' | 'password', string> | undefined
      ) {
        if (!credentials) {
          return null;
        }

        const { email, password } = credentials;
        console.log('credentials', credentials)
        try {

          if (!email || !password) {
            return null;
          }

          const user = await prisma.user.findUnique({
            where: { email },
          });

          if (!user) {
            // Return null if credentials are invalid
            return null;
          }

          if (!password || !user.password) {
            return null;
          }

          const passwordValid = await bcrypt.compare(password, user.password);

          if (!passwordValid) {
            // Return null if credentials are invalid
            return null;
          }

          console.log('user', user);
          return {
            id: user.id,
            email: user.email,
            // randomKey: 'Do you like madwolf?',
          }; // Return user object if authentication succeeds
        } catch (error) {
          console.log('error', error); // Handle any errors that occur during authentication
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  secret: env.NEXTAUTH_SECRET,
//   debug: process.env.NODE_ENV === 'development',

  callbacks: {
    session: ({ session, user }) => {
      return {
        ...session,
        user: {
          ...session.user,
          // id: user.id,
        },
      };
    },
    // jwt: ({ token, user }) => {
    //   if (user) {
    //     const u = user as any;
    //     return {
    //       ...token,
    //       id: u.id,
    //       randomKey: u.randomKey,
    //     };
    //   }
    //   return token;
    // },
  },
  events: {
    async signIn({ user }) {
      await mergeAnonymousCartIntoUserCart(user.id);
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
