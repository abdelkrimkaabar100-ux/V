"use client";

import { useState } from "react";
import { categories, symptoms, analyzeSymptoms } from "@/data/vitamins";
import { Results } from "@/components/Results";

export default function Home() {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);

  const toggleSymptom = (symptomId: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptomId)
        ? prev.filter((id) => id !== symptomId)
        : [...prev, symptomId]
    );
  };

  const handleAnalyze = () => {
    if (selectedSymptoms.length > 0) {
      setShowResults(true);
    }
  };

  const handleReset = () => {
    setSelectedSymptoms([]);
    setShowResults(false);
  };

  if (showResults) {
    const results = analyzeSymptoms(selectedSymptoms);
    return (
      <main className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
        <Results results={results} onBack={handleReset} />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 pb-32">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <header className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-500 rounded-full mb-4 shadow-lg">
            <span className="text-4xl">💊</span>
          </div>
          <h1 className="text-4xl font-bold text-emerald-800 mb-3">
            محلل الفيتامينات
          </h1>
          <p className="text-lg text-gray-600 max-w-xl mx-auto">
            اختر الأعراض التي تعاني منها وسنخبرك بالفيتامينات والعناصر التي
            تحتاجها
          </p>
          {selectedSymptoms.length > 0 && (
            <div className="mt-4 inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium">
              <span>✅</span>
              <span>تم اختيار {selectedSymptoms.length} عرض</span>
            </div>
          )}
        </header>

        <div className="space-y-8">
          {categories.map((category) => {
            const categorySymptoms = symptoms.filter(
              (s) => s.category === category.id
            );
            if (categorySymptoms.length === 0) return null;

            return (
              <section key={category.id} className="bg-white rounded-2xl shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <span className="text-2xl">{category.icon}</span>
                  <span>{category.name}</span>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {categorySymptoms.map((symptom) => {
                    const isSelected = selectedSymptoms.includes(symptom.id);
                    return (
                      <button
                        key={symptom.id}
                        onClick={() => toggleSymptom(symptom.id)}
                        className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all duration-200 text-right ${
                          isSelected
                            ? "border-emerald-500 bg-emerald-50 shadow-sm"
                            : "border-gray-200 hover:border-emerald-300 hover:bg-gray-50"
                        }`}
                      >
                        <span className="text-2xl">{symptom.icon}</span>
                        <span
                          className={`font-medium ${
                            isSelected ? "text-emerald-700" : "text-gray-700"
                          }`}
                        >
                          {symptom.name}
                        </span>
                        <span className="mr-auto">
                          {isSelected ? (
                            <span className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                              <svg
                                className="w-4 h-4 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={3}
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            </span>
                          ) : (
                            <span className="w-6 h-6 border-2 border-gray-300 rounded-full" />
                          )}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>

        {selectedSymptoms.length > 0 && (
          <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-200 p-4 shadow-2xl">
            <div className="container mx-auto max-w-4xl flex items-center justify-between">
              <span className="text-gray-600">
                تم اختيار{" "}
                <span className="font-bold text-emerald-600">
                  {selectedSymptoms.length}
                </span>{" "}
                عرض
              </span>
              <button
                onClick={handleAnalyze}
                className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-8 rounded-xl shadow-lg transition-colors duration-200"
              >
                تحليل الأعراض
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
