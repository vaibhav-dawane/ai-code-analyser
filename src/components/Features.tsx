import { Activity, Code, GitMerge, MessageSquare, Shield, Zap } from 'lucide-react';
export const Features = () => {
    const features = [
        {
            title: 'Smart Code Analysis',
            description: 'Our AI analyzes your code for bugs, security vulnerabilities, and performance issues with contextual understanding.',
            icon: <Code className="h-6 w-6" />
        },
        {
            title: 'Security Scanning',
            description: 'Identify security vulnerabilities before they make it to production with our advanced security scanning.',
            icon: <Shield className="h-6 w-6" />
        },
        {
            title: 'Instant Feedback',
            description: 'Get feedback in seconds, not hours. No more waiting for team members to review your code.',
            icon: <Zap className="h-6 w-6" />
        },
        {
            title: 'Performance Optimization',
            description: 'Suggestions for improving code performance and reducing complexity, with clear explanations.',
            icon: <Activity className="h-6 w-6" />
        },
        {
            title: 'Seamless Integration',
            description: 'Integrates with GitHub, GitLab, Bitbucket, and your CI/CD pipeline for a smooth workflow.',
            icon: <GitMerge className="h-6 w-6" />
        },
        {
            title: 'Contextual Explanations',
            description: 'Detailed explanations that help you understand why changes are suggested and how they improve your code.',
            icon: <MessageSquare className="h-6 w-6" />
        }
    ];
    return (
        <div className="w-full flex justify-center mt-20">
            <div className="flex-row">
                <div className="text-4xl font-bold text-center">
                    Features
                </div>
                <div className="grid grid-cols-3 gap-x-8 gap-y-8 mt-8">
                    {
                        features.map((item, index) => (
                            <div key={index} className="w-[370px] h-[210px] border border-gray-800 bg-gray-950 rounded-2xl transform transition duration-300 hover:-translate-y-1 shadow-lg hover:shadow-gray-950">
                                <div className="w-12 h-12 rounded-md bg-gray-700/70 mt-6 ml-6 flex justify-center items-center">{item.icon}</div>
                                <div className='ml-6 mt-4 font-semibold text-white text-lg'>{item.title}</div>
                                <div className='text-gray-500 text-md mt-2 mx-6'>{item.description}</div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}
