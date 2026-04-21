import Contact from "../components/Contact";
import HowItWorks from "../components/HowItWorks";
import { motion } from "motion/react";
import { FileText, UserCheck, ShieldCheck, Users, MapPin } from "lucide-react";

const requirements = [
  { icon: FileText, text: "Copy of National Identification Card" },
  { icon: UserCheck, text: "Employer-issued identification" },
  { icon: FileText, text: "Latest three payslips" },
  { icon: FileText, text: "Three-month bank statement" },
  { icon: ShieldCheck, text: "Appointment letter or contract" },
  { icon: UserCheck, text: "One passport-size photograph" },
  { icon: Users, text: "Two guarantors" },
  { icon: MapPin, text: "Map to residence or utility bill" },
];

export default function Apply() {
  return (
    <div className="pt-20">
      <section className="bg-primary py-24 text-white relative overflow-hidden">
        <div className="absolute inset-0 architectural-grid opacity-10"></div>
        <div className="container mx-auto px-8 relative z-10">
          <p className="text-secondary font-bold uppercase tracking-widest mb-4">Application Protocol</p>
          <h1 className="font-headline text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-8">
            24HRS <br /><span className="text-secondary">FUNDING.</span>
          </h1>
          <p className="max-w-2xl text-lg text-white/80 font-medium">
            Money out within 24hrs in most cases. Ensure you have your full document package ready for instant processing.
          </p>
        </div>
      </section>

      <HowItWorks />

      <section className="py-24 bg-surface-50">
        <div className="container mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="font-headline text-4xl font-black text-slate-950 uppercase mb-4">Documents Required</h2>
            <p className="text-slate-500 font-medium">Ensure you have these ready for a smooth application process.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {requirements.map((req, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-white p-6 border border-surface-200 flex items-center gap-4"
              >
                <req.icon className="w-6 h-6 text-primary shrink-0" />
                <span className="text-sm font-bold text-slate-700">{req.text}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Contact />
    </div>
  );
}
