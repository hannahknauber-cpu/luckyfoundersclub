import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://luckyfoundersclub.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Lucky Founders Club – Gründer*innenstories aus Stuttgart",
    template: "%s | Lucky Founders Club",
  },
  description:
    "Exklusive Community für ambitionierte Founder aus Stuttgart. Vernetze dich, lerne von den Besten und baue gemeinsam etwas Großes. Jetzt bewerben.",
  keywords: [
    "Lucky Founders Club",
    "Gründer Community",
    "Startup Stuttgart",
    "Founder Netzwerk",
    "Gründer*innen",
    "Startup Community",
  ],
  authors: [{ name: "Lucky Founders Club" }],
  creator: "Lucky Founders Club",
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: siteUrl,
    siteName: "Lucky Founders Club",
    title: "Lucky Founders Club – Gründer*innenstories aus Stuttgart",
    description:
      "Exklusive Community für ambitionierte Founder. Vernetze dich und baue gemeinsam etwas Großes.",
    images: [
      {
        url: "/LFC_Logo_Colored_Sand.png",
        width: 1200,
        height: 630,
        alt: "Lucky Founders Club",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lucky Founders Club – Gründer*innenstories aus Stuttgart",
    description:
      "Exklusive Community für ambitionierte Founder. Vernetze dich und baue gemeinsam etwas Großes.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
