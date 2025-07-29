import React from 'react';
import {
    AlertTriangle,
    Heart,
    Thermometer,
    Brain,
    Activity,
    Copy,
    Check,
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const MessageBubble = ({ message, isUser, isLoading }) => {
    const [copied, setCopied] = React.useState(false);

    const getUrgencyIcon = (urgencyLevel) => {
        switch (urgencyLevel) {
            case 'emergency':
                return <AlertTriangle className="w-4 h-4 text-red-400" />;
            case 'high':
                return <Heart className="w-4 h-4 text-orange-400" />;
            case 'moderate':
                return <Thermometer className="w-4 h-4 text-yellow-400" />;
            default:
                return <Activity className="w-4 h-4 text-green-400" />;
        }
    };

    const getUrgencyBorder = (urgencyLevel) => {
        switch (urgencyLevel) {
            case 'emergency':
                return 'border-red-500/50 shadow-red-500/20';
            case 'high':
                return 'border-orange-500/50 shadow-orange-500/20';
            case 'moderate':
                return 'border-yellow-500/50 shadow-yellow-500/20';
            default:
                return 'border-green-500/50 shadow-green-500/20';
        }
    };

    const getUrgencyGradient = (urgencyLevel) => {
        switch (urgencyLevel) {
            case 'emergency':
                return 'from-red-500/20 to-red-600/10';
            case 'high':
                return 'from-orange-500/20 to-orange-600/10';
            case 'moderate':
                return 'from-yellow-500/20 to-yellow-600/10';
            default:
                return 'from-green-500/20 to-green-600/10';
        }
    };

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(message.text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-start animate-fadeInUp">
                <div className="glass-enhanced rounded-2xl px-6 py-4 max-w-xs hover-lift">
                    <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center float-animation">
                            <Brain className="w-4 h-4 text-white" />
                        </div>
                        <div className="typing-indicator">
                            <span className="loading-dot"></span>
                            <span className="loading-dot"></span>
                            <span className="loading-dot"></span>
                        </div>
                        <span className="text-sm text-gray-400">
                            AI ფიქრობს...
                        </span>
                    </div>
                </div>
            </div>
        );
    }

    if (isUser) {
        return (
            <div className="flex justify-end animate-slideInRight">
                <div className="medical-gradient rounded-2xl rounded-br-md px-6 py-4 max-w-sm lg:max-w-md shadow-lg hover-lift group relative">
                    <p className="text-white text-sm leading-relaxed">
                        {message.text}
                    </p>
                    <button
                        onClick={copyToClipboard}
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-1 rounded-md hover:bg-white/20"
                        title="კოპირება"
                    >
                        {copied ? (
                            <Check className="w-3 h-3 text-green-200" />
                        ) : (
                            <Copy className="w-3 h-3 text-white/80" />
                        )}
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex justify-start animate-slideInLeft">
            <div
                className={`glass-enhanced rounded-2xl rounded-bl-md px-6 py-4 max-w-sm lg:max-w-md shadow-lg border hover-lift group relative ${
                    message.urgency_level
                        ? getUrgencyBorder(message.urgency_level)
                        : 'border-slate-700/50'
                }`}
            >
                {message.urgency_level && (
                    <div
                        className={`absolute inset-0 rounded-2xl opacity-30 bg-gradient-to-br ${getUrgencyGradient(
                            message.urgency_level
                        )}`}
                    ></div>
                )}

                <div className="flex items-start space-x-3 relative z-10">
                    <div className="flex-shrink-0">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-lg">
                            <Brain className="w-4 h-4 text-white" />
                        </div>
                    </div>
                    <div className="flex-1 space-y-3">
                        {message.urgency_level && (
                            <div className="flex items-center space-x-2">
                                {getUrgencyIcon(message.urgency_level)}
                                <span className="text-xs font-medium text-gray-300 uppercase tracking-wide">
                                    {message.urgency_level === 'emergency'
                                        ? 'გადაუდებელი'
                                        : message.urgency_level === 'high'
                                        ? 'მაღალი'
                                        : message.urgency_level === 'moderate'
                                        ? 'საშუალო'
                                        : 'დაბალი'}{' '}
                                    რისკი
                                </span>
                            </div>
                        )}

                        <div className="text-gray-100 text-sm leading-relaxed">
                            <ReactMarkdown
                                className="prose prose-invert prose-sm max-w-none"
                                components={{
                                    p: ({ children }) => (
                                        <p className="mb-2 last:mb-0">
                                            {children}
                                        </p>
                                    ),
                                    strong: ({ children }) => (
                                        <strong className="font-semibold text-white">
                                            {children}
                                        </strong>
                                    ),
                                    em: ({ children }) => (
                                        <em className="italic text-blue-200">
                                            {children}
                                        </em>
                                    ),
                                    ul: ({ children }) => (
                                        <ul className="list-disc list-inside space-y-1 my-2">
                                            {children}
                                        </ul>
                                    ),
                                    ol: ({ children }) => (
                                        <ol className="list-decimal list-inside space-y-1 my-2">
                                            {children}
                                        </ol>
                                    ),
                                    li: ({ children }) => (
                                        <li className="text-gray-200">
                                            {children}
                                        </li>
                                    ),
                                }}
                            >
                                {message.text}
                            </ReactMarkdown>
                        </div>

                        {message.suggested_actions &&
                            message.suggested_actions.length > 0 && (
                                <div className="space-y-2 bg-slate-800/30 rounded-lg p-3">
                                    <h4 className="text-xs font-semibold text-blue-300 uppercase tracking-wide flex items-center">
                                        <Activity className="w-3 h-3 mr-1" />
                                        რეკომენდაციები:
                                    </h4>
                                    <ul className="space-y-2">
                                        {message.suggested_actions.map(
                                            (action, index) => (
                                                <li
                                                    key={index}
                                                    className="flex items-start space-x-2 text-xs text-gray-300 hover:text-white transition-colors duration-200"
                                                >
                                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0 mt-1.5"></div>
                                                    <span>{action}</span>
                                                </li>
                                            )
                                        )}
                                    </ul>
                                </div>
                            )}

                        {message.follow_up_questions &&
                            message.follow_up_questions.length > 0 && (
                                <div className="space-y-2 bg-green-900/20 rounded-lg p-3 border border-green-500/30">
                                    <h4 className="text-xs font-semibold text-green-300 uppercase tracking-wide flex items-center">
                                        <Brain className="w-3 h-3 mr-1" />
                                        დამატებითი კითხვა:
                                    </h4>
                                    <p className="text-xs text-gray-300 italic leading-relaxed">
                                        {message.follow_up_questions[0]}
                                    </p>
                                </div>
                            )}

                        {message.disease_info && (
                            <div className="bg-purple-900/30 rounded-lg p-3 space-y-2 border border-purple-500/30">
                                <h4 className="text-xs font-semibold text-purple-300 uppercase tracking-wide flex items-center">
                                    <Heart className="w-3 h-3 mr-1" />
                                    მდგომარეობის შესახებ:
                                </h4>
                                <p className="text-xs text-gray-300 leading-relaxed">
                                    {message.disease_info.guidance}
                                </p>
                                {message.disease_info.red_flags && (
                                    <div className="mt-2 bg-red-900/30 rounded-md p-2 border border-red-500/30">
                                        <p className="text-xs font-semibold text-red-300 mb-1 flex items-center">
                                            <AlertTriangle className="w-3 h-3 mr-1" />
                                            გაფრთხილება:
                                        </p>
                                        <p className="text-xs text-gray-400 leading-relaxed">
                                            დაუყოვნებლივ მიმართეთ ექიმს თუ:{' '}
                                            {message.disease_info.red_flags.join(
                                                ', '
                                            )}
                                        </p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    <button
                        onClick={copyToClipboard}
                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-1 rounded-md hover:bg-white/10 flex-shrink-0"
                        title="კოპირება"
                    >
                        {copied ? (
                            <Check className="w-3 h-3 text-green-400" />
                        ) : (
                            <Copy className="w-3 h-3 text-gray-400" />
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MessageBubble;
