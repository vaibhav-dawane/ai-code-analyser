'use client'
import { Editor } from "@/components/Editor";
import { Features } from "@/components/Features";
import { HowItWorks } from "@/components/HowItWorks";
import { VortexDemo } from "@/components/VortexDemo";
import { signIn, signOut, useSession } from "next-auth/react"

export default function Home() {
  return (
    // <UseHome/> hello
    <div className="bg-black">
      <VortexDemo />
      <Editor />
      <Features />
      <HowItWorks />
    </div>
  );
}

function UseHome() {
  const session = useSession();
  // console.log(JSON.stringify(session));
  return <div>
    {session.status === 'authenticated' ? <button onClick={() => signOut()}>SignOut</button> :
      <button onClick={() => signIn()}>SignIn</button>}
  </div>
}