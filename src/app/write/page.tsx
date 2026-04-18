'use client';

import { useState } from 'react';
import { poets } from '@/data/poets';

const prompts = [
  {
    title: 'مدح النبي ﷺ',
    template: 'يا نبيّ __________|صلى الله عليكَ|ما ______|وَأَنتَ ______',
    hint: 'فكر في صفات النبي صلى الله عليه وسلم'
  },
  {
    title: 'الإسلام',
    template: 'أَسْلَمْتُ وَصِرْتُ|في نورِ الدينِ|أَحْمَدُ ربي|على نعمةِ _____',
    hint: 'ما النعمة التي تشكرها؟'
  },
  {
    title: 'الجهاد',
    template: 'نحنُ إخوةُ ______|نقاتلُ في ______|لا نخافُ ______|نموتُ كراماً',
    hint: 'فكر في قيم المجاهدين'
  },
  {
    title: 'الحنين',
    template: 'يا مدينةَ ______|أَحْنُ إِلَيْكِ|وَأَذْكُرُ ______|وَأَبْكِي على ______',
    hint: 'أي مدينة تحن إليها؟'
  }
];

const templates = [
  {
    name: 'قصيدة قصيرة',
    pattern: 'مُستفعلن فاعلن مُستفعلن فعلان',
    example: 'في رَبيعِ жизни الجديدة|نرى ضوءاً جديداً|نحمدُ ربّ السماوات|على كلّ النعم'
  },
  {
    name: 'بيت واحد',
    pattern: 'فاعلاتن مستفعلن فاعلاتن',
    example: 'أَلا يا ربيعَ الأُبَّدِ|أنتَ فَوْتُ العُمرِ والسَّنَدِ'
  }
];

export default function WritePage() {
  const [selectedPrompt, setSelectedPrompt] = useState(0);
  const [poemLines, setPoemLines] = useState<string[]>(['', '', '', '']);
  const [selectedTemplate, setSelectedTemplate] = useState(0);
  const [showExamples, setShowExamples] = useState(false);
  const [savedPoems, setSavedPoems] = useState<string[]>([]);

  const updateLine = (index: number, value: string) => {
    const newLines = [...poemLines];
    newLines[index] = value;
    setPoemLines(newLines);
  };

  const savePoem = () => {
    const poem = poemLines.filter(l => l.trim()).join('\n');
    if (poem) {
      setSavedPoems([...savedPoems, poem]);
      setPoemLines(['', '', '', '']);
    }
  };

  const loadExample = () => {
    setPoemLines(templates[selectedTemplate].example.split('|'));
  };

  return (
    <div className="pt-24 pb-16 px-4 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl text-[#f5f5f0] mb-4" style={{ fontFamily: 'var(--font-amiri)' }}>
            أكتب قصيدتك 🎨
          </h1>
          <p className="text-[#f5f5f0]/70 text-lg">
            اكتب شعراً عربياً بإلهام من القصائد الإسلامية العظيمة
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <div className="p-6 rounded-2xl bg-[#2d5a3d]/30 border border-[#d4af37]/20 mb-6">
              <h2 className="text-2xl text-[#f5f5f0] mb-4" style={{ fontFamily: 'var(--font-amiri)' }}>
                اختر موضوعاً
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {prompts.map((prompt, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedPrompt(index)}
                    className={`p-4 rounded-xl text-right transition-all ${
                      selectedPrompt === index
                        ? 'bg-[#d4af37] text-[#0a0a0a]'
                        : 'bg-[#1a472a]/50 text-[#f5f5f0] hover:bg-[#2d5a3d]'
                    }`}
                  >
                    <span className="block font-medium">{prompt.title}</span>
                  </button>
                ))}
              </div>
              <p className="text-[#f5f5f0]/60 text-sm mt-4">
                💡 {prompts[selectedPrompt].hint}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#2d5a3d]/30 border border-[#d4af37]/20 mb-6">
              <h2 className="text-2xl text-[#f5f5f0] mb-4" style={{ fontFamily: 'var(--font-amiri)' }}>
                القافية والوزن
              </h2>
              <div className="space-y-3 mb-4">
                {templates.map((t, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedTemplate(index)}
                    className={`w-full p-4 rounded-xl text-right transition-all ${
                      selectedTemplate === index
                        ? 'bg-[#d4af37] text-[#0a0a0a]'
                        : 'bg-[#1a472a]/50 text-[#f5f5f0] hover:bg-[#2d5a3d]'
                    }`}
                  >
                    <span className="block font-medium">{t.name}</span>
                    <span className="text-xs opacity-70">{t.pattern}</span>
                  </button>
                ))}
              </div>
              <button
                onClick={() => setShowExamples(!showExamples)}
                className="text-[#d4af37] text-sm hover:underline"
              >
                {showExamples ? '← إخفاء الأمثلة' : '← عرض أمثلة'}
              </button>
              {showExamples && (
                <div className="mt-4 p-4 rounded-lg bg-[#1a472a]/50">
                  <p className="text-[#f5f5f0]/80 text-sm font-mono">
                    {templates[selectedTemplate].example.split('|').map((line, i) => (
                      <span key={i} className="block">{line}</span>
                    ))}
                  </p>
                </div>
              )}
            </div>

            <button
              onClick={loadExample}
              className="w-full p-4 rounded-xl bg-[#d4af37]/20 border border-[#d4af37]/50 text-[#d4af37] hover:bg-[#d4af37]/30 transition-colors mb-6"
            >
              🎯 استلهم من مثال
            </button>
          </div>

          <div>
            <div className="p-6 rounded-2xl bg-[#1a472a]/50 border border-[#d4af37]/20">
              <h2 className="text-2xl text-[#f5f5f0] mb-6" style={{ fontFamily: 'var(--font-amiri)' }}>
                ✍️ اكتب أبياتك
              </h2>
              <div className="space-y-4">
                {poemLines.map((line, index) => (
                  <div key={index} className="relative">
                    <label className="block text-[#d4af37] text-sm mb-2">
                      البيت {index + 1}
                    </label>
                    <textarea
                      value={line}
                      onChange={(e) => updateLine(index, e.target.value)}
                      placeholder={`اكتب البيت ${index + 1}...`}
                      className="input-arabic w-full p-4 rounded-xl text-lg min-h-[80px] resize-none"
                      style={{ fontFamily: 'var(--font-amiri)' }}
                    />
                  </div>
                ))}
              </div>

              <div className="flex gap-4 mt-6">
                <button
                  onClick={savePoem}
                  className="flex-1 btn-gold py-3 rounded-xl font-medium"
                >
                  💾 حفظ
                </button>
                <button
                  onClick={() => setPoemLines(['', '', '', ''])}
                  className="flex-1 py-3 rounded-xl border border-[#d4af37]/50 text-[#d4af37] hover:bg-[#d4af37]/10 transition-colors"
                >
                  🔄 مسح
                </button>
              </div>
            </div>

            {savedPoems.length > 0 && (
              <div className="mt-6 p-6 rounded-2xl bg-[#2d5a3d]/30 border border-[#d4af37]/20">
                <h3 className="text-xl text-[#f5f5f0] mb-4" style={{ fontFamily: 'var(--font-amiri)' }}>
                  قصائدي المحفوظة ({savedPoems.length})
                </h3>
                <div className="space-y-3">
                  {savedPoems.map((poem, index) => (
                    <div key={index} className="p-4 rounded-lg bg-[#1a472a]/50">
                      <p className="text-[#f5f5f0] text-sm whitespace-pre-line" style={{ fontFamily: 'var(--font-amiri)' }}>
                        {poem}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}