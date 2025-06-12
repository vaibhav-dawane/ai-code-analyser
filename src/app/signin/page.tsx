'use client'
import { Github } from "lucide-react"
import { useSession, signIn, signOut } from "next-auth/react"
import { useEffect, useState } from "react";

export default function Component() {
  const session = useSession();
  console.log("Accessing session in signin: ",session);

  const [isSignIn, setIsSignIn] = useState(false);

  useEffect(() => {
    if(session.status === 'authenticated')
    {
      setIsSignIn(true);
    }
  }, []);
  
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-48 flex justify-center items-center space-x-2 rounded-md py-3 px-4 bg-gray-900 hover:bg-gray-800 select-none cursor-pointer" onClick={() => signIn("github")}>
        <Github className="w-5 h-5" />
        <span className="text-[15px] font-medium">Sign in with Github</span>
      </div>
    </div>
  )
}