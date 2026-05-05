'use client';

import { useState, useEffect, useRef } from 'react';

const translations = {
  ar: {
    title: 'المساعدة الذكية - رشيدة AI',
    placeholder: 'اسأل عن العقارات في المغرب أو إسبانيا...',
    send: 'إرسال',
    aiWelcome: 'مرحباً! أنا رشيدة AI، مساعدك العقاري الذكي. كيف يمكنني مساعدتك اليوم؟',
  },
  es: {
    title: 'Asistente IA - Rachida AI',
    placeholder: 'Pregunta sobre propiedades en Marruecos o España...',
    send: 'Enviar',
    aiWelcome: '¡Hola! Soy Rachida AI, tu asistente inmobiliario inteligente. ¿Cómo puedo ayudarte hoy?',
  },
};

export default function ChatPage() {
  const [language, setLanguage] = useState<'ar' | 'es'>('ar');
  const [mounted, setMounted] = useState(false);
  const [messages, setMessages] = useState<Array<{ id: string; role: 'user' | 'assistant'; content: string }>>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedLang = localStorage.getItem('language') as 'ar' | 'es' | null;
    if (savedLang) setLanguage(savedLang);
    setMounted(true);
    
    setMessages([{
      id: 'welcome',
      role: 'assistant',
      content: translations['ar'].aiWelcome,
    }]);
  }, []);

  const t = translations[language];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { id: Date.now().toString(), role: 'user' as const, content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: input,
          language,
          history: messages.map(m => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await response.json();
      
      const aiMessage = { id: (Date.now() + 1).toString(), role: 'assistant' as const, content: data.response };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: 'assistant', content: 'Error al procesar tu mensaje' }]);
    }
    
    setLoading(false);
  };

  if (!mounted) return null;

  return (
    <div className="pt-20 min-h-screen flex flex-col">
      <div className="max-w-4xl mx-auto px-4 py-4 flex-1 flex flex-col">
        <h1 className="text-3xl text-[#f5f5f0] text-center mb-6" style={{ fontFamily: 'var(--font-amiri)' }}>
          {t.title}
        </h1>

        <div className="flex-1 card rounded-xl p-4 mb-4 overflow-y-auto max-h-[60vh]">
          <div className="space-y-4">
            {messages.map(msg => (
              <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={msg.role === 'user' ? 'chat-bubble-user rounded-lg px-4 py-2 max-w-[80%]' : 'chat-bubble-ai rounded-lg px-4 py-2 max-w-[80%]'}>
                  <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="chat-bubble-ai rounded-lg px-4 py-2">
                  <p className="text-sm">...</p>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t.placeholder}
            className="input-field flex-1 rounded-lg px-4 py-2"
            disabled={loading}
          />
          <button type="submit" disabled={loading} className="btn-primary px-6 rounded-lg">
            {t.send}
          </button>
        </form>
      </div>
    </div>
  );
}