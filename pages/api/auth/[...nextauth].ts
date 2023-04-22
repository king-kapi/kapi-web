import MongoDatastore from "@/src/datastore/MongoDatastore";
import { UserNotFoundError } from "@/src/errors/UserErrors";
import { BLANK_USER_PROFILE } from "@/src/types/UserProfile";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import { MongoClient } from "mongodb";
import NextAuth, { AuthOptions, Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import DiscordProvider from "next-auth/providers/discord";
import GoogleProvider from "next-auth/providers/google";

// create a MongoClient for the adapter

const uri = process.env.MONGODB_CONNECTION_URI;
const options = {};

let client;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  if (!(global as any)._mongoClientPromise) {
    client = new MongoClient(uri, options);
    (global as any)._mongoClientPromise = client.connect();
  }
  clientPromise = (global as any)._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export const authOptions: AuthOptions = {
  // adapter: MongoDBAdapter(clientPromise, {
  //   collections: {
  //     Users: "test-users"
  //   }
  // }),
  session: {
    strategy: "jwt"
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      // profile: () => {
      //   return BLANK_USER_PROFILE
      // }
    }),
    DiscordProvider({
      clientId: process.env.DISCORD_ID,
      clientSecret: process.env.DISCORD_SECRET
    }),
    // CredentialsProvider({
    //   name: 'DevCredentials',
    //   credentials: {
    //     email: {
    //       label: "Email",
    //       type: "text"
    //     }
    //   },
    //   async authorize(credentials, req) { // I have no clue why typescript returns an error here
    //     if (process.env.NODE_ENV !== "development") return null;

    //     const user = await (await MongoDatastore.getInstance()).users.getUserByEmail(credentials?.email || "");
    //     if (user)
    //       return user;
    //     return null;
    //   }
    // })
  ],
  pages: {
    signIn: '/signin',
  },
  // callbacks: {
  // session: async ({ session }: { session: Session }) => {
  // if (session) {
  //   const instance = await MongoDatastore.getInstance();

  //   try {
  //     session.user = await instance.users.getUserByEmail(session.user.email);
  //   } catch (error) { // if not registered
  //     if (error instanceof UserNotFoundError)
  //       session.user = await instance.users.register(session.user.email, session.user.email);
  //     else
  //       throw error
  //   }
  // }
  // return session;
  // }
  // }
}

export default NextAuth(authOptions);