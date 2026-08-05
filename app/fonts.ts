import { Spectral, Space_Grotesk, IBM_Plex_Mono, Tajawal } from "next/font/google";

// Display serif — headlines, Tagline, celebration copy.
export const spectral = Spectral({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-spectral",
  display: "swap",
});

// UI sans — labels, chrome, buttons.
export const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-space-grotesk",
  display: "swap",
});

// Data mono — subscriber count, dates, view counts.
export const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

// Arabic body — used wherever [lang="ar"] applies.
export const tajawal = Tajawal({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "700"],
  variable: "--font-tajawal",
  display: "swap",
});
