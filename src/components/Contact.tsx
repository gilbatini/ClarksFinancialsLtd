import { motion } from "motion/react";
import { MapPin, Clock, MessageCircle, Phone } from "lucide-react";
import { business } from "../lib/business";

export default function Contact() {
  return (
    <section className="bg-white py-32 deferred-section" id="contact">
      <div className="container mx-auto px-8 grid grid-cols-1 lg:grid-cols-12 gap-20">
        <div className="lg:col-span-5">
          <p className="text-primary font-bold uppercase tracking-widest mb-4">Kampala Office</p>
          <h2 className="font-headline text-6xl md:text-7xl text-slate-950 uppercase leading-[0.9] mb-16 tracking-tighter font-black">
            CONTACT<br /><span className="text-primary italic">HQ OFFICE.</span>
          </h2>
          
          <div className="space-y-12">
            <div className="flex gap-8 group">
              <div className="w-14 h-14 bg-surface-50 flex items-center justify-center border border-surface-200 group-hover:border-primary transition-all shrink-0">
                <MapPin className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h3 className="text-slate-950 font-headline text-2xl uppercase font-bold mb-2">Head Office</h3>
                <p className="text-slate-500 font-medium">Ambassador House, 2nd Floor<br />Kampala Road, Kampala, Uganda</p>
              </div>
            </div>
            
            <div className="flex gap-8 group">
              <div className="w-14 h-14 bg-surface-50 flex items-center justify-center border border-surface-200 group-hover:border-primary transition-all shrink-0">
                <Clock className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h3 className="text-slate-950 font-headline text-2xl uppercase font-bold mb-2">Operation Hours</h3>
                <p className="text-slate-500 font-medium">Monday - Friday: 08:00 — 17:00</p>
              </div>
            </div>
          </div>
          
          <div className="mt-20 border-2 border-primary grayscale hover:grayscale-0 transition-all duration-700 h-64 overflow-hidden rounded-sm shadow-xl">
            <img 
              className="w-full h-full object-cover" 
              src="/images/kampala-office.webp"
              alt="Illuminated corridor leading to an office reception"
              width={512}
              height={512}
              loading="lazy"
              decoding="async"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
        
        <div className="lg:col-span-7">
          <div className="p-12 border relative bg-[#D6E4E8] border-white/30 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)]">
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 clip-logo -m-4"></div>
            <h3 className="font-headline text-3xl font-black text-slate-950 uppercase mb-8 border-b border-surface-200 pb-4">
              Application Support
            </h3>
            
            <div className="space-y-8">
              <p className="text-slate-600 font-medium leading-relaxed">
                For your privacy, this website does not collect or submit identity, income, employer, loan amount, or application-document details. Contact the team through an official channel and confirm how documents should be provided.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white border border-surface-200 p-6">
                  <h4 className="font-headline text-lg font-black uppercase text-slate-950 mb-3">Before You Contact Us</h4>
                  <p className="text-sm text-slate-600 leading-relaxed">Have your questions ready, but keep identity numbers and financial documents private until a team member confirms an approved process.</p>
                </div>
                <div className="bg-white border border-surface-200 p-6">
                  <h4 className="font-headline text-lg font-black uppercase text-slate-950 mb-3">Official Channels</h4>
                  <p className="text-sm text-slate-600 leading-relaxed">Use the published phone numbers, WhatsApp contact, or email address shown on this website.</p>
                </div>
              </div>

              <div className="bg-secondary/20 border border-secondary p-5">
                <h4 className="font-headline font-black uppercase text-slate-950 mb-2">Privacy Note</h4>
                <p className="text-sm text-slate-700">Never send passwords, PINs, or mobile-money authorization codes. Confirm the recipient before sharing any requested document.</p>
              </div>

              <a aria-label="Contact Clarks Financials on WhatsApp" className="w-full bg-primary text-white font-headline font-black py-6 uppercase tracking-widest text-lg hover:bg-secondary hover:text-primary transition-all shadow-xl flex items-center justify-center gap-3" data-seo-cta href="https://wa.me/256772502955?text=Hello%20Clarks%20Financials%2C%20I%20would%20like%20application%20support." rel="noreferrer" target="_blank">
                <MessageCircle className="w-5 h-5" /> Contact Team on WhatsApp
              </a>
              <a className="w-full border border-primary text-primary font-headline font-black py-4 uppercase tracking-widest text-sm hover:bg-white transition-all flex items-center justify-center gap-3" href={business.phones[0].href}>
                <Phone className="w-4 h-4" /> Call {business.phones[0].display}
              </a>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
