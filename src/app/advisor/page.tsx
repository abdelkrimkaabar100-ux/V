'use client';

import { useState, useEffect } from 'react';
import { allCities } from '@/lib/cities';

const translations = {
  ar: {
    title: 'المستشار المالي',
    description: 'أدخل ميزانيتك واحصل على توصيات مخصصة',
    budget: 'الميزانية (درهم مغربي)',
    getAdvice: 'احصل على النصيحة',
    affordableCities: 'المدن المناسبة للميزانية',
    recommendedSize: 'المساحة الموصى بها',
    explanation: 'التفسير',
    sizeM2: 'متر مربع',
  },
  es: {
    title: 'Asesor Financiero',
    description: 'Ingresa tu presupuesto y obtén recomendaciones personalizadas',
    budget: 'Presupuesto (EUR)',
    getAdvice: 'Obtener Consejo',
    affordableCities: 'Ciudades Asequibles',
    recommendedSize: 'Tamaño Recomendado',
    explanation: 'Explicación',
    sizeM2: 'm²',
  },
};

export default function AdvisorPage() {
  const [language, setLanguage] = useState<'ar' | 'es'>('ar');
  const [mounted, setMounted] = useState(false);
  const [budget, setBudget] = useState('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedLang = localStorage.getItem('language') as 'ar' | 'es' | null;
    if (savedLang) setLanguage(savedLang);
    setMounted(true);
  }, []);

  const t = translations[language];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const response = await fetch('/api/advice', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ budget: parseFloat(budget), language }),
    });
    const data = await response.json();
    setResult(data);
    setLoading(false);
  };

  if (!mounted) return null;

  return (
    <div className="pt-20 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-4xl text-[#f5f5f0] text-center mb-4" style={{ fontFamily: 'var(--font-amiri)' }}>
          {t.title}
        </h1>
        <p className="text-[#f5f5f0]/60 text-center mb-8">{t.description}</p>

        <div className="card p-6 rounded-xl mb-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[#f5f5f0]/80 mb-2">{t.budget}</label>
              <input
                type="number"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="input-field w-full rounded-lg px-3 py-2"
                placeholder="1000000"
                required
              />
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full py-3 rounded-lg">
              {loading ? '...' : t.getAdvice}
            </button>
          </form>
        </div>

        {result && (
          <div className="card p-6 rounded-xl">
            <h2 className="text-2xl text-[#f5f5f0] mb-4">{t.affordableCities}</h2>
            <div className="flex flex-wrap gap-2 mb-4">
              {result.affordableCities?.map((c: any) => (
                <span key={c.id} className="badge badge-gold">{c.name[language]}</span>
              ))}
            </div>
            <p className="text-lg text-[#d4af37] mb-2">{t.recommendedSize}: {result.recommendedSize} {t.sizeM2}</p>
            <div>
              <h3 className="text-lg text-[#f5f5f0] mb-2">{t.explanation}</h3>
              <p className="text-[#f5f5f0]/80 whitespace-pre-wrap">{result.explanation}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}