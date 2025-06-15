'use client'
import { Editor } from "@/components/Editor";
import { Navbar } from "@/components/Navbar";
import { Features } from "@/components/Features";
import { Footer } from "@/components/Footer";
import { HowItWorks } from "@/components/HowItWorks";
import { VortexDemo } from "@/components/VortexDemo";
import { signIn, signOut, useSession } from "next-auth/react"

export default function Home() {
  return (
    // <UseHome/> hello
    <div className="bg-black">
      <Navbar />
      <VortexDemo />
      <Editor />
      <Features />
      <HowItWorks />
      <Footer />
    </div>
  );
}