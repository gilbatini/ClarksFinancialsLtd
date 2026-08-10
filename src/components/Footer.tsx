import Logo from "./Logo";
import { Share2, Phone, Send } from "lucide-react";
import { Link } from "react-router-dom";
import { business } from "../lib/business";

export default function Footer() {
  return (
    <footer className="bg-surface-900 text-white font-body py-16">
      <div className="max-w-7xl mx-auto px-8 grid grid-cols-2 md:grid-cols-4 gap-12 border-b border-white/10 pb-16">
        <div className="col-span-2 md:col-span-1">
          <Logo light className="mb-6" />
          <p className="text-white/70 text-sm leading-relaxed mb-8">
            Loan information and customer support from Kampala, Uganda.
          </p>
          <div className="flex gap-4">
            <a aria-label="Email Clarks Financials" className="w-10 h-10 border border-white/20 flex items-center justify-center hover:bg-secondary hover:text-primary transition-all rounded-sm" href={"mailto:" + business.email}>
              <Share2 className="w-4 h-4" />
            </a>
            <a aria-label="Call Clarks Financials" className="w-10 h-10 border border-white/20 flex items-center justify-center hover:bg-secondary hover:text-primary transition-all rounded-sm" href={business.phones[0].href}>
              <Phone className="w-4 h-4" />
            </a>
          </div>
        </div>
        
        <div>
          <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-xs">Quick Links</h4>
          <ul className="space-y-4 text-white/50 text-sm">
            <li><Link className="hover:text-secondary transition-all" to="/loans">Our Services</Link></li>
            <li><Link className="hover:text-secondary transition-all" to="/loans">Loan Products</Link></li>
            <li><Link aria-label="Start a loan application" data-seo-cta className="hover:text-secondary transition-all" to="/apply">How to Apply</Link></li>
            <li><Link className="hover:text-secondary transition-all" to="/regulatory">Regulatory & Legal</Link></li>
            <li><Link className="hover:text-secondary transition-all" to="/faqs">FAQs</Link></li>
            <li><Link className="hover:text-secondary transition-all" to="/contact">Contact Us</Link></li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-xs">Contact</h4>
          <address className="not-italic" data-seo-nap>
            <span className="sr-only" data-nap-name>{business.name}</span>
            <ul className="space-y-4 text-white/50 text-sm">
              <li data-nap-phone>{business.phones.map((phone, index) => <span key={phone.href}>{index > 0 ? " | " : ""}<a className="hover:text-secondary transition-all" href={phone.href}>{phone.display}</a></span>)}</li>
              <li data-nap-email><a className="hover:text-secondary transition-all" href={"mailto:" + business.email}>{business.email}</a></li>
              <li><a className="hover:text-secondary transition-all" href={"https://" + business.website}>{business.website}</a></li>
              <li data-nap-address>{business.headOffice}</li>
            </ul>
          </address>
        </div>
        
        <div>
          <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-xs">Email Enquiries</h4>
          <div className="flex">
            <a className="bg-white/10 border border-white/20 text-xs p-3 w-full hover:border-secondary transition-colors" href={"mailto:" + business.email}>{business.email}</a>
            <a aria-label="Email Clarks Financials" className="bg-secondary text-primary px-4 hover:bg-white transition-colors flex items-center" href={"mailto:" + business.email}>
              <Send className="w-4 h-4" />
            </a>
          </div>
          <p className="mt-4 text-[10px] text-white/40 uppercase tracking-widest">Contact our team directly</p>
        </div>
      </div>
      
      <div className="container mx-auto px-8 mt-8 flex flex-col md:flex-row justify-between items-center text-[10px] font-bold text-white/40 tracking-widest uppercase">
        <p>Clarks Financials Limited · Kampala, Uganda. © 2026. All rights reserved.</p>
        <div className="flex gap-8 mt-4 md:mt-0 shrink-0">
          <span>Kampala, Uganda</span>
        </div>
      </div>
    </footer>
  );
}
