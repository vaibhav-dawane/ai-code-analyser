// import NextAuth from "next-auth";
import { DefaultSession, DefaultUser } from "next-auth";
import { JWT as DefaultJWT } from "next-auth/jwt";

declare module 'next-auth' {
  interface Session extends DefaultSession {
    username?: string;
    accessToken?: string
  }
  interface User extends DefaultUser {
    username?: string;
    accessToken?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    accessToken?: string;
    username?: string;
  }
}