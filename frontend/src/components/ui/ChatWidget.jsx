import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Loader2, Bot, Minimize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getApiUrl } from '../../utils/api';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'model', text: 'Welcome to The Sterling Advisory. I am your Senior Virtual Advisor. How may I assist you with your corporate or tax requirements today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isLoading, isOpen]);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('open-ai-chat', handleOpen);
    return () => window.removeEventListener('open-ai-chat', handleOpen);
  }, []);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const history = messages.map(msg => ({
        role: msg.role === 'model' ? 'model' : 'user',
        parts: [{ text: msg.text }]
      }));

      const res = await fetch(getApiUrl('/api/chat'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          history,
          message: userMessage
        })
      });

      const data = await res.json();
      
      if (res.ok) {
        setMessages(prev => [...prev, { role: 'model', text: data.response }]);
      } else {
        setMessages(prev => [...prev, { role: 'model', text: 'Our advisory network is currently experiencing high volume. Please contact us directly via the Contact page.' }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: 'Our systems are temporarily offline. Please book a formal consultation.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 9999 }}>
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            style={{
              backgroundColor: 'var(--color-navy)',
              color: 'var(--color-gold)',
              border: '2px solid rgba(223, 186, 115, 0.3)',
              borderRadius: '50%',
              width: '65px',
              height: '65px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 12px 30px rgba(13, 21, 39, 0.25)',
              position: 'relative'
            }}
          >
            <MessageSquare size={28} />
            <span style={{
              position: 'absolute', top: 0, right: 0, width: '14px', height: '14px',
              backgroundColor: '#25D366', borderRadius: '50%', border: '2px solid var(--color-navy)'
            }} />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            style={{
              position: 'absolute',
              bottom: '0',
              right: '0',
              width: '380px',
              height: '600px',
              maxHeight: '80vh',
              backgroundColor: '#ffffff',
              borderRadius: 'var(--radius-xl)',
              boxShadow: '0 20px 40px rgba(13, 21, 39, 0.15)',
              border: '1px solid rgba(13, 21, 39, 0.1)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden'
            }}
          >
            {/* Header */}
            <div style={{
              backgroundColor: 'var(--color-navy)',
              padding: '1.25rem 1.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '2px solid var(--color-gold)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '40px', height: '40px', borderRadius: '50%',
                  backgroundColor: 'rgba(223, 186, 115, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  <Bot size={22} style={{ color: 'var(--color-gold)' }} />
                </div>
                <div>
                  <h3 style={{ margin: 0, color: '#ffffff', fontSize: '1.05rem', fontFamily: 'var(--font-heading)', fontWeight: 700 }}>
                    Sterling AI Advisor
                  </h3>
                  <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span style={{ width: '6px', height: '6px', backgroundColor: '#25D366', borderRadius: '50%' }} />
                    Online
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                style={{
                  background: 'none', border: 'none', color: 'rgba(255,255,255,0.6)',
                  cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'center'
                }}
              >
                <Minimize2 size={20} />
              </button>
            </div>

            {/* Chat Area */}
            <div style={{
              flex: 1,
              overflowY: 'auto',
              padding: '1.5rem',
              backgroundColor: '#f8f9fa',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem'
            }}>
              {messages.map((msg, idx) => (
                <div key={idx} style={{
                  display: 'flex',
                  justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start'
                }}>
                  <div style={{
                    maxWidth: '85%',
                    padding: '0.85rem 1.15rem',
                    borderRadius: '1rem',
                    borderBottomRightRadius: msg.role === 'user' ? '4px' : '1rem',
                    borderBottomLeftRadius: msg.role === 'model' ? '4px' : '1rem',
                    backgroundColor: msg.role === 'user' ? 'var(--color-navy)' : '#ffffff',
                    color: msg.role === 'user' ? '#ffffff' : 'var(--color-navy)',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                    border: msg.role === 'model' ? '1px solid rgba(13, 21, 39, 0.05)' : 'none',
                    fontSize: '0.925rem',
                    lineHeight: '1.5'
                  }}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                  <div style={{
                    padding: '0.85rem 1.15rem',
                    borderRadius: '1rem',
                    borderBottomLeftRadius: '4px',
                    backgroundColor: '#ffffff',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                    border: '1px solid rgba(13, 21, 39, 0.05)',
                  }}>
                    <Loader2 size={18} className="spin" style={{ color: 'var(--color-gold-dark)' }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div style={{
              padding: '1rem',
              backgroundColor: '#ffffff',
              borderTop: '1px solid rgba(13, 21, 39, 0.06)'
            }}>
              <form onSubmit={handleSend} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: '#f8f9fa',
                padding: '4px 4px 4px 16px',
                borderRadius: '99px',
                border: '1px solid rgba(13, 21, 39, 0.1)'
              }}>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about our services..."
                  disabled={isLoading}
                  style={{
                    flex: 1, border: 'none', background: 'transparent',
                    outline: 'none', fontSize: '0.925rem', color: 'var(--color-navy)'
                  }}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  style={{
                    backgroundColor: 'var(--color-gold)',
                    color: 'var(--color-navy)',
                    border: 'none',
                    width: '38px', height: '38px',
                    borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: input.trim() && !isLoading ? 'pointer' : 'not-allowed',
                    opacity: input.trim() && !isLoading ? 1 : 0.5,
                    transition: 'opacity 200ms ease'
                  }}
                >
                  <Send size={18} />
                </button>
              </form>
              <div style={{ textAlign: 'center', marginTop: '8px', fontSize: '0.65rem', color: 'rgba(13, 21, 39, 0.4)' }}>
                Powered by Google AI • Responses are for guidance only.
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
