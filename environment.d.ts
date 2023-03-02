declare namespace NodeJS {
  interface ProcessEnv {
    MONGODB_CONNECTION_URI: string;
    GOOGLE_ID: string,
    GOOGLE_SECRET: string,
    DISCORD_ID: string,
    DISCORD_SECRET: string,
    NEXTAUTH_SECRET: string
  }
}