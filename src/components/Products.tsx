import { motion } from "motion/react";
import { Banknote, Shield, Store, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

const products = [
  {
    title: "Salary Loan",
    description: "Fast credit for salaried employees with competitive interest rates and easy payroll deductions.",
    icon: Banknote,
    features: ["Competitive Funding", "Up to 24 Months Tenor"],
    variant: "dark",
    image: "/images/salary-loan-texture.webp"
  },
  {
    title: "Unsecured",
    description: "Quick personal and business funding without the need for traditional collateral or security.",
    icon: Shield,
    features: ["No Title Deeds Required", "48-Hour Processing"],
    variant: "primary",
    image: "/images/unsecured-loan-texture.webp"
  },
  {
    title: "Agency Banking",
    description: "Full suite of banking services through our licensed agents (deposits/withdrawals). We do not provide float financing.",
    icon: Store,
    features: ["Transactional Support", "Digital Integration"],
    variant: "light",
    image: null
  }
];

export default function Products() {
  return (
    <section className="bg-surface-900 py-32 relative overflow-hidden" id="products">
      <div className="absolute inset-0 architectural-grid opacity-10"></div>
      <div className="container mx-auto px-8 text-center mb-24 relative z-10">
        <p className="text-secondary font-bold uppercase tracking-[0.4em] mb-6">Financial Instruments</p>
        <h2 className="font-headline text-6xl md:text-7xl text-white font-black uppercase tracking-tighter">
          OUR LOAN PRODUCTS
        </h2>
        <div className="w-24 h-2 bg-secondary mx-auto mt-8"></div>
      </div>
      
      <div className="container mx-auto px-8 grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
        {products.map((product, index) => (
          <motion.div
            key={product.title}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className={`
              p-12 border flex flex-col justify-between items-center text-center transition-all duration-500 relative group overflow-hidden
              ${product.variant === 'dark' ? 'bg-accent border-white/10 hover:border-secondary' : ''}
              ${product.variant === 'primary' ? 'bg-white/10 border-white/20 hover:border-secondary' : ''}
              ${product.variant === 'light' ? 'bg-white border-transparent hover:border-secondary shadow-2xl' : ''}
            `}
          >
            {product.image && (
              <div className={`absolute inset-0 opacity-10 grayscale ${product.variant === 'primary' ? 'brightness-200' : 'group-hover:opacity-20'} transition-all`}>
                <img
                  alt=""
                  aria-hidden="true"
                  className="w-full h-full object-cover"
                  src={product.image}
                  width={512}
                  height={512}
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                />
              </div>
            )}
            
            <div className="relative z-10">
              <product.icon className={`w-16 h-16 mb-8 mx-auto ${product.variant === 'light' ? 'text-primary' : 'text-secondary'}`} />
              <h3 className={`font-headline text-4xl font-bold uppercase mb-4 tracking-tight ${product.variant === 'light' ? 'text-slate-950' : 'text-white'}`}>
                {product.title}
              </h3>
              <p className={`mb-10 leading-relaxed ${product.variant === 'light' ? 'text-slate-500' : product.variant === 'primary' ? 'text-white/80' : 'text-white/60'}`}>
                {product.description}
              </p>
              <ul className={`text-left space-y-4 mb-12 text-sm font-bold ${product.variant === 'light' ? 'text-slate-700' : 'text-white/80'}`}>
                {product.features.map(feature => (
                  <li key={feature} className="flex items-center gap-3">
                    <CheckCircle2 className={`w-5 h-5 ${product.variant === 'light' ? 'text-primary' : 'text-secondary'}`} />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            
            <Link to="/apply" className="w-full">
              <button className={`
                w-full font-headline font-bold py-5 uppercase tracking-widest transition-all relative z-10 rounded-sm
                ${product.variant === 'dark' ? 'bg-secondary text-primary hover:bg-white' : ''}
                ${product.variant === 'primary' ? 'bg-white text-primary hover:bg-secondary hover:text-slate-950' : ''}
                ${product.variant === 'light' ? 'bg-primary text-white hover:bg-slate-950' : ''}
              `}>
                Select Protocol
              </button>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
