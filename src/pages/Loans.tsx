import { lazy, Suspense } from "react";
import { CheckCircle2, AlertTriangle, Info } from "lucide-react";
const Products = lazy(() => import("../components/Products"));

export default function Loans() {
  return (
    <div className="pt-20">
      <section className="bg-primary py-24 text-white relative overflow-hidden">
        <div className="absolute inset-0 architectural-grid opacity-10"></div>
        <div className="container mx-auto px-8 relative z-10">
          <p className="text-secondary font-bold uppercase tracking-widest mb-4">Financial Instruments</p>
          <h1 className="font-headline text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-8">
            SALARY LOAN <br /><span className="text-secondary italic">INFORMATION.</span>
          </h1>
          <p className="max-w-2xl text-lg text-white/70 font-medium">
            Review the Salaried Employee Loan requirements, security, terms, and borrower disclosures before applying.
          </p>
        </div>
      </section>

      <Suspense fallback={<div className="min-h-screen bg-surface-900" aria-hidden="true" />}>
        <Products />
      </Suspense>

      <section className="py-24 bg-white deferred-section">
        <div className="container mx-auto px-8">
          <div className="bg-surface-50 p-12 border-l-8 border-primary mb-16">
            <div className="flex items-start gap-6">
              <Info className="w-10 h-10 text-primary shrink-0" />
              <div>
                <h3 className="font-headline text-2xl font-bold text-slate-950 uppercase mb-4">Salaried Employee Loan Information</h3>
                <p className="text-slate-600 font-medium mb-8">Specific amounts, available terms, review times, and security requirements must be confirmed with the team before applying.</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  <div className="space-y-2">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Amount</p>
                    <p className="font-headline text-xl font-bold text-slate-950">Confirm with team</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Loan Term</p>
                    <p className="font-headline text-xl font-bold text-slate-950">Confirm before signing</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Review Timeline</p>
                    <p className="font-headline text-xl font-bold text-primary">Varies by review</p>
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
                    <p className="font-bold text-slate-950">Requirement categories</p>
                    <p className="text-sm text-slate-500">Ask which security documents, if any, apply to your enquiry.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <CheckCircle2 className="w-6 h-6 text-primary shrink-0" />
                  <div>
                    <p className="font-bold text-slate-950">Confirmation before submission</p>
                    <p className="text-sm text-slate-500">Do not submit an original document until the team confirms the requirement and approved process.</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-primary p-10 text-white relative overflow-hidden">
              <div className="absolute inset-0 architectural-grid opacity-10"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-8">
                  <AlertTriangle className="w-8 h-8 text-secondary" />
                  <h4 className="font-headline text-xl font-bold uppercase">Eligibility Questions</h4>
                </div>
                <ul className="space-y-4 text-sm text-white/80">
                  <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-secondary" /> Employment status</li>
                  <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-secondary" /> Residency or citizenship criteria</li>
                  <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-secondary" /> Age requirements</li>
                  <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-secondary" /> Income and affordability review</li>
                  <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-secondary" /> Whether guarantors are requested</li>
                  <li className="pt-4 text-secondary font-bold uppercase tracking-widest text-[10px]">Confirm how probationary employment is assessed.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-surface-100 deferred-section">
        <div className="container mx-auto px-8">
          <div className="bg-primary p-12 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 clip-logo -m-12"></div>
            <h3 className="font-headline text-3xl font-black uppercase mb-8">Borrower Disclosure Notice</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-white/80">
              <p>• Ask for all rates, charges, and repayment obligations in writing before signing.</p>
              <p>• Review the interest calculation method and total repayment amount in the agreement.</p>
              <p>• Obtain and retain a signed copy of every agreement before accepting funds.</p>
              <p>• Never provide a password, PIN, or mobile-money authorization code.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
