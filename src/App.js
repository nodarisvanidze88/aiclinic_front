import React, { useState, useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble';
import ChatInput from './ChatInput';
import Header from './Header';
import WelcomeScreen from './WelcomeScreen';
import config from './config';

export default function App() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showWelcome, setShowWelcome] = useState(true);
    const [connectionStatus, setConnectionStatus] = useState('connected');
    const [conversationId] = useState(() => `conv_${Date.now()}`);
    const [retryCount, setRetryCount] = useState(0);
    const bottomRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // Check connection status
    useEffect(() => {
        const checkConnection = async () => {
            try {
                const response = await fetch(
                    config.getApiUrl(config.endpoints.health),
                    {
                        method: 'GET',
                        headers: {
                            Accept: 'application/json',
                        },
                    }
                );
                setConnectionStatus(response.ok ? 'connected' : 'error');
            } catch (err) {
                console.warn('Connection check failed:', err);
                setConnectionStatus('error');
            }
        };

        checkConnection();
        const interval = setInterval(checkConnection, 30000); // Check every 30 seconds
        return () => clearInterval(interval);
    }, []);

    const startChat = () => {
        setShowWelcome(false);
        setMessages([
            {
                id: 1,
                role: 'assistant',
                text: 'გამარჯობა! მე ვარ AIClinic-ის ვირტუალური ასისტენტი. �‍⚕️\n\n**რით შემიძლია დაგეხმაროთ დღეს?**\n\nაღწერეთ თქვენი სიმპტომები ან დასვით კითხვა ჯანმრთელობის თაობაზე. ჩემი მიზანია მოგაწოდოთ სანდო და სასარგებლო ინფორმაცია.',
                urgency_level: 'low',
                suggested_actions: [
                    'აღწერეთ თქვენი სიმპტომები დეტალურად',
                    'მიუთითეთ სიმპტომების ხანგრძლივობა',
                    'აღნიშნეთ რამე საგანგებო ან უჩვეულო',
                    'ჩამოთვალეთ მიმდინარე მედიკამენტები (არასავალდებულო)',
                ],
            },
        ]);
    };

    const sendMessage = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMsg = {
            id: Date.now(),
            role: 'user',
            text: input.trim(),
        };

        setMessages((prev) => [...prev, userMsg]);
        setInput('');
        setIsLoading(true);

        try {
            const res = await fetch(config.getApiUrl(config.endpoints.chat), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify({
                    message: userMsg.text,
                    conversation_id: conversationId,
                    user_context: {
                        timestamp: new Date().toISOString(),
                        session_id: conversationId,
                        retry_count: retryCount,
                    },
                }),
            });

            if (!res.ok) {
                throw new Error(`HTTP ${res.status}: ${res.statusText}`);
            }

            const data = await res.json();

            const assistantMsg = {
                id: Date.now() + 1,
                role: 'assistant',
                text: data.reply,
                urgency_level: data.urgency_level,
                suggested_actions: data.suggested_actions,
                follow_up_questions: data.follow_up_questions,
                disease_info: data.disease_info,
            };

            setMessages((prev) => [...prev, assistantMsg]);
            setConnectionStatus('connected');
            setRetryCount(0);
        } catch (err) {
            console.error('Chat error:', err);
            setConnectionStatus('error');
            setRetryCount((prev) => prev + 1);

            const errorMsg = {
                id: Date.now() + 2,
                role: 'assistant',
                text: `⚠️ **კავშირის პრობლემა**\n\nვწუხვარ, სერვერთან კავშირის პრობლემა წარმოიშვა${
                    retryCount > 0 ? ` (მცდელობა ${retryCount + 1})` : ''
                }.\n\n**შემდეგი ნაბიჯები:**\n• შეამოწმეთ ინტერნეტ კავშირი\n• სცადეთ გვერდის განახლება\n• დაელოდეთ რამდენიმე წუთს და სცადეთ ხელახლა\n\n**გადაუდებელ შემთხვევაში:**\nთუ სიმპტომები სერიოზულია, დაუყოვნებლივ მიმართეთ ექიმს ან დარეკეთ **112-ზე**.`,
                urgency_level: 'moderate',
                suggested_actions: [
                    'შეამოწმეთ ინტერნეტ კავშირი',
                    'განაახლეთ გვერდი (F5)',
                    'სცადეთ რამდენიმე წუთში',
                    'საჭიროების შემთხვევაში დარეკეთ 112-ზე',
                ],
            };

            setMessages((prev) => [...prev, errorMsg]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleVoiceInput = () => {
        // Enhanced voice input with better UX
        if (
            'speechRecognition' in window ||
            'webkitSpeechRecognition' in window
        ) {
            // Voice recognition logic would be implemented here
            setMessages((prev) => [
                ...prev,
                {
                    id: Date.now(),
                    role: 'assistant',
                    text: '🎤 **ხმოვანი ამომცნობი**\n\nხმოვანი შეტყობინების ფუნქცია მალე დაემატება! ამჯერად გთხოვთ დაწეროთ თქვენი სიმპტომები.',
                    urgency_level: 'low',
                    suggested_actions: ['დაწერეთ შეტყობინება ტექსტის სახით'],
                },
            ]);
        } else {
            alert(
                'თქვენი ბრაუზერი არ უჭერს მხარს ხმოვან ამომცნობს. გთხოვთ გამოიყენოთ ახალი ვერსიის ბრაუზერი.'
            );
        }
    };

    const handleShowAbout = () => {
        setMessages((prev) => [
            ...prev,
            {
                id: Date.now(),
                role: 'assistant',
                text: '📋 **AIClinic-ის შესახებ**\n\n🏥 **რა არის AIClinic?**\nAIClinic არის AI-ზე დაფუძნებული ვირტუალური ჯანმრთელობის ასისტენტი, რომელიც დაგეხმარებათ სიმპტომების შეფასებაში და ჯანმრთელობის საკითხებში.\n\n✨ **ძირითადი თვისებები:**\n• 24/7 ხელმისაწვდომობა\n• სწრაფი სიმპტომების შეფასება\n• პერსონალიზებული რეკომენდაციები\n• კონფიდენციალურობის მაღალი დონე\n• პროფესიონალური მედიცინის ცოდნა\n\n⚠️ **მნიშვნელოვანი:**\nეს სერვისი არ შეცვლის ექიმთან კონსულტაციას. გადაუდებელ შემთხვევაში მიმართეთ სამედიცინო დაწესებულებას.',
                urgency_level: 'low',
                suggested_actions: [
                    'დაიწყეთ სიმპტომების აღწერა',
                    'დასვით კონკრეტული კითხვები',
                    'გაგზავნეთ უკუკავშირი',
                ],
            },
        ]);
    };

    if (showWelcome) {
        return <WelcomeScreen onStart={startChat} />;
    }

    return (
        <div className="flex flex-col h-screen mx-auto max-w-4xl relative">
            {/* Enhanced background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-xl float-animation"></div>
                <div
                    className="absolute bottom-40 right-10 w-40 h-40 bg-purple-500/10 rounded-full blur-xl float-animation"
                    style={{ animationDelay: '1s' }}
                ></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-green-500/5 rounded-full blur-2xl"></div>
                <div
                    className="absolute top-1/4 right-1/4 w-24 h-24 bg-pink-500/10 rounded-full blur-xl float-animation"
                    style={{ animationDelay: '2s' }}
                ></div>
            </div>

            {/* Connection status indicator */}
            {connectionStatus === 'error' && (
                <div className="absolute top-4 right-4 z-50 bg-red-500/90 text-white px-3 py-1 rounded-full text-xs font-medium animate-pulse">
                    კავშირის პრობლემა
                </div>
            )}

            <Header onShowAbout={handleShowAbout} />

            {/* Messages */}
            <main className="flex-1 overflow-y-auto px-6 py-6 space-y-6 relative z-10">
                {messages.map((message) => (
                    <MessageBubble
                        key={message.id}
                        message={message}
                        isUser={message.role === 'user'}
                    />
                ))}

                {isLoading && <MessageBubble isLoading={true} />}

                <div ref={bottomRef} />
            </main>

            <ChatInput
                input={input}
                setInput={setInput}
                onSubmit={sendMessage}
                isLoading={isLoading}
                onVoiceInput={handleVoiceInput}
                onAddSymptom={() => {}} // This is now handled within ChatInput
            />
        </div>
    );
}
