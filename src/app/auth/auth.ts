import { mergeAnonymousCartIntoUserCart } from '@/lib/db/cart';
import { prisma } from '@/lib/db/prisma';
import { env } from '@/lib/env';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { PrismaClient, User } from '@prisma/client';
import { NextAuthOptions } from 'next-auth';
import { Adapter } from 'next-auth/adapters';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';

declare module 'next-auth/adapters' {
    interface AdapterUser {
      id: string;
      role: string;
      randomKey: string;
    }
  }
  
  export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma as PrismaClient) as Adapter,
    pages: {
      signIn: '/auth/signIn',
      error: '/auth/signIn',
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
            return null
          }
  
          const { email, password } = credentials;
  
          try {
            if (!email || !password) {
              return null
            }
  
            const user = await prisma.user.findUnique({
              where: { email },
            });
  
            if (!user) {
              return null
            }
  
            if (!password || !user.password) {
              return null
            }
  
            const passwordValid = await bcrypt.compare(password, user.password);
  
            if (!passwordValid) {
              return null
            }
  
            return {
              id: user.id + '',
              email: user.email,
              role: user.role,
              emailVerified: user.emailVerified,
            };
          } catch (error: any) {
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
    callbacks: {
      async jwt({ token, user }) {
        // console.log('jwt callback', { token, user });
        if (user) {
          const u = user as unknown as any;
          const updatedToken = {
            ...token,
            id: u.id,
            // role: u.role,
            emailVerified: u.emailVerified,
          };
          return Promise.resolve(updatedToken);
        }
        return Promise.resolve(token);
      },
      async session({ session, token }) {
        // console.log('session callback', { session, token });
        const updatedSession = {
          ...session,
          user: {
            ...session.user,
            id: token.id,
            // role: token.role,
            emailVerified: token.emailVerified,
          },
        };
  
        return Promise.resolve(updatedSession);
      },
    },
    events: {
      async signIn({ user }: any) {
        await mergeAnonymousCartIntoUserCart(user.id);
      },
    },
  };
  
    export default authOptions;