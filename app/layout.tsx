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
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://getthemoonv2.vercel.app"),
  openGraph: {
    title: `GetTheMoon · ${MILESTONE_CONFIG.chapterStart / 1000}K → ${MILESTONE_CONFIG.chapterGoal / 1000}K`,
    description: "Every orbit brings us closer to the Moon.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${spectral.variable} ${spaceGrotesk.variable} ${plexMono.variable} ${tajawal.variable} dark`}>
      <body>
        <Atmosphere />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
