import { Bot, GitCommit, GitPullRequest } from "lucide-react";

export const HowItWorks = () => {
    const timeline = [
        {
            title: "Connect Your Repository",
            description: "Link your GitHub, GitLab, or Bitbucket repository to our platform in just a few clicks.",
            icon: <GitCommit />
        },
        {
            title: "Create a Pull Request",
            description: "When you create a pull request, our AI automatically begins analyzing your code.",
            icon: <GitPullRequest />
        },
        {
            title: "AI Reviews Your Code",
            description: "Our AI examines your code for bugs, security issues, and style violations in seconds.",
            icon: <Bot />
        },
    ]
    return (
        <div className="mt-16">
            <div className="mt-4 text-2xl font-semibold flex justify-center">
                How It Works?
            </div>
            <div className="w-full mt-8 flex justify-center relative overflow-x-hidden">
                <div className="absolute top-0 bottom-0 hidden md:block w-[4px] bg-gradient-to-b from-blue-500 to-purple-600" />
                <div className="w-full mx-10 space-y-24 px-4 relative">
                    {
                        timeline.map((item, index) => (
                            <div key={index} className="w-full relative flex flex-col md:flex-row items-center md:items-start">
                                <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
                                    <div className="rounded-full bg-gradient-to-b from-blue-500 to-purple-600 p-[10px]">
                                        {item.icon}
                                    </div>
                                </div>
                                <div className={`w-full ${index % 2 === 0 ? "text-right justify-start" : "text-left justify-end"} flex`}>
                                    <div className="max-w-xs">
                                        <h1 className="text-[16px] font-semibold">{item.title}</h1>
                                        <p className="mt-2 text-[14px] text-gray-400">{item.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}
