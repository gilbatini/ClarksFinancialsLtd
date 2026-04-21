import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, MessageCircle, Send, ExternalLink } from "lucide-react";
import { cn } from "../lib/utils";

// WhatsApp Configuration
const WHATSAPP_NUMBER = "256772502955";
const WHATSAPP_MESSAGE = encodeURIComponent("Hello Clarks Financials, I'm interested in learning more about your loan products.");
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    // Proactive prompt after 5 seconds
    const timer = setTimeout(() => {
      if (!isOpen) setShowPrompt(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, [isOpen]);

  const handleWhatsAppRedirect = () => {
    window.open(WHATSAPP_URL, "_blank");
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
            className="bg-white p-4 rounded-xl shadow-2xl border border-surface-200 mb-4 max-w-[220px] relative cursor-pointer"
            onClick={() => setIsOpen(true)}
          >
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setShowPrompt(false);
              }}
              className="absolute -top-2 -right-2 bg-slate-100 rounded-full p-1 hover:bg-slate-200 transition-colors"
            >
              <X className="w-3 h-3" />
            </button>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-[#25D366] rounded-full animate-pulse"></div>
              <span className="text-[10px] font-black text-[#25D366] uppercase tracking-widest">Active on WhatsApp</span>
            </div>
            <p className="text-xs font-bold text-slate-950 leading-snug">
              Chat with our loan officers directly on WhatsApp for instant approval!
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* WhatsApp Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="bg-[#E5DDD5] w-[320px] rounded-2xl shadow-2xl border border-surface-200 flex flex-col overflow-hidden mb-4"
          >
            {/* Header */}
            <div className="bg-[#075E54] p-5 text-white flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-sm">Clarks Financials</h3>
                  <p className="text-[10px] text-white/70">Typically replies immediately</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-2 rounded-full transition-colors font-bold">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Area */}
            <div className="p-6 space-y-4 min-h-[120px] bg-[url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')] bg-repeat">
              <div className="bg-white p-4 rounded-xl rounded-tl-none shadow-sm max-w-[90%] relative">
                <div className="absolute top-0 -left-2 w-0 h-0 border-t-[10px] border-t-white border-l-[10px] border-l-transparent"></div>
                <p className="text-xs font-medium text-slate-800 leading-relaxed">
                  Hi there! 👋 <br /><br />
                  I'm your Clarks Financials assistant. Click the button below to start a secure chat with our team on WhatsApp for any loan inquiries.
                </p>
                <p className="text-[9px] text-slate-400 text-right mt-1">9:41 AM</p>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="p-4 bg-white/80 backdrop-blur-sm border-t border-surface-200">
              <button 
                onClick={handleWhatsAppRedirect}
                className="w-full bg-[#25D366] text-white font-bold py-3 px-6 rounded-full flex items-center justify-center gap-2 hover:bg-[#128C7E] transition-all shadow-lg active:scale-95"
              >
                <Send className="w-4 h-4 fill-current" />
                Start WhatsApp Chat
              </button>
              <p className="text-[9px] text-center mt-3 text-slate-500 font-bold uppercase tracking-widest flex items-center justify-center gap-1">
                Direct Redirect <ExternalLink className="w-2 h-2" />
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
          isOpen ? "bg-slate-900" : "bg-[#25D366]"
        )}
      >
        {isOpen ? <X className="w-8 h-8 text-white" /> : (
          <div className="relative">
            <MessageCircle className="w-9 h-9 text-white fill-current" />
            <motion.div 
              animate={{ scale: [1, 1.2, 1] }} 
              transition={{ repeat: Infinity, duration: 2 }} 
              className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 border-2 border-white rounded-full"
            ></motion.div>
          </div>
        )}
      </motion.button>
    </div>
  );
}
