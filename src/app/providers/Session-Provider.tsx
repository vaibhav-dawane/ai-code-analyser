'use client'
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

interface props {
    children: ReactNode,
    session: Session | null
}

export default function SessionProviderWrapper ({children, session}: props) {
    return (
        <SessionProvider session={session}>{children}</SessionProvider>
    );
}
