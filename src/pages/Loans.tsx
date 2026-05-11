import { motion } from "motion/react";
import { CheckCircle2, AlertTriangle, Info } from "lucide-react";
import Products from "../components/Products";

export default function Loans() {
  return (
    <div className="pt-20">
      <section className="bg-primary py-24 text-white relative overflow-hidden">
        <div className="absolute inset-0 architectural-grid opacity-10"></div>
        <div className="container mx-auto px-8 relative z-10">
          <p className="text-secondary font-bold uppercase tracking-widest mb-4">Financial Instruments</p>
          <h1 className="font-headline text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-8">
            24HRS <br /><span className="text-secondary italic">SALARY LOANS.</span>
          </h1>
          <p className="max-w-2xl text-lg text-white/70 font-medium">
            Money out within 24hrs of submitting your documents. We specialize in Salaried Employee Loans with transparent terms and no hidden fees.
          </p>
        </div>
      </section>

      <Products />

      <section className="py-24 bg-white">
        <div className="container mx-auto px-8">
          <div className="bg-surface-50 p-12 border-l-8 border-primary mb-16">
            <div className="flex items-start gap-6">
              <Info className="w-10 h-10 text-primary shrink-0" />
              <div>
                <h3 className="font-headline text-2xl font-bold text-slate-950 uppercase mb-4">Salaried Employee Loan (24hrs Disbursement)</h3>
                <p className="text-slate-600 font-medium mb-8">Our flagship product. If you have your documents ready, we ensure money is out within 24hrs in most cases.</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  <div className="space-y-2">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Amount Range</p>
                    <p className="font-headline text-xl font-bold text-slate-950">Starting UGX 200,000</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Loan Term</p>
                    <p className="font-headline text-xl font-bold text-slate-950">1 — 24 Months</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Turnaround Time</p>
                    <p className="font-headline text-xl font-bold text-primary">24HRS</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-white p-10 border border-surface-200">
              <h4 className="font-headline text-xl font-bold text-slate-950 uppercase mb-8 border-b border-surface-100 pb-4">Security Requirements</h4>
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <CheckCircle2 className="w-6 h-6 text-primary shrink-0" />
                  <div>
                    <p className="font-bold text-slate-950">Up to UGX 2,000,000</p>
                    <p className="text-sm text-slate-500">No security required.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <CheckCircle2 className="w-6 h-6 text-primary shrink-0" />
                  <div>
                    <p className="font-bold text-slate-950">Above UGX 2,000,000</p>
                    <p className="text-sm text-slate-500">Security required: Car logbook, land title, or land sales agreement.</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-primary p-10 text-white relative overflow-hidden">
              <div className="absolute inset-0 architectural-grid opacity-10"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-8">
                  <AlertTriangle className="w-8 h-8 text-secondary" />
                  <h4 className="font-headline text-xl font-bold uppercase">Eligibility Constraints</h4>
                </div>
                <ul className="space-y-4 text-sm text-white/80">
                  <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-secondary" /> Permanently employed</li>
                  <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-secondary" /> Ugandan citizen or resident (last 3 years)</li>
                  <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-secondary" /> Aged 18 years or above</li>
                  <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-secondary" /> Min. monthly salary of UGX 100,000</li>
                  <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-secondary" /> Two guarantors required</li>
                  <li className="pt-4 text-secondary font-bold uppercase tracking-widest text-[10px]">⚠️ We do not provide loans to employees on probation.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-surface-100">
        <div className="container mx-auto px-8">
          <div className="bg-primary p-12 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 clip-logo -m-12"></div>
            <h3 className="font-headline text-3xl font-black uppercase mb-8">Borrower Disclosure Notice</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-white/80">
              <p>• All interest rates displayed at our premises and disclosed before signing.</p>
              <p>• Compound interest is not applied to any product.</p>
              <p>• A signed copy of your loan agreement is provided before disbursement.</p>
              <p>• We do not accept National IDs, passports, or ATM cards as collateral.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
