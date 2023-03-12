import MongoDatastore from '@/src/datastore/MongoDatastore';
import User from '@/src/models/User';
import NextAuth, { Awaitable, Session } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import DiscordProvider from 'next-auth/providers/discord';
import CredentialsProvider from 'next-auth/providers/credentials';
import UserNotFoundError from '@/src/errors/UserNotFoundError';
import { ObjectId } from 'mongodb';
import { env } from 'process';

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    DiscordProvider({
      clientId: process.env.DISCORD_ID,
      clientSecret: process.env.DISCORD_SECRET,
    }),
    CredentialsProvider({
      name: 'DevCredentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'text',
        },
      },
      async authorize(credentials, req): Promise<User | null> {
        // I have no clue why typescript returns an error here
        if (process.env.NODE_ENV !== 'development') return null;

        const user = await (
          await MongoDatastore.getInstance()
        ).users.getUserByEmail(credentials?.email || '');
        if (user) return user;
        return null;
      },
    }),
  ],
  pages: {
    signIn: '/SignInPage',
  },
  callbacks: {
    session: async ({ session }: { session: Session }) => {
      if (session) {
        const instance = await MongoDatastore.getInstance();

        try {
          session.user = await instance.users.getUserByEmail(session.user.email);
        } catch (error) {
          // if not registered
          if (error instanceof UserNotFoundError)
            session.user = await instance.users.register(session.user.email, session.user.email);
          else throw error;
        }
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);
