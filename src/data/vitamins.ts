export interface Vitamin {
  id: string;
  name: string;
  description: string;
  sources: string[];
  icon: string;
}

export interface Symptom {
  id: string;
  name: string;
  category: string;
  icon: string;
  vitaminIds: string[];
}

export const categories = [
  { id: "skin", name: "البشرة والشعر", icon: "🧴" },
  { id: "energy", name: "الطاقة والمزاج", icon: "⚡" },
  { id: "bones", name: "العظام والأسنان", icon: "🦴" },
  { id: "eyes", name: "العيون", icon: "👁️" },
  { id: "immune", name: "المناعة", icon: "🛡️" },
  { id: "digestion", name: "الهضم", icon: "🫁" },
  { id: "nerves", name: "الأعصاب", icon: "🧠" },
  { id: "muscles", name: "العضلات", icon: "💪" },
];

export const vitamins: Vitamin[] = [
  {
    id: "vitA",
    name: "فيتامين أ",
    description: "ضروري لصحة العيون والبشرة والمناعة. يساعد على نمو الخلايا ويعمل كمضاد للأكسدة.",
    sources: ["الجزر", "البطاطا الحلوة", "السبانخ", "الكبد", "الزبدة"],
    icon: "🥕",
  },
  {
    id: "vitB1",
    name: "فيتامين ب1 (ثيامين)",
    description: "يساعد في تحويل الطعام إلى طاقة ويدعم وظيفة الجهاز العصبي.",
    sources: ["الحبوب الكاملة", "اللحوم", "البقوليات", "المكسرات"],
    icon: "🌾",
  },
  {
    id: "vitB2",
    name: "فيتامين ب2 (ريبوفلافين)",
    description: "مهم لإنتاج الطاقة وصحة البشرة والعينين.",
    sources: ["الحليب", "البيض", "اللوز", "الفطر"],
    icon: "🥛",
  },
  {
    id: "vitB3",
    name: "فيتامين ب3 (نياسين)",
    description: "يدعم الجهاز العصبي والهضم وصحة البشرة.",
    sources: ["الدجاج", "التونة", "الفول السوداني", "الفطر"],
    icon: "🍗",
  },
  {
    id: "vitB6",
    name: "فيتامين ب6",
    description: "ضروري لتكوين الدم ووظيفة الدماغ وتنظيم المزاج.",
    sources: ["الموز", "الدجاج", "السلمون", "البطاطا"],
    icon: "🍌",
  },
  {
    id: "vitB9",
    name: "فيتامين ب9 (حمض الفوليك)",
    description: "أساسي لنمو الخلايا وتكوين الدم، مهم جداً للحوامل.",
    sources: ["السبانخ", "العدس", "البروكلي", "الحمص"],
    icon: "🥬",
  },
  {
    id: "vitB12",
    name: "فيتامين ب12",
    description: "ضروري لتكوين خلايا الدم الحمراء وصحة الجهاز العصبي.",
    sources: ["اللحوم", "الأسماك", "الحليب", "البيض"],
    icon: "🥩",
  },
  {
    id: "vitC",
    name: "فيتامين ج",
    description: "مضاد أكسدة قوي يعزز المناعة ويساعد على امتصاص الحديد وصحة البشرة.",
    sources: ["الحمضيات", "الفلفل الأخضر", "الفراولة", "البروكلي"],
    icon: "🍊",
  },
  {
    id: "vitD",
    name: "فيتامين د",
    description: "ضروري لصحة العظام والأسنان ويعزز المناعة وتنظيم المزاج.",
    sources: ["أشعة الشمس", "السلمون", "صفار البيض", "الفطر"],
    icon: "☀️",
  },
  {
    id: "vitE",
    name: "فيتامين هـ",
    description: "مضاد أكسدة يحمي الخلايا ويدعم صحة البشرة والشعر.",
    sources: ["اللوز", "البذور", "الأفوكادو", "السبانخ"],
    icon: "🥜",
  },
  {
    id: "vitK",
    name: "فيتامين ك",
    description: "ضروري لتجلط الدم وصحة العظام.",
    sources: ["السبانخ", "البروكلي", "الكرنب", "البازلاء"],
    icon: "🥦",
  },
  {
    id: "iron",
    name: "الحديد",
    description: "ضروري لنقل الأكسجين في الدم وتكوين الهيموجلوبين.",
    sources: ["اللحوم الحمراء", "السبانخ", "العدس", "التين المجفف"],
    icon: "🩸",
  },
  {
    id: "calcium",
    name: "الكالسيوم",
    description: "أساسي لصحة العظام والأسنان ووظيفة العضلات.",
    sources: ["الحليب", "الجبن", "اللوز", "البروكلي"],
    icon: "🦴",
  },
  {
    id: "magnesium",
    name: "المغنيسيوم",
    description: "يدعم وظيفة العضلات والأعصاب وصحة العظام.",
    sources: ["المكسرات", "البذور", "السبانخ", "الشوكولاتة الداكنة"],
    icon: "🌰",
  },
  {
    id: "zinc",
    name: "الزنك",
    description: "مهم للمناعة وشفاء الجروح وصحة البشرة.",
    sources: ["اللحوم", "المحار", "البذور", "البقوليات"],
    icon: "🔬",
  },
  {
    id: "omega3",
    name: "أوميغا 3",
    description: "دهون صحية تدعم صحة القلب والدماغ والعيون.",
    sources: ["السلمون", "التونة", "بذور الكتان", "الجوز"],
    icon: "🐟",
  },
  {
    id: "biotin",
    name: "البيوتين (فيتامين ب7)",
    description: "مهم لصحة الشعر والأظافر ودعم التمثيل الغذائي.",
    sources: ["البيض", "اللوز", "الأفوكادو", "الفطر"],
    icon: "💇",
  },
];

export const symptoms: Symptom[] = [
  // بشرة وشعر
  {
    id: "drySkin",
    name: "جفاف البشرة",
    category: "skin",
    icon: "🏜️",
    vitaminIds: ["vitA", "vitD", "vitE", "omega3"],
  },
  {
    id: "acne",
    name: "حب الشباب",
    category: "skin",
    icon: "😖",
    vitaminIds: ["vitA", "vitC", "vitE", "zinc"],
  },
  {
    id: "hairLoss",
    name: "تساقط الشعر",
    category: "skin",
    icon: "💇‍♂️",
    vitaminIds: ["vitD", "iron", "biotin", "zinc", "vitB12"],
  },
  {
    id: "brittleNails",
    name: "تكسر الأظافر",
    category: "skin",
    icon: "💅",
    vitaminIds: ["biotin", "iron", "zinc", "vitB12"],
  },
  {
    id: "paleSkin",
    name: "شحوب البشرة",
    category: "skin",
    icon: "👻",
    vitaminIds: ["iron", "vitB12", "vitB9", "vitC"],
  },
  {
    id: "slowWoundHealing",
    name: "بطء التئام الجروح",
    category: "skin",
    icon: "🩹",
    vitaminIds: ["vitC", "vitA", "zinc", "vitE"],
  },
  {
    id: "wrinkles",
    name: "ظهور تجاعيد مبكرة",
    category: "skin",
    icon: "👴",
    vitaminIds: ["vitC", "vitE", "vitA", "omega3"],
  },

  // طاقة ومزاج
  {
    id: "fatigue",
    name: "تعب وإرهاق مستمر",
    category: "energy",
    icon: "😴",
    vitaminIds: ["iron", "vitB12", "vitD", "vitB6", "vitB1"],
  },
  {
    id: "insomnia",
    name: "صعوبة النوم",
    category: "energy",
    icon: "🌙",
    vitaminIds: ["vitD", "magnesium", "vitB6", "calcium"],
  },
  {
    id: "anxiety",
    name: "قلق وتوتر",
    category: "energy",
    icon: "😰",
    vitaminIds: ["magnesium", "vitB6", "vitD", "omega3"],
  },
  {
    id: "depression",
    name: "شعور بالحزن والاكتئاب",
    category: "energy",
    icon: "😞",
    vitaminIds: ["vitD", "omega3", "vitB12", "vitB6", "magnesium"],
  },
  {
    id: "brainFog",
    name: "ضعف التركيز والذاكرة",
    category: "energy",
    icon: "🤯",
    vitaminIds: ["vitB12", "omega3", "vitD", "iron"],
  },
  {
    id: "moodSwings",
    name: "تقلبات المزاج",
    category: "energy",
    icon: "🎭",
    vitaminIds: ["vitB6", "vitD", "magnesium", "iron"],
  },

  // عظام وأسنان
  {
    id: "bonePain",
    name: "آلام العظام",
    category: "bones",
    icon: "🦴",
    vitaminIds: ["vitD", "calcium", "vitK", "magnesium"],
  },
  {
    id: "backPain",
    name: "آلام الظهر",
    category: "bones",
    icon: "🔙",
    vitaminIds: ["vitD", "calcium", "magnesium", "vitB12"],
  },
  {
    id: "jointPain",
    name: "آلام المفاصل",
    category: "bones",
    icon: "🦿",
    vitaminIds: ["vitD", "omega3", "vitC", "calcium"],
  },
  {
    id: "dentalProblems",
    name: "مشاكل الأسنان واللثة",
    category: "bones",
    icon: "🦷",
    vitaminIds: ["vitD", "calcium", "vitC", "vitK"],
  },
  {
    id: "osteoporosis",
    name: "هشاشة العظام",
    category: "bones",
    icon: "🦴",
    vitaminIds: ["vitD", "calcium", "vitK", "magnesium"],
  },

  // عيون
  {
    id: "dryEyes",
    name: "جفاف العيون",
    category: "eyes",
    icon: "👁️",
    vitaminIds: ["vitA", "omega3", "vitD"],
  },
  {
    id: "nightBlindness",
    name: "العمى الليلي",
    category: "eyes",
    icon: "🌃",
    vitaminIds: ["vitA", "zinc", "omega3"],
  },
  {
    id: "blurryVision",
    name: "عدم وضوح الرؤية",
    category: "eyes",
    icon: "👓",
    vitaminIds: ["vitA", "vitC", "vitE", "omega3"],
  },
  {
    id: "eyeFatigue",
    name: "عيون متعبة",
    category: "eyes",
    icon: "😩",
    vitaminIds: ["vitA", "omega3", "vitB2"],
  },

  // مناعة
  {
    id: "frequentColds",
    name: "نزلات برد متكررة",
    category: "immune",
    icon: "🤧",
    vitaminIds: ["vitC", "vitD", "zinc", "vitA"],
  },
  {
    id: "allergies",
    name: "حساسية متكررة",
    category: "immune",
    icon: "🌸",
    vitaminIds: ["vitC", "vitD", "omega3", "magnesium"],
  },
  {
    id: "infections",
    name: "عدوى متكررة",
    category: "immune",
    icon: "🦠",
    vitaminIds: ["vitD", "vitC", "zinc", "vitA"],
  },

  // هضم
  {
    id: "bloating",
    name: "انتفاخ البطن",
    category: "digestion",
    icon: "🎈",
    vitaminIds: ["vitB12", "magnesium", "vitD"],
  },
  {
    id: "constipation",
    name: "إمساك",
    category: "digestion",
    icon: "😣",
    vitaminIds: ["magnesium", "vitC", "iron"],
  },
  {
    id: "nausea",
    name: "غثيان",
    category: "digestion",
    icon: "🤢",
    vitaminIds: ["vitB6", "vitB12", "iron"],
  },
  {
    id: "lossOfAppetite",
    name: "فقدان الشهية",
    category: "digestion",
    icon: "🍽️",
    vitaminIds: ["zinc", "vitB1", "vitB12", "iron"],
  },

  // أعصاب
  {
    id: "numbness",
    name: "تنميل في اليدين والقدمين",
    category: "nerves",
    icon: "✋",
    vitaminIds: ["vitB12", "vitB6", "magnesium", "calcium"],
  },
  {
    id: "tingling",
    name: "وخز وحرقان",
    category: "nerves",
    icon: "⚡",
    vitaminIds: ["vitB12", "vitB6", "vitB1", "magnesium"],
  },
  {
    id: "headaches",
    name: "صداع متكرر",
    category: "nerves",
    icon: "🤕",
    vitaminIds: ["magnesium", "vitB2", "vitD", "iron"],
  },
  {
    id: "dizziness",
    name: "دوار ودوخة",
    category: "nerves",
    icon: "😵",
    vitaminIds: ["iron", "vitB12", "vitD", "magnesium"],
  },

  // عضلات
  {
    id: "muscleCramps",
    name: "تشنجات عضلية",
    category: "muscles",
    icon: "💥",
    vitaminIds: ["magnesium", "calcium", "vitD", "potassium"],
  },
  {
    id: "muscleWeakness",
    name: "ضعف العضلات",
    category: "muscles",
    icon: "💪",
    vitaminIds: ["vitD", "iron", "magnesium", "vitB12"],
  },
  {
    id: "legPain",
    name: "آلام الساقين",
    category: "muscles",
    icon: "🦵",
    vitaminIds: ["magnesium", "vitD", "iron", "calcium"],
  },
];

export function getVitaminsByIds(ids: string[]): Vitamin[] {
  return vitamins.filter((v) => ids.includes(v.id));
}

export function analyzeSymptoms(symptomIds: string[]): Map<Vitamin, number> {
  const vitaminScores = new Map<string, number>();

  for (const symptomId of symptomIds) {
    const symptom = symptoms.find((s) => s.id === symptomId);
    if (symptom) {
      for (const vitId of symptom.vitaminIds) {
        vitaminScores.set(vitId, (vitaminScores.get(vitId) || 0) + 1);
      }
    }
  }

  const result = new Map<Vitamin, number>();
  const sortedScores = [...vitaminScores.entries()].sort((a, b) => b[1] - a[1]);

  for (const [vitId, score] of sortedScores) {
    const vit = vitamins.find((v) => v.id === vitId);
    if (vit) {
      result.set(vit, score);
    }
  }

  return result;
}
