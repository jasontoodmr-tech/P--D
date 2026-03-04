import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Sparkles, Loader2 } from 'lucide-react';
import Markdown from 'react-markdown';
import { createChat } from '../services/gemini';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

interface Message {
  role: 'user' | 'model';
  content: string;
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatRef = useRef<any>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatRef.current = createChat();
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await chatRef.current.sendMessage({ message: userMessage });
      setMessages(prev => [...prev, { role: 'model', content: response.text || '' }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { role: 'model', content: 'Lo siento, hubo un error al procesar tu solicitud.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[600px] glass-panel rounded-2xl overflow-hidden">
      <div className="p-4 border-b-4 border-brand-primary bg-white flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-brand-primary flex items-center justify-center text-white">
            <Sparkles size={18} />
          </div>
          <div>
            <h3 className="font-display font-black text-sm italic">CHAT CON MI CLON IA</h3>
            <p className="text-[10px] text-stone-500 uppercase tracking-wider font-bold">Modo Texto / 100% Real</p>
          </div>
        </div>
      </div>

      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-6 bg-stone-50/50"
      >
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center p-8">
            <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center mb-4">
              <Bot className="text-stone-400" size={32} />
            </div>
            <h4 className="font-display text-lg font-medium mb-2">¡Hola! Soy el Clon IA de Dylan</h4>
            <p className="text-sm text-stone-500 max-w-xs">
              Pregúntame por qué Dylan Martínez es la experiencia que estabas buscando.
            </p>
          </div>
        )}
        
        <AnimatePresence initial={false}>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                "flex gap-3 max-w-[85%]",
                msg.role === 'user' ? "ml-auto flex-row-reverse" : "mr-auto"
              )}
            >
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                msg.role === 'user' ? "bg-stone-200" : "bg-brand-primary text-white"
              )}>
                {msg.role === 'user' ? <User size={16} /> : <Sparkles size={16} />}
              </div>
              <div className={cn(
                "p-4 rounded-2xl text-sm leading-relaxed",
                msg.role === 'user' 
                  ? "bg-stone-900 text-white rounded-tr-none" 
                  : "bg-white border border-stone-200 shadow-sm rounded-tl-none"
              )}>
                <div className="markdown-body prose prose-sm max-w-none">
                  <Markdown>{msg.content}</Markdown>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {isLoading && (
          <div className="flex gap-3 mr-auto">
            <div className="w-8 h-8 rounded-full bg-brand-primary text-white flex items-center justify-center animate-pulse">
              <Sparkles size={16} />
            </div>
            <div className="p-4 bg-white border border-stone-200 rounded-2xl rounded-tl-none shadow-sm">
              <Loader2 className="animate-spin text-stone-400" size={18} />
            </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-white border-t border-stone-200">
        <form 
          onSubmit={(e) => { e.preventDefault(); handleSend(); }}
          className="relative"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Pregúntame algo épico..."
            className="w-full pl-4 pr-12 py-3 bg-stone-100 border-none rounded-none text-sm focus:ring-2 focus:ring-brand-primary transition-all"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-brand-primary text-white rounded-lg flex items-center justify-center disabled:opacity-50 transition-all hover:scale-105"
          >
            <Send size={16} />
          </button>
        </form>
      </div>
    </div>
  );
}
