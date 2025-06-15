'use client'
// import { Github } from "lucide-react"
import { FaGithub } from "react-icons/fa";
import { signIn } from "next-auth/react"

export default function Component() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-48 flex justify-center items-center space-x-2 rounded-md py-3 px-4 bg-gray-900 hover:bg-gray-800 select-none cursor-pointer" onClick={() => signIn("github")}>
        <FaGithub className="w-5 h-5" />
        <span className="text-[15px] font-medium">Sign in with Github</span>
      </div>
    </div>
  )
}