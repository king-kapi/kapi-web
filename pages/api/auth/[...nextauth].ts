import NextAuth, { AuthOptions, Session, User as NextUser } from "next-auth";
import { Provider } from "next-auth/providers";
import DiscordProvider from "next-auth/providers/discord";
import GoogleProvider from "next-auth/providers/google";
import { AdapterUser } from "next-auth/adapters";
import { JWT } from "next-auth/jwt";

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
// if (process.env.NODE_ENV === "development")
//   providers.push(CredentialsProvider({
//     name: "DevCredentials",
//     credentials: {
//       email: {
//         label: "Email",
//         type: "text"
//       }
//     },
//     async authorize(credentials, req) { // I have no clue why typescript returns an error here
//       if (process.env.NODE_ENV !== "development") return null;
//
//       console.log(`Logging in with ${credentials?.email}`);
//
//       const user = await prisma.user.findUnique({
//         where: {
//           email: credentials?.email || ""
//         }
//       })
//
//       if (user)
//         return {
//           id: user.id,
//           email: user.email,
//           image: user.image,
//           name: user.username
//         };
//       return null;
//     }
//   }));

export const authOptions: AuthOptions = {
  session: {
    strategy: "jwt"
  },
  providers,
  pages: {
    signIn: "/signin"
  },
  callbacks: {
    session: async ({ session, token }: { session: Session, user: NextUser | AdapterUser, token: JWT }) => {
      if (token.sub) {
        session.id = token.sub;
      }
      return session;
    }
  }
};

export default NextAuth(authOptions);
