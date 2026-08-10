/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { lazy, Suspense, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
const Chatbot = lazy(() => import("./components/Chatbot"));

const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Loans = lazy(() => import("./pages/Loans"));
const Apply = lazy(() => import("./pages/Apply"));
const Regulatory = lazy(() => import("./pages/Regulatory"));
const FAQs = lazy(() => import("./pages/FAQs"));
const Contact = lazy(() => import("./pages/Contact"));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function DeferredChatbot() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const reveal = () => setReady(true);
    if (typeof window.requestIdleCallback === "function") {
      const idleId = window.requestIdleCallback(reveal, { timeout: 2500 });
      return () => window.cancelIdleCallback(idleId);
    }

    const timerId = window.setTimeout(reveal, 1500);
    return () => window.clearTimeout(timerId);
  }, []);

  if (!ready) return null;
  return (
    <Suspense fallback={null}>
      <Chatbot />
    </Suspense>
  );
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Suspense fallback={<div className="route-loading-shell bg-surface-50" aria-hidden="true" />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/loans" element={<Loans />} />
              <Route path="/apply" element={<Apply />} />
              <Route path="/regulatory" element={<Regulatory />} />
              <Route path="/faqs" element={<FAQs />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
        <DeferredChatbot />
      </div>
    </Router>
  );
}
