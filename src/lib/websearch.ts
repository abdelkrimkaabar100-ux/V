export interface SearchResult {
  title: string;
  url: string;
  snippet: string;
}

export async function searchWeb(query: string): Promise<SearchResult[]> {
  try {
    const apiKey = process.env.TAVILY_API_KEY;
    
    if (!apiKey) {
      return [];
    }

    const response = await fetch('https://api.tavily.com/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        api_key: apiKey,
        query,
        search_depth: 'basic',
        include_answer: false,
        include_images: false,
        max_results: 5,
      }),
    });

    if (!response.ok) {
      console.error('Web search failed:', response.status);
      return [];
    }

    const data = await response.json();
    
    return (data.results || []).map((r: any) => ({
      title: r.title,
      url: r.url,
      snippet: r.content || r.snippet || '',
    }));
  } catch (error) {
    console.error('Web search error:', error);
    return [];
  }
}

export function formatSearchResults(results: SearchResult[]): string {
  return results
    .map(r => `Title: ${r.title}\nURL: ${r.url}\nSnippet: ${r.snippet}`)
    .join('\n---\n');
}