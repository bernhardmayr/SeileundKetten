import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://seile-und-ketten.example"),
  title: "Seile & Ketten – Hebetechnik, die passt",
  description:
    "Seile, Ketten und Hebetechnik sicher auswählen, transparent kalkulieren und verlässlich liefern lassen.",
  openGraph: {
    title: "Seile & Ketten",
    description: "Sicher auswählen. Verlässlich geliefert.",
    type: "website",
    locale: "de_DE",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Seile & Ketten – Sicher auswählen. Verlässlich geliefert." }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Seile & Ketten",
    description: "Sicher auswählen. Verlässlich geliefert.",
    images: ["/og.png"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className="antialiased">{children}</body>
    </html>
  );
}
