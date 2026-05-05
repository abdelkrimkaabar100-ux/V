'use client';

import { useState, useEffect } from 'react';
import { allCities } from '@/lib/cities';

const translations = {
  ar: {
    title: 'تقدير سعر العقار',
    form: {
      city: 'المدينة',
      size: 'المساحة (متر مربع)',
      bedrooms: 'عدد الغرف',
      bathrooms: 'عدد الحمامات',
      estimate: 'احسب السعر',
    },
    result: {
      estimatedPrice: 'السعر المقدر',
      range: 'النطاق المتوقع',
      explanation: 'التفسير',
      currency: 'درهم مغربي',
    },
  },
  es: {
    title: 'Estimar Precio de Propiedad',
    form: {
      city: 'Ciudad',
      size: 'Tamaño (m²)',
      bedrooms: 'Dormitorios',
      bathrooms: 'Baños',
      estimate: 'Calcular Precio',
    },
    result: {
      estimatedPrice: 'Precio Estimado',
      range: 'Rango Esperado',
      explanation: 'Explicación',
      currency: 'EUR',
    },
  },
};

export default function EstimatePage() {
  const [language, setLanguage] = useState<'ar' | 'es'>('ar');
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState({
    city: '',
    size: '',
    bedrooms: '',
    bathrooms: '',
  });
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedLang = localStorage.getItem('language') as 'ar' | 'es' | null;
    if (savedLang) setLanguage(savedLang);
    setMounted(true);
  }, []);

  const t = translations[language];
  const moroccoCities = allCities.filter(c => c.country === 'MA');
  const spainCities = allCities.filter(c => c.country === 'ES');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const response = await fetch('/api/estimate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...formData,
        size: parseInt(formData.size),
        bedrooms: parseInt(formData.bedrooms) || 0,
        bathrooms: parseInt(formData.bathrooms) || 0,
        language,
      }),
    });
    const data = await response.json();
    setResult(data);
    setLoading(false);
  };

  if (!mounted) return null;

  return (
    <div className="pt-20 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-4xl text-[#f5f5f0] text-center mb-8" style={{ fontFamily: 'var(--font-amiri)' }}>
          {t.title}
        </h1>
        <div className="card p-6 rounded-xl mb-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[#f5f5f0]/80 mb-2">{t.form.city}</label>
              <select
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="input-field w-full rounded-lg px-3 py-2"
                required
              >
                <option value="">{t.form.city}</option>
                {moroccoCities.map(c => (
                  <option key={c.id} value={c.id}>{c.name[language]}</option>
                ))}
                {spainCities.map(c => (
                  <option key={c.id} value={c.id}>{c.name[language]}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-[#f5f5f0]/80 mb-2">{t.form.size}</label>
              <input type="number" value={formData.size} onChange={(e) => setFormData({ ...formData, size: e.target.value })} className="input-field w-full rounded-lg px-3 py-2" required />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div><label className="block text-[#f5f5f0]/80 mb-2">{t.form.bedrooms}</label><input type="number" value={formData.bedrooms} onChange={(e) => setFormData({ ...formData, bedrooms: e.target.value })} className="input-field w-full rounded-lg px-3 py-2" /></div>
              <div><label className="block text-[#f5f5f0]/80 mb-2">{t.form.bathrooms}</label><input type="number" value={formData.bathrooms} onChange={(e) => setFormData({ ...formData, bathrooms: e.target.value })} className="input-field w-full rounded-lg px-3 py-2" /></div>
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full py-3 rounded-lg">{loading ? '...' : t.form.estimate}</button>
          </form>
        </div>
        {result && (
          <div className="card p-6 rounded-xl">
            <h2 className="text-2xl text-[#f5f5f0] mb-4">{t.result.estimatedPrice}</h2>
            <p className="text-4xl text-[#d4af37] font-bold mb-2">{result.estimatedPrice?.toLocaleString()} {t.result.currency}</p>
            <p className="text-[#f5f5f0]/70 mb-4">{t.result.range}: {result.minPrice?.toLocaleString()} - {result.maxPrice?.toLocaleString()} {t.result.currency}</p>
            <div><h3 className="text-lg text-[#f5f5f0] mb-2">{t.result.explanation}</h3><p className="text-[#f5f5f0]/80 whitespace-pre-wrap">{result.explanation}</p></div>
          </div>
        )}
      </div>
    </div>
  );
}