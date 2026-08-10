/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Route, Routes, StaticRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Chatbot from "./components/Chatbot";
import Home from "./pages/Home";
import About from "./pages/About";
import Loans from "./pages/Loans";
import Apply from "./pages/Apply";
import Regulatory from "./pages/Regulatory";
import FAQs from "./pages/FAQs";
import Contact from "./pages/Contact";
import RouteMetadata from "./seo/RouteMetadata";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function Site() {
  return (
    <>
      <RouteMetadata />
      <ScrollToTop />
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/loans" element={<Loans />} />
            <Route path="/apply" element={<Apply />} />
            <Route path="/regulatory" element={<Regulatory />} />
            <Route path="/faqs" element={<FAQs />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
        <Chatbot />
      </div>
    </>
  );
}

type AppProps = {
  serverPath?: string;
};

export default function App({ serverPath = "/" }: AppProps) {
  if (typeof window === "undefined") {
    return (
      <StaticRouter location={serverPath}>
        <Site />
      </StaticRouter>
    );
  }

  return (
    <BrowserRouter>
      <Site />
    </BrowserRouter>
  );
}
