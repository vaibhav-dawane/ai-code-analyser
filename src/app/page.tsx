'use client'
import { signIn, signOut, useSession } from "next-auth/react"

export default function Home() {
  return (
      <UseHome/>
  );
}

function UseHome(){
  const session = useSession();
  // console.log(JSON.stringify(session));
  return <div>
    {session.status === 'authenticated' ? <button onClick={() => signOut()}>SignOut</button> : 
    <button onClick={() => signIn()}>SignIn</button>}
  </div>
}