import React, { useState, useRef, useEffect } from 'react';
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from 'framer-motion';
import {
    Send,
    ArrowLeft,
    LoaderCircle,
    CalendarDays,
    User,
    Sparkles
} from 'lucide-react';

// واجهة الرسالة
interface Message {
    id: string;
    text: string;
    sender: 'user' | 'Munazzem';
    timestamp: Date;
}

// المكون الرئيسي للتطبيق
const AiChat = () => {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            text: "أهلاً بك! أنا \"منظّم\"، مساعدك الذكي لإدارة الفعاليات والمواعيد. كيف يمكنني مساعدتك اليوم؟",
            sender: 'Munazzem',
            timestamp: new Date()
        }
    ]);
    const [inputText, setInputText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // التمرير لأسفل تلقائيًا عند وصول رسالة جديدة
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // دالة إرسال الرسالة واستدعاء الخادم الخلفي
    const handleSendMessage = async () => {
        if (!inputText.trim() || isLoading) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            text: inputText,
            sender: 'user',
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        const currentInput = inputText;
        setInputText('');
        setIsLoading(true);

        try {
            // إعداد الطلب للخادم الخلفي الخاص بنا
            const response = await fetch('http://localhost:3001/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ question: currentInput })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || `API call failed with status: ${response.status}`);
            }

            const result = await response.json();

            const munazzemResponse: Message = {
                id: (Date.now() + 1).toString(),
                text: result.reply,
                sender: 'Munazzem',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, munazzemResponse]);

        } catch (error) {
            console.error("Error calling backend API:", error);
            const errorResponse: Message = {
                id: (Date.now() + 1).toString(),
                text: "عذراً، حدث خطأ أثناء الاتصال بالخادم. يرجى التحقق من اتصالك بالإنترنت أو صلاحية مفتاح الـ API والمحاولة مرة أخرى.",
                sender: 'Munazzem',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, errorResponse]);
        } finally {
            setIsLoading(false);
        }
    };

    const pageVariants = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                delayChildren: 0.2,
                staggerChildren: 0.1
            }
        }
    };

    const messageVariants = {
        hidden: { opacity: 0, y: 20, scale: 0.95 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1
        }
    };

    return (
        <div className="min-h-screen bg-chat-background text-foreground font-sans flex flex-col items-center justify-center p-4 relative overflow-hidden" dir="rtl">
            {/* Background Decorations */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-primary opacity-5 rounded-full blur-3xl animate-float" />
                <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-gradient-user opacity-5 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
                <div className="absolute top-1/2 right-1/2 w-64 h-64 bg-primary opacity-10 rounded-full blur-3xl animate-pulse" />
            </div>

            <motion.div
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="w-full max-w-5xl h-[95vh] relative z-10"
            >
                <div className="h-full bg-gradient-surface backdrop-blur-xl rounded-3xl shadow-elegant border border-chat-border overflow-hidden flex flex-col">
                    {/* Header */}
                    <motion.header 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="p-6 border-b border-chat-border flex items-center justify-between flex-shrink-0 bg-gradient-to-r from-chat-surface/50 to-transparent"
                    >
                        <div className="flex items-center gap-4">
                            <motion.div
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                whileTap={{ scale: 0.95 }}
                                className="relative p-4 rounded-2xl bg-gradient-primary shadow-glow"
                            >
                                <CalendarDays className="w-7 h-7 text-primary-foreground" />
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                                    className="absolute -top-1 -right-1 w-3 h-3 bg-success rounded-full"
                                />
                            </motion.div>
                            <div>
                                <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                                    منظّم
                                </h1>
                                <motion.p 
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                    className="text-success text-sm flex items-center gap-2"
                                >
                                    <motion.span 
                                        animate={{ scale: [1, 1.2, 1] }}
                                        transition={{ duration: 1.5, repeat: Infinity }}
                                        className="w-2 h-2 bg-success rounded-full"
                                    />
                                    متصل الآن
                                    <Sparkles className="w-4 h-4 animate-pulse" />
                                </motion.p>
                            </div>
                        </div>

                        <motion.div 
                            whileHover={{ scale: 1.1 }} 
                            whileTap={{ scale: 0.9 }}
                            className="relative"
                        >
                            <Link
                                to="/"
                                className="p-3 rounded-xl bg-muted/50 hover:bg-muted transition-all duration-300 inline-flex items-center backdrop-blur-sm border border-chat-border hover:border-primary/50 hover:shadow-glow"
                            >
                                <ArrowLeft className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
                            </Link>
                        </motion.div>
                    </motion.header>

                    {/* Main Content */}
                    <div className="flex-1 flex flex-col min-h-0">
                        <motion.div 
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth"
                            style={{
                                scrollbarWidth: 'thin',
                                scrollbarColor: 'hsl(var(--primary)) transparent'
                            }}
                        >
                            <AnimatePresence mode="popLayout">
                                {messages.map((message, index) => (
                                    <motion.div
                                        key={message.id}
                                        variants={messageVariants}
                                        initial="hidden"
                                        animate="visible"
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ duration: 0.4, ease: "easeOut" }}
                                        layout
                                        className={`flex items-end gap-4 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                    >
                                        {message.sender === 'Munazzem' && (
                                            <motion.div 
                                                whileHover={{ scale: 1.1 }}
                                                className="relative w-12 h-12 rounded-2xl bg-gradient-primary flex items-center justify-center flex-shrink-0 shadow-message"
                                            >
                                                <CalendarDays size={20} className="text-primary-foreground" />
                                                <div className="absolute -top-1 -right-1 w-4 h-4 bg-success rounded-full border-2 border-chat-background animate-pulse" />
                                            </motion.div>
                                        )}
                                        
                                        <motion.div
                                            whileHover={{ scale: 1.02 }}
                                            className={`max-w-xl rounded-3xl p-5 shadow-message text-base relative ${
                                                message.sender === 'user'
                                                    ? 'bg-gradient-user text-white rounded-br-lg border border-user-bubble/20'
                                                    : 'bg-chat-surface border border-chat-border rounded-bl-lg'
                                            }`}
                                        >
                                            <p className="leading-relaxed whitespace-pre-wrap" style={{ wordBreak: 'break-word' }}>
                                                {message.text}
                                            </p>
                                            <p className={`text-xs mt-3 ${
                                                message.sender === 'user' ? 'text-white/70' : 'text-muted-foreground'
                                            }`}>
                                                {message.timestamp.toLocaleTimeString('ar-EG', { 
                                                    hour: '2-digit', 
                                                    minute: '2-digit' 
                                                })}
                                            </p>
                                            
                                            {/* Message decoration */}
                                            <div className={`absolute -bottom-1 ${
                                                message.sender === 'user' ? '-right-1' : '-left-1'
                                            } w-3 h-3 ${
                                                message.sender === 'user' ? 'bg-user-bubble' : 'bg-chat-surface'
                                            } transform rotate-45 border-r border-b ${
                                                message.sender === 'user' ? 'border-user-bubble/20' : 'border-chat-border'
                                            }`} />
                                        </motion.div>
                                        
                                        {message.sender === 'user' && (
                                            <motion.div 
                                                whileHover={{ scale: 1.1 }}
                                                className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center flex-shrink-0 shadow-message border border-chat-border"
                                            >
                                                <User size={20} className="text-muted-foreground" />
                                            </motion.div>
                                        )}
                                    </motion.div>
                                ))}
                                
                                {isLoading && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        className="flex items-end gap-4 justify-start"
                                    >
                                        <div className="w-12 h-12 rounded-2xl bg-gradient-primary flex items-center justify-center flex-shrink-0 shadow-message animate-pulse-glow">
                                            <CalendarDays size={20} className="text-primary-foreground" />
                                        </div>
                                        <div className="bg-chat-surface border border-chat-border rounded-3xl rounded-bl-lg p-5 flex items-center gap-4 shadow-message">
                                            <LoaderCircle className="animate-spin text-primary" size={24} />
                                            <span className="text-muted-foreground">ينظّم أفكاره...</span>
                                            <div className="flex gap-1">
                                                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                                                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                                                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                            <div ref={messagesEndRef} />
                        </motion.div>

                        {/* Input Area */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.5 }}
                            className="p-6 bg-gradient-to-r from-chat-surface/70 to-transparent border-t border-chat-border backdrop-blur-sm"
                        >
                            <div className="max-w-4xl mx-auto">
                                <div className="flex items-center gap-4 bg-muted/50 border border-chat-border rounded-3xl p-3 transition-all duration-300 focus-within:ring-2 focus-within:ring-primary/50 focus-within:border-primary/50 backdrop-blur-sm">
                                    <textarea
                                        value={inputText}
                                        onChange={(e) => setInputText(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSendMessage())}
                                        placeholder="اسأل منظّم عن الفعاليات والمواعيد..."
                                        className="flex-1 bg-transparent px-4 py-3 text-foreground placeholder-muted-foreground resize-none focus:outline-none text-base leading-relaxed"
                                        rows={1}
                                        style={{ minHeight: '24px', maxHeight: '120px' }}
                                    />
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={handleSendMessage}
                                        disabled={!inputText.trim() || isLoading}
                                        className="p-4 bg-gradient-primary hover:shadow-glow disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none rounded-2xl transition-all duration-300 relative overflow-hidden group"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        {isLoading ? (
                                            <LoaderCircle size={22} className="animate-spin text-primary-foreground relative z-10" />
                                        ) : (
                                            <Send size={22} className="text-primary-foreground relative z-10" />
                                        )}
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default AiChat;