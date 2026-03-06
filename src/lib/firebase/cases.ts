// Static seed cases — later move to Firestore
export interface Case {
    id: string;
    industry: string;
    industryEn: string;
    industryHe: string;
    title: string;
    titleEn: string;
    titleHe: string;
    description: string;
    descriptionEn: string;
    descriptionHe: string;
    tool: string;
    timeSaved: string; // e.g. "40 ч/мес"
    moneySaved: string; // e.g. "₪12,000/мес"
    roiPercent: number;
    tags: string[];
    tagsEn: string[];
    tagsHe: string[];
    avatar: string; // emoji
    difficulty: "easy" | "medium" | "hard";
}

export const CASES: Case[] = [
    {
        id: "case-001",
        industry: "Ритейл",
        industryEn: "Retail",
        industryHe: "קמעונאות",
        title: "Автоматизация обработки заказов",
        titleEn: "Order Processing Automation",
        titleHe: "אוטומציה של עיבוד הזמנות",
        description: "Сеть магазинов автоматизировала разбор входящих заявок по email с помощью GPT-4. Система классифицирует, извлекает данные и создаёт заказы в CRM без участия человека.",
        descriptionEn: "A retail chain automated the parsing of incoming email orders using GPT-4. The system classifies, extracts data, and creates orders in CRM without human involvement.",
        descriptionHe: "רשת חנויות האוטומציה של עיבוד הזמנות הנכנסות בדוא\"ל באמצעות GPT-4. המערכת מסווגת, חולצת נתונים ויוצרת הזמנות ב-CRM ללא מעורבות אנושית.",
        tool: "GPT-4 + Zapier + CRM",
        timeSaved: "80 ч/мес",
        moneySaved: "₪14,400/мес",
        roiPercent: 312,
        tags: ["email", "автоматизация", "CRM", "GPT-4"],
        tagsEn: ["email", "automation", "CRM", "GPT-4"],
        tagsHe: ["דוא\"ל", "אוטומציה", "CRM", "GPT-4"],
        avatar: "🛒",
        difficulty: "easy",
    },
    {
        id: "case-002",
        industry: "Маркетинг",
        industryEn: "Marketing",
        industryHe: "שיווק",
        title: "ИИ-копирайтер для 50+ продуктов",
        titleEn: "AI Copywriter for 50+ Products",
        titleHe: "כותב AI עבור 50+ מוצרים",
        description: "Агентство внедрило пайплайн генерации контента: из карточки товара автоматически создаются описание, посты в соцсети, email-рассылка на 3 языках. Команда из 3 контент-менеджеров заменена 1 оператором.",
        descriptionEn: "An agency implemented a content generation pipeline: from a product card, descriptions, social media posts, and email newsletters are automatically created in 3 languages. A team of 3 content managers was replaced by 1 operator.",
        descriptionHe: "סוכנות יישמה צינור יצירת תוכן: מכרטיס מוצר נוצרים אוטומטית תיאורים, פוסטים ברשתות חברתיות וניוזלטרים ב-3 שפות. צוות של 3 מנהלי תוכן הוחלף במפעיל אחד.",
        tool: "Claude 3.5 + n8n + Notion",
        timeSaved: "120 ч/мес",
        moneySaved: "₪22,000/мес",
        roiPercent: 480,
        tags: ["контент", "копирайтинг", "Claude", "n8n"],
        tagsEn: ["content", "copywriting", "Claude", "n8n"],
        tagsHe: ["תוכן", "כתיבת קופי", "Claude", "n8n"],
        avatar: "✍️",
        difficulty: "medium",
    },
    {
        id: "case-003",
        industry: "Финансы",
        industryEn: "Finance",
        industryHe: "פיננסים",
        title: "Анализ договоров за 3 минуты",
        titleEn: "Contract Analysis in 3 Minutes",
        titleHe: "ניתוח חוזים ב-3 דקות",
        description: "Юридический отдел компании автоматизировал первичный анализ договоров. ИИ выделяет риски, нестандартные условия и генерирует резюме на 1 страницу. Проверка договора: с 2 часов → 3 минуты.",
        descriptionEn: "A company's legal department automated the initial analysis of contracts. AI highlights risks, non-standard terms, and generates a 1-page summary. Contract review time: from 2 hours → 3 minutes.",
        descriptionHe: "המחלקה המשפטית של החברה אוטומציה את הניתוח הראשוני של חוזים. הבינה המלאכותית מדגישה סיכונים, תנאים לא סטנדרטיים ומייצרת סיכום של עמוד אחד. זמן בדיקת חוזה: מ-2 שעות ל-3 דקות.",
        tool: "GPT-4 + LangChain + PDF",
        timeSaved: "60 ч/мес",
        moneySaved: "₪28,000/мес",
        roiPercent: 650,
        tags: ["юридика", "анализ", "GPT-4", "LangChain"],
        tagsEn: ["legal", "analysis", "GPT-4", "LangChain"],
        tagsHe: ["משפטי", "ניתוח", "GPT-4", "LangChain"],
        avatar: "📄",
        difficulty: "hard",
    },
    {
        id: "case-004",
        industry: "HR",
        industryEn: "HR",
        industryHe: "HR",
        title: "Скрининг резюме × 10 быстрее",
        titleEn: "Resume Screening 10× Faster",
        titleHe: "סינון קורות חיים פי 10 מהיר יותר",
        description: "HR-агентство обрабатывало 500+ резюме в неделю вручную. Теперь ИИ-скринер анализирует, ранжирует и пишет первичные письма кандидатам. HR-специалист видит только топ-10% претендентов.",
        descriptionEn: "An HR agency used to process 500+ resumes per week manually. Now an AI screener analyzes, ranks, and writes initial letters to candidates. The HR specialist only reviews the top 10% of applicants.",
        descriptionHe: "סוכנות HR עיבדה 500+ קורות חיים בשבוע ידנית. כעת סורק AI מנתח, מדרג וכותב מכתבים ראשוניים למועמדים. מומחה HR רואה רק את 10% הטובים ביותר של המועמדים.",
        tool: "GPT-4 + Airtable + Gmail API",
        timeSaved: "90 ч/мес",
        moneySaved: "₪18,000/мес",
        roiPercent: 390,
        tags: ["HR", "скрининг", "найм", "Airtable"],
        tagsEn: ["HR", "screening", "hiring", "Airtable"],
        tagsHe: ["HR", "סינון", "גיוס", "Airtable"],
        avatar: "👥",
        difficulty: "medium",
    },
    {
        id: "case-005",
        industry: "Логистика",
        industryEn: "Logistics",
        industryHe: "לוגיסטיקה",
        title: "ИИ-диспетчер для службы доставки",
        titleEn: "AI Dispatcher for Delivery Service",
        titleHe: "מוקד AI לשירות משלוחים",
        description: "Служба доставки внедрила ИИ-диспетчера на базе GPT. Бот принимает звонки, уточняет адрес, назначает водителя и отправляет SMS-трекинг. Экономия: 2 оператора колл-центра, 24/7 uptime.",
        descriptionEn: "A delivery service implemented a GPT-based AI dispatcher. The bot takes calls, clarifies addresses, assigns drivers, and sends SMS tracking. Savings: 2 call center operators, 24/7 uptime.",
        descriptionHe: "שירות משלוחים יישם מוקד AI מבוסס GPT. הבוט מקבל שיחות, מבהיר כתובות, מקצה נהגים ושולח מעקב SMS. חיסכון: 2 מוקדנים, זמינות 24/7.",
        tool: "GPT-4 + Twilio + Google Maps API",
        timeSaved: "160 ч/мес",
        moneySaved: "₪32,000/мес",
        roiPercent: 720,
        tags: ["логистика", "Twilio", "GPT-4", "бот"],
        tagsEn: ["logistics", "Twilio", "GPT-4", "bot"],
        tagsHe: ["לוגיסטיקה", "Twilio", "GPT-4", "בוט"],
        avatar: "🚚",
        difficulty: "hard",
    },
    {
        id: "case-006",
        industry: "E-commerce",
        industryEn: "E-commerce",
        industryHe: "מסחר אלקטרוני",
        title: "Персонализация рекомендаций",
        titleEn: "Product Recommendation Personalization",
        titleHe: "התאמה אישית של המלצות",
        description: "Онлайн-магазин одежды внедрил ИИ-рекомендательную систему. На основе истории просмотров и покупок ИИ формирует персональные подборки. Конверсия выросла на 23%, средний чек +₪180.",
        descriptionEn: "An online clothing store implemented an AI recommendation system. Based on browsing and purchase history, AI creates personal selections. Conversion grew by 23%, average order +₪180.",
        descriptionHe: "חנות בגדים מקוונת יישמה מערכת המלצות AI. על בסיס היסטוריית גלישה ורכישות, AI יוצר בחירות אישיות. ההמרה גדלה ב-23%, הזמנה ממוצעת +₪180.",
        tool: "OpenAI Embeddings + Pinecone + Shopify",
        timeSaved: "—",
        moneySaved: "+₪45,000/мес",
        roiPercent: 890,
        tags: ["e-commerce", "рекомендации", "Pinecone", "Shopify"],
        tagsEn: ["e-commerce", "recommendations", "Pinecone", "Shopify"],
        tagsHe: ["מסחר", "המלצות", "Pinecone", "Shopify"],
        avatar: "👕",
        difficulty: "hard",
    },
];
