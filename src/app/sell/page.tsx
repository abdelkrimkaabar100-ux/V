'use client';

import { useState, useEffect } from 'react';
import { allCities } from '@/lib/cities';

const translations = {
  ar: {
    title: 'أضف عقارك للبيع',
    description: 'املأ النموذج وسنقوم بإنشاء وصف احترافي لعقارك',
    city: 'المدينة',
    size: 'المساحة (متر مربع)',
    bedrooms: 'عدد الغرف',
    bathrooms: 'عدد الحمامات',
    propertyType: 'نوع العقار',
    details: 'تفاصيل إضافية',
    generate: 'إنشاء الوصف',
    generatedTitle: 'العنوان المُنشأ',
    generatedDescription: 'الوصف المُنشأ',
    success: 'تم حفظ العقار بنجاح!',
  },
  es: {
    title: 'Agregar tu Propiedad',
    description: 'Completa el formulario y generaremos una descripción profesional para tu propiedad',
    city: 'Ciudad',
    size: 'Tamaño (m²)',
    bedrooms: 'Dormitorios',
    bathrooms: 'Baños',
    propertyType: 'Tipo de Propiedad',
    details: 'Detalles Adicionales',
    generate: 'Generar Descripción',
    generatedTitle: 'Título Generado',
    generatedDescription: 'Descripción Generada',
    success: '¡Propiedad guardada exitosamente!',
  },
};

export default function SellPage() {
  const [language, setLanguage] = useState<'ar' | 'es'>('ar');
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState({
    city: '',
    size: '',
    bedrooms: '',
    bathrooms: '',
    propertyType: 'apartment',
    additionalDetails: '',
  });
  const [generated, setGenerated] = useState<{ title: string; description: string } | null>(null);
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

    const response = await fetch('/api/property', {
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
    setGenerated({ title: data.property.title, description: data.property.description });
    setLoading(false);
  };

  if (!mounted) return null;

  return (
    <div className="pt-20 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-4xl text-[#f5f5f0] text-center mb-4" style={{ fontFamily: 'var(--font-amiri)' }}>
          {t.title}
        </h1>
        <p className="text-[#f5f5f0]/60 text-center mb-8">{t.description}</p>

        <div className="card p-6 rounded-xl mb-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[#f5f5f0]/80 mb-2">{t.city}</label>
              <select
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="input-field w-full rounded-lg px-3 py-2"
                required
              >
                <option value="">{t.city}</option>
                {moroccoCities.map(c => (
                  <option key={c.id} value={c.id}>{c.name[language]}</option>
                ))}
                {spainCities.map(c => (
                  <option key={c.id} value={c.id}>{c.name[language]}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[#f5f5f0]/80 mb-2">{t.size}</label>
              <input
                type="number"
                value={formData.size}
                onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                className="input-field w-full rounded-lg px-3 py-2"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[#f5f5f0]/80 mb-2">{t.bedrooms}</label>
                <input
                  type="number"
                  value={formData.bedrooms}
                  onChange={(e) => setFormData({ ...formData, bedrooms: e.target.value })}
                  className="input-field w-full rounded-lg px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-[#f5f5f0]/80 mb-2">{t.bathrooms}</label>
                <input
                  type="number"
                  value={formData.bathrooms}
                  onChange={(e) => setFormData({ ...formData, bathrooms: e.target.value })}
                  className="input-field w-full rounded-lg px-3 py-2"
                />
              </div>
            </div>

            <div>
              <label className="block text-[#f5f5f0]/80 mb-2">{t.propertyType}</label>
              <select
                value={formData.propertyType}
                onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                className="input-field w-full rounded-lg px-3 py-2"
              >
                <option value="apartment">{language === 'ar' ? 'شقة' : 'Apartamento'}</option>
                <option value="house">{language === 'ar' ? 'منزل' : 'Casa'}</option>
                <option value="villa">{language === 'ar' ? 'فيلا' : 'Villa'}</option>
                <option value="land">{language === 'ar' ? 'أرض' : 'Terreno'}</option>
              </select>
            </div>

            <div>
              <label className="block text-[#f5f5f0]/80 mb-2">{t.details}</label>
              <textarea
                value={formData.additionalDetails}
                onChange={(e) => setFormData({ ...formData, additionalDetails: e.target.value })}
                className="input-field w-full rounded-lg px-3 py-2"
                rows={3}
              />
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full py-3 rounded-lg">
              {loading ? '...' : t.generate}
            </button>
          </form>
        </div>

        {generated && (
          <div className="card p-6 rounded-xl">
            <h2 className="text-xl text-[#d4af37] mb-4">{t.generatedTitle}</h2>
            <p className="text-lg text-[#f5f5f0] mb-4">{generated.title}</p>
            <h3 className="text-xl text-[#d4af37] mb-2">{t.generatedDescription}</h3>
            <p className="text-[#f5f5f0]/80 whitespace-pre-wrap">{generated.description}</p>
            <p className="text-[#d4af37] mt-4">{t.success}</p>
          </div>
        )}
      </div>
    </div>
  );
}