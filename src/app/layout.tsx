import type { Metadata } from "next";
import { Noto_Sans_Arabic } from "next/font/google";
import "./globals.css";

const notoArabic = Noto_Sans_Arabic({
  variable: "--font-noto-arabic",
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "محلل الفيتامينات - تعرف ما تحتاجه من فيتامينات",
  description:
    "تطبيق يحلل أعراضك ويقول لك ما تحتاجه من فيتامينات وعناصر غذائية",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${notoArabic.variable} font-[family-name:var(--font-noto-arabic)] antialiased`}>
        {children}
      </body>
    </html>
  );
}
