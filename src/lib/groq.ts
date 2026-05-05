import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || 'gsk_placeholder',
});

export type Language = 'ar' | 'es';

interface ChatCompletionParams {
  messages: Array<{ role: 'user' | 'assistant' | 'system'; content: string }>;
  language: Language;
  temperature?: number;
  maxTokens?: number;
}

export async function getGroqChatCompletion({
  messages,
  language,
  temperature = 0.7,
  maxTokens = 1000,
}: ChatCompletionParams): Promise<string> {
  try {
    const systemMessage = language === 'ar' 
      ? 'أنت مساعد ذكي متخصص في العقارات باللغة العربية. قدم إجابات دقيقة ومفيدة. استخدم البيانات الحية من الإنترنت عندما تكون متوفرة.'
      : 'Eres un asistente inteligente especializado en bienes raíces en español. Proporciona respuestas precisas y útiles. Usa datos en vivo de internet cuando estén disponibles.';

    const completion = await groq.chat.completions.create({
      messages: [{ role: 'system', content: systemMessage }, ...messages],
      model: 'llama-3.3-70b-versatile',
      temperature,
      max_tokens: maxTokens,
    });

    return completion.choices[0]?.message?.content || '';
  } catch (error) {
    console.error('Groq API error:', error);
    return language === 'ar' 
      ? 'عذراً، حدث خطأ في معالجة طلبك. يرجى المحاولة مرة أخرى.'
      : 'Lo siento, hubo un error procesando tu solicitud. Por favor, inténtalo de nuevo.';
  }
}

export async function generatePropertyDescription(
  city: string,
  size: number,
  bedrooms: number,
  bathrooms: number,
  language: Language
): Promise<{ title: string; description: string }> {
  const prompt = language === 'ar'
    ? `أنت مساعد خبير في كتابة أوصاف العقارات باللغة العربية. 
    أنشئ عنواناً جذاباً ووصفاً مبيعاتياً لعقار في ${city} بمساحة ${size} متر مربع، ${bedrooms} غرف نوم، و${bathrooms} حمامات. 
    يجب أن يكون العنوان باللغة العربية الفصحى ويصلح للعرض على منصات العقارات.
    الصيغة: "العنوان: [العنوان هنا]\nالوصف: [الوصف هنا]"`
    : `Eres un asistente experto en redactar descripciones de propiedades en español.
    Crea un título atractivo y una descripción de ventas para una propiedad en ${city} de ${size} metros cuadrados, ${bedrooms} dormitorios y ${bathrooms} baños.
    El título debe estar en español y ser apropiado para mostrar en plataformas inmobiliarias.
    Formato: "Título: [título aquí]\nDescripción: [descripción aquí]"`;

  const completion = await groq.chat.completions.create({
    messages: [{ role: 'user', content: prompt }],
    model: 'llama-3.3-70b-versatile',
    temperature: 0.8,
    max_tokens: 500,
  });

  const response = completion.choices[0]?.message?.content || '';
  
  const titleMatch = response.match(/العنوان:|Título:\s*(.+)/);
  const descMatch = response.match(/الوصف:|Descripción:\s*([\s\S]+)/);
  
  return {
    title: titleMatch?.[1]?.trim() || (language === 'ar' ? 'عقار فاخر' : 'Propiedad de lujo'),
    description: descMatch?.[1]?.trim() || response.trim(),
  };
}

export async function enhanceWithWebSearch(
  query: string,
  language: Language,
  webResults?: string
): Promise<string> {
  let context = '';
  
  if (webResults) {
    context = `\n\nمعلومات مباشرة من الإنترنت:\n${webResults}\n\n`;
  }

  const prompt = language === 'ar'
    ? `${context}المستخدم يسأل عن: "${query}"

    يرجى تقديم إجابة شاملة ومحدثة بناءً على المعلومات المتوفرة. اذكر مصادر المعلومات إذا كانت متوفرة. 
    كن دقيقاً ومحترفاً في إجابتك. حدد النقاط الرئيسية والإجابة بوضوح.
    
    إذا كانت هناك معلومات من الإنترنت، استخدمها كمرجع أساسي لإجابتك.
    إذا لم تكن هناك معلومات مباشرة، قدم إجابة موجهة على أفضل ما يمكن استناداً إلى معرفتك.`
    : `${context}El usuario pregunta sobre: "${query}"

    Proporciona una respuesta completa y actualizada basada en la información disponible. Menciona las fuentes de la información si están disponibles.
    Sé preciso y profesional en tu respuesta. Destaca los puntos clave y responde con claridad.
    
    Si hay información de internet, úsala como referencia principal para tu respuesta.
    Si no hay información directa, proporciona una respuesta orientada de la mejor manera posible basada en tu conocimiento.`;

  return getGroqChatCompletion({
    messages: [{ role: 'user', content: prompt }],
    language,
    temperature: 0.5,
    maxTokens: 1000,
  });
}