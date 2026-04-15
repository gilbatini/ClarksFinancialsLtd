import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "../lib/utils";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { 
    name: "Services", 
    path: "/loans",
    dropdown: [
      { name: "Loan Products", path: "/loans" },
      { name: "Regulatory", path: "/regulatory" },
    ]
  },
  { name: "Apply", path: "/apply" },
  { name: "FAQs", path: "/faqs" },
  { name: "Contact", path: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav className={cn(
      "fixed top-0 w-full z-50 transition-all duration-300 border-b",
      scrolled ? "bg-white/90 backdrop-blur-md py-3 border-surface-200 shadow-sm" : "bg-transparent py-5 border-transparent"
    )}>
      <div className="container mx-auto px-8 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 bg-primary clip-logo flex items-center justify-center group-hover:rotate-12 transition-transform">
            <div className="w-4 h-4 bg-secondary rounded-full"></div>
          </div>
          <div className={cn(
            "text-xl font-black tracking-tighter font-headline uppercase transition-colors",
            scrolled ? "text-primary" : "text-slate-950"
          )}>
            Clarks Financials
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <div key={link.name} className="relative group">
              <Link 
                to={link.path}
                className={cn(
                  "font-headline font-bold text-sm uppercase tracking-widest transition-colors flex items-center gap-1",
                  location.pathname === link.path ? "text-primary" : scrolled ? "text-slate-600 hover:text-primary" : "text-slate-800 hover:text-primary"
                )}
              >
                {link.name}
                {link.dropdown && <ChevronDown className="w-4 h-4" />}
              </Link>
              
              {link.dropdown && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-surface-200 shadow-xl opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200">
                  {link.dropdown.map((sub) => (
                    <Link 
                      key={sub.name}
                      to={sub.path}
                      className="block px-6 py-4 text-xs font-bold text-slate-600 hover:bg-surface-50 hover:text-primary transition-colors uppercase tracking-widest"
                    >
                      {sub.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          
          <Link 
            to="/apply"
            className="bg-primary text-white font-headline font-bold px-6 py-2 rounded-sm text-xs uppercase tracking-widest hover:bg-slate-950 transition-all shadow-lg shadow-primary/20"
          >
            Apply Now
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="lg:hidden text-slate-950 p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-b border-surface-200 overflow-hidden"
          >
            <div className="container mx-auto px-8 py-8 flex flex-col gap-6">
              {navLinks.map((link) => (
                <div key={link.name} className="flex flex-col gap-4">
                  <Link 
                    to={link.path}
                    className={cn(
                      "font-headline font-black text-2xl uppercase tracking-tighter",
                      location.pathname === link.path ? "text-primary" : "text-slate-950"
                    )}
                  >
                    {link.name}
                  </Link>
                  {link.dropdown && (
                    <div className="pl-6 flex flex-col gap-4 border-l-2 border-surface-100">
                      {link.dropdown.map((sub) => (
                        <Link 
                          key={sub.name}
                          to={sub.path}
                          className="font-headline font-bold text-lg uppercase tracking-tight text-slate-500"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <Link 
                to="/apply"
                className="bg-primary text-white font-headline font-bold py-4 rounded-sm text-center uppercase tracking-widest mt-4"
              >
                Apply Now
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
