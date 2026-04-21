import { motion } from "motion/react";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center overflow-hidden border-b border-surface-200 pt-32 lg:pt-20" id="home">
      <div className="absolute inset-0 architectural-grid opacity-40"></div>
      <div className="container mx-auto px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="lg:col-span-7 py-12 lg:py-20"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-sm mb-6">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Licensed Institution · Kampala, Uganda · Est. 2012</span>
          </div>
          <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl leading-[0.9] text-slate-950 font-black text-kern-tight mb-8 uppercase">
            FAST APPROVAL<br />ON <span className="text-primary italic">SALARIED EMPLOYEE LOAN.</span>
          </h1>
          <p className="text-slate-600 text-lg mb-10 max-w-2xl font-medium leading-relaxed">
            Specializing in Salaried Employee Loans. Get your funds within 24hrs of submitting your documents. Licensed by UMRA and serving Uganda since 2012.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/apply">
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-secondary text-slate-950 font-headline font-bold px-10 py-5 rounded-default text-lg tracking-widest uppercase hover:bg-white transition-all flex items-center gap-3 shadow-lg"
              >
                Apply for a Loan <ArrowUpRight className="w-6 h-6" />
              </motion.button>
            </Link>
            <Link to="/loans">
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="border-2 border-primary text-primary font-headline font-bold px-10 py-5 rounded-default text-lg tracking-widest uppercase hover:bg-primary hover:text-white transition-all"
              >
                View Our Products
              </motion.button>
            </Link>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="lg:col-span-5 relative"
        >
          <div className="bg-primary p-1 rounded-default shadow-2xl overflow-hidden group">
            <img 
              alt="Professional Financial Focus" 
              className="w-full h-[400px] object-cover grayscale hover:grayscale-0 transition-all duration-700" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuChJhpkG3fM0YkjB1qtoBFBtH6KZ4z9rkMfIeANJGeaD67hiM5Fk5Nk3Q-yXDR5K2U1CNgKpqPxbWq-sBTVCD-zwIFI38sr39sslcA-urLBtGACqV2mVJYe2cDPwhCuBdCmjpcljyO0rZOFWfPkwJVHiWIljmiVJ-4EmGNmBV9zacRGzdIAG9VzHFJwfumjlMu6fwxwHytzbMjCoDD2_nH8QO3OB-DlGV3mhVcKq4qVf8S3oC_BlWhSPSYjOga1jV4XfrN0qbTo5rM"
              referrerPolicy="no-referrer"
            />
            <div className="bg-primary p-8 text-white">
              <h3 className="font-headline text-2xl text-secondary mb-4 uppercase font-bold tracking-tight">Our Priority Services</h3>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 border-b border-white/10 pb-3 font-medium">
                  <CheckCircle2 className="w-5 h-5 text-secondary" /> Instant Disbursement
                </li>
                <li className="flex items-center gap-3 border-b border-white/10 pb-3 font-medium">
                  <CheckCircle2 className="w-5 h-5 text-secondary" /> Flexible Terms
                </li>
                <li className="flex items-center gap-3 pb-1 font-medium">
                  <CheckCircle2 className="w-5 h-5 text-secondary" /> No Collateral Required
                </li>
              </ul>
            </div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="absolute -bottom-10 -left-10 bg-white p-6 shadow-xl border border-surface-200 hidden lg:block"
          >
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Response Time</p>
            <p className="font-headline text-4xl font-black text-primary">02:45 <span className="text-xs">MIN</span></p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
