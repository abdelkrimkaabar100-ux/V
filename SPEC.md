# رحيق诗词 - منصة الشعر العربي الإسلامي

## Project Overview

- **Project Name**: رحيق诗词 (Ruheeq - Arabic Islamic Poetry Platform)
- **Type**: Educational webapp with interactive poetry features
- **Core Functionality**: A comprehensive platform for exploring, understanding, and creating Arabic-Islamic poetry with deep analysis of poems from the Prophetic era
- **Target Users**: Arabic language learners, poetry enthusiasts, students of Islamic history

## UI/UX Specification

### Layout Structure

**Pages:**
1. **Home** - Landing page with featured poets and poems
2. **Poets** - Grid of Islamic poets (صحابة والتابعين)
3. **Poet Detail** - Individual poet biography and their poems
4. **Poem Detail** - Deep analysis of each poem with:
   - Original Arabic text
   - Explanation (الشرح)
   - Context (الموقف/الغزوة)
   - Location (المكان)
   - Emotional state (الحس)
   - Meaning (المعنى)
5. **Write Poetry** - Interactive poetry writing tool
6. **Learn Poetry** - Gamified poetry learning

**Responsive Breakpoints:**
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

### Visual Design

**Color Palette:**
- Primary Background: #1a472a (Deep forest green / حضراء داكن)
- Secondary Background: #2d5a3d (Sage green)
- Accent: #d4af37 (Gold / ذهبي)
- Text Primary: #0a0a0a (Near black)
- Text Secondary: #1a1a1a (Black)
- Text Light: #f5f5f0 (Cream white)
- Highlight: #8b4513 (Saddle brown for calligraphy accents)

**Typography:**
- Arabic Headings: "Amiri" or "Scheherazade" (elegant Arabic calligraphy style)
- Arabic Body: "Noto Naskh Arabic" or "Traditional Arabic"
- English/UI: "Cairo" for modern feel

**Spacing System:**
- Base unit: 8px
- Section padding: 64px (desktop), 32px (mobile)
- Card padding: 24px
- Element margins: 16px

**Visual Effects:**
- Subtle Arabic pattern overlays (أرابيسك)
- Calligraphic dividers between sections
- Soft shadows on cards: 0 4px 20px rgba(0,0,0,0.15)
- Animated ink-flow transitions
- Gold accent borders

### Components

**Navigation:**
- Fixed top navbar with Arabic Islamic geometric patterns
- Logo with calligraphy styling
- Links: الرئيسية | الشعراء | أكتب | تعلم | عن

**Poet Card:**
- Circular portrait (placeholder with calligraphy)
- Name in Arabic calligraphy
- Era badge (صاحب النبي / تابع)
- Hover: gold border glow

**Poem Card:**
- Arabic title in large calligraphy
- First verse preview
- Analysis indicators (context, location, emotion)
- Click to expand full analysis

**Poem Detail View:**
- Full poem in traditional calligraphic presentation
- Tabs: الشرح | المعنى | السياق | المشاعر
- Animated reveal of analysis sections
- Related poems sidebar

**Poetry Writing Tool:**
- Interactive text editor with Arabic calligraphy
- Meter helper (تفعيلة)
- Rhyming dictionary suggestion
- Save/share functionality

**Learning Game:**
- Quiz format with poetry verses
- Match verse to poet
- Fill in the missing word
- Progress tracking with achievements

## Functionality Specification

### Core Features

1. **Poet Database**: 
   - Ali ibn Abi Talib (علي بن أبي طالب)
   - Hassan ibn Thabit (حسن بن ثابت)
   - Ka'b ibn Zuhayr (كعب بن زهير)
   - Abdullah ibn Rawahah (عبدالله بن رواحة)
   - Others

2. **Poem Analysis System**:
   - Original text display
   - Word-by-word explanation
   - Context (was it during a specific battle?)
   - Location where written
   - Poet's emotional state
   - Deep meaning interpretation

3. **Poetry Writing Module**:
   - Template-based writing prompts
   - Visual meter indicators
   - Rhyming suggestions
   - Famous poem examples for inspiration

4. **Learning Game**:
   - Multiple choice quizzes
   - Verse completion challenges
   - Poet identification
   - Progress levels (مبتدئ, متوسط, محترف)

### Data Structure

Each poem includes:
```typescript
{
  id: string,
  title: string,
  poet: string,
  verses: string[],
  explanation: string,
  context: string,        // Ghazwa/battle if applicable
  location: string,       // Where written
  emotions: string[],     // Poet's feelings
  meaning: string,        // Deep interpretation
  occasion: string
}
```

### User Interactions
- Smooth page transitions with fade effects
- Interactive poem cards with hover states
- Tab-based analysis viewing
- Real-time poetry writing feedback
- Game progression with animations

## Acceptance Criteria

1. ✓ Home page displays featured poets and poems in green theme
2. ✓ Poet detail page shows biography and all their poems
3. ✓ Poem detail shows full analysis with all 4 aspects (شرح, معنى, سياق, مشاعر)
4. ✓ Poetry writing tool is functional with templates
5. ✓ Learning game has working quiz mechanics
6. ✓ All text uses Arabic calligraphy fonts
7. ✓ Green background with black elegant Arabic text
8. ✓ Responsive on all devices
9. ✓ Smooth animations and transitions
10. ✓ Contains poets from Prophetic era (Ali, Hassan, etc.)