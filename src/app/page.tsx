'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

const translations = {
  ar: {
    hero: {
      badge: 'منصة عقارية ذكية',
      title: 'رشيدة العائلة',
      subtitle: 'حلول عقارية متقدمة بالذكاء الاصطناعي',
      description: 'اكتشف أفضل الفرص العقارية في المغرب وإسبانيا. نقدم لك تقدير أسعار دقيق، نصائح استثمارية ذكية، ومساعد ذكي يجيب على جميع أسئلتك.',
      cta: 'ابدأ الآن',
    },
    features: {
      title: 'ماذا تقدم لك رشيدة العائلة؟',
      items: [
        {
          emoji: '🏠',
          title: 'العقارات',
          desc: 'تصفح آلاف العقارات المتاحة في المغرب والإسبان',
        },
        {
          emoji: '💰',
          title: 'تقدير الأسعار',
          desc: 'احصل على تقدير دقيق لسعر عقارك باستخدام الذكاء الاصطناعي',
        },
        {
          emoji: '📊',
          title: 'المستشار المالي',
          desc: 'نصائح مخصصة حسب ميزانيتك واحتياجاتك',
        },
        {
          emoji: '🤖',
          title: 'المساعدة الذكية',
          desc: 'اسأل كل سؤال عن العقارات وانتظر جواباً ذكياً',
        },
      ],
    },
  },
  es: {
    hero: {
      badge: 'Plataforma Inmobiliaria Inteligente',
      title: 'Rachida Familia',
      subtitle: 'Soluciones Inmobiliarias Avanzadas con IA',
      description: 'Descubre las mejores oportunidades inmobiliarias en Marruecos y España. Te ofrecemos estimaciones precisas de precios, consejos de inversión inteligentes y un asistente IA que responde todas tus preguntas.',
      cta: 'Comenzar',
    },
    features: {
      title: '¿Qué te ofrece Rachida Familia?',
      items: [
        {
          emoji: '🏠',
          title: 'Propiedades',
          desc: 'Explora miles de propiedades disponibles en Marruecos y España',
        },
        {
          emoji: '💰',
          title: 'Estimar Precio',
          desc: 'Obtén una estimación precisa del precio de tu propiedad con IA',
        },
        {
          emoji: '📊',
          title: 'Asesor Financiero',
          desc: 'Consejos personalizados según tu presupuesto y necesidades',
        },
        {
          emoji: '🤖',
          title: 'Asistente IA',
          desc: 'Haz cualquier pregunta sobre propiedades y espera una respuesta inteligente',
        },
      ],
    },
  },
};

export default function Home() {
  const [language, setLanguage] = useState<'ar' | 'es'>('ar');
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const savedLang = localStorage.getItem('language') as 'ar' | 'es' | null;
    if (savedLang) {
      setLanguage(savedLang);
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  const t = translations[language];

  if (!mounted) return null;

  return (
    <div className="pt-20">
      <section className="relative py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block mb-6 px-4 py-1 bg-[#d4af37]/20 rounded-full border border-[#d4af37]/30">
            <span className="text-[#d4af37] text-sm">{t.hero.badge}</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl mb-6 text-[#f5f5f0]" style={{ fontFamily: 'var(--font-amiri)' }}>
            {t.hero.title}
          </h1>
          
          <p className="text-xl md:text-2xl text-[#f5f5f0]/80 mb-4" style={{ fontFamily: 'var(--font-amiri)' }}>
            {t.hero.subtitle}
          </p>
          
          <p className="text-lg text-[#f5f5f0]/60 mb-10 max-w-2xl mx-auto">
            {t.hero.description}
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/properties" className="btn-primary px-8 py-3 rounded-lg text-lg">
              {t.hero.cta}
            </Link>
            <Link href="/chat" className="px-8 py-3 rounded-lg border border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37]/10 transition-colors">
              {t.features.items[3].title}
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl text-[#f5f5f0] text-center mb-12" style={{ fontFamily: 'var(--font-amiri)' }}>
            {t.features.title}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.features.items.map((item, index) => (
              <div
                key={index}
                className="card p-6 rounded-2xl text-center animate-fade-in-up opacity-0"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-4xl mb-4">{item.emoji}</div>
                <h3 className="text-xl text-[#f5f5f0] mb-2" style={{ fontFamily: 'var(--font-amiri)' }}>
                  {item.title}
                </h3>
                <p className="text-[#f5f5f0]/60 text-sm">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-[#0d2b1a]/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl text-[#f5f5f0] mb-8" style={{ fontFamily: 'var(--font-amiri)' }}>
            {language === 'ar' ? 'انطلق في رحلتك العقارية' : 'Empieza tu viaje inmobiliario'}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/properties" className="p-8 rounded-2xl bg-[#2d5a3d]/30 border border-[#d4af37]/20 hover:border-[#d4af37] transition-all group">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">🔍</div>
              <h3 className="text-xl text-[#f5f5f0] mb-2" style={{ fontFamily: 'var(--font-amiri)' }}>
                {language === 'ar' ? 'استكشف العقارات' : 'Explorar Propiedades'}
              </h3>
              <p className="text-[#f5f5f0]/60 text-sm">
                {language === 'ar' ? 'ابحث عن العقار المثالي' : 'Encuentra la propiedad perfecta'}
              </p>
            </Link>
            
            <Link href="/estimate" className="p-8 rounded-2xl bg-[#2d5a3d]/30 border border-[#d4af37]/20 hover:border-[#d4af37] transition-all group">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">💰</div>
              <h3 className="text-xl text-[#f5f5f0] mb-2" style={{ fontFamily: 'var(--font-amiri)' }}>
                {language === 'ar' ? 'قدر سعر عقارك' : 'Estimar Precio'}
              </h3>
              <p className="text-[#f5f5f0]/60 text-sm">
                {language === 'ar' ? 'احصل على تقدير فوري' : 'Obtén una estimación instantánea'}
              </p>
            </Link>
            
            <Link href="/chat" className="p-8 rounded-2xl bg-[#2d5a3d]/30 border border-[#d4af37]/20 hover:border-[#d4af37] transition-all group">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">🤖</div>
              <h3 className="text-xl text-[#f5f5f0] mb-2" style={{ fontFamily: 'var(--font-amiri)' }}>
                {language === 'ar' ? 'اسأل خبير العقارات' : 'Preguntar al Experto'}
              </h3>
              <p className="text-[#f5f5f0]/60 text-sm">
                {language === 'ar' ? 'مساعد ذكي على مدار الساعة' : 'Asistente IA 24/7'}
              </p>
            </Link>
          </div>
        </div>
      </section>

      <footer className="py-8 px-4 border-t border-[#d4af37]/20">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-[#f5f5f0]/60 text-sm">
            رشيدة العائلة | Rachida Familia - منصة عقارية ذكية 🏠
          </p>
        </div>
      </footer>
    </div>
  );
}