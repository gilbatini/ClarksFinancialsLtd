import { lazy, Suspense } from "react";
import Hero from "../components/Hero";

const Stats = lazy(() => import("../components/Stats"));
const Services = lazy(() => import("../components/Services"));
const HowItWorks = lazy(() => import("../components/HowItWorks"));
const CTA = lazy(() => import("../components/CTA"));

export default function Home() {
  return (
    <>
      <Hero />
      <Suspense fallback={<div className="min-h-[2400px]" aria-hidden="true" />}>
        <Stats />
        <Services />
        <HowItWorks />
        <CTA />
      </Suspense>
    </>
  );
}
