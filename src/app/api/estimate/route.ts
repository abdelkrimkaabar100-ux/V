import { NextRequest, NextResponse } from 'next/server';
import { getCityById, allCities } from '@/lib/cities';
import { getGroqChatCompletion } from '@/lib/groq';

export async function POST(request: NextRequest) {
  try {
    const { cityId, size, bedrooms, bathrooms, language } = await request.json();

    if (!cityId || !size) {
      return NextResponse.json({ error: 'City and size are required' }, { status: 400 });
    }

    const city = getCityById(cityId);
    if (!city) {
      return NextResponse.json({ error: 'City not found' }, { status: 404 });
    }

    const basePrice = size * city.avgPricePerMeter;
    
    const prompt = language === 'ar'
      ? `أنت خبير عقاري. قدم تقدير سعر لعقار في ${city.name.ar} بمساحة ${size} متر مربع، ${bedrooms || 0} غرف نوم، و${bathrooms || 0} حمامات. 
      
      السعر الأساسي حسب المساحة: ${size} × ${city.avgPricePerMeter} = ${basePrice.toLocaleString()} درهم مغربي
      
      قدم تفسيراً مهنياً يشرح:
      1. سبب السعر (الموقع، المساحة، عدد الغرف)
      2. العوامل التي قد تؤثر على السعر
      3. نطاق السعر المتوقع (حد أدنى - حد أقصى)
      
      بصيغة واضحة ومباشرة باللغة العربية.`
      : `Eres un experto inmobiliario. Proporciona una estimación de precio para una propiedad en ${city.name.es} de ${size} metros cuadrados, ${bedrooms || 0} dormitorios y ${bathrooms || 0} baños.
      
      Precio base según el área: ${size} × ${city.avgPricePerMeter} = ${basePrice.toLocaleString()} EUR
      
      Proporciona una explicación profesional que detalle:
      1. Razón del precio (ubicación, tamaño, número de habitaciones)
      2. Factores que pueden afectar el precio
      3. Rango de precio esperado (mínimo - máximo)
      
      En un formato claro y directo en español.`;

    const aiExplanation = await getGroqChatCompletion({
      messages: [{ role: 'user', content: prompt }],
      language: language as 'ar' | 'es',
      temperature: 0.5,
      maxTokens: 500,
    });

    const minPrice = Math.round(basePrice * 0.85);
    const maxPrice = Math.round(basePrice * 1.15);

    return NextResponse.json({
      estimatedPrice: basePrice,
      minPrice,
      maxPrice,
      explanation: aiExplanation,
      city: city.name,
    });
  } catch (error) {
    console.error('Estimate API error:', error);
    return NextResponse.json(
      { error: 'Failed to estimate price' },
      { status: 500 }
    );
  }
}