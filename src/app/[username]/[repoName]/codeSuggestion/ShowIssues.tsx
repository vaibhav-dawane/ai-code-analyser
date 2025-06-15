'use client'

import { Code2 } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

interface Issue {
    line: number,
    type: string,
    message: string
}

interface Props {
    repoIssues: {
        [filePath: string]: Issue[]
    }
}

export default function ShowIssues({ repoIssues }: Props) {
    // console.log("Repo Issues in ShowIssues: ", repoIssues.message);
    const [zeroIssues, setZeroIssue] = useState(false);

    const allEmpty = Object.values(repoIssues).every(issueArray => issueArray.length === 0);
    useEffect(() => {
        if (allEmpty) {
            setZeroIssue(true);
        }
    }, [allEmpty]);

    return (
        <div className="w-full">
            <div className="w-full flex justify-center">
                <Link href='/repo'>
                    <div className="absolute left-5 top-5 md:left-10 md:top-6 flex items-center cursor-pointer select-none">
                        <Code2 className="w-6 h-6 text-blue-500" />
                        <span className="ml-2 bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text font-semibold">AI CommitIQ</span>
                    </div>
                </Link>
                <h1 className="text-lg md:text-xl font-semibold mt-24 md:mt-6">Issues and Suggestions</h1>
            </div>
            <div className="w-[370px] mx-auto md:w-6xl h-auto mt-6 bg-gray-950 space-y-4 md:space-y-5 p-4 md:p-6 rounded-xl">
                {
                    zeroIssues ?
                        <div className="flex items-start justify-between bg-gray-900 p-2 md:p-4 rounded-lg font-semibold text-green-500 text-sm md:text-lg">No Issues Found in this repository</div>
                        :
                        Object.entries(repoIssues).map(([filePath, issues]) => (
                            <div key={filePath} className="space-y-4 md:space-y-5">
                                <h2 className="text-md md:text-lg font-bold text-blue-400 mb-2">{filePath}</h2>
                                {Array.isArray(issues) ?
                                    issues.map((issue, index) => (
                                        <div key={index} className="flex items-start justify-between bg-gray-900 p-4 rounded-lg">
                                            <div className="flex flex-col space-y-1">
                                                <div className="text-sm text-gray-500">Line: <span className="text-white">{issue.line}</span></div>
                                                <div className="text-sm text-gray-500">Type:
                                                    <span className={`font-semibold 
                                        ${issue.type === "Error" ? "text-red-600" : issue.type === "Optimization" ? "text-blue-600" : "text-yellow-500"}
                                    `}>{issue.type}</span>
                                                </div>
                                                <div className="text-sm text-gray-500">Suggestion: <span className="text-white">{issue.message}</span></div>
                                            </div>
                                        </div>
                                    ))   
                                    :
                                    <div className="flex items-start justify-between bg-gray-900 p-2 md:p-4 rounded-lg font-semibold text-green-500 text-sm md:text-lg">No Issues Found in this repository</div>
                                }
                            </div>
                        ))
                }

            </div>
        </div>
    );
}
