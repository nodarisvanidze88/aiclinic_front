import React, { useState, useEffect } from 'react';
import {
    Activity,
    Shield,
    Clock,
    Users,
    ChevronRight,
    Sun,
    Moon,
    Settings,
} from 'lucide-react';

const Header = ({ onShowAbout, onShowPrivacy }) => {
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 60000);
        return () => clearInterval(timer);
    }, []);

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
        // Theme switching logic would go here
    };

    return (
        <header className="shrink-0 px-6 py-6 border-b border-slate-700/30 relative">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/50 to-slate-800/30 backdrop-blur-sm"></div>

            <div className="relative z-10">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-3">
                            <div className="relative group">
                                <div className="w-12 h-12 rounded-2xl medical-gradient flex items-center justify-center shadow-lg hover-lift">
                                    <Activity className="w-6 h-6 text-white" />
                                </div>
                                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-slate-900 animate-pulse">
                                    <div className="w-full h-full bg-green-400 rounded-full animate-ping opacity-75"></div>
                                </div>
                            </div>
                            <div>
                                <h1 className="text-xl font-bold gradient-text">
                                    AIClinic
                                </h1>
                                <p className="text-xs text-gray-400 flex items-center">
                                    <Shield className="w-3 h-3 mr-1" />
                                    ვირტუალური ჯანმრთელობის ასისტენტი
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center space-x-3">
                        {/* Live status indicators */}
                        <div className="hidden md:flex items-center space-x-6 mr-4">
                            <div className="flex items-center space-x-2 text-xs">
                                <div className="relative">
                                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                    <div className="absolute inset-0 w-2 h-2 bg-green-400 rounded-full animate-ping opacity-75"></div>
                                </div>
                                <span className="text-green-400 font-medium">
                                    ონლაინ
                                </span>
                            </div>
                            <div className="flex items-center space-x-2 text-xs text-gray-400">
                                <Clock className="w-3 h-3" />
                                <span>
                                    {currentTime.toLocaleTimeString('ka-GE', {
                                        hour: '2-digit',
                                        minute: '2-digit',
                                    })}
                                </span>
                            </div>
                            <div className="flex items-center space-x-2 text-xs text-gray-400">
                                <Users className="w-3 h-3" />
                                <span>1.2k+ ვიზიტი</span>
                            </div>
                        </div>

                        {/* Action buttons */}
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={toggleTheme}
                                className="p-2 rounded-xl bg-slate-800/50 border border-slate-700/50 text-gray-400 hover:text-white hover:border-blue-500/50 transition-all duration-300 hover-lift"
                                title="თემის შეცვლა"
                            >
                                {isDarkMode ? (
                                    <Sun className="w-4 h-4" />
                                ) : (
                                    <Moon className="w-4 h-4" />
                                )}
                            </button>

                            <button
                                className="p-2 rounded-xl bg-slate-800/50 border border-slate-700/50 text-gray-400 hover:text-white hover:border-purple-500/50 transition-all duration-300 hover-lift"
                                title="პარამეტრები"
                            >
                                <Settings className="w-4 h-4" />
                            </button>

                            <button
                                onClick={onShowAbout}
                                className="p-2 rounded-xl bg-slate-800/50 border border-slate-700/50 text-gray-400 hover:text-white hover:border-green-500/50 transition-all duration-300 hover-lift"
                                title="ინფორმაცია"
                            >
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Enhanced quick stats */}
                <div className="mt-6 grid grid-cols-3 gap-4">
                    <div className="glass-enhanced rounded-xl p-4 text-center hover-lift group relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="relative z-10">
                            <div className="text-xl font-bold text-blue-400 flex items-center justify-center mb-1">
                                <Activity className="w-4 h-4 mr-1" />
                                95%
                            </div>
                            <div className="text-xs text-gray-400">სიზუსტე</div>
                            <div className="text-xs text-blue-300 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                AI მოდელის სიზუსტე
                            </div>
                        </div>
                    </div>

                    <div className="glass-enhanced rounded-xl p-4 text-center hover-lift group relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="relative z-10">
                            <div className="text-xl font-bold text-green-400 flex items-center justify-center mb-1">
                                <Clock className="w-4 h-4 mr-1" />
                                &lt;30s
                            </div>
                            <div className="text-xs text-gray-400">
                                პასუხის დრო
                            </div>
                            <div className="text-xs text-green-300 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                საშუალო რეაგირება
                            </div>
                        </div>
                    </div>

                    <div className="glass-enhanced rounded-xl p-4 text-center hover-lift group relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="relative z-10">
                            <div className="text-xl font-bold text-purple-400 flex items-center justify-center mb-1">
                                <Shield className="w-4 h-4 mr-1" />
                                24/7
                            </div>
                            <div className="text-xs text-gray-400">
                                ხელმისაწვდომობა
                            </div>
                            <div className="text-xs text-purple-300 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                უწყვეტი მომსახურება
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
