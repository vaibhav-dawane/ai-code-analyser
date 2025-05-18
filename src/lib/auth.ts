import NextAuth, { NextAuthOptions } from "next-auth"
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
      session.username = token.username; 
      session.accessToken = token.accessToken;       
      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET
}

export default NextAuth(authOptions)