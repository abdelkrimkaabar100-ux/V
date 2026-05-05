import { NextRequest, NextResponse } from 'next/server';
import { getGroqChatCompletion } from '@/lib/groq';
import { searchWeb, formatSearchResults } from '@/lib/websearch';

export async function POST(request: NextRequest) {
  try {
    const { message, language, history } = await request.json();

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const webKeywords = ['سعر', 'أسعار', 'سوق', 'عائد', 'إيجار', 'trend', 'precio', 'mercado', 'renta', 'roi', 'trend', 'actual', 'recent'];
    const needsWebSearch = webKeywords.some(k => message.toLowerCase().includes(k));

    let webResults = '';
    if (needsWebSearch) {
      const results = await searchWeb(message);
      if (results.length > 0) {
        webResults = formatSearchResults(results);
      }
    }

    const messages = [
      ...(history || []).map((h: any) => ({
        role: h.role,
        content: h.content,
      })),
      { role: 'user' as const, content: message },
    ];

    let response = '';
    if (webResults) {
      const { enhanceWithWebSearch } = await import('@/lib/groq');
      response = await enhanceWithWebSearch(message, language as 'ar' | 'es', webResults);
    } else {
      response = await getGroqChatCompletion({
        messages,
        language: language as 'ar' | 'es',
        temperature: 0.7,
      });
    }

    return NextResponse.json({ response });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Failed to process chat message' },
      { status: 500 }
    );
  }
}