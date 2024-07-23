"use client";
import { FormEvent, useState } from 'react';
import {TbMessageChatbot} from 'react-icons/tb'
import BotMessage from './ui/bot-message';
import UserMessage from './ui/user-message';
import ChatInput from './ui/chat-input';
import { chatCompletion } from '@/actions';

export type Message = {
    content: string;
    role: 'user' | 'assistant' | 'system';
}

export default function Chatbot() {
    const [showChat, setShowChat] = useState(false);
    const [userMessage, setUserMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {role: 'assistant', content: 'Hello!, How may I help you today?'}
    ]);

    const handleSendMessage = async(e: FormEvent) => {
        e.preventDefault();

        console.log('USER MESSAGE:', userMessage);

        if(!userMessage) return;

        // Creating a new Message Object
        const newMessage: Message = {
            role: 'user',
            content: userMessage
        };
        console.log("NEW MESSAGE: ", newMessage);

        // Updating the Message State
        setMessages((prevMessage) => [...prevMessage, newMessage]);
        setLoading(true);

        // Let's talk to OpenAI
        try {
            // First copy messages (all)
            const chatMessages = messages.slice(1);
            console.log('CHAT MESSAGES: ', chatMessages);

            // Call the chat completion API
            const res = await chatCompletion([...chatMessages, newMessage]);
            console.log('RESPONSE: ', res);

        } catch (error) {
            console.log(error);
        }
    }

  return (
    <>
        <TbMessageChatbot 
            size={50}
            onClick={() => setShowChat(!showChat)}
            className='fixed right-12 bottom-[calc(1rem)] hover:cursor-pointer bg-black rounded-full p-2 text-white'
        />

        {
            showChat && (
                <div className='fixed right-12 bottom-[calc(4rem+1.5rem)] cursor-pointer p-5 shadow-md shadow-black bg-slate-100 h-[474px] w-[500px]'>
                    <div className='flex flex-col h-full'>
                        {/* CHAT HEADER */}
                        <div className='border-b-2 py-1 border-gray-800'>
                            <h2 className='font-semibold text-lg tracking-tight'>Chatbot</h2>
                            <p>Powered by OpenAI</p>
                        </div>
                        {/* CHAT CONTAINER */}
                        <div className='flex flex-col flex-1 items-center p-2 mt-5 overflow-y-auto'>
                            {messages && messages.map((m, i) => {
                                return m.role === 'assistant' ? (
                                    <BotMessage {...m} key={i} />
                                ): (
                                    <UserMessage {...m} key={i} />
                                )
                            })}
                        </div>
                        {/* MESSAGE INPUT */}
                        <ChatInput 
                            userMessage={userMessage}
                            setUserMessage={setUserMessage}
                            handleSendMessage={handleSendMessage}
                        />
                    </div>
                </div>
            )
        }
    </>
  )
}
