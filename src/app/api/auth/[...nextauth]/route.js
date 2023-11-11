import NextAuth from "next-auth";
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from "./lib/mongobd"
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {

  adapter: MongoDBAdapter(clientPromise),

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID ?? "",
      clientSecret: process.env.GOOGLE_SECRET ?? "",
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
  ],
};

export const handler = NextAuth(authOptions);


export { handler as GET, handler as POST, MongoDBAdapter as adapter}; //  mongoDBAdapter as adapter
