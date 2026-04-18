import type { Metadata } from "next";
import { Noto_Naskh_Arabic, Amiri, Cairo } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";

const notoNaskh = Noto_Naskh_Arabic({
  variable: "--font-noto-naskh",
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const amiri = Amiri({
  variable: "--font-amiri",
  subsets: ["arabic"],
  weight: ["400", "700"],
  display: "swap",
});

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "رحيق诗词 - الشعر العربي الإسلامي",
  description: "منصة متخصصة في الشعر العربي الإسلامي، استكشف قصائد الصحابة والتابعين مع تحليل عميق للسياق والمشاعر والمعنى",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${notoNaskh.variable} ${amiri.variable} ${cairo.variable} font-[family-name:var(--font-noto-naskh)] antialiased`}>
        <div className="min-h-screen arabic-pattern">
          <Navigation />
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}