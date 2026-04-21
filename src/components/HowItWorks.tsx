import { motion } from "motion/react";
import { Quote } from "lucide-react";

const steps = [
  { id: "01", title: "Apply", description: "Complete our simple application form online or in-branch. Takes under five minutes." },
  { id: "02", title: "Submit Documents", description: "Provide your National ID, payslips, bank statement, and guarantors." },
  { id: "03", title: "Instant Approval", description: "Our credit team delivers a decision within hours of receiving your full document package." },
  { id: "04", title: "Same Day Funds", description: "Money out the same day in most cases. Funds deposited directly to your bank account." },
];

export default function HowItWorks() {
  return (
    <section className="bg-white py-32 border-b border-surface-200" id="how-it-works">
      <div className="container mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-headline text-7xl text-slate-950 mb-10 uppercase tracking-tighter leading-[0.9] font-black">
            THE PATH TO <br /><span className="text-primary italic">PROSPERITY.</span>
          </h2>
          <p className="text-slate-600 text-lg max-w-md mb-12 font-medium">
            Our streamlined architectural process removes the friction from traditional banking. We focus on your future potential.
          </p>
          
          <div className="bg-surface-50 p-10 border-l-4 border-primary relative">
            <Quote className="absolute -top-6 left-6 w-12 h-12 text-primary/20" />
            <p className="italic text-slate-700 text-lg font-medium leading-relaxed">
              "Clarks Financials provided the funds I needed in less than two days. Their team is professional and transparent in a way others aren't."
            </p>
            <div className="mt-6 flex items-center gap-4">
              <div className="w-10 h-10 bg-slate-200 rounded-full"></div>
              <div>
                <p className="font-bold text-slate-950 uppercase text-sm tracking-widest">James K.</p>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Tech Entrepreneur</p>
              </div>
            </div>
          </div>
        </motion.div>
        
        <div className="space-y-6">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group bg-surface-50 p-8 flex gap-8 items-center border border-transparent hover:border-primary hover:bg-white transition-all duration-300"
            >
              <div className="bg-primary text-white font-headline text-3xl p-4 w-16 h-16 flex items-center justify-center shrink-0 font-black">
                {step.id}
              </div>
              <div>
                <h4 className="font-headline text-2xl text-slate-950 uppercase font-bold tracking-tight mb-1">
                  {step.title}
                </h4>
                <p className="text-slate-500 text-sm">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
