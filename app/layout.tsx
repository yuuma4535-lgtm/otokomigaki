import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Noto_Sans_JP, Shippori_Mincho } from "next/font/google";
import { getSiteOrigin } from "@/lib/diagnosis/share-og";
import "./globals.css";

const body = Noto_Sans_JP({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  preload: true,
});

const display = Shippori_Mincho({
  variable: "--font-display",
  subsets: ["latin"],
  // display は見出し中心。未使用の 600/700 を外し、初回 preload 量を抑える
  weight: ["400", "500"],
  display: "swap",
  preload: false,
});

const defaultTitle = "男磨き診断 | Otokomigaki";
const ogTitle = "男磨き診断";
const ogDescription = "あなたの内なる支配者を目覚めさせろ";
const ogImagePath = "/ogp.png";

export const metadata: Metadata = {
  metadataBase: new URL(getSiteOrigin()),
  title: defaultTitle,
  description: ogDescription,
  openGraph: {
    title: ogTitle,
    description: ogDescription,
    siteName: "男磨き診断",
    locale: "ja_JP",
    type: "website",
    images: [
      {
        url: ogImagePath,
        width: 1024,
        height: 538,
        alt: ogTitle,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: ogTitle,
    description: ogDescription,
    images: [ogImagePath],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${body.variable} ${display.variable} antialiased`}
    >
      <body className="font-sans">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
