'use client';

import Link from 'next/link';
import { poets, poems } from '@/data/poets';

export default function Home() {
  const featuredPoets = poets.slice(0, 4);
  const featuredPoems = poems.slice(0, 4);

  return (
    <div className="pt-20">
      <section className="relative py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block mb-6 px-4 py-1 bg-[#d4af37]/20 rounded-full border border-[#d4af37]/30">
            <span className="text-[#d4af37] text-sm">✨ منصة تعليمية وترفيهية</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl mb-6 text-[#f5f5f0]" style={{ fontFamily: 'var(--font-amiri)' }}>
            رحيق诗词
          </h1>
          
          <p className="text-xl md:text-2xl text-[#f5f5f0]/80 mb-8 leading-relaxed" style={{ fontFamily: 'var(--font-amiri)' }}>
            استكشف عُمق الشعر العربي الإسلامي
          </p>
          
          <p className="text-lg text-[#f5f5f0]/60 mb-10 max-w-2xl mx-auto">
            اكتشف قصائد الصحابة والتابعين، تغوص في معناها وسياقها ومشاعرها. 
            تعلم كيف تكتب شعراً عربياً أصيلاً بطريقة ممتعة وتفاعلية.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/poets" className="btn-gold px-8 py-3 rounded-lg text-lg">
              استكشف الشعراء
            </Link>
            <Link href="/learn" className="px-8 py-3 rounded-lg border border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37]/10 transition-colors">
              تعلم الشعر
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-1 h-10 bg-[#d4af37] rounded-full"></div>
            <h2 className="text-3xl text-[#f5f5f0]" style={{ fontFamily: 'var(--font-amiri)' }}>
              الشعراء المميزون
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredPoets.map((poet, index) => (
              <Link 
                key={poet.id} 
                href={`/poets/${poet.id}`}
                className={`poet-card p-6 rounded-2xl border border-[#d4af37]/20 animate-fade-in-up opacity-0`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-[#d4af37]/20 flex items-center justify-center text-4xl">
                  {poet.portraitEmoji}
                </div>
                <h3 className="text-xl text-[#f5f5f0] text-center mb-2" style={{ fontFamily: 'var(--font-amiri)' }}>
                  {poet.name}
                </h3>
                <p className="text-center text-[#d4af37] text-sm mb-2">{poet.title}</p>
                <span className="badge badge-gold text-center block mx-auto w-fit">{poet.era}</span>
              </Link>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/poets" className="text-[#d4af37] hover:underline text-lg">
              عرض جميع الشعراء →
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-[#0d2b1a]/50">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-1 h-10 bg-[#d4af37] rounded-full"></div>
            <h2 className="text-3xl text-[#f5f5f0]" style={{ fontFamily: 'var(--font-amiri)' }}>
              القصائد المختارة
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredPoems.map((poem, index) => {
              const poet = poets.find(p => p.id === poem.poetId);
              return (
                <Link 
                  key={poem.id} 
                  href={`/poets/${poet?.id}/poems/${poem.id}`}
                  className={`poem-card p-6 rounded-xl animate-fade-in-up opacity-0`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <h3 className="text-xl text-[#f5f5f0] mb-3" style={{ fontFamily: 'var(--font-amiri)' }}>
                    {poem.title}
                  </h3>
                  <p className="text-[#f5f5f0]/70 text-sm mb-4 line-clamp-2">
                    {poem.verses[0]}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {poem.context && (
                      <span className="badge badge-green text-xs">{poem.context}</span>
                    )}
                    {poem.location && (
                      <span className="badge badge-green text-xs">{poem.location}</span>
                    )}
                    <span className="text-[#d4af37] text-sm mr-auto">
                      ← {poet?.name}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl text-[#f5f5f0] mb-8" style={{ fontFamily: 'var(--font-amiri)' }}>
            ماذا تريد أن تفعل؟
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/poets" className="p-8 rounded-2xl bg-[#2d5a3d]/30 border border-[#d4af37]/20 hover:border-[#d4af37] transition-all group">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">📚</div>
              <h3 className="text-xl text-[#f5f5f0] mb-2" style={{ fontFamily: 'var(--font-amiri)' }}>استكشف</h3>
              <p className="text-[#f5f5f0]/60 text-sm">تصفح قصائد الشعراء المسلمين</p>
            </Link>
            
            <Link href="/write" className="p-8 rounded-2xl bg-[#2d5a3d]/30 border border-[#d4af37]/20 hover:border-[#d4af37] transition-all group">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">✍️</div>
              <h3 className="text-xl text-[#f5f5f0] mb-2" style={{ fontFamily: 'var(--font-amiri)' }}>أكتب</h3>
              <p className="text-[#f5f5f0]/60 text-sm">اكتب قصائدك الخاصة بمساعدة</p>
            </Link>
            
            <Link href="/learn" className="p-8 rounded-2xl bg-[#2d5a3d]/30 border border-[#d4af37]/20 hover:border-[#d4af37] transition-all group">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">🎮</div>
              <h3 className="text-xl text-[#f5f5f0] mb-2" style={{ fontFamily: 'var(--font-amiri)' }}>تعلم</h3>
              <p className="text-[#f5f5f0]/60 text-sm">تعلم الشعر بطريقة لعب ممتعة</p>
            </Link>
          </div>
        </div>
      </section>

      <footer className="py-8 px-4 border-t border-[#d4af37]/20">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-[#f5f5f0]/60 text-sm">
            رحيق诗词 - منصة الشعر العربي الإسلامي 🏛️
          </p>
          <p className="text-[#f5f5f0]/40 text-xs mt-2">
            لتعلم وتعلّم وإحياء تراث الشعر العربي الإسلامي
          </p>
        </div>
      </footer>
    </div>
  );
}