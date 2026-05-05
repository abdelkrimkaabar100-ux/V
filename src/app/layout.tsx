import type { Metadata } from "next";
import { Noto_Naskh_Arabic, Amiri, Cairo } from "next/font/google";
import { Noto_Sans } from "next/font/google";
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

const notoSans = Noto_Sans({
  variable: "--font-noto-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "رشيدة العائلة | Rachida Familia",
  description: "منصة عقارية ذكية للمغرب والإسبان بخدمة الذكاء الاصطناعي - AI-Powered Real Estate Platform for Morocco & Spain",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${notoNaskh.variable} ${amiri.variable} ${cairo.variable} ${notoSans.variable} antialiased`}>
        <div className="min-h-screen bg-pattern">
          <Navigation />
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}