import { motion } from "motion/react";
import { Link } from "react-router-dom";

export default function CTA() {
  return (
    <section className="bg-surface-900 py-24 relative overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center opacity-5 select-none pointer-events-none">
        <h2 className="font-headline text-[30rem] text-white leading-none font-black italic">FAST</h2>
      </div>
      <div className="container mx-auto px-8 relative z-10 text-center max-w-4xl">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-headline text-5xl md:text-7xl text-white font-black uppercase mb-6 tracking-tighter leading-none"
        >
          Your One-Stop Centre for All Financial Needs.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-white/80 font-medium text-lg mb-12"
        >
          Join hundreds of Ugandans who have trusted Clarks Financials for fast, transparent, and fair financial services since 2012.
        </motion.p>
        <div className="flex flex-wrap justify-center gap-6">
          <Link to="/apply">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-secondary text-slate-950 font-headline font-black px-14 py-6 rounded-sm text-xl tracking-widest uppercase hover:bg-white transition-all shadow-2xl"
            >
              Apply Now
            </motion.button>
          </Link>
          <Link to="/about">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-primary text-white font-headline font-black px-14 py-6 rounded-sm text-xl tracking-widest uppercase hover:bg-primary transition-all shadow-2xl"
            >
              See How It Works
            </motion.button>
          </Link>
        </div>
      </div>
    </section>
  );
}
