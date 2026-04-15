import { motion } from "motion/react";
import { ArrowRight, Banknote, Receipt, Landmark, Smartphone } from "lucide-react";

const services = [
  {
    id: "01",
    title: "Money Lending",
    description: "Fast-tracked salary loans from UGX 200,000 to UGX 15,000,000 over 1 to 24 months. Decisions within 24 hours.",
    icon: Banknote,
  },
  {
    id: "02",
    title: "Utility Bill Payments",
    description: "Pay your electricity, water, pay TV, airtime, and other utility bills quickly and conveniently.",
    icon: Receipt,
  },
  {
    id: "03",
    title: "Agency Banking",
    description: "Access full banking services through our licensed agents. Deposits, withdrawals, and transfers.",
    icon: Landmark,
  },
  {
    id: "04",
    title: "Mobile Money",
    description: "Loan disbursements and repayments processed via MTN MoMo and Airtel Money directly from your phone.",
    icon: Smartphone,
  },
];

export default function Services() {
  return (
    <section className="bg-surface-100 py-32" id="services">
      <div className="container mx-auto px-8 mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-primary font-bold uppercase tracking-widest mb-4">What We Offer</p>
          <h2 className="font-headline text-6xl md:text-8xl text-slate-950 font-black text-kern-tight leading-none">
            YOUR ONE-STOP<br />CENTRE.
          </h2>
        </motion.div>
        <motion.p 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="max-w-xs text-slate-500 font-medium"
        >
          From salary loans to utility bill payments, agency banking, and mobile money — we bring every financial service you need under one roof.
        </motion.p>
      </div>
      
      <div className="container mx-auto px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((service, index) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group bg-white p-10 h-[420px] border border-surface-200 flex flex-col justify-between hover:border-primary transition-all duration-500 relative overflow-hidden"
          >
            <div className="text-primary/10 font-headline text-8xl font-black absolute -top-4 -right-4 group-hover:text-primary/20 transition-all">
              {service.id}
            </div>
            <div className="relative z-10">
              <service.icon className="w-10 h-10 text-primary mb-6" />
              <h3 className="font-headline text-3xl text-slate-950 mb-4 font-bold uppercase tracking-tight">
                {service.title}
              </h3>
              <p className="text-slate-500">
                {service.description}
              </p>
            </div>
            <button className="flex items-center gap-2 text-primary font-bold uppercase text-xs tracking-widest group-hover:gap-4 transition-all">
              Explore Protocol <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
