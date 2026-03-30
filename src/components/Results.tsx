"use client";

import { Vitamin } from "@/data/vitamins";

interface ResultsProps {
  results: Map<Vitamin, number>;
  onBack: () => void;
}

function getScoreLabel(score: number): { label: string; color: string } {
  if (score >= 4) return { label: "نقص شديد", color: "bg-red-500" };
  if (score >= 3) return { label: "نقص متوسط", color: "bg-orange-500" };
  if (score >= 2) return { label: "نقص محتمل", color: "bg-yellow-500" };
  return { label: "نقص طفيف", color: "bg-emerald-500" };
}

function getScoreWidth(score: number, maxScore: number): string {
  const percentage = Math.round((score / maxScore) * 100);
  return `${Math.max(percentage, 20)}%`;
}

export function Results({ results, onBack }: ResultsProps) {
  const entries = [...results.entries()];
  const maxScore = entries.length > 0 ? entries[0][1] : 1;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <header className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-500 rounded-full mb-4 shadow-lg">
          <span className="text-4xl">📊</span>
        </div>
        <h1 className="text-3xl font-bold text-emerald-800 mb-2">
          نتائج التحليل
        </h1>
        <p className="text-gray-600">
          بناءً على الأعراض التي اخترتها، إليك الفيتامينات والعناصر التي قد
          تحتاجها:
        </p>
      </header>

      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <span>🔬</span>
          <span>الأولويات العالية</span>
        </h2>
        <div className="space-y-4">
          {entries.map(([vitamin, score]) => {
            const { label, color } = getScoreLabel(score);
            return (
              <div
                key={vitamin.id}
                className="bg-gray-50 rounded-xl p-4 border border-gray-100"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{vitamin.icon}</span>
                    <div>
                      <h3 className="font-bold text-gray-800 text-lg">
                        {vitamin.name}
                      </h3>
                      <span
                        className={`inline-block text-white text-xs px-2 py-1 rounded-full ${color}`}
                      >
                        {label}
                      </span>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">
                    مرتبط بـ {score} {score === 1 ? "عرض" : score === 2 ? "عرضين" : "أعراض"}
                  </span>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                  <div
                    className={`h-2 rounded-full ${color} transition-all duration-500`}
                    style={{ width: getScoreWidth(score, maxScore) }}
                  />
                </div>

                <p className="text-gray-600 text-sm mb-3">
                  {vitamin.description}
                </p>

                <div>
                  <span className="text-sm font-medium text-gray-700">
                    مصادر غذائية:
                  </span>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {vitamin.sources.map((source) => (
                      <span
                        key={source}
                        className="bg-emerald-100 text-emerald-700 text-xs px-3 py-1 rounded-full"
                      >
                        {source}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-8">
        <div className="flex items-start gap-3">
          <span className="text-2xl">⚠️</span>
          <div>
            <h3 className="font-bold text-amber-800 mb-1">تنبيه مهم</h3>
            <p className="text-amber-700 text-sm">
              هذا التطبيق لأغراض إعلامية فقط ولا يغني عن استشارة الطبيب. يُنصح
              بإجراء فحوصات دم شاملة للتأكد من حالة الفيتامينات والعناصر في الجسم
              قبل تناول أي مكملات غذائية.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={onBack}
          className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg transition-colors duration-200 text-center"
        >
          تحليل جديد
        </button>
        <button
          onClick={() => {
            const text = entries
              .map(
                ([v, s]) =>
                  `${v.icon} ${v.name} - ${
                    s >= 4
                      ? "نقص شديد"
                      : s >= 3
                      ? "نقص متوسط"
                      : s >= 2
                      ? "نقص محتمل"
                      : "نقص طفيف"
                  }`
              )
              .join("\n");
            const shareText = `نتائج تحليل الفيتامينات:\n\n${text}\n\n⚠️ هذا التطبيق لأغراض إعلامية فقط`;
            if (navigator.share) {
              navigator.share({ text: shareText });
            } else {
              navigator.clipboard.writeText(shareText);
            }
          }}
          className="flex-1 bg-white border-2 border-emerald-500 text-emerald-600 hover:bg-emerald-50 font-bold py-3 px-6 rounded-xl shadow transition-colors duration-200 text-center"
        >
          مشاركة النتائج
        </button>
      </div>
    </div>
  );
}
