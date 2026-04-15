import { motion } from "motion/react";
import { Scale, ShieldCheck, FileText, Landmark } from "lucide-react";

export default function Regulatory() {
  return (
    <div className="pt-20">
      <section className="bg-surface-900 py-24 text-white relative overflow-hidden">
        <div className="absolute inset-0 architectural-grid opacity-10"></div>
        <div className="container mx-auto px-8 relative z-10">
          <p className="text-primary font-bold uppercase tracking-widest mb-4">Legal Framework</p>
          <h1 className="font-headline text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-8">
            LICENSED. <br /><span className="text-primary">REGULATED.</span> TRUSTED.
          </h1>
          <p className="max-w-2xl text-lg text-white/60 font-medium">
            Clarks Financials Limited operates under the full oversight of the Uganda Microfinance Regulatory Authority (UMRA).
          </p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div className="space-y-12">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <Landmark className="w-10 h-10 text-primary" />
                <h2 className="font-headline text-3xl font-black text-slate-950 uppercase">Our Regulator — UMRA</h2>
              </div>
              <p className="text-slate-600 font-medium leading-relaxed mb-6">
                UMRA is the government regulatory agency established under Section 6 of the Tier 4 Microfinance Institutions and Money Lenders Act, 2016. 
                It is mandated to license, supervise, and regulate all Tier 4 microfinance institutions and money lenders in Uganda.
              </p>
              <div className="bg-surface-50 p-6 border border-surface-200">
                <p className="text-sm font-bold text-slate-950 mb-2">UMRA Contact Info:</p>
                <p className="text-sm text-slate-500">Website: www.umra.go.ug</p>
                <p className="text-sm text-slate-500">Postal: P.O. Box 6707, Kampala, Uganda</p>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-4 mb-6">
                <Scale className="w-10 h-10 text-primary" />
                <h2 className="font-headline text-3xl font-black text-slate-950 uppercase">Governing Law</h2>
              </div>
              <ul className="space-y-4 text-slate-600 font-medium list-disc pl-6">
                <li>All money lenders must be licensed by UMRA.</li>
                <li>Compound interest is prohibited on all loan products.</li>
                <li>A written loan agreement must be provided to every borrower.</li>
                <li>Interest rates and charges must be displayed at all times.</li>
                <li>Licences are renewed annually.</li>
              </ul>
            </div>
          </div>

          <div className="bg-primary p-12 text-white">
            <h3 className="font-headline text-3xl font-black uppercase mb-10">Borrower Rights</h3>
            <div className="space-y-8">
              <div className="flex gap-6">
                <FileText className="w-8 h-8 text-secondary shrink-0" />
                <div>
                  <p className="font-bold uppercase tracking-tight mb-2">Right to a Written Agreement</p>
                  <p className="text-sm text-white/70">You are entitled to receive a written copy of your loan agreement before any funds are disbursed.</p>
                </div>
              </div>
              <div className="flex gap-6">
                <ShieldCheck className="w-8 h-8 text-secondary shrink-0" />
                <div>
                  <p className="font-bold uppercase tracking-tight mb-2">Protection from Unlawful Collateral</p>
                  <p className="text-sm text-white/70">We are legally prohibited from holding your National ID, passport, or ATM card as collateral.</p>
                </div>
              </div>
              <div className="flex gap-6">
                <Scale className="w-8 h-8 text-secondary shrink-0" />
                <div>
                  <p className="font-bold uppercase tracking-tight mb-2">Protection from Excessive Penalties</p>
                  <p className="text-sm text-white/70">Late payment penalties cannot exceed 50% of the total outstanding loan principal.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
