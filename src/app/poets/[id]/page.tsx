'use client';

import { use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { poets, poems } from '@/data/poets';

interface Props {
  params: Promise<{ id: string }>;
}

export default function PoetDetailPage({ params }: Props) {
  const { id } = use(params);
  const poet = poets.find(p => p.id === id);
  
  if (!poet) {
    notFound();
  }
  
  const poetPoems = poems.filter(p => p.poetId === id);

  return (
    <div className="pt-24 pb-16 px-4 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <Link href="/poets" className="inline-flex items-center gap-2 text-[#d4af37] mb-8 hover:underline">
          ← العودة للشعراء
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="p-8 rounded-2xl bg-[#2d5a3d]/30 border border-[#d4af37]/20 text-center">
                <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-[#d4af37]/20 flex items-center justify-center text-6xl">
                  {poet.portraitEmoji}
                </div>
                
                <h1 className="text-3xl text-[#f5f5f0] mb-2" style={{ fontFamily: 'var(--font-amiri)' }}>
                  {poet.name}
                </h1>
                <p className="text-[#d4af37] text-lg mb-2">{poet.title}</p>
                <span className="badge badge-gold mb-4">{poet.era}</span>
                
                <div className="text-[#f5f5f0]/60 text-sm mb-6">
                  <p>تاريخ الميلاد: {poet.birthYear}</p>
                  <p>تاريخ الوفاة: {poet.deathYear}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="mb-10">
              <h2 className="text-2xl text-[#f5f5f0] mb-6 flex items-center gap-4" style={{ fontFamily: 'var(--font-amiri)' }}>
                <span className="w-1 h-8 bg-[#d4af37] rounded-full"></span>
                نبذة عن الشاعر
              </h2>
              <div className="p-6 rounded-xl bg-[#1a472a]/50 border border-[#d4af37]/10">
                <p className="text-[#f5f5f0]/90 leading-8 text-lg" style={{ fontFamily: 'var(--font-amiri)' }}>
                  {poet.biography}
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl text-[#f5f5f0] mb-6 flex items-center gap-4" style={{ fontFamily: 'var(--font-amiri)' }}>
                <span className="w-1 h-8 bg-[#d4af37] rounded-full"></span>
                القصائد ({poetPoems.length})
              </h2>
              
              <div className="space-y-4">
                {poetPoems.map((poem, index) => (
                  <Link
                    key={poem.id}
                    href={`/poets/${poet.id}/poems/${poem.id}`}
                    className="poem-card block p-6 rounded-xl"
                  >
                    <h3 className="text-xl text-[#f5f5f0] mb-3" style={{ fontFamily: 'var(--font-amiri)' }}>
                      {poem.title}
                    </h3>
                    <p className="text-[#f5f5f0]/60 text-sm mb-4 line-clamp-2">
                      {poem.verses[0]}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {poem.occasion && (
                        <span className="badge badge-green text-xs">{poem.occasion}</span>
                      )}
                      {poem.location && (
                        <span className="badge badge-green text-xs">{poem.location}</span>
                      )}
                      <span className="text-[#d4af37] mr-auto">→ المزيد</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}