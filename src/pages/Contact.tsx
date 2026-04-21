import ContactComponent from "../components/Contact";
import { motion } from "motion/react";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

export default function Contact() {
  return (
    <div className="pt-20">
      <section className="bg-surface-100 py-24 relative overflow-hidden">
        <div className="absolute inset-0 architectural-grid opacity-20"></div>
        <div className="container mx-auto px-8 relative z-10">
          <p className="text-primary font-bold uppercase tracking-widest mb-4">Get In Touch</p>
          <h1 className="font-headline text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-8">
            CONNECT WITH <br /><span className="text-primary">OUR TEAM.</span>
          </h1>
          <p className="max-w-2xl text-lg text-slate-600 font-medium">
            Our team is available during business hours at both of our Kampala offices. 
            We respond to all enquiries within one business day.
          </p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-8 grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="bg-surface-50 p-10 border border-surface-200">
            <Phone className="w-10 h-10 text-primary mb-6" />
            <h3 className="font-headline text-xl font-bold text-slate-950 uppercase mb-4">Phone Support</h3>
            <p className="text-slate-500 font-medium">0772 502 955</p>
            <p className="text-slate-500 font-medium">0702 502 955</p>
          </div>
          <div className="bg-surface-50 p-10 border border-surface-200">
            <Mail className="w-10 h-10 text-primary mb-6" />
            <h3 className="font-headline text-xl font-bold text-slate-950 uppercase mb-4">Email Enquiries</h3>
            <p className="text-slate-500 font-medium">loans@clarksfinancials.com</p>
          </div>
          <div className="bg-surface-50 p-10 border border-surface-200">
            <Clock className="w-10 h-10 text-primary mb-6" />
            <h3 className="font-headline text-xl font-bold text-slate-950 uppercase mb-4">Business Hours</h3>
            <p className="text-slate-500 font-medium">Mon - Fri: 8:00am - 5:00pm</p>
          </div>
        </div>
      </section>

      <ContactComponent />

      <section className="py-24 bg-surface-100">
        <div className="container mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-white p-10 border border-surface-200">
              <MapPin className="w-10 h-10 text-primary mb-6" />
              <h3 className="font-headline text-2xl font-bold text-slate-950 uppercase mb-4">Head Office — Kampala Road</h3>
              <p className="text-slate-500 font-medium leading-relaxed">
                Ambassador House, 2nd Floor,<br />
                Kampala Road, Kampala, Uganda
              </p>
            </div>
            <div className="bg-white p-10 border border-surface-200">
              <MapPin className="w-10 h-10 text-primary mb-6" />
              <h3 className="font-headline text-2xl font-bold text-slate-950 uppercase mb-4">Branch Office — Kireka</h3>
              <p className="text-slate-500 font-medium leading-relaxed">
                The Geode Building,<br />
                Kireka – Kinawataka Road, Kampala, Uganda
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
