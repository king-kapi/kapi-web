import { protectedGetServerSideProps } from "@/components/ProtectedRoute";
import MongoDatastore from "@/src/datastore/MongoDatastore";
import User from "@/src/models/User";
import { GetServerSideProps } from "next";
import NextAuth, { Session } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const getServerSideProps: GetServerSideProps = protectedGetServerSideProps;

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    session: async ({ session }: {session: Session}) => {
      if (session) {
        const instance = await MongoDatastore.getInstance();

        let user: User;
        try {
          user = await instance.users.getUserByEmail(session.user.email);
        } catch { // if not registered
          user = await instance.users.register(session.user.email, session.user.email);
        }

        session.user = Object.assign(session.user, user);
      }
      return session;
    }
  }
}

export default NextAuth(authOptions);