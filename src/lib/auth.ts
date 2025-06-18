import prisma from "@/lib/prisma";
import NextAuth from "next-auth"
// @ts-expect-error — suppress TS error temporarily
import type { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github"

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
      authorization: {
        params: { scope: "read:user repo" },
      },
    }),
  ],
  session: {
    strategy: "jwt"
  },
  callbacks: {
    async signIn({ profile, user, account }) {
      const githubProfile = profile as { login: string };

      if (!githubProfile.login) {
        console.log("User is not there");
        return false;
      }

      await prisma.user.upsert({
        where: { username: githubProfile.login },
        update: {
          name: user.name as string,
          access_token: account?.access_token
        },
        create: {
          name: user.name as string,
          username: githubProfile.login,
          access_token: account?.access_token as string
        }
      })
      console.log("Details saved successfully");
      return true;
    },
    async jwt({ token, account, profile }) {
      if (account && profile) {
        token.accessToken = account.access_token;

        // for github username
        const githubProfile = profile as { login: string };
        token.username = githubProfile.login;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.username = token.username as string;
        session.accessToken = token.accessToken as string;
      }
      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET
}

export default NextAuth(authOptions)