'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

interface Translations {
  nav: {
    home: string;
    properties: string;
    estimate: string;
    advisor: string;
    chat: string;
    sell: string;
  };
  langSwitch: string;
}

const translations: Record<string, Translations> = {
  ar: {
    nav: {
      home: 'الرئيسية',
      properties: 'العقارات',
      estimate: 'تقدير السعر',
      advisor: 'المستشار المالي',
      chat: 'المساعدة الذكية',
      sell: 'أضف عقار',
    },
    langSwitch: 'ES',
  },
  es: {
    nav: {
      home: 'Inicio',
      properties: 'Propiedades',
      estimate: 'Estimar Precio',
      advisor: 'Asesor Financiero',
      chat: 'Asistente IA',
      sell: 'Agregar Propiedad',
    },
    langSwitch: 'AR',
  },
};

export default function Navigation() {
  const pathname = usePathname();
  const [language, setLanguage] = useState<'ar' | 'es'>('ar');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedLang = localStorage.getItem('language') as 'ar' | 'es' | null;
    if (savedLang) {
      setLanguage(savedLang);
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      document.documentElement.lang = language;
      document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
      localStorage.setItem('language', language);
    }
  }, [language, mounted]);

  const t = translations[language];
  const navLinks = [
    { href: '/', label: t.nav.home },
    { href: '/properties', label: t.nav.properties },
    { href: '/estimate', label: t.nav.estimate },
    { href: '/advisor', label: t.nav.advisor },
    { href: '/chat', label: t.nav.chat },
    { href: '/sell', label: t.nav.sell },
  ];

  if (!mounted) return null;

  return (
    <nav className="fixed top-0 right-0 left-0 z-50 bg-[#0d2b1a]/90 backdrop-blur-md border-b border-[#d4af37]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3">
            <div className="text-2xl">🏠</div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-[#d4af37]" style={{ fontFamily: 'var(--font-amiri)' }}>
                رشيدة العائلة
              </span>
              <span className="text-xs text-[#f5f5f0]/70" style={{ fontFamily: 'var(--font-noto-sans)' }}>
                Rachida Familia
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? 'text-[#d4af37]'
                    : 'text-[#f5f5f0] hover:text-[#d4af37]'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <button
              onClick={() => setLanguage(language === 'ar' ? 'es' : 'ar')}
              className="px-3 py-1 text-xs rounded-full bg-[#d4af37]/20 text-[#d4af37] hover:bg-[#d4af37]/30 transition-colors"
            >
              {t.langSwitch}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}