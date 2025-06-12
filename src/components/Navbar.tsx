'use client'
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export function Navbar() {
    const session = useSession();
    console.log("Accessing session in VortexDemo: ", session);

    const [isSignIn, setIsSignIn] = useState(false);

    useEffect(() => {
        if (session.status === 'authenticated') {
            setIsSignIn(true);
        }
    }, []);

    return (
        <div className="w-full max-w-screen flex justify-end relative">
            <div className="absolute top-7 right-7 z-50 px-3 py-2 bg-gradient-to-r from-blue-600 to-purple-700 rounded-md cursor-pointer transform transition hover:scale-105 duration-300 hover:outline hover:outline-purple-400" onClick={() => isSignIn ? signOut() : signIn('github')}>
                {
                    isSignIn ? 'Sign Out' : 'Sign In'
                }
            </div>
        </div>
    );
}
