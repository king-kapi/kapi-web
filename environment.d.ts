declare namespace NodeJS {
  interface ProcessEnv {
    MONGODB_CONNECTION_URI: string;
    GOOGLE_ID: string,
    GOOGLE_SECRET: string,
    DISCORD_ID: string,
    DISCORD_SECRET: string,
    NEXTAUTH_SECRET: string,
    NEXT_PUBLIC_GOOGLE_ID: string,
    NEXT_PUBLIC_DISCORD_ID: string,
    NEXT_PUBLIC_HOST: string,
  }
}