"use client";

import { useTracking } from "@/hooks/useTracking";
import { QueryParamPersistence } from "@/components/QueryParamPersistence";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { TrustBar } from "@/components/TrustBar";
import { PriorityServices } from "@/components/PriorityServices";
import { WhyClearChoice } from "@/components/WhyClearChoice";
import { RecurringSavings } from "@/components/RecurringSavings";
import { AdditionalServices } from "@/components/AdditionalServices";
import { HowItWorks } from "@/components/HowItWorks";
import { Testimonials } from "@/components/Testimonials";
import { ServiceArea } from "@/components/ServiceArea";
import { Faq } from "@/components/Faq";
import { FinalCta } from "@/components/FinalCta";
import { SiteFooter } from "@/components/SiteFooter";
import { FloatingCTA } from "@/components/FloatingCTA";
import { TRACKING } from "@/lib/content";

export default function Page() {
  useTracking({
    siteKey: TRACKING.siteKey,
    siteId: TRACKING.siteId,
    gtmId: TRACKING.gtmId,
  });

  return (
    <main className="overflow-x-hidden bg-white">
      <QueryParamPersistence />
      <Header />
      <Hero />
      <TrustBar />
      <PriorityServices />
      <WhyClearChoice />
      <RecurringSavings />
      <AdditionalServices />
      <HowItWorks />
      <Testimonials />
      <ServiceArea />
      <Faq />
      <FinalCta />
      <SiteFooter />
      <FloatingCTA />
    </main>
  );
}
