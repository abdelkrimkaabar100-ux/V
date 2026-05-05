'use client';

import { useState, useEffect } from 'react';
import { allCities } from '@/lib/cities';

const translations = {
  ar: {
    title: 'العقارات المتاحة',
    filters: {
      city: 'المدينة',
      type: 'نوع العقار',
      minPrice: 'أقل سعر',
      maxPrice: 'أعلى سعر',
      minSize: 'أقل مساحة',
    },
    buttons: {
      filter: 'تصفية',
      reset: 'إعادة ضبط',
    },
    results: 'عقار',
    noResults: 'لم يتم العثور على عقارات',
    demo: 'عرض توضيحي - البيانات الحية تتطلب توصيل قاعدة بيانات',
  },
  es: {
    title: 'Propiedades Disponibles',
    filters: {
      city: 'Ciudad',
      type: 'Tipo',
      minPrice: 'Precio Mín',
      maxPrice: 'Precio Máx',
      minSize: 'Tamaño Mín',
    },
    buttons: {
      filter: 'Filtrar',
      reset: 'Resetear',
    },
    results: 'propiedades',
    noResults: 'No se encontraron propiedades',
    demo: 'Demostración - Los datos reales requieren conexión a base de datos',
  },
};

export default function PropertiesPage() {
  const [language, setLanguage] = useState<'ar' | 'es'>('ar');
  const [mounted, setMounted] = useState(false);
  const [filters, setFilters] = useState({
    city: '',
    type: '',
    minPrice: '',
    maxPrice: '',
    minSize: '',
  });

  useEffect(() => {
    const savedLang = localStorage.getItem('language') as 'ar' | 'es' | null;
    if (savedLang) setLanguage(savedLang);
    setMounted(true);
  }, []);

  const t = translations[language];

  const moroccoCities = allCities.filter(c => c.country === 'MA');
  const spainCities = allCities.filter(c => c.country === 'ES');

  if (!mounted) return null;

  return (
    <div className="pt-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl text-[#f5f5f0] text-center mb-8" style={{ fontFamily: 'var(--font-amiri)' }}>
          {t.title}
        </h1>

        <div className="card p-6 rounded-xl mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <select
              value={filters.city}
              onChange={(e) => setFilters({ ...filters, city: e.target.value })}
              className="input-field rounded-lg px-3 py-2"
            >
              <option value="">{t.filters.city}</option>
              <optgroup label={language === 'ar' ? 'المغرب' : 'Marruecos'}>
                {moroccoCities.map(c => (
                  <option key={c.id} value={c.id}>{c.name[language]}</option>
                ))}
              </optgroup>
              <optgroup label={language === 'ar' ? 'إسبانيا' : 'España'}>
                {spainCities.map(c => (
                  <option key={c.id} value={c.id}>{c.name[language]}</option>
                ))}
              </optgroup>
            </select>

            <select
              value={filters.type}
              onChange={(e) => setFilters({ ...filters, type: e.target.value })}
              className="input-field rounded-lg px-3 py-2"
            >
              <option value="">{t.filters.type}</option>
              <option value="sale">{language === 'ar' ? 'للبيع' : 'Venta'}</option>
              <option value="rent">{language === 'ar' ? 'للإيجار' : 'Alquiler'}</option>
            </select>

            <input
              type="number"
              placeholder={t.filters.minPrice}
              value={filters.minPrice}
              onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
              className="input-field rounded-lg px-3 py-2"
            />

            <input
              type="number"
              placeholder={t.filters.maxPrice}
              value={filters.maxPrice}
              onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
              className="input-field rounded-lg px-3 py-2"
            />

            <input
              type="number"
              placeholder={t.filters.minSize}
              value={filters.minSize}
              onChange={(e) => setFilters({ ...filters, minSize: e.target.value })}
              className="input-field rounded-lg px-3 py-2"
            />
          </div>
        </div>

        <div className="text-center py-16">
          <p className="text-[#f5f5f0]/60 mb-4">{t.noResults}</p>
          <p className="text-[#f5f5f0]/40 text-sm">{t.demo}</p>
          <a href="/sell" className="btn-primary px-6 py-2 rounded-lg inline-block mt-6">
            {language === 'ar' ? 'أضف عقارك الأول' : 'Agrega tu primera propiedad'}
          </a>
        </div>
      </div>
    </div>
  );
}