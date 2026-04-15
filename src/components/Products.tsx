import { motion } from "motion/react";
import { Banknote, Shield, Store, CheckCircle2 } from "lucide-react";

const products = [
  {
    title: "Salary Loan",
    description: "Fast credit for salaried employees with competitive interest rates and easy payroll deductions.",
    icon: Banknote,
    features: ["Max UGX 20,000,000", "Up to 24 Months Tenor"],
    variant: "dark",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDIC4DLSQ5WkExY4GoSKagIDrX6nb1UzIUxxK297OSlg_TIseqoMRckC_Ed25VIP-cPnho70n_vfoDv-18x9egUFtHvvquFjD8juMkXn4TdHYFIupWRWuRoiCT1h4H8cJoSs8Ug6V6NBzuw4HfU7-P2R6EPmCXgyREixnZHTKoY8FB21NalRo8wEeBazQKWhc-eSkyxXrnbA1Aa2l45hi5RaHbEegNTHO5TlYJQmvOFCueDODiBM6fJk3X546LY0OCWEMcvTS6ap5c"
  },
  {
    title: "Unsecured",
    description: "Quick personal and business funding without the need for traditional collateral or security.",
    icon: Shield,
    features: ["No Title Deeds Required", "48-Hour Processing"],
    variant: "primary",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDuo43h8nUEyjqe8UyzX3y9pyofLa_n2wDUsEuvlPZFVBCCulVbnu287FdPw_ohisATBYTB-n99tivaEjkOdZxvfx22h-cKzlvOwyxtnMRT-TQuDHS7RIv_SfdX7Yjm1-OaiBgLLwXYdNq9JkehGurwgkS4YH5Xo4pCe7yGu-nn7083assgCRgyFZlrEOgCVbz90ogXETvguXX8H3AptyLhvEbHXTSAzXgXCtcaGqbSmeQ_UFdhbABgTamq2HJ0wXt08Jh5HsSTBtU"
  },
  {
    title: "Agency Banking",
    description: "Specialized credit solutions for banking agents to manage daily float and liquid demands.",
    icon: Store,
    features: ["Daily Float Financing", "Weekend Support"],
    variant: "light",
    image: null
  }
];

export default function Products() {
  return (
    <section className="bg-slate-950 py-32" id="products">
      <div className="container mx-auto px-8 text-center mb-24">
        <p className="text-secondary font-bold uppercase tracking-[0.4em] mb-6">Financial Instruments</p>
        <h2 className="font-headline text-6xl md:text-7xl text-white font-black uppercase tracking-tighter">
          OUR LOAN PRODUCTS
        </h2>
        <div className="w-24 h-2 bg-secondary mx-auto mt-8"></div>
      </div>
      
      <div className="container mx-auto px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        {products.map((product, index) => (
          <motion.div
            key={product.title}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className={`
              p-12 border flex flex-col justify-between items-center text-center transition-all duration-500 relative group overflow-hidden
              ${product.variant === 'dark' ? 'bg-slate-900 border-slate-800 hover:border-primary' : ''}
              ${product.variant === 'primary' ? 'bg-primary border-primary' : ''}
              ${product.variant === 'light' ? 'bg-white border-transparent hover:border-primary' : ''}
            `}
          >
            {product.image && (
              <div className={`absolute inset-0 opacity-10 grayscale ${product.variant === 'primary' ? 'brightness-200' : 'group-hover:opacity-20'} transition-all`}>
                <img alt="Finance Texture" className="w-full h-full object-cover" src={product.image} referrerPolicy="no-referrer" />
              </div>
            )}
            
            <div className="relative z-10">
              <product.icon className={`w-16 h-16 mb-8 mx-auto ${product.variant === 'light' ? 'text-primary' : 'text-secondary'}`} />
              <h3 className={`font-headline text-4xl font-bold uppercase mb-4 tracking-tight ${product.variant === 'light' ? 'text-slate-950' : 'text-white'}`}>
                {product.title}
              </h3>
              <p className={`mb-10 leading-relaxed ${product.variant === 'light' ? 'text-slate-500' : product.variant === 'primary' ? 'text-white/80' : 'text-slate-400'}`}>
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
            
            <button className={`
              w-full font-headline font-bold py-5 uppercase tracking-widest transition-all relative z-10 rounded-sm
              ${product.variant === 'dark' ? 'bg-primary text-white hover:bg-white hover:text-primary' : ''}
              ${product.variant === 'primary' ? 'bg-white text-primary hover:bg-secondary hover:text-slate-950' : ''}
              ${product.variant === 'light' ? 'bg-slate-950 text-white hover:bg-primary' : ''}
            `}>
              Select Protocol
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
