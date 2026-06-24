"use client";

import { Navbar, Footer, ScrollToTop } from "@/app/components/layout";
import { HookRig, GsapCardFields, HookSectionCatcher } from "@/app/components/hook";
import PinSectionsFlow from "@/app/components/hook/PinSectionsFlow";
import {
  HeroSection,
  MarqueeSection,
  AboutSection,
  ServicesSection,
  ProcessSection,
  StatsSection,
  PartnersSection,
  FAQSection,
  CTASection,
  ContactSection,
} from "@/app/components/sections/home";
import { useSiteContent } from "@/app/lib/cms/useSiteContent";

export default function HomePage() {
  const { content } = useSiteContent();

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#0A0A0A]" dir="rtl">
      <Navbar />
      <HookRig />
      <GsapCardFields />
      <PinSectionsFlow />
      <HookSectionCatcher />

      <section className="hook-scene relative isolate">
        <HeroSection content={content.hero} />
      </section>

      <section className="hook-scene relative isolate">
        <MarqueeSection content={content.marquee} />
      </section>

      <section className="hook-scene relative isolate">
        <AboutSection content={content.about} />
      </section>

      <section className="hook-scene relative isolate">
        <ServicesSection content={content.services} />
      </section>

      <div className="process-pin-zone relative isolate z-20 bg-[#000]">
        <ProcessSection content={content.process} />
      </div>
      <section className="hook-scene relative isolate">
        <StatsSection content={content.stats} />
      </section>

      <section className="hook-scene relative isolate">
        <PartnersSection content={content.partners} />
      </section>

      <section className="hook-scene relative isolate">
        <FAQSection content={content.faq} />
      </section>

      <section className="hook-scene relative isolate">
        <CTASection content={content.cta} />
      </section>

      <section className="hook-scene relative isolate">
        <ContactSection content={content.contact} />
      </section>

      <Footer />
      <ScrollToTop />
    </main>
  );
}
