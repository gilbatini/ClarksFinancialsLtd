import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    category: "Eligibility",
    questions: [
      { q: "Who can apply?", a: "Ugandan nationals or residents aged 18+, permanently employed by a legally registered organisation, earning a minimum of UGX 100,000 per month." },
      { q: "Can I apply if I am on probation?", a: "No. We do not provide loans to employees currently serving a probationary period." },
      { q: "Do I need guarantors?", a: "Yes. Two guarantors are required. If the applicant is not a permanent resident, at least one guarantor must be a permanent resident." },
    ]
  },
  {
    category: "Loan Details",
    questions: [
      { q: "How much can I borrow?", a: "UGX 200,000 minimum to UGX 20,000,000 maximum, subject to your salary and creditworthiness. Your monthly instalment cannot exceed 50% of your net salary." },
      { q: "How long is the loan term?", a: "1 month minimum to 24 months maximum." },
      { q: "Is collateral required?", a: "For loans up to UGX 2,000,000 — no security required. For loans above UGX 2,000,000 — security is required: car logbook, land title, or land sales agreement." },
    ]
  },
  {
    category: "Repayment & Other Services",
    questions: [
      { q: "How do I repay my loan?", a: "Monthly — paid directly to the Clarks Financials bank account. Also accepted via MTN Mobile Money or Airtel Money." },
      { q: "What if I miss a payment?", a: "Contact us immediately to discuss repayment options and avoid additional costs." },
      { q: "Do you offer float financing for agents?", a: "No. Our Agency Banking service is strictly for transactional support (deposits and withdrawals). We do not provide float financing." },
    ]
  }
];

function FAQItem({ q, a }: { q: string, a: string, key?: string | number }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-surface-200">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex justify-between items-center text-left hover:text-primary transition-colors"
      >
        <span className="font-bold text-slate-950">{q}</span>
        {isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-slate-500 font-medium leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQs() {
  return (
    <div className="pt-20">
      <section className="bg-primary py-24 text-white relative overflow-hidden">
        <div className="absolute inset-0 architectural-grid opacity-10"></div>
        <div className="container mx-auto px-8 relative z-10 text-center">
          <p className="text-secondary font-bold uppercase tracking-widest mb-4">Support Center</p>
          <h1 className="font-headline text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-8">
            YOUR QUESTIONS, <br />ANSWERED.
          </h1>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-8 max-w-4xl">
          {faqs.map((category, idx) => (
            <div key={idx} className="mb-16">
              <h2 className="font-headline text-2xl font-black text-primary uppercase mb-8 border-b-2 border-primary inline-block pb-2">
                {category.category}
              </h2>
              <div className="space-y-2">
                {category.questions.map((item, qIdx) => {
                  return <FAQItem key={`${idx}-${qIdx}`} q={item.q} a={item.a} />;
                })}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
