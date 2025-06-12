import { Code2, Github, GithubIcon, Linkedin, X } from "lucide-react";

export const Footer = () => {
    return (
        <div className="mt-28 md:mt-36 w-full h-48 bg-gray-950 border-t border-gray-800">
            <div className="w-full flex h-2/3 items-center justify-center">
                <div className="flex-row mt-4">
                    <div className="flex justify-center items-center space-x-2  select-none">
                        <Code2 className="w-5 md:w-6 h-5 md:h-6 text-blue-500 cursor-pointer" />
                        <span className="text-lg md:text-xl bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent font-semibold cursor-pointer">AI CommitIQ</span>
                    </div>
                    <p className="mt-1 text-sm text-gray-400 w-80 text-center">Review code faster with AI-driven insights and clean, reliable suggestions.</p>
                </div>
            </div>
            <div className="w-full h-1/3 flex justify-center items-center space-x-16 md:space-x-56 relative">
                <div className="absolute w-2/3 md:w-1/2 h-[1px] bg-gray-500 top-0 left-1/2 -translate-x-1/2"/>
                <div className="font-semibold text-xs md:text-lg text-gray-400">Copyright © 2025 - All right reserved</div>
                <div className="flex space-x-2 md:space-x-4">
                    <Github className="h-4 md:h-6 w-4 md:w-6 cursor-pointer" />
                    <X className="h-4 md:h-6 w-4 md:w-6 cursor-pointer" />
                    <Linkedin className="h-4 md:h-6 w-4 md:w-6 cursor-pointer" />
                </div>
            </div>
        </div>
    );
}
