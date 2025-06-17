import { useEffect, useState } from "react";

export const Editor = () => {

    const originalCode = `
function calculateTotal(items) {
    let total = 0;
    for (let i = 0; i < items.length; i++) {
        total += items[i].price;
    }
    return total;
}`;

    const aiSuggestion = `
function calculateTotal(items) {
    if (!items || !Array.isArray(items)) {
        return 0;
    }
    
    let total = 0;
    for (let i = 0; i < items.length; i++) {
        if (items[i] && items[i].price) {
        total += items[i].price;
        }
    }
    return total;
}`;

    const steps = [
        { code: originalCode, comment: "Buggy Code" },
        { code: originalCode, comment: "Analysing code..." },
        { code: aiSuggestion, comment: "AI suggestion: Handle null values and improve error checking" },
    ]

    const [currentStep, setCurrentStep] = useState(0);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsVisible(false);
            setTimeout(() => {
                setCurrentStep((prev) => (prev + 1) % steps.length);
                setIsVisible(true);
            }, 500)
        }, 4000);

        return () => clearInterval(interval);
    }, [steps.length]);

    return (
        <div className="w-full max-w-screen flex justify-center">
            <div className="flex-row">
                <div className="mt-10 text-2xl md:text-4xl font-bold text-center">
                    AI Code Reviewer
                </div>
                <div className="grid grid-cols-1 gap-y-10 mt-8">
                    <div className="w-[350px] md:w-[600px] h-full border border-gray-800 bg-gray-950 rounded-xl mb-4 overflow-hidden">
                        <div className="w-full h-7 rounded-t-xl bg-gray-900 px-4 flex items-center space-x-1.5">
                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                            <div className="text-white/40 ml-1 text-sm">code-review.js</div>
                        </div>
                        <div className="mt-3 ml-3 flex items-center">
                            <div className="rounded-full bg-cyan-600 p-1 w-6 h-6 text-md flex justify-center items-center">AI</div>
                            <div className="ml-3 text-xs md:text-sm text-cyan-500 font-semibold">{steps[currentStep].comment}</div>``
                        </div>

                        <div className={`transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`} >
                            <pre className="ml-3 text-md text-gray-300 overflow-x-auto">
                                <code>{steps[currentStep].code}</code>
                            </pre>
                        </div>

                        {
                            currentStep > 0 && (
                                <div className="mt-4 flex ml-3">
                                    <div className="border border-cyan-400 bg-cyan-400/20 p-1 rounded-md text-sm px-2">
                                    {currentStep === 1 ? "Scanning the issues...": "Issues Found: 2 Bugs, 1 Optimization"}
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}
