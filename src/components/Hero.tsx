import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import Link from "./SiteLink";

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center overflow-hidden border-b border-surface-200 pt-32 lg:pt-20" id="home">
      <div className="absolute inset-0 architectural-grid opacity-40"></div>
      <div className="container mx-auto px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-7 py-12 lg:py-20">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-sm mb-6">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Loan Information · Kampala, Uganda</span>
          </div>
          <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl leading-[0.9] text-slate-950 font-black text-kern-tight mb-8 uppercase">
            SALARY LOAN<br /><span className="text-primary italic">INFORMATION.</span>
          </h1>
          <p className="text-slate-600 text-lg mb-10 max-w-2xl font-medium leading-relaxed">
            Review the salaried employee loan process, document categories, and questions to discuss before contacting the team.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/apply">
              <button
                className="bg-secondary text-slate-950 font-headline font-bold px-10 py-5 rounded-default text-lg tracking-widest uppercase hover:bg-white transition-all flex items-center gap-3 shadow-lg"
              >
                Apply for a Loan <ArrowUpRight className="w-6 h-6" />
              </button>
            </Link>
            <Link to="/loans">
              <button
                className="border-2 border-primary text-primary font-headline font-bold px-10 py-5 rounded-default text-lg tracking-widest uppercase hover:bg-primary hover:text-white transition-all"
              >
                View Our Products
              </button>
            </Link>
          </div>
        </div>
        
        <div className="lg:col-span-5 relative">
          <div className="bg-primary p-1 rounded-default shadow-2xl overflow-hidden group">
            <img 
              alt="Stacks of Ugandan shilling banknotes"
              className="w-full h-[400px] object-cover grayscale hover:grayscale-0 transition-all duration-700" 
              src="/images/hero-team.webp"
              width={512}
              height={512}
              loading="eager"
              fetchPriority="high"
              decoding="async"
              referrerPolicy="no-referrer"
            />
            <div className="bg-primary p-8 text-white">
              <h2 className="font-headline text-2xl text-secondary mb-4 uppercase font-bold tracking-tight">Our Priority Services</h2>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 border-b border-white/10 pb-3 font-medium">
                  <CheckCircle2 className="w-5 h-5 text-secondary" /> Application Review
                </li>
                <li className="flex items-center gap-3 border-b border-white/10 pb-3 font-medium">
                  <CheckCircle2 className="w-5 h-5 text-secondary" /> Term Information
                </li>
                <li className="flex items-center gap-3 pb-1 font-medium">
                  <CheckCircle2 className="w-5 h-5 text-secondary" /> Security Requirements
                </li>
              </ul>
            </div>
          </div>
          
          <div
            className="absolute top-1/3 -left-12 bg-white p-6 shadow-2xl border border-surface-200 hidden lg:block z-30"
          >
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Need Help?</p>
            <p className="font-headline text-4xl font-black text-primary">CONTACT</p>
          </div>
        </div>
      </div>
    </section>
  );
}
