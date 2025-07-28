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
        animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
        exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const messageVariants = {
        hidden: { opacity: 0, y: 20, scale: 0.95 },
        visible: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, scale: 0.95 }
    };

    return (
        <div className="min-h-screen bg-slate-900 text-slate-100 font-sans flex flex-col items-center justify-center p-4 relative overflow-hidden" dir="rtl">
            {/* Background Decorations */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-green-500/10 to-teal-500/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-gradient-to-br from-indigo-500/10 to-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
            </div>

            <motion.div
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="w-full max-w-5xl h-[95vh] relative z-10"
            >
                <div className="h-full bg-slate-800/50 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-700 overflow-hidden flex flex-col">
                    {/* Header */}
                    <motion.header 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="p-6 border-b border-slate-700 flex items-center justify-between flex-shrink-0 bg-slate-800/30"
                    >
                        <div className="flex items-center gap-4">
                            <motion.div
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                whileTap={{ scale: 0.95 }}
                                className="relative p-4 rounded-2xl bg-gradient-to-br from-green-500 to-teal-600 shadow-lg"
                            >
                                <CalendarDays className="w-7 h-7 text-white" />
                                <motion.div
                                    className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full"
                                />
                            </motion.div>
                            <div>
                                <h1 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text text-transparent">
                                    منظّم
                                </h1>
                                <motion.p 
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                    className="text-green-400 text-sm flex items-center gap-2"
                                >
                                    <motion.span 
                                        animate={{ scale: [1, 1.2, 1] }}
                                        transition={{ duration: 1.5, repeat: Infinity }}
                                        className="w-2 h-2 bg-green-400 rounded-full"
                                    />
                                    متصل الآن
                                    <Sparkles className="w-4 h-4 text-green-400/80 animate-pulse" />
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
                                className="p-3 rounded-xl bg-slate-700/50 hover:bg-slate-700 transition-all duration-300 inline-flex items-center backdrop-blur-sm border border-slate-600 hover:border-green-500/50 hover:shadow-lg hover:shadow-green-500/20"
                            >
                                <ArrowLeft className="w-5 h-5 text-slate-400 hover:text-green-400 transition-colors" />
                            </Link>
                        </motion.div>
                    </motion.header>

                    {/* Main Content */}
                    <div className="flex-1 flex flex-col min-h-0">
                        <motion.div 
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="flex-1 overflow-y-auto p-6 space-y-6"
                        >
                            <AnimatePresence>
                                {messages.map((message) => (
                                    <motion.div
                                        key={message.id}
                                        variants={messageVariants}
                                        layout
                                        className={`flex items-end gap-4 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                    >
                                        {message.sender === 'Munazzem' && (
                                            <motion.div 
                                                whileHover={{ scale: 1.1 }}
                                                className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center flex-shrink-0 shadow-md"
                                            >
                                                <CalendarDays size={20} className="text-white" />
                                            </motion.div>
                                        )}
                                        
                                        <motion.div
                                            whileHover={{ y: -2 }}
                                            className={`max-w-xl rounded-2xl p-5 shadow-lg text-base relative ${
                                                message.sender === 'user'
                                                    ? 'bg-indigo-600 text-white rounded-br-lg'
                                                    : 'bg-slate-700/80 border border-slate-600/50 rounded-bl-lg'
                                            }`}
                                        >
                                            <p className="leading-relaxed whitespace-pre-wrap" style={{ wordBreak: 'break-word' }}>
                                                {message.text}
                                            </p>
                                            <p className={`text-xs mt-3 ${
                                                message.sender === 'user' ? 'text-indigo-200' : 'text-slate-400'
                                            }`}>
                                                {message.timestamp.toLocaleTimeString('ar-EG', { 
                                                    hour: '2-digit', 
                                                    minute: '2-digit' 
                                                })}
                                            </p>
                                        </motion.div>
                                        
                                        {message.sender === 'user' && (
                                            <motion.div 
                                                whileHover={{ scale: 1.1 }}
                                                className="w-12 h-12 rounded-2xl bg-slate-600 flex items-center justify-center flex-shrink-0 shadow-md border border-slate-700"
                                            >
                                                <User size={20} className="text-slate-300" />
                                            </motion.div>
                                        )}
                                    </motion.div>
                                ))}
                                
                                {isLoading && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0 }}
                                        className="flex items-end gap-4 justify-start"
                                    >
                                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center flex-shrink-0 shadow-md animate-pulse">
                                            <CalendarDays size={20} className="text-white" />
                                        </div>
                                        <div className="bg-slate-700/80 border border-slate-600/50 rounded-2xl rounded-bl-lg p-5 flex items-center gap-4 shadow-lg">
                                            <LoaderCircle className="animate-spin text-green-400" size={24} />
                                            <span className="text-slate-400">ينظّم أفكاره...</span>
                                            <div className="flex gap-1">
                                                <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" />
                                                <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                                                <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
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
                            className="p-6 bg-slate-800/60 border-t border-slate-700 backdrop-blur-sm"
                        >
                            <div className="max-w-4xl mx-auto">
                                <div className="flex items-center gap-4 bg-slate-700/50 border border-slate-600 rounded-2xl p-2 transition-all duration-300 focus-within:ring-2 focus-within:ring-green-500/70 focus-within:border-green-500/70 backdrop-blur-sm">
                                    <textarea
                                        value={inputText}
                                        onChange={(e) => setInputText(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSendMessage())}
                                        placeholder="اسأل منظّم عن الفعاليات والمواعيد..."
                                        className="flex-1 bg-transparent px-4 py-3 text-slate-100 placeholder-slate-400 resize-none focus:outline-none text-base leading-relaxed"
                                        rows={1}
                                    />
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={handleSendMessage}
                                        disabled={!inputText.trim() || isLoading}
                                        className="p-4 bg-gradient-to-br from-green-500 to-teal-600 hover:shadow-lg hover:shadow-green-500/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none rounded-xl transition-all duration-300 group"
                                    >
                                        {isLoading ? (
                                            <LoaderCircle size={22} className="animate-spin text-white" />
                                        ) : (
                                            <Send size={22} className="text-white" />
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
