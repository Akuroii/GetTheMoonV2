import type { Metadata } from "next";
import "./globals.css";
import { Atmosphere } from "@/components/atmosphere/Atmosphere";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MILESTONE_CONFIG } from "@/lib/milestones";
import { LenisProvider } from "@/components/providers/LenisProvider";
import { GrainOverlay } from "@/components/ui/GrainOverlay";

export const metadata: Metadata = {
  title: `GetTheMoon · ${MILESTONE_CONFIG.chapterStart / 1000}K → ${MILESTONE_CONFIG.chapterGoal / 1000}K`,
  description: "Every orbit brings us closer to the Moon. Tracking the journey from 100K to 500K subscribers.",
  metadataBase: new URL("https://getthemoonv2.up.railway.app"),
  openGraph: {
    title: `GetTheMoon · ${MILESTONE_CONFIG.chapterStart / 1000}K → ${MILESTONE_CONFIG.chapterGoal / 1000}K`,
    description: "Every orbit brings us closer to the Moon.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased">
        <LenisProvider>
          <div className="noise-overlay" aria-hidden="true" />
          <GrainOverlay />
          <Atmosphere />
          <Header />
          <main className="relative z-10">{children}</main>
          <Footer />
        </LenisProvider>
      </body>
    </html>
  );
}
