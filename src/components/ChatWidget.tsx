import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, Loader2 } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

const API_KEY = process.env.GEMINI_API_KEY;
const ai = API_KEY ? new GoogleGenAI({ apiKey: API_KEY }) : null;

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'model'; text: string }[]>([
    { role: 'model', text: API_KEY
      ? 'Hello! I am the SAHAL support AI. How can I help you with your bookings or travel plans today?'
      : 'Hello! I am the SAHAL support assistant. For AI-powered support, please contact us at +44 796 967 293.'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<any>(null);

  useEffect(() => {
    if (!chatRef.current && ai) {
      chatRef.current = ai.chats.create({
        model: 'gemini-3-flash-preview',
        config: {
          systemInstruction: 'You are a helpful customer support agent for SAHAL, a travel platform in Somalia offering flights and buses. Be concise, polite, and helpful. You can help users find routes, understand the booking process, or answer general travel questions. IMPORTANT: If a user asks for the Sahal contact number or phone number, you must provide them with this exact number: 44796967293. If a user asks who owns or created the Sahal app, you must answer that it is owned by Anas Salah Ali.',
        }
      });
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      if (!ai || !chatRef.current) {
        // Fallback response when AI is not available
        setTimeout(() => {
          setMessages(prev => [...prev, {
            role: 'model',
            text: 'Thank you for your message! For personalized assistance, please contact our support team at +44 796 967 293 or visit our help center.'
          }]);
        }, 1000);
      } else {
        const response = await chatRef.current.sendMessage({ message: userMessage });
        setMessages(prev => [...prev, { role: 'model', text: response.text }]);
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { role: 'model', text: 'Sorry, I encountered an error while trying to respond. Please contact support at +44 796 967 293.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 w-14 h-14 bg-primary text-white rounded-full shadow-xl flex items-center justify-center hover:bg-primary/90 transition-transform duration-300 z-50 ${isOpen ? 'scale-0' : 'scale-100'}`}
        aria-label="Open support chat"
      >
        <MessageSquare className="w-6 h-6" />
      </button>

      {/* Chat Window */}
      <div
        className={`fixed bottom-6 right-6 w-[350px] h-[500px] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden z-50 transition-all duration-300 origin-bottom-right ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'}`}
      >
        {/* Header */}
        <div className="bg-primary p-4 text-white flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Bot className="w-6 h-6" />
            <div>
              <h3 className="font-bold text-sm">SAHAL Support AI</h3>
              <p className="text-[10px] text-primary-100">Online 24/7</p>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] p-3 text-sm ${msg.role === 'user' ? 'bg-primary text-white rounded-2xl rounded-tr-sm' : 'bg-white border border-slate-200 text-slate-800 rounded-2xl rounded-tl-sm shadow-sm'}`}>
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-sm p-4 shadow-sm flex items-center gap-2">
                <Loader2 className="w-4 h-4 text-primary animate-spin" />
                <span className="text-xs text-slate-500 font-medium">Typing...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form onSubmit={handleSend} className="p-3 bg-white border-t border-slate-100 flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 bg-slate-100 border-transparent focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-xl px-4 py-2.5 text-sm outline-none transition-all"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </>
  );
}
