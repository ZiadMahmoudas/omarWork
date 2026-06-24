"use client";

import { Navbar, Footer, ScrollToTop } from "@/app/components/layout";
import { WorksHero, WorksGrid } from "@/app/components/sections/works";
import { useWorksContent } from "@/app/lib/cms/useWorksContent";

export default function WorksPage() {
  const { content } = useWorksContent();

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#0A0A0A]">
      <Navbar />
      <WorksHero content={content.hero} />
      <WorksGrid content={content} />
      <Footer />
      <ScrollToTop />
    </main>
  );
}
