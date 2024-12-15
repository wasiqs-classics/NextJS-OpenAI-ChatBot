"use client";
import { FormEvent, useState, useRef, useEffect } from 'react';
import { TbMessageChatbot } from 'react-icons/tb';
import BotMessage from './ui/bot-message';
import UserMessage from './ui/user-message';
import ChatInput from './ui/chat-input';
import { chatCompletion } from '@/actions';

export type Message = {
    content: string;
    role: 'user' | 'assistant' | 'system';
    isMarkdown?: boolean;
}

export default function Chatbot() {
    const chatContainerRef = useRef<HTMLDivElement | null>(null);
    const [showChat, setShowChat] = useState(false);
    const [userMessage, setUserMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { role: 'assistant', content: 'Hello! How may I help you today?', isMarkdown: false }
    ]);

    // Scroll to the bottom when messages change
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTo({
                top: chatContainerRef.current.scrollHeight,
                behavior: 'smooth'
            });
        }
    }, [messages, loading]);

    const handleSendMessage = async (e: FormEvent) => {
        e.preventDefault();

        if (!userMessage) return;

        // Add the user's message to state
        const newMessage: Message = { role: 'user', content: userMessage };
        setMessages((prev) => [...prev, newMessage]);

        // Clear input and set loading
        setLoading(true);
        setUserMessage('');

        try {
            // Exclude the greeting message for API call
            const chatMessages = messages.slice(1);

            // Get assistant's response
            const res = await chatCompletion([...chatMessages, newMessage]);
            console.log('API Response:', res);

            // Add assistant's response to state
            setMessages((prev) => [...prev, { ...res, isMarkdown: true }]);
        } catch (error) {
            console.error('Error fetching chat response:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <TbMessageChatbot
                size={50}
                onClick={() => setShowChat(!showChat)}
                className="fixed right-12 bottom-[calc(1rem)] hover:cursor-pointer bg-black rounded-full p-2 text-white"
            />
            {showChat && (
                <div className="fixed right-12 bottom-[calc(4rem+1.5rem)] cursor-pointer p-5 shadow-md shadow-black bg-slate-100 h-[474px] w-[500px]">
                    <div className="flex flex-col h-full">
                        {/* Chat Header */}
                        <div className="border-b-2 py-1 border-gray-800">
                            <h2 className="font-semibold text-lg tracking-tight">AI Search ChatBot</h2>
                            <p>Powered by OpenAI</p>
                        </div>

                        {/* Chat Container */}
                        <div ref={chatContainerRef} className="flex flex-col flex-1 items-center p-2 mt-5 overflow-y-auto">
                            {messages.map((m, i) =>
                                m.role === 'assistant' ? (
                                    <BotMessage {...m} key={i} />
                                ) : (
                                    <UserMessage {...m} key={i} />
                                )
                            )}
                            {loading && <div className="text-center text-gray-500 mt-2">loading ...</div>}
                        </div>

                        {/* Message Input */}
                        <ChatInput userMessage={userMessage} setUserMessage={setUserMessage} handleSendMessage={handleSendMessage} />
                    </div>
                </div>
            )}
        </>
    );
}
