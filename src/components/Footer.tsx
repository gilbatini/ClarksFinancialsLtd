import Logo from "./Logo";
import { Share2, Phone, Send } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-surface-900 text-white font-body py-16">
      <div className="max-w-7xl mx-auto px-8 grid grid-cols-2 md:grid-cols-4 gap-12 border-b border-white/10 pb-16">
        <div className="col-span-2 md:col-span-1">
          <Logo light iconOnly className="mb-6" />
          <p className="text-white/70 text-sm leading-relaxed mb-8">
            Architectural Precision in Finance. Licensed Tier-4 Institution regulated to provide credit services in Uganda.
          </p>
          <div className="flex gap-4">
            <a className="w-10 h-10 border border-white/20 flex items-center justify-center hover:bg-secondary hover:text-primary transition-all rounded-sm" href="#">
              <Share2 className="w-4 h-4" />
            </a>
            <a className="w-10 h-10 border border-white/20 flex items-center justify-center hover:bg-secondary hover:text-primary transition-all rounded-sm" href="#">
              <Phone className="w-4 h-4" />
            </a>
          </div>
        </div>
        
        <div>
          <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-xs">Quick Links</h4>
          <ul className="space-y-4 text-white/50 text-sm">
            <li><Link className="hover:text-secondary transition-all" to="/loans">Our Services</Link></li>
            <li><Link className="hover:text-secondary transition-all" to="/loans">Loan Products</Link></li>
            <li><Link className="hover:text-secondary transition-all" to="/apply">How to Apply</Link></li>
            <li><Link className="hover:text-secondary transition-all" to="/regulatory">Regulatory & Legal</Link></li>
            <li><Link className="hover:text-secondary transition-all" to="/faqs">FAQs</Link></li>
            <li><Link className="hover:text-secondary transition-all" to="/contact">Contact Us</Link></li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-xs">Contact</h4>
          <ul className="space-y-4 text-white/50 text-sm">
            <li>0772 502 955 | 0702 502 955</li>
            <li>loans@clarksfinancials.com</li>
            <li>www.clarksfinancials.com</li>
            <li>Ambassador House, 2nd Floor, Kampala Road</li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-xs">Stay Synced</h4>
          <div className="flex">
            <input className="bg-white/10 border border-white/20 text-xs p-3 w-full focus:ring-0 focus:border-secondary placeholder:text-white/30" placeholder="Email Address" />
            <button className="bg-secondary text-primary px-4 hover:bg-white transition-colors">
              <Send className="w-4 h-4" />
            </button>
          </div>
          <p className="mt-4 text-[10px] text-white/40 uppercase tracking-widest">Architectural Ledger Update</p>
        </div>
      </div>
      
      <div className="container mx-auto px-8 mt-8 flex flex-col md:flex-row justify-between items-center text-[10px] font-bold text-white/40 tracking-widest uppercase">
        <p>Clarks Financials Limited is licensed by the Uganda Microfinance Regulatory Authority (UMRA) under the Tier 4 Microfinance Institutions and Money Lenders Act, 2016. Incorporated in Uganda, 2012. All lending activities are conducted in accordance with applicable Ugandan law. © 2026 Clarks Financials Limited. All rights reserved.</p>
        <div className="flex gap-8 mt-4 md:mt-0 shrink-0">
          <span>Kampala</span>
          <span>Nairobi</span>
          <span>Johannesburg</span>
        </div>
      </div>
    </footer>
  );
}
