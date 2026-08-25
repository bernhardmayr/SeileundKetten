import type { Metadata } from "next";
import "./globals.css";

const publicBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const githubPagesUrl = "https://bernhardmayr.github.io/SeileundKetten";

export const metadata: Metadata = {
  metadataBase: new URL(`${githubPagesUrl}/`),
  title: "Seile & Ketten – Hebetechnik, die passt",
  description:
    "Seile, Ketten und Hebetechnik sicher auswählen, transparent kalkulieren und verlässlich liefern lassen.",
  openGraph: {
    title: "Seile & Ketten",
    description: "Sicher auswählen. Verlässlich geliefert.",
    type: "website",
    locale: "de_DE",
    images: [{ url: `${githubPagesUrl}/og.svg`, width: 1200, height: 630, alt: "Seile & Ketten – Sicher auswählen. Verlässlich geliefert." }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Seile & Ketten",
    description: "Sicher auswählen. Verlässlich geliefert.",
    images: [`${githubPagesUrl}/og.svg`],
  },
  icons: {
    icon: `${publicBasePath}/favicon.svg`,
    shortcut: `${publicBasePath}/favicon.svg`,
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
