'use client';

import { use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { poets, poems } from '@/data/poets';
import { useState } from 'react';

interface Props {
  params: Promise<{ id: string; poemId: string }>;
}

export default function PoemDetailPage({ params }: Props) {
  const { id, poemId } = use(params);
  const poet = poets.find(p => p.id === id);
  const poem = poems.find(p => p.id === poemId && p.poetId === id);
  
  const [activeTab, setActiveTab] = useState<'explanation' | 'meaning' | 'context' | 'emotions'>('explanation');
  
  if (!poet || !poem) {
    notFound();
  }

  const tabs = [
    { key: 'explanation', label: 'الشرح', icon: '📖' },
    { key: 'meaning', label: 'المعنى', icon: '💭' },
    { key: 'context', label: 'السياق', icon: '📍' },
    { key: 'emotions', label: 'المشاعر', icon: '❤️' },
  ] as const;

  return (
    <div className="pt-24 pb-16 px-4 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <Link href={`/poets/${poet.id}`} className="inline-flex items-center gap-2 text-[#d4af37] mb-8 hover:underline">
          ← العودة لـ {poet.name}
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <div className="mb-10">
              <h1 className="text-4xl text-[#f5f5f0] mb-4" style={{ fontFamily: 'var(--font-amiri)' }}>
                {poem.title}
              </h1>
              <Link href={`/poets/${poet.id}`} className="text-[#d4af37] text-lg hover:underline">
                {poet.name}
              </Link>
            </div>

            <div className="p-8 rounded-2xl bg-[#1a472a]/50 border border-[#d4af37]/20 mb-10">
              <h2 className="text-2xl text-[#d4af37] mb-6 text-center" style={{ fontFamily: 'var(--font-amiri)' }}>
                القصيدة
              </h2>
              <div className="space-y-4 text-right">
                {poem.verses.map((verse, index) => (
                  <p 
                    key={index} 
                    className="verse-quote text-xl md:text-2xl text-[#f5f5f0] leading-loose"
                    style={{ fontFamily: 'var(--font-amiri)' }}
                  >
                    {verse}
                  </p>
                ))}
              </div>
            </div>

            <div>
              <div className="flex flex-wrap gap-2 mb-6">
                {tabs.map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`px-6 py-3 rounded-lg font-medium transition-all ${
                      activeTab === tab.key
                        ? 'tab-active'
                        : 'tab-inactive'
                    }`}
                  >
                    <span className="ml-2">{tab.icon}</span>
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="p-6 rounded-xl bg-[#2d5a3d]/30 border border-[#d4af37]/20 min-h-[300px]">
                {activeTab === 'explanation' && (
                  <div className="animate-fade-in-up">
                    <h3 className="text-2xl text-[#d4af37] mb-4" style={{ fontFamily: 'var(--font-amiri)' }}>
                      📖 الشرح
                    </h3>
                    <p className="text-[#f5f5f0]/90 text-lg leading-8" style={{ fontFamily: 'var(--font-amiri)' }}>
                      {poem.explanation}
                    </p>
                  </div>
                )}
                
                {activeTab === 'meaning' && (
                  <div className="animate-fade-in-up">
                    <h3 className="text-2xl text-[#d4af37] mb-4" style={{ fontFamily: 'var(--font-amiri)' }}>
                      💭 المعنى深层
                    </h3>
                    <p className="text-[#f5f5f0]/90 text-lg leading-8" style={{ fontFamily: 'var(--font-amiri)' }}>
                      {poem.meaning}
                    </p>
                  </div>
                )}
                
                {activeTab === 'context' && (
                  <div className="animate-fade-in-up">
                    <h3 className="text-2xl text-[#d4af37] mb-4" style={{ fontFamily: 'var(--font-amiri)' }}>
                      📍 السياق
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-start gap-4 p-4 rounded-lg bg-[#1a472a]/50">
                        <span className="text-2xl">🎯</span>
                        <div>
                          <p className="text-[#d4af37] text-sm mb-1">السياق</p>
                          <p className="text-[#f5f5f0]/90">{poem.context}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4 p-4 rounded-lg bg-[#1a472a]/50">
                        <span className="text-2xl">🏛️</span>
                        <div>
                          <p className="text-[#d4af37] text-sm mb-1">المكان</p>
                          <p className="text-[#f5f5f0]/90">{poem.location}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4 p-4 rounded-lg bg-[#1a472a]/50">
                        <span className="text-2xl">📅</span>
                        <div>
                          <p className="text-[#d4af37] text-sm mb-1">المناسبة</p>
                          <p className="text-[#f5f5f0]/90">{poem.occasion}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {activeTab === 'emotions' && (
                  <div className="animate-fade-in-up">
                    <h3 className="text-2xl text-[#d4af37] mb-4" style={{ fontFamily: 'var(--font-amiri)' }}>
                      ❤️ المشاعر
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {poem.emotions.map((emotion, index) => (
                        <span 
                          key={index}
                          className="px-4 py-2 rounded-full bg-[#d4af37]/20 border border-[#d4af37] text-[#d4af37] text-lg"
                        >
                          {emotion}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="p-6 rounded-2xl bg-[#2d5a3d]/30 border border-[#d4af37]/20 mb-6">
                <h3 className="text-xl text-[#f5f5f0] mb-4" style={{ fontFamily: 'var(--font-amiri)' }}>
                  معلومات القصيدة
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">✒️</span>
                    <div>
                      <p className="text-[#d4af37] text-xs">الشاعر</p>
                      <p className="text-[#f5f5f0]">{poet.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🏛️</span>
                    <div>
                      <p className="text-[#d4af37] text-xs">العصر</p>
                      <p className="text-[#f5f5f0]">{poet.era}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">📝</span>
                    <div>
                      <p className="text-[#d4af37] text-xs">عدد الأبيات</p>
                      <p className="text-[#f5f5f0]">{poem.verses.length} أبيات</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-[#1a472a]/50 border border-[#d4af37]/10">
                <h3 className="text-xl text-[#f5f5f0] mb-4" style={{ fontFamily: 'var(--font-amiri)' }}>
                  قصائد أخرى للشاعر
                </h3>
                <div className="space-y-3">
                  {poems.filter(p => p.poetId === id && p.id !== poemId).slice(0, 3).map((p) => (
                    <Link
                      key={p.id}
                      href={`/poets/${poet.id}/poems/${p.id}`}
                      className="block p-3 rounded-lg bg-[#2d5a3d]/30 hover:bg-[#2d5a3d]/50 transition-colors"
                    >
                      <p className="text-[#f5f5f0] text-sm">{p.title}</p>
                      <p className="text-[#f5f5f0]/50 text-xs mt-1">{p.occasion}</p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}