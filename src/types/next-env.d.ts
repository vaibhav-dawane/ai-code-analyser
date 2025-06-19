// import NextAuth from "next-auth";
// import { DefaultSession, DefaultUser } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module 'next-auth' {
  interface Session{
    username?: string;
    accessToken?: string
  }
  interface User{
    username?: string;
    accessToken?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    username?: string;
  }
}