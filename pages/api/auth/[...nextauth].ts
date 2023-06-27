import NextAuth, { AuthOptions, Session } from "next-auth";
import { Provider } from "next-auth/providers";
import DiscordProvider from "next-auth/providers/discord";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";
import User, { IUser } from "@/src/models/User";

const providers: Provider[] = [
  GoogleProvider({
    clientId: process.env.GOOGLE_ID,
    clientSecret: process.env.GOOGLE_SECRET
  }),
  DiscordProvider({
    clientId: process.env.DISCORD_ID,
    clientSecret: process.env.DISCORD_SECRET
  })
];

// =============================================================================
// Create a custom CredentialsProvider for email sign on in development use
// =============================================================================
if (process.env.NODE_ENV === "development")
  providers.push(CredentialsProvider({
    name: "DevCredentials",
    credentials: {
      email: {
        label: "Email",
        type: "text"
      }
    },
    async authorize(credentials, req) { // I have no clue why typescript returns an error here
      if (process.env.NODE_ENV !== "development") return null;

      console.log(`Logging in with ${credentials?.email}`);

      return {
        id: "",
        email: credentials?.email,
        image: "",
        name: ""
      };
    }
  }));

export const authOptions: AuthOptions = {
  session: {
    strategy: "jwt"
  },
  providers,
  pages: {
    signIn: "/signin"
  },
  callbacks: {
    async jwt({ token }) {
      const user = await User.findOne({ email: token.email });
      if (!user) {// that means user_old does not exist
        token.user = await new User({
          email: token.email
        }).save();
      } else {
        token.user = user;
      }
      return token;
    },
    session: async ({ session, token }: { session: Session, token: JWT }) => {
      session.user = token.user;
      session.id = token.user._id.toString();
      return session;
    }
  }
};

export default NextAuth(authOptions);
