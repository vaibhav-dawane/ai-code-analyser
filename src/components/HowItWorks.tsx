import { Bot, Check, GitCommit, GitPullRequest } from "lucide-react";

export const HowItWorks = () => {
    const timeline = [
        {
            title: "Connect Your Repository",
            description: "Securely authenticate with GitHub and grant access to the repository you want to analyze.",
            icon: <GitCommit />
        },
        {
            title: "Select a Repository",
            description: "Choose a repository to scan — no need to create a pull request to begin the analysis.",
            icon: <GitPullRequest />
        },
        {
            title: "AI Reviews Your Code",
            description: "Our AI scans your codebase for bugs, potential issues, and optimization opportunities within seconds.",
            icon: <Bot />
        },
        {
            title: "Reviews Suggestions",
            description: "View AI-generated insights and recommendations — accept, ignore, or customize them as needed.",
            icon: <Check />
        },
    ]
    return (
        <div className="mt-16">
            <div className="mt-4 text-2xl font-semibold flex justify-center">
                How It Works?
            </div>
            <div className="w-full mt-8 flex justify-center relative overflow-x-hidden">
                <div className="absolute top-0 bottom-0 hidden md:block w-[4px] bg-gradient-to-b from-blue-500 to-purple-600" />
                <div className="w-full mx-10 space-y-[48px] px-4 relative">
                    {
                        timeline.map((item, index) => (
                            <div key={index} className="w-full relative flex flex-col md:flex-row items-center md:items-start">
                                <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
                                    <div className="rounded-full bg-gradient-to-b from-blue-500 to-purple-600 p-[10px]">
                                        {item.icon}
                                    </div>
                                </div>

                                <div className="w-full flex">
                                    {index % 2 === 0 ? (
                                        <>
                                            {/* Left side (even index): show content */}
                                            <div className="w-1/2 flex justify-end">
                                                <div className="max-w-xs text-right mr-16">
                                                    <h1 className="text-[16px] font-semibold">{item.title}</h1>
                                                    <p className="mt-2 text-[14px] text-gray-400">{item.description}</p>
                                                </div>
                                            </div>

                                            {/* Right side: empty placeholder */}
                                            <div className="w-1/2" />
                                        </>
                                    ) : (
                                        <>
                                            {/* Left side: empty placeholder */}
                                            <div className="w-1/2" />

                                            {/* Right side (odd index): show content */}
                                            <div className="w-1/2 flex justify-start">
                                                <div className="max-w-xs text-left ml-16">
                                                    <h1 className="text-[16px] font-semibold">{item.title}</h1>
                                                    <p className="mt-2 text-[14px] text-gray-400">{item.description}</p>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>


                                {/* <div className={`w-full ${index % 2 === 0 ? "text-right justify-start" : "text-left justify-end"} flex`}>
                                    <div className="max-w-xs">
                                        <h1 className="text-[16px] font-semibold">{item.title}</h1>
                                        <p className="mt-2 text-[14px] text-gray-400">{item.description}</p>
                                    </div>
                                </div> */}
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}
