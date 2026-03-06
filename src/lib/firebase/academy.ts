export interface AcademyEvent {
    id: string;
    title: string;
    titleEn: string;
    titleHe: string;
    description: string;
    descriptionEn: string;
    descriptionHe: string;
    date: string; // ISO date string
    time: string; // "18:00 IST"
    duration: string; // "90 мин"
    durationEn: string;
    durationHe: string;
    host: string;
    hostTitle: string;
    hostTitleEn: string;
    hostTitleHe: string;
    zoomLink: string;
    tags: string[];
    tagsEn: string[];
    tagsHe: string[];
    spots: number; // total spots
    registered: number;
    avatar: string;
    category: string;
    categoryEn: string;
    categoryHe: string;
}

export interface AcademyRecord {
    id: string;
    title: string;
    titleEn: string;
    titleHe: string;
    description: string;
    descriptionEn: string;
    descriptionHe: string;
    date: string; // recorded date
    duration: string; // "01:23:45"
    youtubeId: string; // YouTube video ID
    host: string;
    tags: string[];
    tagsEn: string[];
    tagsHe: string[];
    views: number;
    avatar: string;
    category: string;
    categoryEn: string;
    categoryHe: string;
}

// Upcoming events (dates relative to March 2026)
export const EVENTS: AcademyEvent[] = [
    {
        id: "ev-001",
        title: "GPT-агенты для автоматизации продаж: практика",
        titleEn: "GPT Agents for Sales Automation: Practice Session",
        titleHe: "סוכני GPT לאוטומציה של מכירות: מפגש מעשי",
        description: "Разберём 3 реальных кейса внедрения GPT-агентов в отделы продаж. Настроим агента прямо на встрече — каждый уйдёт с готовым инструментом для своего бизнеса.",
        descriptionEn: "We'll dive into 3 real GPT agent implementations in sales teams. We'll configure an agent live on the call — everyone leaves with a working tool for their business.",
        descriptionHe: "נסקור 3 מקרים אמיתיים של הטמעת סוכני GPT בצוותי מכירות. נגדיר סוכן בשידור חי — כולם יוצאים עם כלי עובד לעסק שלהם.",
        date: "2026-03-12",
        time: "18:00 IST",
        duration: "90 мин",
        durationEn: "90 min",
        durationHe: "90 דקות",
        host: "Олег Клай",
        hostTitle: "AI-интегратор, основатель клуба",
        hostTitleEn: "AI Integrator, Club Founder",
        hostTitleHe: "מטמיע AI, מייסד המועדון",
        zoomLink: "https://zoom.us/j/placeholder",
        tags: ["GPT", "продажи", "агенты", "автоматизация"],
        tagsEn: ["GPT", "sales", "agents", "automation"],
        tagsHe: ["GPT", "מכירות", "סוכנים", "אוטומציה"],
        spots: 30,
        registered: 24,
        avatar: "🤖",
        category: "Воркшоп",
        categoryEn: "Workshop",
        categoryHe: "סדנה",
    },
    {
        id: "ev-002",
        title: "Make.com Masterclass: Автоматизация с нуля",
        titleEn: "Make.com Masterclass: Automation from Scratch",
        titleHe: "Make.com Masterclass: אוטומציה מאפס",
        description: "3-часовой воркшоп по Make.com: базовые и продвинутые сценарии, интеграция с AI, обработка ошибок. Подходит для тех, кто ещё не работал с no-code автоматизацией.",
        descriptionEn: "3-hour Make.com workshop: basic and advanced scenarios, AI integration, error handling. Perfect for those new to no-code automation.",
        descriptionHe: "סדנת Make.com בת 3 שעות: תרחישים בסיסיים ומתקדמים, שילוב AI, טיפול בשגיאות. מתאים למי שעוד לא עבד עם אוטומציה ללא קוד.",
        date: "2026-03-19",
        time: "17:00 IST",
        duration: "180 мин",
        durationEn: "180 min",
        durationHe: "180 דקות",
        host: "Михаил Коэн",
        hostTitle: "Make.com Expert, 200+ автоматизаций",
        hostTitleEn: "Make.com Expert, 200+ automations",
        hostTitleHe: "מומחה Make.com, 200+ אוטומציות",
        zoomLink: "https://zoom.us/j/placeholder",
        tags: ["Make.com", "no-code", "автоматизация"],
        tagsEn: ["Make.com", "no-code", "automation"],
        tagsHe: ["Make.com", "no-code", "אוטומציה"],
        spots: 25,
        registered: 18,
        avatar: "⚙️",
        category: "Мастер-класс",
        categoryEn: "Masterclass",
        categoryHe: "מאסטרקלאס",
    },
    {
        id: "ev-003",
        title: "AI-контент: замена копирайтера или партнёр?",
        titleEn: "AI Content: Replace a Copywriter or Partner?",
        titleHe: "תוכן AI: להחליף קופירייטר או שותף?",
        description: "Разбираем кейсы контент-маркетинга с Claude и GPT. Как выстроить пайплайн от идеи до публикации. Q&A и ролевые игры с реальными скриптами.",
        descriptionEn: "Content marketing cases with Claude and GPT. How to build a pipeline from idea to publication. Q&A and role plays with real scripts.",
        descriptionHe: "מקרי שיווק תוכן עם Claude ו-GPT. כיצד לבנות צינור מרעיון לפרסום. שאלות ותשובות ומשחקי תפקידים עם תסריטים אמיתיים.",
        date: "2026-03-26",
        time: "18:30 IST",
        duration: "75 мин",
        durationEn: "75 min",
        durationHe: "75 דקות",
        host: "Анна Берг",
        hostTitle: "Content Strategist, ex-Google",
        hostTitleEn: "Content Strategist, ex-Google",
        hostTitleHe: "אסטרטגיסטית תוכן, לשעבר Google",
        zoomLink: "https://zoom.us/j/placeholder",
        tags: ["контент", "Claude", "копирайтинг", "маркетинг"],
        tagsEn: ["content", "Claude", "copywriting", "marketing"],
        tagsHe: ["תוכן", "Claude", "קופירייטינג", "שיווק"],
        spots: 40,
        registered: 31,
        avatar: "✍️",
        category: "Воркшоп",
        categoryEn: "Workshop",
        categoryHe: "סדנה",
    },
    {
        id: "ev-004",
        title: "Нейросети в HR: найм, онбординг, оценка",
        titleEn: "AI in HR: Hiring, Onboarding, Performance",
        titleHe: "AI ב-HR: גיוס, קליטה, הערכה",
        description: "Как применять AI на каждом этапе HR-процессов. Скрининг резюме, генерация профилей должностей, автоматизация онбординга. Разбираем реальные внедрения в израильских компаниях.",
        descriptionEn: "Applying AI at every stage of HR processes. Resume screening, job profile generation, onboarding automation. Real implementations from Israeli companies.",
        descriptionHe: "כיצד להחיל AI בכל שלב של תהליכי HR. סינון קורות חיים, יצירת פרופילי תפקידים, אוטומציה של קליטה. הטמעות אמיתיות מחברות ישראליות.",
        date: "2026-04-02",
        time: "17:00 IST",
        duration: "90 мин",
        durationEn: "90 min",
        durationHe: "90 דקות",
        host: "Дана Леви",
        hostTitle: "HR-директор, FinTech",
        hostTitleEn: "HR Director, FinTech",
        hostTitleHe: "מנהלת HR, FinTech",
        zoomLink: "https://zoom.us/j/placeholder",
        tags: ["HR", "найм", "онбординг", "автоматизация"],
        tagsEn: ["HR", "hiring", "onboarding", "automation"],
        tagsHe: ["HR", "גיוס", "קליטה", "אוטומציה"],
        spots: 35,
        registered: 20,
        avatar: "👥",
        category: "Воркшоп",
        categoryEn: "Workshop",
        categoryHe: "סדנה",
    },
];

// Archive — past recordings
export const RECORDINGS: AcademyRecord[] = [
    {
        id: "rec-001",
        title: "Введение в промпт-инжиниринг для бизнеса",
        titleEn: "Intro to Prompt Engineering for Business",
        titleHe: "מבוא להנדסת פרומפטים לעסקים",
        description: "С нуля до эксперта: принципы написания промптов, Chain of Thought, few-shot, role prompting. Разбор 20+ примеров из реального бизнеса.",
        descriptionEn: "From zero to expert: prompt writing principles, Chain of Thought, few-shot, role prompting. 20+ real business examples.",
        descriptionHe: "מאפס למומחה: עקרונות כתיבת פרומפטים, Chain of Thought, few-shot, role prompting. 20+ דוגמאות מעסקים אמיתיים.",
        date: "2026-02-20",
        duration: "1:32:14",
        youtubeId: "dQw4w9WgXcQ", // placeholder
        host: "Олег Клай",
        tags: ["промпты", "ChatGPT", "обучение"],
        tagsEn: ["prompts", "ChatGPT", "education"],
        tagsHe: ["פרומפטים", "ChatGPT", "חינוך"],
        views: 312,
        avatar: "🧠",
        category: "Обучение",
        categoryEn: "Education",
        categoryHe: "חינוך",
    },
    {
        id: "rec-002",
        title: "Как автоматизировать поддержку клиентов с AI",
        titleEn: "How to Automate Customer Support with AI",
        titleHe: "כיצד לאוטמת תמיכת לקוחות עם AI",
        description: "Разбор 3 кейсов: AI-чат-бот для ритейла, автоответы на email, AI-скрипты для колл-центра. Экономия 60-80% времени команды поддержки.",
        descriptionEn: "3 case breakdowns: AI chatbot for retail, email auto-replies, AI call center scripts. 60-80% support team time savings.",
        descriptionHe: "פירוק 3 מקרים: צ'אטבוט AI לקמעונאות, מענה אוטומטי לאימייל, סקריפטים AI למוקד. חיסכון של 60-80% בזמן צוות התמיכה.",
        date: "2026-02-13",
        duration: "1:18:40",
        youtubeId: "dQw4w9WgXcQ",
        host: "Михаил Коэн",
        tags: ["поддержка", "чат-бот", "автоматизация"],
        tagsEn: ["support", "chatbot", "automation"],
        tagsHe: ["תמיכה", "צ'אטבוט", "אוטומציה"],
        views: 287,
        avatar: "🎧",
        category: "Кейсы",
        categoryEn: "Cases",
        categoryHe: "מקרים",
    },
    {
        id: "rec-003",
        title: "n8n vs Make vs Zapier: честное сравнение",
        titleEn: "n8n vs Make vs Zapier: Honest Comparison",
        titleHe: "n8n vs Make vs Zapier: השוואה כנה",
        description: "Сравнительный тест трёх платформ на одинаковых задачах. Цена, сложность, возможности, поддержка AI. Когда что выбирать.",
        descriptionEn: "Comparative test of three platforms on identical tasks. Price, complexity, capabilities, AI support. When to choose which.",
        descriptionHe: "בדיקה השוואתית של שלוש פלטפורמות על משימות זהות. מחיר, מורכבות, יכולות, תמיכת AI. מתי לבחור מה.",
        date: "2026-02-06",
        duration: "1:45:22",
        youtubeId: "dQw4w9WgXcQ",
        host: "Анна Берг",
        tags: ["n8n", "Make", "Zapier", "сравнение"],
        tagsEn: ["n8n", "Make", "Zapier", "comparison"],
        tagsHe: ["n8n", "Make", "Zapier", "השוואה"],
        views: 445,
        avatar: "⚖️",
        category: "Обзор",
        categoryEn: "Review",
        categoryHe: "סקירה",
    },
    {
        id: "rec-004",
        title: "RAG-системы для бизнеса: своя база знаний",
        titleEn: "RAG Systems for Business: Your Own Knowledge Base",
        titleHe: "מערכות RAG לעסקים: בסיס ידע משלך",
        description: "Как настроить RAG (Retrieval-Augmented Generation) для ответов на вопросы по вашей базе документов без технических знаний. Инструменты: Notion AI, LlamaIndex, Pinecone.",
        descriptionEn: "How to set up RAG (Retrieval-Augmented Generation) to answer questions about your document base without technical knowledge. Tools: Notion AI, LlamaIndex, Pinecone.",
        descriptionHe: "כיצד להגדיר RAG (Retrieval-Augmented Generation) לענות על שאלות לגבי בסיס המסמכים שלך ללא ידע טכני. כלים: Notion AI, LlamaIndex, Pinecone.",
        date: "2026-01-30",
        duration: "2:01:08",
        youtubeId: "dQw4w9WgXcQ",
        host: "Олег Клай",
        tags: ["RAG", "база знаний", "Pinecone", "LLM"],
        tagsEn: ["RAG", "knowledge base", "Pinecone", "LLM"],
        tagsHe: ["RAG", "בסיס ידע", "Pinecone", "LLM"],
        views: 523,
        avatar: "📚",
        category: "Продвинутое",
        categoryEn: "Advanced",
        categoryHe: "מתקדם",
    },
    {
        id: "rec-005",
        title: "AI-дашборд для отслеживания бизнес-метрик",
        titleEn: "AI Dashboard for Business Metrics Tracking",
        titleHe: "לוח בקרה AI למעקב אחר מדדים עסקיים",
        description: "Строим автоматический дашборд: данные из разных источников → анализ GPT → еженедельный отчёт в Telegram. Без программирования, за 3 часа.",
        descriptionEn: "Building an automatic dashboard: data from multiple sources → GPT analysis → weekly report in Telegram. No coding, in 3 hours.",
        descriptionHe: "בניית לוח בקרה אוטומטי: נתונים ממקורות מרובים → ניתוח GPT → דוח שבועי ב-Telegram. ללא קידוד, ב-3 שעות.",
        date: "2026-01-23",
        duration: "1:55:33",
        youtubeId: "dQw4w9WgXcQ",
        host: "Михаил Коэн",
        tags: ["дашборд", "метрики", "Telegram", "GPT"],
        tagsEn: ["dashboard", "metrics", "Telegram", "GPT"],
        tagsHe: ["לוח בקרה", "מדדים", "Telegram", "GPT"],
        views: 398,
        avatar: "📊",
        category: "Практика",
        categoryEn: "Practice",
        categoryHe: "תרגול",
    },
];
