import { NextRequest, NextResponse } from 'next/server';
import { allCities } from '@/lib/cities';
import { getGroqChatCompletion } from '@/lib/groq';

export async function POST(request: NextRequest) {
  try {
    const { budget, language } = await request.json();

    if (!budget || budget <= 0) {
      return NextResponse.json({ error: 'Valid budget is required' }, { status: 400 });
    }

    const affordableCities = allCities.filter(city => {
      const avgProperty = city.avgPricePerMeter * 100;
      return avgProperty <= budget * 1.5;
    }).sort((a, b) => a.avgPricePerMeter - b.avgPricePerMeter);

    const recommendedSize = Math.floor(budget / 8000);
    
    const topCities = affordableCities.slice(0, 3);
    const citiesList = topCities.map(c => `${c.name[language as 'ar' | 'es']}: ${c.avgPricePerMeter} درهم/متر مربع`).join('\n');

    const prompt = language === 'ar'
      ? `أنت مستشار عقاري. المستخدم لديه ميزانية ${budget.toLocaleString()} درهم مغربي لشراء عقار.
      
      المدن المقترحة:
      ${citiesList}
      
      قدم نصيحة مهنية تشمل:
      1. أفضل المدن للميزانية
      2. حجم المنزل الموصى به بالمتر المربع
      3. شرحاً مبسطاً للسوق العقاري
      4. نصائح للمستثمر
      
      باللغة العربية بصيغة واضحة ومباشرة.`
      : `Eres un asesor inmobiliario. El usuario tiene un presupuesto de ${budget.toLocaleString()} EUR para comprar una propiedad.
      
      Ciudades sugeridas:
      ${citiesList}
      
      Proporciona un consejo profesional que incluya:
      1. Las mejores ciudades para el presupuesto
      2. El tamaño de la vivienda recomendado en metros cuadrados
      3. Una explicación simple del mercado inmobiliario
      4. Consejos para el inversor
      
      En español con un formato claro y directo.`;

    const aiExplanation = await getGroqChatCompletion({
      messages: [{ role: 'user', content: prompt }],
      language: language as 'ar' | 'es',
      temperature: 0.5,
      maxTokens: 600,
    });

    return NextResponse.json({
      affordableCities: topCities,
      recommendedSize,
      explanation: aiExplanation,
    });
  } catch (error) {
    console.error('Advice API error:', error);
    return NextResponse.json(
      { error: 'Failed to generate advice' },
      { status: 500 }
    );
  }
}