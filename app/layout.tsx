import type { Metadata } from "next";
import "./globals.css";
import { Atmosphere } from "@/components/atmosphere/Atmosphere";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MILESTONE_CONFIG } from "@/lib/milestones";
import { spectral, spaceGrotesk, plexMono, tajawal } from "./fonts";

export const metadata: Metadata = {
  title: `GetTheMoon · ${MILESTONE_CONFIG.chapterStart / 1000}K → ${MILESTONE_CONFIG.chapterGoal / 1000}K`,
  description: "Every orbit brings us closer to the Moon. Tracking the journey from 100K to 500K subscribers.",
  metadataBase: new URL(   process.env.NEXT_PUBLIC_SITE_URL ?? "https://YOUR-VERCEL-DOMAIN.vercel.app" ),
  openGraph: {
    title: `GetTheMoon · ${MILESTONE_CONFIG.chapterStart / 1000}K → ${MILESTONE_CONFIG.chapterGoal / 1000}K`,
    description: "Every orbit brings us closer to the Moon.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`dark ${spectral.variable} ${spaceGrotesk.variable} ${plexMono.variable} ${tajawal.variable}`}
    >
      <body className="antialiased">
        <div className="noise-overlay" aria-hidden="true" />
        <Atmosphere />
        <Header />
        <div className="relative z-10">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
