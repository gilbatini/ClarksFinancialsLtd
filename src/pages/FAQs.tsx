import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { faqCategories } from "../content/faqs.mjs";

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
      {isOpen && (
        <div className="overflow-hidden">
          <p className="pb-6 text-slate-500 font-medium leading-relaxed">{a}</p>
        </div>
      )}
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

      <section className="py-24 bg-white deferred-section">
        <div className="container mx-auto px-8 max-w-4xl">
          {faqCategories.map((category, idx) => (
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
