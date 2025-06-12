'use client'
import React, { useEffect, useState } from "react";
import { Vortex } from "./ui/vortex";
import Link from "next/link";

export function VortexDemo() {  
  return (
    <div className="w-full max-w-screen h-[100dvh] mx-auto overflow-hidden px-4">
      <Vortex
        backgroundColor="black"
        className="flex items-center flex-col justify-center px-2 md:px-10 py-4 w-full h-full"
      >
        <h2 className="text-white text-2xl md:text-6xl font-extrabold text-center select-none">
          AI CommitIQ
        </h2>
        <p className="text-white text-sm md:text-2xl max-w-xl mt-6 text-center select-none">
          Instantly analyze, debug, and improve your codebase with intelligent, actionable insights.
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
          <Link href='/repo'>
            <button className="px-4 cursor-pointer py-2 bg-blue-600 hover:bg-blue-700 transition duration-200 rounded-lg text-white shadow-[0px_2px_0px_0px_#FFFFFF40_inset]">
            Get Started
          </button>
          </Link>
        </div>
      </Vortex>
    </div>
  );
}
