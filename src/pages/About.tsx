import { Shield, Users, Heart, Anchor, Target, Eye } from "lucide-react";

const values = [
  { icon: Shield, title: "Integrity", description: "We aim to communicate application steps and requested documents clearly." },
  { icon: Users, title: "Teamwork", description: "Our strength lies in the collective effort of our people working together to deliver dependable service." },
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
          <p
            className="text-secondary font-bold uppercase tracking-widest mb-4"
          >
            Who We Are
          </p>
          <h1
            className="font-headline text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-8"
          >
            LOCAL SERVICE. <br />CLEAR INFORMATION.
          </h1>
          <p
            transition={{ delay: 0.2 }}
            className="max-w-2xl text-lg text-white/80 font-medium"
          >
            Learn about Clarks Financials Limited, its customer-service approach, and the team supporting borrowers through the application process in Uganda.
          </p>
        </div>
      </section>

      <section className="py-24 bg-white deferred-section">
        <div className="container mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="font-headline text-5xl font-black text-slate-950 uppercase mb-8">Our Story</h2>
            <div className="space-y-6 text-slate-600 font-medium leading-relaxed">
              <p>
                Clarks Financials Limited provides information about loan enquiries, document preparation, and the application-review process.
              </p>
              <p>
                Applicants can contact the team to discuss available services, current requirements, and the steps that follow a completed review.
              </p>
              <p>
                For in-person support, visit the head office at Ambassador House on Kampala Road after confirming opening hours.
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
              <p className="text-slate-500 text-sm">Building a trusted financial institution in Uganda.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-surface-100 deferred-section">
        <div className="container mx-auto px-8">
          <div className="text-center mb-16">
            <p className="text-primary font-bold uppercase tracking-widest mb-4">Our Core Values</p>
            <h2 className="font-headline text-5xl font-black text-slate-950 uppercase">What Defines Us</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div
                key={value.title}
                className="bg-white p-10 border border-surface-200 hover:border-primary transition-all group"
              >
                <value.icon className="w-10 h-10 text-primary mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="font-headline text-xl font-bold text-slate-950 uppercase mb-4">{value.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
