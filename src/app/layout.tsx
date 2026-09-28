import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Atelier Ambre | Haute Parfumerie — Luxury Artisanal Fragrances",
  description:
    "Discover the art of olfactory excellence. Atelier Ambre crafts bespoke luxury fragrances with rare ingredients from around the world. Shop Oud Noir, Amber Royale, and our signature collection.",
  keywords: [
    "luxury perfume",
    "artisanal fragrance",
    "oud",
    "amber",
    "Bangladesh perfume",
    "haute parfumerie",
    "atelier ambre",
  ],
  openGraph: {
    title: "Atelier Ambre — Haute Parfumerie",
    description: "Where artistry meets aroma. Luxury fragrances crafted in Dhaka.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
