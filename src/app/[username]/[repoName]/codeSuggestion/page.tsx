
const suggestions = {
    "file_one": [{
        line: 42,
        type: "Error",
        message: "Missing semicolon at the end of statement.",
    },
    {
        line: 87,
        type: "Optimization",
        message: "Use `map()` instead of `forEach()` when returning an array.",
    }],
    "file_two": [
        {
            line: 12,
            type: "Style",
            message: "Consider using camelCase for variable naming.",
        },
    ],
    "file_three": [{
        line: 42,
        type: "Error",
        message: "Missing semicolon at the end of statement.",
    },
    {
        line: 87,
        type: "Optimization",
        message: "Use `map()` instead of `forEach()` when returning an array.",
    }],
    "file_four": [
        {
            line: 12,
            type: "Style",
            message: "Consider using camelCase for variable naming.",
        },
    ]
};


export default function codeSuggestion() {
    return (
        <div className="w-full">
            <h1 className="mt-4 text-xl font-semibold text-center">Issues and Suggestions</h1>
            <div className="w-6xl h-auto mx-auto mt-6 bg-gray-950 space-y-5 p-6">
                {Object.entries(suggestions).map(([fileName, issues]) => (
                <div key={fileName} className="space-y-5">
                    <h2 className="text-lg font-bold text-blue-400 mb-2">{fileName}</h2>
                        {issues.map((item, index) => (
                            <div className="flex items-start justify-between bg-gray-900 p-4 rounded-lg">
                                <div key={index} className="flex flex-col space-y-1">
                                    <div className="text-sm text-gray-500">Line: <span className="text-white">{item.line}</span></div>
                                    <div className="text-sm text-gray-500">Type:
                                        <span className={`font-semibold 
                                        ${item.type === "Error" ? "text-red-600" : item.type === "Optimization" ? "text-blue-600" : "text-yellow-500"}
                                    `}>{item.type}</span>
                                    </div>
                                    <div className="text-sm text-gray-500">Suggestion: <span className="text-white">{item.message}</span></div>
                                </div>
                            </div>
                        ))}
                </div>
                ))}
            </div>
        </div>
    );
}
