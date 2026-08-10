import { lazy, Suspense } from "react";
import HowItWorks from "../components/HowItWorks";
import { FileText, UserCheck, ShieldCheck, Users, MapPin } from "lucide-react";
const Contact = lazy(() => import("../components/Contact"));

const requirements = [
  { icon: FileText, text: "Identification details" },
  { icon: UserCheck, text: "Employment details" },
  { icon: FileText, text: "Recent income records" },
  { icon: FileText, text: "Banking information" },
  { icon: ShieldCheck, text: "Any requested security documents" },
  { icon: UserCheck, text: "Current contact information" },
  { icon: Users, text: "Guarantor details, if requested" },
  { icon: MapPin, text: "Address confirmation, if requested" },
];

export default function Apply() {
  return (
    <div className="pt-20">
      <section className="bg-primary py-24 text-white relative overflow-hidden">
        <div className="absolute inset-0 architectural-grid opacity-10"></div>
        <div className="container mx-auto px-8 relative z-10">
          <p className="text-secondary font-bold uppercase tracking-widest mb-4">Application Protocol</p>
          <h1 className="font-headline text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-8">
            APPLICATION <br /><span className="text-secondary">GUIDANCE.</span>
          </h1>
          <p className="max-w-2xl text-lg text-white/80 font-medium">
            Prepare the required document package before contacting the team so your application can be reviewed.
          </p>
        </div>
      </section>

      <HowItWorks />

      <section className="py-24 bg-surface-50 deferred-section">
        <div className="container mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="font-headline text-4xl font-black text-slate-950 uppercase mb-4">Documents to Discuss</h2>
            <p className="text-slate-500 font-medium">Confirm the current document list with the team before sharing personal information.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {requirements.map((req, index) => (
              <div
                key={index}
                className="bg-white p-6 border border-surface-200 flex items-center gap-4"
              >
                <req.icon className="w-6 h-6 text-primary shrink-0" />
                <span className="text-sm font-bold text-slate-700">{req.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Suspense fallback={<div className="min-h-screen bg-white" aria-hidden="true" />}>
        <Contact />
      </Suspense>
    </div>
  );
}
