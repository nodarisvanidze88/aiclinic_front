import React, { useState } from 'react';
import {
    Send,
    Mic,
    PlusCircle,
    Shield,
    Zap,
    MessageSquare,
} from 'lucide-react';

const ChatInput = ({
    input,
    setInput,
    onSubmit,
    isLoading,
    onVoiceInput,
    onAddSymptom,
}) => {
    const [showQuickActions, setShowQuickActions] = useState(false);

    const quickSymptoms = [
        { text: 'თავის ტკივილი', emoji: '🤕' },
        { text: 'ცხელება', emoji: '🤒' },
        { text: 'ხველა', emoji: '😷' },
        { text: 'კუჭის ტკივილი', emoji: '🤢' },
        { text: 'ზურგის ტკივილი', emoji: '😫' },
        { text: 'თოვლისუნება', emoji: '❄️' },
    ];

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            onSubmit(e);
        }
    };

    const addQuickSymptom = (symptom) => {
        setInput((prev) => prev + (prev ? ', ' : '') + symptom.text);
        setShowQuickActions(false);
    };

    return (
        <div className="shrink-0 p-6">
            {/* Quick symptom suggestions */}
            {showQuickActions && (
                <div className="mb-4 animate-fadeInUp">
                    <div className="glass-enhanced rounded-2xl p-4 border border-slate-700/50">
                        <h4 className="text-sm font-semibold text-white mb-3 flex items-center">
                            <Zap className="w-4 h-4 mr-2 text-yellow-400" />
                            სწრაფი სიმპტომები:
                        </h4>
                        <div className="grid grid-cols-2 gap-2">
                            {quickSymptoms.map((symptom, index) => (
                                <button
                                    key={index}
                                    onClick={() => addQuickSymptom(symptom)}
                                    className="flex items-center space-x-2 p-2 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 transition-all duration-200 hover-lift text-left"
                                >
                                    <span className="text-lg">
                                        {symptom.emoji}
                                    </span>
                                    <span className="text-sm text-gray-300">
                                        {symptom.text}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            <div className="glass-enhanced rounded-2xl border border-slate-700/50 shadow-2xl">
                <form
                    onSubmit={onSubmit}
                    className="flex items-end space-x-4 p-4"
                >
                    {/* Quick action buttons */}
                    <div className="flex flex-col space-y-2">
                        <button
                            type="button"
                            onClick={() =>
                                setShowQuickActions(!showQuickActions)
                            }
                            className={`p-2 rounded-xl transition-all duration-300 shadow-lg hover-lift ${
                                showQuickActions
                                    ? 'bg-gradient-to-br from-yellow-500 to-yellow-600 text-white shadow-yellow-500/25'
                                    : 'bg-gradient-to-br from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 shadow-green-500/25'
                            }`}
                            title="სწრაფი სიმპტომები"
                        >
                            {showQuickActions ? (
                                <MessageSquare className="w-4 h-4" />
                            ) : (
                                <PlusCircle className="w-4 h-4" />
                            )}
                        </button>
                        <button
                            type="button"
                            onClick={onVoiceInput}
                            className="p-2 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 text-white hover:from-purple-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-purple-500/25 hover-lift"
                            title="ხმოვანი შეტყობინება"
                        >
                            <Mic className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Text input */}
                    <div className="flex-1 space-y-2">
                        <div className="relative">
                            <textarea
                                className="w-full resize-none rounded-xl bg-slate-800/50 border border-slate-600/50 
                           px-4 py-3 text-sm text-white placeholder-gray-400
                           focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50
                           transition-all duration-300 min-h-[44px] max-h-32 pr-12"
                                placeholder="აღწერეთ თქვენი სიმპტომები ან კითხვა..."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={handleKeyPress}
                                rows={1}
                                style={{
                                    height: 'auto',
                                    minHeight: '44px',
                                }}
                                onInput={(e) => {
                                    e.target.style.height = 'auto';
                                    e.target.style.height =
                                        Math.min(e.target.scrollHeight, 128) +
                                        'px';
                                }}
                            />
                            {input.length > 0 && (
                                <div className="absolute top-2 right-2 text-xs text-gray-500">
                                    {input.length}/1000
                                </div>
                            )}
                        </div>

                        {/* Privacy notice */}
                        <div className="flex items-center justify-between text-xs text-gray-500">
                            <div className="flex items-center space-x-2">
                                <Shield className="w-3 h-3" />
                                <span>
                                    თქვენი მონაცემები უსაფრთხოდ იქნება დაცული
                                </span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className="text-gray-600">
                                    Enter - გაგზავნა
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Send button */}
                    <button
                        type="submit"
                        disabled={isLoading || !input.trim()}
                        className={`medical-gradient p-3 rounded-xl text-white font-medium transition-all duration-300 hover-lift
                     ${
                         isLoading || !input.trim()
                             ? 'opacity-50 cursor-not-allowed'
                             : 'hover:shadow-lg hover:shadow-blue-500/25 transform hover:scale-105 active:scale-95'
                     }`}
                    >
                        {isLoading ? (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        ) : (
                            <Send className="w-5 h-5" />
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ChatInput;
