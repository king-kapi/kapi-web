import MongoDatastore from "@/src/datastore/MongoDatastore";
import User from "@/src/models/User";
import NextAuth, { Session } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import DiscordProvider from "next-auth/providers/discord";
import UserNotFoundError from "@/src/errors/UserNotFoundError";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    DiscordProvider({
      clientId: process.env.DISCORD_ID,
      clientSecret: process.env.DISCORD_SECRET
    })
  ],
  callbacks: {
    session: async ({ session }: {session: Session}) => {
      if (session) {
        const instance = await MongoDatastore.getInstance();

        try {
          session.user = await instance.users.getUserByEmail(session.user.email);
        } catch (error) { // if not registered
          if (error instanceof UserNotFoundError)
          session.user = await instance.users.register(session.user.email, session.user.email);
          else
            throw error
        }
      }
      return session;
    }
  }
}

export default NextAuth(authOptions);