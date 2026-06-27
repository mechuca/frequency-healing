import type { Metadata, Viewport } from "next";
import { Hanken_Grotesk, IBM_Plex_Mono, Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { siteUrl } from "@/lib/site";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const hanken = Hanken_Grotesk({ subsets: ["latin"], variable: "--font-hanken" });
const plexMono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-plex-mono" });

const siteTitle = "StillTones, pure frequency audio for focus, calm, and sleep";
const siteName = "StillTones";
const siteDescription = "Single, clean tones, rendered lossless and held for over eleven hours. Preview every tone live, then keep the files. No mysticism, just steady sound to work, rest, and sleep to.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/icon.svg",
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: "/",
    siteName,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "StillTones pure frequency audio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/opengraph-image"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#151715",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${hanken.variable} ${plexMono.variable}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
