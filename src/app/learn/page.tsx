'use client';

import { useState } from 'react';
import { poets, poems } from '@/data/poets';

type QuizLevel = 'مبتدئ' | 'متوسط' | 'محترف';

interface Question {
  id: number;
  type: 'match_poet' | 'complete_verse' | 'identify_context';
  question: string;
  options: string[];
  correct: number;
}

const generateQuestions = (level: QuizLevel): Question[] => {
  const allPoems = [...poems];
  
  if (level === 'مبتدئ') {
    return [
      {
        id: 1,
        type: 'match_poet',
        question: 'من هو شاعر هذه القصيدة؟',
        options: poets.map(p => p.name),
        correct: 0
      },
      {
        id: 2,
        type: 'complete_verse',
        question: 'أكمل البيت: "ونحنُ صابِرونَ على ____"',
        options: ['الجَلَدِ', 'الخَوْفِ', 'القَتلِ', 'الفَخرِ'],
        correct: 0
      },
      {
        id: 3,
        type: 'identify_context',
        question: 'في أي غزوة قيلت هذه القصيدة؟',
        options: ['بدر', 'أحد', 'مؤتة', 'الخندق'],
        correct: 2
      }
    ];
  }
  
  if (level === 'متوسط') {
    return [
      {
        id: 1,
        type: 'match_poet',
        question: 'من الشاعر الذي يُلقب بشاعر الرسول؟',
        options: ['علي بن أبي طالب', 'حسن بن ثابت', 'كعب بن زهير', 'عبدالله بن رواحة'],
        correct: 1
      },
      {
        id: 2,
        type: 'complete_verse',
        question: 'أكمل: "نحنُ الذينَ لَنا في ____ مَنَازلُ العزِّ"',
        options: ['بدر', 'مكة', 'المدينة', 'الطائف'],
        correct: 0
      },
      {
        id: 3,
        type: 'identify_context',
        question: 'ما مناسبة قصيدة "توبة كعب"؟',
        options: ['بعد الهجرة', 'بعد فتح مكة', 'قبل الهجرة', 'بعد خروج من مكة'],
        correct: 1
      }
    ];
  }
  
  return [
    {
      id: 1,
      type: 'match_poet',
      question: 'من القائل: "واللهِ لا أَدَعُ الحِصارَ"؟',
      options: ['عمر بن الخطاب', 'علي بن أبي طالب', 'الزبير بن العوام', 'طلحة بن عبيد الله'],
      correct: 1
    },
    {
      id: 2,
      type: 'complete_verse',
      question: '"اللهُ يَدْعُونا إلى ____" أكمل',
        options: ['جَنَّاتِهِ', 'رحمتِهِ', 'نورِهِ', 'فضلِهِ'],
        correct: 0
    },
    {
      id: 3,
      type: 'identify_context',
      question: 'متى استُشهد عبد الله بن رواحة؟',
      options: ['غزوة بدر', 'غزوة أحد', 'غزوة مؤتة', 'غزوة الخندق'],
      correct: 2
    }
  ];
};

export default function LearnPage() {
  const [level, setLevel] = useState<QuizLevel>('مبتدئ');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);

  const questions = generateQuestions(level);

  const startGame = () => {
    setGameStarted(true);
    setGameFinished(false);
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setShowResult(true);
    
    if (answerIndex === questions[currentQuestion].correct) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setGameFinished(true);
    }
  };

  const restartGame = () => {
    setGameStarted(false);
    setGameFinished(false);
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  if (!gameStarted) {
    return (
      <div className="pt-24 pb-16 px-4 min-h-screen">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl text-[#f5f5f0] mb-6" style={{ fontFamily: 'var(--font-amiri)' }}>
            تعلم الشعر الإسلامي 🎮
          </h1>
          <p className="text-[#f5f5f0]/70 text-lg mb-10">
            اختبر معرفتك بالشعر العربي الإسلامي من خلال ألعاب تفاعلية ممتعة
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="p-8 rounded-2xl bg-[#2d5a3d]/30 border border-[#d4af37]/20">
              <div className="text-4xl mb-4">🌱</div>
              <h3 className="text-2xl text-[#f5f5f0] mb-2" style={{ fontFamily: 'var(--font-amiri)' }}>مبتدئ</h3>
              <p className="text-[#f5f5f0]/60 text-sm mb-4">أسئلة سهلة عن القصائد</p>
              <button 
                onClick={() => { setLevel('مبتدئ'); startGame(); }}
                className="btn-gold px-6 py-2 rounded-lg"
              >
                ابدأ
              </button>
            </div>
            
            <div className="p-8 rounded-2xl bg-[#2d5a3d]/30 border border-[#d4af37]/20">
              <div className="text-4xl mb-4">🌿</div>
              <h3 className="text-2xl text-[#f5f5f0] mb-2" style={{ fontFamily: 'var(--font-amiri)' }}>متوسط</h3>
              <p className="text-[#f5f5f0]/60 text-sm mb-4">أسئلة متوسطة الصعوبة</p>
              <button 
                onClick={() => { setLevel('متوسط'); startGame(); }}
                className="btn-gold px-6 py-2 rounded-lg"
              >
                ابدأ
              </button>
            </div>
            
            <div className="p-8 rounded-2xl bg-[#2d5a3d]/30 border border-[#d4af37]/20">
              <div className="text-4xl mb-4">🌳</div>
              <h3 className="text-2xl text-[#f5f5f0] mb-2" style={{ fontFamily: 'var(--font-amiri)' }}>محترف</h3>
              <p className="text-[#f5f5f0]/60 text-sm mb-4">أسئلة صعبة ومتقدمة</p>
              <button 
                onClick={() => { setLevel('محترف'); startGame(); }}
                className="btn-gold px-6 py-2 rounded-lg"
              >
                ابدأ
              </button>
            </div>
          </div>

          <div className="p-8 rounded-2xl bg-[#1a472a]/50 border border-[#d4af37]/10">
            <h2 className="text-2xl text-[#f5f5f0] mb-6" style={{ fontFamily: 'var(--font-amiri)' }}>
              كيف تلعب؟
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-right">
              <div className="p-4">
                <div className="text-3xl mb-2">📝</div>
                <p className="text-[#f5f5f0]/80">اختر المستوى المناسب لك</p>
              </div>
              <div className="p-4">
                <div className="text-3xl mb-2">✅</div>
                <p className="text-[#f5f5f0]/80">أجب على الأسئلة الصحيحة</p>
              </div>
              <div className="p-4">
                <div className="text-3xl mb-2">🏆</div>
                <p className="text-[#f5f5f0]/80">احصل على أعلى درجة</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (gameFinished) {
    const percentage = Math.round((score / questions.length) * 100);
    let emoji = '🌱';
    let message = 'حاول مرة أخرى!';
    
    if (percentage >= 80) {
      emoji = '🏆';
      message = 'ممتاز! أنت محترف!';
    } else if (percentage >= 50) {
      emoji = '⭐';
      message = 'جيد! يمكنك تحسين مستواك';
    }

    return (
      <div className="pt-24 pb-16 px-4 min-h-screen">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-8xl mb-6 animate-float">{emoji}</div>
          <h1 className="text-4xl text-[#f5f5f0] mb-4" style={{ fontFamily: 'var(--font-amiri)' }}>
            اللعبة انتهت!
          </h1>
          <p className="text-2xl text-[#d4af37] mb-6" style={{ fontFamily: 'var(--font-amiri)' }}>
            {message}
          </p>
          
          <div className="p-8 rounded-2xl bg-[#2d5a3d]/30 border border-[#d4af37]/20 inline-block mb-8">
            <p className="text-[#f5f5f0] text-lg mb-2">درجتك:</p>
            <p className="text-6xl text-[#d4af37]" style={{ fontFamily: 'var(--font-amiri)' }}>
              {score} / {questions.length}
            </p>
            <p className="text-[#f5f5f0]/60 mt-2">{percentage}%</p>
          </div>

          <div className="flex justify-center gap-4">
            <button onClick={startGame} className="btn-gold px-8 py-3 rounded-lg text-lg">
              العب مرة أخرى
            </button>
            <button onClick={restartGame} className="px-8 py-3 rounded-lg border border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37]/10">
              اختر مستوى آخر
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16 px-4 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <button onClick={restartGame} className="text-[#d4af37] hover:underline">
            ← خروج
          </button>
          <div className="text-center">
            <span className="badge badge-gold">{level}</span>
          </div>
          <div className="text-[#f5f5f0]/60">
            السؤال {currentQuestion + 1} / {questions.length}
          </div>
        </div>

        <div className="w-full h-2 bg-[#1a472a] rounded-full mb-8 overflow-hidden">
          <div 
            className="h-full progress-gold transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          />
        </div>

        <div className="p-8 rounded-2xl bg-[#2d5a3d]/30 border border-[#d4af37]/20 mb-8">
          <h2 className="text-2xl text-[#f5f5f0] mb-8 text-center" style={{ fontFamily: 'var(--font-amiri)' }}>
            {questions[currentQuestion].question}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => !showResult && handleAnswer(index)}
                disabled={showResult}
                className={`quiz-option p-4 rounded-xl text-lg ${
                  showResult && index === questions[currentQuestion].correct
                    ? 'correct'
                    : showResult && index === selectedAnswer && index !== questions[currentQuestion].correct
                    ? 'wrong'
                    : selectedAnswer === index
                    ? 'selected'
                    : ''
                }`}
              >
                <span className="ml-3 text-[#d4af37] font-bold">
                  {['أ', 'ب', 'ج', 'د'][index]}
                </span>
                {option}
              </button>
            ))}
          </div>
        </div>

        {showResult && (
          <div className="text-center animate-fade-in-up">
            {selectedAnswer === questions[currentQuestion].correct ? (
              <p className="text-2xl text-[#22c55e] mb-6" style={{ fontFamily: 'var(--font-amiri)' }}>
                ✓ إجابة صحيحة!
              </p>
            ) : (
              <p className="text-2xl text-[#ef4444] mb-6" style={{ fontFamily: 'var(--font-amiri)' }}>
                ✗ إجابة خاطئة
              </p>
            )}
            <button
              onClick={nextQuestion}
              className="btn-gold px-8 py-3 rounded-lg text-lg"
            >
              السؤال التالي →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}