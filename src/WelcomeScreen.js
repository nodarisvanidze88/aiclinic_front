import React, { useState, useEffect } from 'react';
import {
    AlertTriangle,
    Clock,
    Shield,
    Users,
    Zap,
    Heart,
    Activity,
} from 'lucide-react';

const WelcomeScreen = ({ onStart }) => {
    const [currentFeature, setCurrentFeature] = useState(0);

    const features = [
        { icon: Clock, text: '24/7 ხელმისაწვდომობა', color: 'text-blue-400' },
        {
            icon: Zap,
            text: 'სწრაფი და ზუსტი შეფასება',
            color: 'text-green-400',
        },
        {
            icon: Shield,
            text: 'კონფიდენციალურობის უზრუნველყოფა',
            color: 'text-purple-400',
        },
        {
            icon: Heart,
            text: 'პროფესიონალური რეკომენდაციები',
            color: 'text-red-400',
        },
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentFeature((prev) => (prev + 1) % features.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [features.length]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-start p-6 text-center relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-xl float-animation"></div>
                <div
                    className="absolute bottom-40 right-10 w-40 h-40 bg-purple-500/10 rounded-full blur-xl float-animation"
                    style={{ animationDelay: '1s' }}
                ></div>
                <div
                    className="absolute top-1/2 left-1/4 w-24 h-24 bg-green-500/10 rounded-full blur-xl float-animation"
                    style={{ animationDelay: '2s' }}
                ></div>
                <div
                    className="absolute top-1/4 right-1/4 w-36 h-36 bg-pink-500/10 rounded-full blur-xl float-animation"
                    style={{ animationDelay: '0.5s' }}
                ></div>
            </div>

            <div className="w-full max-w-lg space-y-6 animate-fadeInUp relative z-10 py-8">
                {/* Logo and title */}
                <div className="space-y-4">
                    <div className="relative">
                        <div className="w-20 h-20 mx-auto rounded-3xl medical-gradient flex items-center justify-center shadow-2xl hover-lift">
                            <div className="text-3xl">🏥</div>
                        </div>
                        {/* Pulse ring */}
                        <div className="absolute inset-0 w-20 h-20 mx-auto rounded-3xl border-2 border-blue-400/30 animate-pulse"></div>
                    </div>

                    <div className="space-y-3">
                        <h1 className="text-3xl md:text-4xl font-bold gradient-text leading-tight">
                            AIClinic-ში კეთილი იყოს თქვენი მობრძანება
                        </h1>
                        <p className="text-gray-400 text-base md:text-lg leading-relaxed">
                            ვირტუალური ჯანმრთელობის ასისტენტი, რომელიც
                            დაგეხმარებათ სიმპტომების შეფასებაში
                        </p>
                    </div>
                </div>

                {/* Dynamic features showcase */}
                <div className="space-y-4">
                    <div className="glass-enhanced rounded-2xl p-6 space-y-4 hover-lift">
                        <h3 className="text-base font-semibold text-white">
                            რატომ აირჩიოთ AIClinic?
                        </h3>

                        {/* Animated feature display */}
                        <div className="relative h-12 flex items-center justify-center">
                            {features.map((feature, index) => {
                                const Icon = feature.icon;
                                return (
                                    <div
                                        key={index}
                                        className={`absolute transition-all duration-500 flex items-center space-x-2 ${
                                            index === currentFeature
                                                ? 'opacity-100 scale-100 translate-y-0'
                                                : 'opacity-0 scale-95 translate-y-2'
                                        }`}
                                    >
                                        <Icon
                                            className={`w-5 h-5 ${feature.color}`}
                                        />
                                        <span className="text-gray-300 text-sm md:text-base">
                                            {feature.text}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Feature dots indicator */}
                        <div className="flex justify-center space-x-2">
                            {features.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentFeature(index)}
                                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                        index === currentFeature
                                            ? 'bg-blue-400 w-6'
                                            : 'bg-gray-600 hover:bg-gray-500'
                                    }`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Stats grid */}
                    <div className="grid grid-cols-3 gap-3">
                        <div className="glass-enhanced rounded-xl p-3 text-center hover-lift">
                            <div className="text-lg font-bold text-blue-400 flex items-center justify-center">
                                <Activity className="w-4 h-4 mr-1" />
                                95%
                            </div>
                            <div className="text-xs text-gray-400 mt-1">
                                სიზუსტე
                            </div>
                        </div>
                        <div className="glass-enhanced rounded-xl p-3 text-center hover-lift">
                            <div className="text-lg font-bold text-green-400 flex items-center justify-center">
                                <Zap className="w-4 h-4 mr-1" />
                                &lt;30s
                            </div>
                            <div className="text-xs text-gray-400 mt-1">
                                პასუხის დრო
                            </div>
                        </div>
                        <div className="glass-enhanced rounded-xl p-3 text-center hover-lift">
                            <div className="text-lg font-bold text-purple-400 flex items-center justify-center">
                                <Users className="w-4 h-4 mr-1" />
                                1.2k+
                            </div>
                            <div className="text-xs text-gray-400 mt-1">
                                მომხმარებელი
                            </div>
                        </div>
                    </div>

                    {/* Important notice */}
                    <div className="glass-enhanced rounded-2xl p-4 border border-yellow-500/30 hover-lift">
                        <div className="flex items-start space-x-3">
                            <AlertTriangle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                            <div className="text-left space-y-2">
                                <h3 className="font-semibold text-yellow-300 text-sm">
                                    მნიშვნელოვანი შენიშვნა
                                </h3>
                                <p className="text-xs text-gray-300 leading-relaxed">
                                    ეს სერვისი არ შეცვლის ექიმთან კონსულტაციას.
                                    გადაუდებელ შემთხვევაში დაუყოვნებლივ დარეკეთ{' '}
                                    <strong className="text-white">
                                        112-ზე
                                    </strong>
                                    .
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Enhanced start button */}
                <div className="space-y-3 pt-4">
                    <button
                        onClick={onStart}
                        className="w-full medical-gradient py-4 px-6 rounded-2xl text-white font-semibold text-base
                       shadow-2xl hover:shadow-blue-500/25 transition-all duration-300
                       transform hover:scale-105 active:scale-95 hover-lift relative overflow-hidden group"
                    >
                        <span className="relative z-10 flex items-center justify-center">
                            <Heart className="w-5 h-5 mr-2" />
                            საუბრის დაწყება
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    </button>

                    <p className="text-xs text-gray-500">
                        საუბრის დაწყებით თქვენ ეთანხმებით ჩვენს{' '}
                        <button className="text-blue-400 hover:text-blue-300 hover:underline transition-colors duration-200">
                            წესებსა და პირობებს
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default WelcomeScreen;
