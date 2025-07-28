import React, { useState, useEffect, useRef } from 'react';

export default function App() {
    const [messages, setMessages] = useState([
        { id: 1, role: 'assistant', text: 'გამარჯობა! რით დაგეხმარო?' },
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const bottomRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const sendMessage = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMsg = { id: Date.now(), role: 'user', text: input.trim() };
        setMessages((prev) => [...prev, userMsg]);
        setInput('');
        setIsLoading(true);

        try {
            const res = await fetch(
                process.env.REACT_APP_API_BASE_URL || '/api/chat',
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ message: userMsg.text }),
                }
            );
            const data = await res.json();
            setMessages((prev) => [
                ...prev,
                { id: Date.now() + 1, role: 'assistant', text: data.reply },
            ]);
        } catch (err) {
            console.error(err);
            setMessages((prev) => [
                ...prev,
                {
                    id: Date.now() + 2,
                    role: 'assistant',
                    text: '⚠️ სერვერთან კავშირის შეცდომა.',
                },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-screen mx-auto max-w-3xl">
            {/* header */}
            <header className="shrink-0 px-6 py-4 border-b border-gray-700">
                <h1 className="text-xl font-semibold text-indigo-400">
                    AIClinic • Demo Chat
                </h1>
            </header>

            {/* messages */}
            <main className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
                {messages.map((m) => (
                    <div
                        key={m.id}
                        className={`flex ${
                            m.role === 'user' ? 'justify-end' : 'justify-start'
                        }`}
                    >
                        <div
                            className={`rounded-lg px-4 py-3 text-sm leading-relaxed ${
                                m.role === 'user'
                                    ? 'bg-indigo-600 text-white'
                                    : 'bg-gray-800 text-gray-100 border border-gray-700'
                            }`}
                            style={{ maxWidth: '90%' }}
                        >
                            {m.text}
                        </div>
                    </div>
                ))}

                {isLoading && (
                    <div className="flex justify-start">
                        <div className="rounded-lg px-4 py-3 text-sm bg-gray-800 border border-gray-700 animate-pulse">
                            ...
                        </div>
                    </div>
                )}
                <div ref={bottomRef} />
            </main>

            {/* input bar */}
            <form
                onSubmit={sendMessage}
                className="shrink-0 px-4 py-3 border-t border-gray-700 bg-gray-900 flex gap-3"
            >
                <input
                    className="flex-1 resize-none rounded-md bg-gray-800 border border-gray-700
             px-3 py-2 text-sm text-white     /* <-- დაამატე text-white */
             focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="აკრიფეთ შეტყობინებააააა…"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <button
                    type="submit"
                    disabled={isLoading}
                    className="px-4 py-2 rounded-md bg-indigo-600 text-white text-sm font-medium disabled:opacity-50"
                >
                    გაგზავნა
                </button>
            </form>
        </div>
    );
}
