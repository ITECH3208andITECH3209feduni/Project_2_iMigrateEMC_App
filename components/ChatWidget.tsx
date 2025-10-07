import React, { useState, useEffect, useRef } from 'react';
import type { Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabaseClient';
import type { ChatMessage } from '../types';
import { XIcon, SendIcon } from './Icons';

interface ChatWidgetProps {
    session: Session;
    onClose: () => void;
}

const ChatWidget: React.FC<ChatWidgetProps> = ({ session, onClose }) => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const { data, error } = await supabase
                    .from('chat_messages')
                    .select('*')
                    .eq('user_id', session.user.id)
                    .order('created_at', { ascending: true });
                
                if (error) throw error;
                setMessages(data as ChatMessage[]);
            } catch (err: any) {
                setError('Could not load chat history.');
            } finally {
                setLoading(false);
            }
        };

        fetchMessages();
    }, [session.user.id]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);
    
    useEffect(() => {
        const channel = supabase
            .channel(`chat:${session.user.id}`)
            .on(
                'postgres_changes',
                {
                    event: 'INSERT',
                    schema: 'public',
                    table: 'chat_messages',
                    filter: `user_id=eq.${session.user.id}`,
                },
                (payload) => {
                    setMessages((prevMessages) => [...prevMessages, payload.new as ChatMessage]);
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [session.user.id]);


    const handleSendMessage = async (event: React.FormEvent) => {
        event.preventDefault();
        if (newMessage.trim() === '') return;

        const content = newMessage.trim();
        setNewMessage('');

        try {
            const { error } = await supabase.from('chat_messages').insert({
                user_id: session.user.id,
                content: content,
                sender_is_admin: false,
            });
            if (error) throw error;
        } catch (err: any) {
             setError('Failed to send message.');
        }
    };

    return (
        <div className="fixed bottom-24 right-6 w-80 h-96 bg-background rounded-2xl shadow-xl z-50 flex flex-col animate-fade-in-up">
            {/* Header */}
            <header className="bg-primary text-white p-3 flex justify-between items-center rounded-t-2xl">
                <h3 className="font-bold text-lg">Chat with Admin</h3>
                <button onClick={onClose} className="p-1 rounded-full hover:bg-white/20" aria-label="Close chat">
                    <XIcon />
                </button>
            </header>

            {/* Messages */}
            <main className="flex-1 p-3 overflow-y-auto bg-surface">
                {loading && <p className="text-center text-muted">Loading chat...</p>}
                {error && <p className="text-center text-red-500">{error}</p>}
                <div className="space-y-3">
                    {messages.map((msg) => (
                        <div key={msg.id} className={`flex ${msg.sender_is_admin ? 'justify-start' : 'justify-end'}`}>
                            <div className={`max-w-xs px-3 py-2 rounded-lg ${msg.sender_is_admin ? 'bg-background text-secondary border border-border' : 'bg-primary text-white'}`}>
                                <p className="text-sm">{msg.content}</p>
                            </div>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>
            </main>

            {/* Input */}
            <footer className="p-2 border-t bg-background rounded-b-2xl border-border">
                <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type your message..."
                        className="w-full p-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary transition-colors focus:bg-primary-light/30"
                        aria-label="Chat message input"
                    />
                    <button type="submit" className="bg-primary text-white p-2 rounded-lg hover:opacity-90" aria-label="Send message">
                        <SendIcon />
                    </button>
                </form>
            </footer>
        </div>
    );
};

export default ChatWidget;