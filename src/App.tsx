/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { lazy, Suspense, useEffect, useState, type ReactNode } from "react";
import { MemoryRouter, StaticRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import RouteStructuredData from "./seo/RouteStructuredData";
import RouteMetadata from "./seo/RouteMetadata";

const Chatbot = lazy(() => import("./components/Chatbot"));

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

function Site({ children }: { children: ReactNode }) {
  return (
    <>
      <RouteMetadata />
      <RouteStructuredData />
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
        <DeferredChatbot />
      </div>
    </>
  );
}

type AppProps = {
  serverPath?: string;
  children?: ReactNode;
};

export default function App({ serverPath = "/", children }: AppProps) {
  if (typeof window === "undefined") {
    return (
      <StaticRouter location={serverPath}>
        <Site>{children}</Site>
      </StaticRouter>
    );
  }

  return (
    <MemoryRouter initialEntries={[serverPath]}>
      <Site>{children}</Site>
    </MemoryRouter>
  );
}
