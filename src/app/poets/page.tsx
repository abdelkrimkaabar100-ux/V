'use client';

import Link from 'next/link';
import { poets } from '@/data/poets';

export default function PoetsPage() {
  return (
    <div className="pt-24 pb-16 px-4 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl text-[#f5f5f0] mb-4" style={{ fontFamily: 'var(--font-amiri)' }}>
            شعراء عصر النبوة
          </h1>
          <p className="text-[#f5f5f0]/70 text-lg max-w-2xl mx-auto">
            تعرف على شعراء المسلمين الذين عاصروا النبي صلى الله عليه وسلم وتأثروا بإسلامهم
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {poets.map((poet, index) => (
            <Link 
              key={poet.id} 
              href={`/poets/${poet.id}`}
              className={`poet-card p-8 rounded-2xl border border-[#d4af37]/20 animate-fade-in-up opacity-0`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start gap-6">
                <div className="w-24 h-24 rounded-full bg-[#d4af37]/20 flex items-center justify-center text-5xl flex-shrink-0">
                  {poet.portraitEmoji}
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl text-[#f5f5f0] mb-2" style={{ fontFamily: 'var(--font-amiri)' }}>
                    {poet.name}
                  </h2>
                  <p className="text-[#d4af37] text-sm mb-2">{poet.title}</p>
                  <span className="badge badge-gold text-xs">{poet.era}</span>
                  <p className="text-[#f5f5f0]/50 text-xs mt-3">
                    {poet.birthYear} - {poet.deathYear}
                  </p>
                </div>
              </div>
              <p className="text-[#f5f5f0]/60 text-sm mt-6 line-clamp-3">
                {poet.biography}
              </p>
              <div className="mt-6 text-[#d4af37] text-sm text-left">
                ← عرض القصائد
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}