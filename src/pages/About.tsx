import { motion } from "motion/react";
import { Shield, Users, Heart, Anchor, Target, Eye } from "lucide-react";

const values = [
  { icon: Shield, title: "Integrity", description: "We do what we say. All loan terms, interest rates, and fees are disclosed honestly and in full." },
  { icon: Users, title: "Teamwork", description: "Our strength lies in the collective effort of our people working together to deliver the best service." },
  { icon: Heart, title: "Loyalty", description: "We are loyal to our clients, our colleagues, and the communities we serve." },
  { icon: Anchor, title: "Guard Against Arrogance", description: "We remain humble, grounded, and open to learning, respecting every client's circumstances." },
  { icon: Target, title: "Serve the Customer", description: "The client is at the centre of everything we do. We design our products around your needs." },
  { icon: Eye, title: "Delivering Value", description: "We aim to be the financial partner our clients turn to first by delivering real value." },
];

export default function About() {
  return (
    <div className="pt-20">
      <section className="bg-primary py-24 text-white relative overflow-hidden">
        <div className="absolute inset-0 architectural-grid opacity-10"></div>
        <div className="container mx-auto px-8 relative z-10">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-secondary font-bold uppercase tracking-widest mb-4"
          >
            Who We Are
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-headline text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-8"
          >
            OVER A DECADE OF <br />TRUSTED SERVICE.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl text-lg text-white/80 font-medium"
          >
            Clarks Financials Limited is a licensed Ugandan Microfinance institution, fully regulated by UMRA. 
            Incorporated in 2012, we provide accessible, fast, and transparent financial services.
          </motion.p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="font-headline text-5xl font-black text-slate-950 uppercase mb-8">Our Story</h2>
            <div className="space-y-6 text-slate-600 font-medium leading-relaxed">
              <p>
                Since our incorporation in 2012, Clarks Financials Limited has been committed to one purpose: 
                making financial services accessible, fast, and transparent for every Ugandan we serve.
              </p>
              <p>
                We offer affordable loan products and financial services in today's fast-moving environment, 
                where time and simplicity matter most. Our experienced team processes applications and 
                disburses approved funds within 24hrs.
              </p>
              <p>
                We operate from two locations in Kampala — our Head Office on Kampala Road and our Branch at Kireka.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-surface-50 p-10 border-t-4 border-primary">
              <Target className="w-12 h-12 text-primary mb-6" />
              <h3 className="font-headline text-2xl font-bold text-slate-950 uppercase mb-4">Mission</h3>
              <p className="text-slate-500 text-sm">To grow into a one-stop centre for all financial needs.</p>
            </div>
            <div className="bg-surface-50 p-10 border-t-4 border-secondary">
              <Eye className="w-12 h-12 text-secondary mb-6" />
              <h3 className="font-headline text-2xl font-bold text-slate-950 uppercase mb-4">Vision</h3>
              <p className="text-slate-500 text-sm">Building the best financial institution in Uganda.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-surface-100">
        <div className="container mx-auto px-8">
          <div className="text-center mb-16">
            <p className="text-primary font-bold uppercase tracking-widest mb-4">Our Core Values</p>
            <h2 className="font-headline text-5xl font-black text-slate-950 uppercase">What Defines Us</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div 
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-10 border border-surface-200 hover:border-primary transition-all group"
              >
                <value.icon className="w-10 h-10 text-primary mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="font-headline text-xl font-bold text-slate-950 uppercase mb-4">{value.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
