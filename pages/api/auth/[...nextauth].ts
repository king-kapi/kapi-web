import Collections from "@/src/datastore/Collections";
import MongoDatastore from "@/src/datastore/MongoDatastore";
import UserProfile from "@/src/types/UserProfile";
import {MongoClient} from "mongodb";
import NextAuth, {AuthOptions, Session, User} from "next-auth";
import {AdapterUser} from "next-auth/adapters";
import {JWT} from "next-auth/jwt";
import {Provider} from "next-auth/providers";
import CredentialsProvider from "next-auth/providers/credentials";
import DiscordProvider from "next-auth/providers/discord";
import GoogleProvider from "next-auth/providers/google";
import {PrismaClient} from "@prisma/client";
import {PrismaAdapter} from "@next-auth/prisma-adapter";

// create a MongoClient for the adapter

const uri = process.env.MONGODB_CONNECTION_URI;
const options = {};

let client;
let clientPromise: Promise<MongoClient>;

const prisma = new PrismaClient();

const providers: Provider[] = [
  GoogleProvider({
    clientId: process.env.GOOGLE_ID,
    clientSecret: process.env.GOOGLE_SECRET,
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
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt"
  },
  providers,
  pages: {
    signIn: '/signin',
  },
  callbacks: {
    async jwt({token, isNewUser}) {
      if (isNewUser) {
        console.log('registering new user!');
        token.user = await prisma.user.create({
          data: {
            email: token.email ?? ""
          }
        })

      } else {
        token.user = await prisma.user.findUnique({
          where: {
            email: token.email ?? ""
          }
        });
      }

      return token;
    },
    session: async ({session, token}: { session: Session, user: User | AdapterUser, token: JWT }) => {
      if (session) {
        session.user = token.user as UserProfile;
      }
      return session;
    }
  }
}

export default NextAuth(authOptions);