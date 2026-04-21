import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MapPin, Clock } from "lucide-react";

export default function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <section className="bg-white py-32" id="contact">
      <div className="container mx-auto px-8 grid grid-cols-1 lg:grid-cols-12 gap-20">
        <div className="lg:col-span-5">
          <p className="text-primary font-bold uppercase tracking-widest mb-4">Global Presence</p>
          <h2 className="font-headline text-6xl md:text-7xl text-slate-950 uppercase leading-[0.9] mb-16 tracking-tighter font-black">
            CONTACT<br /><span className="text-primary italic">HQ OFFICE.</span>
          </h2>
          
          <div className="space-y-12">
            <div className="flex gap-8 group">
              <div className="w-14 h-14 bg-surface-50 flex items-center justify-center border border-surface-200 group-hover:border-primary transition-all shrink-0">
                <MapPin className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h4 className="text-slate-950 font-headline text-2xl uppercase font-bold mb-2">Head Office</h4>
                <p className="text-slate-500 font-medium">Ambassador House, 2nd Floor<br />Kampala Road, Kampala, Uganda</p>
              </div>
            </div>
            
            <div className="flex gap-8 group">
              <div className="w-14 h-14 bg-surface-50 flex items-center justify-center border border-surface-200 group-hover:border-primary transition-all shrink-0">
                <Clock className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h4 className="text-slate-950 font-headline text-2xl uppercase font-bold mb-2">Operation Hours</h4>
                <p className="text-slate-500 font-medium">Monday - Friday: 08:00 — 17:00<br />Saturday: 09:00 — 13:00</p>
              </div>
            </div>
          </div>
          
          <div className="mt-20 border-2 border-primary grayscale hover:grayscale-0 transition-all duration-700 h-64 overflow-hidden rounded-sm shadow-xl">
            <img 
              className="w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCJd-VUQd_hHCOmgPvW4fl6szpA0tK5yJiUnYGpg08-5sFONg0UqJukxVG4KoLJ-xNrHcWAMogWz5YK590dgDc1WP9bXVTRulvo0xjVIwA3CkiMuqpfLlqqI7pcbtgfxka38Ywk5ny_SDs5S9PugMViKj3Zmdhbpzbsn9rWlVwzMiShMZokLfYl57-3Khk4BePWZOFXtFq_fi9WcL3DqS6AQ61yW1JNhxfg6AU3tvmJGFVXQMGCD1rkOje5Vx6jQF8KXIaM-4QRSgY" 
              alt="HQ Office"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
        
        <div className="lg:col-span-7">
          <div className="p-12 border relative bg-white/40 backdrop-blur-xl border-white/30 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)]">
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 clip-logo -m-4"></div>
            <h3 className="font-headline text-3xl font-black text-slate-950 uppercase mb-8 border-b border-surface-200 pb-4">
              Application Protocol
            </h3>
            
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest mb-2 text-slate-600">Full Legal Name</label>
                  <input className="w-full bg-white border border-surface-200 focus:border-primary focus:ring-0 p-4 text-slate-900 placeholder:text-slate-300 font-medium transition-all" required type="text" />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest mb-2 text-slate-600">Phone Number</label>
                  <input className="w-full bg-white border border-surface-200 focus:border-primary focus:ring-0 p-4 text-slate-900 font-medium transition-all" placeholder="+256..." required type="tel" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest mb-2 text-slate-600">National ID (NIN)</label>
                  <input className="w-full bg-white border border-surface-200 focus:border-primary focus:ring-0 p-4 text-slate-900 font-medium transition-all" required type="text" />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest mb-2 text-slate-600">Employment Status</label>
                  <select className="w-full bg-white border border-surface-200 focus:border-primary focus:ring-0 p-4 text-slate-900 font-medium transition-all appearance-none">
                    <option>Permanent</option>
                    <option>Contract</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest mb-2 text-slate-600">Employer Name & Address</label>
                <input className="w-full bg-white border border-surface-200 focus:border-primary focus:ring-0 p-4 text-slate-900 font-medium transition-all" required type="text" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest mb-2 text-slate-600">Net Salary (UGX)</label>
                  <input className="w-full bg-white border border-surface-200 focus:border-primary focus:ring-0 p-4 text-slate-900 font-medium transition-all" placeholder="0.00" required type="number" />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest mb-2 text-slate-600">Loan Amount (UGX)</label>
                  <input className="w-full bg-white border border-surface-200 focus:border-primary focus:ring-0 p-4 text-slate-900 font-medium transition-all" placeholder="0.00" required type="number" />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest mb-2 text-slate-600">Term (Months)</label>
                  <input className="w-full bg-white border border-surface-200 focus:border-primary focus:ring-0 p-4 text-slate-900 font-medium transition-all" placeholder="1-24" required type="number" />
                </div>
              </div>
              
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest mb-2 text-slate-600">Loan Purpose</label>
                <textarea className="w-full bg-white border border-surface-200 focus:border-primary focus:ring-0 p-4 text-slate-900 font-medium transition-all" rows={2}></textarea>
              </div>
              
              <button className="w-full bg-primary text-white font-headline font-black py-6 uppercase tracking-widest text-lg hover:bg-secondary hover:text-primary transition-all shadow-xl" type="submit">
                Submit Application Protocol
              </button>
              
              <AnimatePresence>
                {isSubmitted && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="text-center bg-secondary/20 border border-secondary p-4 text-slate-950 font-black uppercase text-xs tracking-widest"
                  >
                    Protocol Initialized Successfully
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
