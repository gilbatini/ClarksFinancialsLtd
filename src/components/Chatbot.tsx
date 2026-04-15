import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, X, Send, Loader2, Bot, User, Sparkles } from "lucide-react";
import { GoogleGenAI } from "@google/genai";
import { cn } from "../lib/utils";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const SYSTEM_INSTRUCTION = `
You are "Clark", a sophisticated AI financial advisor for Clarks Financials Limited. 
Clarks Financials is a licensed Ugandan Microfinance institution (UMRA regulated) established in 2012.

Your tone: Professional, sophisticated, architectural, helpful, and transparent.
Key info:
- Head Office: Ambassador House, 2nd Floor, Kampala Road.
- Branch: Kireka (Geode Building).
- Products: Salary Loans (UGX 200k - 15M), Utility Bill Payments, Agency Banking, Mobile Money.
- Approval time: Within 24 hours.
- Eligibility: Permanently employed for 2+ years, Ugandan resident, 18+, min salary 100k UGX.
- No loans for employees on probation.
- Two guarantors required.

If asked about interest rates: Mention they are 3% per month on reducing balance for salaried loans, but always advise checking the official disclosure at the office.

Keep responses concise and elegant. Use financial terminology where appropriate but remain accessible.
`;

interface Message {
  role: "user" | "model";
  text: string;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { role: "model", text: "Welcome to Clarks Financials. I am Clark, your architectural financial guide. How may I assist your prosperity today?" }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Proactive prompt after 5 seconds
    const timer = setTimeout(() => {
      if (!isOpen) setShowPrompt(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", text: userMessage }]);
    setIsLoading(true);

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: messages.concat({ role: "user", text: userMessage }).map(m => ({
          role: m.role,
          parts: [{ text: m.text }]
        })),
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.7,
        }
      });

      const modelText = response.text || "I apologize, I am experiencing a temporary lapse in my financial processing. How else can I help?";
      setMessages(prev => [...prev, { role: "model", text: modelText }]);
    } catch (error) {
      console.error("Chatbot error:", error);
      setMessages(prev => [...prev, { role: "model", text: "I encountered an error. Please try again or contact our human team at 0772 502 955." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[60] flex flex-col items-end">
      {/* Proactive Prompt */}
      <AnimatePresence>
        {showPrompt && !isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: 20 }}
            className="bg-white p-4 rounded-xl shadow-2xl border border-surface-200 mb-4 max-w-[200px] relative"
          >
            <button 
              onClick={() => setShowPrompt(false)}
              className="absolute -top-2 -right-2 bg-slate-100 rounded-full p-1 hover:bg-slate-200 transition-colors"
            >
              <X className="w-3 h-3" />
            </button>
            <p className="text-xs font-bold text-slate-950 leading-tight">
              Need a quick loan approval? I can guide you through our protocol.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="bg-white w-[350px] md:w-[400px] h-[500px] rounded-2xl shadow-2xl border border-surface-200 flex flex-col overflow-hidden mb-4"
          >
            {/* Header */}
            <div className="bg-primary p-6 text-white flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Bot className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <h3 className="font-headline font-black uppercase tracking-tight text-sm">Clark AI</h3>
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-secondary rounded-full animate-pulse"></span>
                    <span className="text-[10px] font-bold text-white/60 uppercase tracking-widest">Protocol Active</span>
                  </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-2 rounded-full transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Messages */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-6 space-y-4 bg-surface-50"
            >
              {messages.map((m, i) => (
                <div key={i} className={cn(
                  "flex gap-3 max-w-[85%]",
                  m.role === "user" ? "ml-auto flex-row-reverse" : ""
                )}>
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                    m.role === "user" ? "bg-primary" : "bg-white border border-surface-200"
                  )}>
                    {m.role === "user" ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-primary" />}
                  </div>
                  <div className={cn(
                    "p-4 rounded-2xl text-sm font-medium leading-relaxed",
                    m.role === "user" ? "bg-primary text-white rounded-tr-none" : "bg-white text-slate-700 border border-surface-200 rounded-tl-none shadow-sm"
                  )}>
                    {m.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-white border border-surface-200 rounded-full flex items-center justify-center shrink-0">
                    <Loader2 className="w-4 h-4 text-primary animate-spin" />
                  </div>
                  <div className="bg-white border border-surface-200 p-4 rounded-2xl rounded-tl-none shadow-sm">
                    <div className="flex gap-1">
                      <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce"></span>
                      <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                      <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t border-surface-200">
              <div className="relative">
                <input 
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Ask about loans, eligibility..."
                  className="w-full bg-surface-50 border border-surface-200 rounded-full py-3 pl-6 pr-12 text-sm focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                />
                <button 
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary text-white p-2 rounded-full hover:bg-slate-950 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <p className="text-[8px] text-center mt-3 text-slate-400 font-bold uppercase tracking-widest">
                Powered by Clarks Financials AI Protocol
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          setIsOpen(!isOpen);
          setShowPrompt(false);
        }}
        className={cn(
          "w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-all duration-500",
          isOpen ? "bg-slate-950 rotate-90" : "bg-primary"
        )}
      >
        {isOpen ? <X className="w-8 h-8 text-white" /> : (
          <div className="relative">
            <MessageSquare className="w-8 h-8 text-white" />
            <Sparkles className="absolute -top-2 -right-2 w-5 h-5 text-secondary animate-pulse" />
          </div>
        )}
      </motion.button>
    </div>
  );
}
