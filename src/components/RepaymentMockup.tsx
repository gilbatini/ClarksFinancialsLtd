import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Signal, BatteryFull, CheckCircle2, Zap, ShieldCheck, Loader2 } from "lucide-react";

export default function RepaymentMockup() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleRepay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 3000);
    }, 1500);
  };

  return (
    <section className="py-32 bg-surface-50 relative overflow-hidden">
      <div className="container mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
        <div className="relative flex justify-center">
          {/* CSS Phone Mockup */}
          <div className="w-[300px] h-[600px] bg-slate-950 rounded-[3.5rem] p-4 border-[12px] border-slate-900 shadow-2xl relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-36 h-8 bg-slate-900 rounded-b-3xl"></div>
            <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden flex flex-col font-body relative">
              <div className="h-10 flex justify-between items-center px-8 pt-4 text-[10px] text-slate-400 font-bold">
                <span>9:41</span>
                <div className="flex gap-1">
                  <Signal className="w-3 h-3" />
                  <BatteryFull className="w-3 h-3" />
                </div>
              </div>
              
              <div className="p-8">
                <div className="w-8 h-8 bg-primary flex items-center justify-center mb-6 rounded-sm">
                  <div className="w-4 h-4 bg-secondary rounded-full"></div>
                </div>
                <h5 className="text-slate-950 font-bold text-xl mb-1">Loan Settlement</h5>
                <p className="text-slate-400 text-[10px] uppercase font-bold tracking-widest mb-8">Verification Protocol</p>
                
                <div className="bg-surface-50 p-5 rounded-lg mb-8 border border-surface-100">
                  <p className="text-slate-400 text-[10px] uppercase font-black mb-1">Outstanding Balance</p>
                  <p className="text-primary font-headline font-black text-3xl">UGX 460,000</p>
                </div>
                
                <p className="text-slate-400 text-[10px] uppercase font-bold mb-4">Network Provider</p>
                <div className="grid grid-cols-2 gap-3 mb-10">
                  <div className="border-2 border-primary p-4 rounded-lg flex items-center justify-center bg-primary/5">
                    <span className="text-[10px] font-black text-primary">AIRTEL MONEY</span>
                  </div>
                  <div className="border border-surface-200 p-4 rounded-lg flex items-center justify-center opacity-40">
                    <span className="text-[10px] font-black text-slate-400">MTN MOMO</span>
                  </div>
                </div>
                
                <button 
                  onClick={handleRepay}
                  disabled={isProcessing}
                  className="w-full bg-primary text-white font-bold py-5 rounded-lg text-sm transition-all active:scale-95 shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Processing...
                    </>
                  ) : "Initiate Payment"}
                </button>
              </div>

              <AnimatePresence>
                {isSuccess && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-primary flex flex-col items-center justify-center p-8 text-center z-20"
                  >
                    <motion.div 
                      initial={{ scale: 0.5 }}
                      animate={{ scale: 1 }}
                      className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mb-6"
                    >
                      <CheckCircle2 className="w-10 h-10 text-primary" />
                    </motion.div>
                    <h6 className="text-white font-headline font-black text-3xl uppercase mb-3">Verified</h6>
                    <p className="text-white/80 text-sm">Ledger entry updated successfully.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          
          {/* Decorative Glow */}
          <div className="absolute -z-10 w-96 h-96 bg-primary/10 blur-[120px] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-primary font-bold uppercase tracking-widest mb-4">Omni-Channel Repayment</p>
          <h2 className="font-headline text-6xl md:text-8xl text-slate-950 uppercase leading-[0.9] mb-10 tracking-tighter font-black">
            EFFORTLESS<br /><span className="text-primary italic">SETTLEMENT.</span>
          </h2>
          <p className="text-slate-600 text-lg mb-12 font-medium">
            Integration with Uganda's leading mobile networks ensures real-time ledger updates. Repay anywhere, anytime with instant confirmation.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white flex items-center justify-center rounded-sm border border-surface-200 shadow-sm shrink-0">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-slate-950 font-bold text-sm">Real-time Updates</p>
                <p className="text-slate-500 text-xs">Zero waiting for manual verification.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white flex items-center justify-center rounded-sm border border-surface-200 shadow-sm shrink-0">
                <ShieldCheck className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-slate-950 font-bold text-sm">Secure Bridge</p>
                <p className="text-slate-500 text-xs">Military-grade encryption tunnels.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
