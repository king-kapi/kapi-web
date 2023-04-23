import Collections from "@/src/datastore/Collections";
import MongoDatastore from "@/src/datastore/MongoDatastore";
import { UserNotFoundError } from "@/src/errors/UserErrors";
import UserProfile from "@/src/types/UserProfile";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import { MongoClient, MongoExpiredSessionError, ObjectId } from "mongodb";
import NextAuth, { AuthOptions, Session, User } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import { JWT } from "next-auth/jwt";
import { Provider } from "next-auth/providers";
import CredentialsProvider from "next-auth/providers/credentials";
import DiscordProvider from "next-auth/providers/discord";
import Email from "next-auth/providers/email";
import GoogleProvider, { GoogleProfile } from "next-auth/providers/google";

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

const providers: Provider[] = [
  GoogleProvider({
    clientId: process.env.GOOGLE_ID,
    clientSecret: process.env.GOOGLE_SECRET
  }),
  DiscordProvider({
    clientId: process.env.DISCORD_ID,
    clientSecret: process.env.DISCORD_SECRET
  })
]

if (process.env.NODE_ENV === "development")
  providers.push(CredentialsProvider({
    name: 'DevCredentials',
    credentials: {
      email: {
        label: "Email",
        type: "text"
      }
    },
    async authorize(credentials, req) { // I have no clue why typescript returns an error here
      if (process.env.NODE_ENV !== "development") return null;

      console.log(`Logging in with ${credentials?.email}`)

      const user = await (await MongoDatastore.getInstance()).users.getUserProfileByEmail(credentials?.email || "");

      if (user)
        return {
          id: user._id.toString(),
          email: user.email,
          image: user.image,
          name: user.username
        };
      return null;
    }
  }))

export const authOptions: AuthOptions = {
  adapter: MongoDBAdapter(clientPromise, {
    collections: {
      Users: Collections.USERS
    },
    databaseName: "designthriving"
  }),
  session: {
    strategy: "jwt"
  },
  providers,
  pages: {
    signIn: '/signin',
  },
  callbacks: {
    async jwt({ token, isNewUser }) {
      const instance = await MongoDatastore.getInstance();

      if (isNewUser) {
        console.log('registering new user!');
        token.user = await instance.users.register({
          id: new ObjectId(token.sub),
          email: token.email ?? "",
          image: token.picture ?? ""
        });
      } else
        token.user = await instance.users.getUserProfile(new ObjectId(token.sub));

      return token;
    },
    session: async ({ session, token }: { session: Session, user: User | AdapterUser, token: JWT }) => {
      if (session) {
        session.user = token.user as UserProfile;
      }
      return session;
    }
  }
}

export default NextAuth(authOptions);