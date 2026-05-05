# رشيدة العائلة | Rachida Familia

A bilingual AI-powered real estate platform for Morocco and Spain.

## Features

- **Property Search**: Browse real estate listings with filters for city, price, and size
- **Price Estimator**: Get AI-powered property price estimates based on location and size
- **Budget Advisor**: Receive personalized recommendations based on your budget
- **AI Chat Assistant**: Ask questions about real estate markets in Morocco/Spain
- **Seller Mode**: Add properties with AI-generated descriptions

## Tech Stack

- **Framework**: Next.js 16
- **Styling**: Tailwind CSS 4
- **AI**: Groq API (Llama 3.3 70B)
- **Web Search**: Tavily API (optional for live data)
- **Languages**: Arabic (RTL) & Spanish (LTR)

## Setup

1. Clone the repository
2. Install dependencies:
```bash
bun install
```

3. Set environment variables:
```bash
# Required for AI features
GROQ_API_KEY=your_groq_api_key_here

# Optional for live web search
TAVILY_API_KEY=your_tavily_api_key_here
```

4. Run development server:
```bash
bun run dev
```

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── chat/       - AI chat endpoint
│   │   ├── estimate/   - Price estimation endpoint
│   │   ├── advice/     - Budget advisor endpoint
│   │   └── property/   - Property listing endpoint
│   ├── chat/           - AI assistant page
│   ├── estimate/       - Price estimator page
│   ├── advisor/        - Budget advisor page
│   ├── properties/     - Property listings page
│   ├── sell/           - Add property page
│   └── page.tsx        - Home page
├── lib/
│   ├── cities.ts       - City data with price averages
│   ├── groq.ts         - Groq AI integration
│   ├── websearch.ts    - Tavily web search
│   └── types.ts        - TypeScript types
└── components/
    └── Navigation.tsx  - Main navigation
```

## API Routes

- `POST /api/chat` - Chat with AI assistant
- `POST /api/estimate` - Property price estimation
- `POST /api/advice` - Budget-based recommendations
- `POST /api/property` - Add new property

## Deployment

Deploy to Vercel:
```bash
bun run build
```

Add environment variables in Vercel dashboard.

## License

MIT