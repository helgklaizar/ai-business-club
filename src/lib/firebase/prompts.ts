export interface Prompt {
    id: string;
    // i18n fields
    title: string;
    titleEn: string;
    titleHe: string;
    description: string;
    descriptionEn: string;
    descriptionHe: string;
    category: string;
    categoryEn: string;
    categoryHe: string;
    // The actual prompt text (always in the user's language; here we store ru/en/he)
    promptRu: string;
    promptEn: string;
    promptHe: string;
    tool: string;
    tags: string[];
    tagsEn: string[];
    tagsHe: string[];
    difficulty: "easy" | "medium" | "hard";
    avatar: string;
}

export const PROMPTS: Prompt[] = [
    {
        id: "p-001",
        title: "Краткое резюме совещания",
        titleEn: "Meeting Summary",
        titleHe: "סיכום ישיבה",
        description: "Вставь транскрипт встречи — получи структурированное резюме с решениями, ответственными и дедлайнами.",
        descriptionEn: "Paste your meeting transcript and get a structured summary with decisions, owners and deadlines.",
        descriptionHe: "הדבק תמלול ישיבה וקבל סיכום מובנה עם החלטות, אחראים ותאריכי יעד.",
        category: "Продуктивность",
        categoryEn: "Productivity",
        categoryHe: "פרודוקטיביות",
        promptRu: `Ты — бизнес-ассистент. Проанализируй следующий транскрипт встречи и создай структурированный отчёт в формате:

**📋 Краткое резюме** (2-3 предложения о чём была встреча)

**✅ Принятые решения** (маркированный список)

**👤 Ответственные и задачи** (таблица: Задача | Ответственный | Срок)

**⚠️ Открытые вопросы** (что требует дополнительного обсуждения)

Транскрипт встречи:
[ВСТАВЬ ТРАНСКРИПТ ЗДЕСЬ]`,
        promptEn: `You are a business assistant. Analyze the following meeting transcript and create a structured report:

**📋 Summary** (2-3 sentences about the meeting topic)

**✅ Decisions Made** (bullet list)

**👤 Action Items** (table: Task | Owner | Deadline)

**⚠️ Open Questions** (topics requiring further discussion)

Meeting transcript:
[PASTE TRANSCRIPT HERE]`,
        promptHe: `אתה עוזר עסקי. נתח את תמלול הישיבה הבא וצור דוח מובנה:

**📋 סיכום** (2-3 משפטים על נושא הישיבה)

**✅ החלטות שהתקבלו** (רשימת נקודות)

**👤 משימות לביצוע** (טבלה: משימה | אחראי | תאריך יעד)

**⚠️ שאלות פתוחות** (נושאים הדורשים דיון נוסף)

תמלול הישיבה:
[הדבק את התמלול כאן]`,
        tool: "ChatGPT / Claude",
        tags: ["совещание", "резюме", "продуктивность"],
        tagsEn: ["meeting", "summary", "productivity"],
        tagsHe: ["ישיבה", "סיכום", "פרודוקטיביות"],
        difficulty: "easy",
        avatar: "📋",
    },
    {
        id: "p-002",
        title: "Email-воронка для холодных продаж",
        titleEn: "Cold Sales Email Sequence",
        titleHe: "רצף אימיילים למכירות קרות",
        description: "Генерирует серию из 5 emails для запуска нового продукта или услуги холодной аудитории.",
        descriptionEn: "Generates a 5-email sequence to pitch a new product or service to a cold audience.",
        descriptionHe: "מייצר רצף של 5 אימיילים לשיווק מוצר או שירות חדש לקהל קר.",
        category: "Продажи",
        categoryEn: "Sales",
        categoryHe: "מכירות",
        promptRu: `Создай серию из 5 email-писем для холодного аутрича. 

Контекст:
- Продукт/услуга: [ЧТО ПРОДАЁМ]
- Целевой клиент: [КТО ВАШ ИКП]
- Главная боль клиента: [ПРОБЛЕМА]
- Главная выгода: [РЕЗУЛЬТАТ]

Требования к письмам:
1. Email 1 (день 1): Интригующий subject line, короткое знакомство, одна острая боль
2. Email 2 (день 3): Кейс успеха (история успеха похожего клиента)
3. Email 3 (день 7): Демонстрация ценности, цифры/ROI
4. Email 4 (день 12): Возражение + закрытие
5. Email 5 (день 17): Финальный брейкап-email

Каждое письмо: тема, превью-текст, тело письма (до 150 слов), CTA.`,
        promptEn: `Create a 5-email cold outreach sequence.

Context:
- Product/Service: [WHAT YOU SELL]
- Target customer: [YOUR ICP]
- Main pain point: [PROBLEM]
- Main benefit: [OUTCOME]

Email requirements:
1. Email 1 (Day 1): Intriguing subject, brief intro, one sharp pain point
2. Email 2 (Day 3): Success story (similar customer)
3. Email 3 (Day 7): Value demonstration with numbers/ROI
4. Email 4 (Day 12): Objection handling + close
5. Email 5 (Day 17): Final breakup email

Each email: subject line, preview text, body (max 150 words), CTA.`,
        promptHe: `צור רצף של 5 אימיילים לפרוספקטינג קר.

הקשר:
- מוצר/שירות: [מה אתה מוכר]
- לקוח יעד: [ה-ICP שלך]
- נקודת כאב עיקרית: [הבעיה]
- יתרון עיקרי: [התוצאה]

דרישות לאימיילים:
1. אימייל 1 (יום 1): כותרת מסקרנת, היכרות קצרה, נקודת כאב אחת חדה
2. אימייל 2 (יום 3): סיפור הצלחה (לקוח דומה)
3. אימייל 3 (יום 7): הדגמת ערך עם מספרים/ROI
4. אימייל 4 (יום 12): טיפול בהתנגדות + סגירה
5. אימייל 5 (יום 17): אימייל פרידה סופי

כל אימייל: שורת נושא, טקסט תצוגה מקדימה, גוף (עד 150 מילים), CTA.`,
        tool: "ChatGPT",
        tags: ["продажи", "email", "аутрич"],
        tagsEn: ["sales", "email", "outreach"],
        tagsHe: ["מכירות", "אימייל", "פרוספקטינג"],
        difficulty: "medium",
        avatar: "📧",
    },
    {
        id: "p-003",
        title: "Анализ вакансии → готовое резюме",
        titleEn: "Job Analysis → Tailored Resume",
        titleHe: "ניתוח משרה → קורות חיים מותאמים",
        description: "Подаёт описание вакансии и твои данные — получаешь адаптированное резюме и сопроводительное письмо.",
        descriptionEn: "Feed it a job description and your background — get a tailored resume and cover letter.",
        descriptionHe: "הזן תיאור משרה ופרטים שלך — קבל קורות חיים ומכתב מקדים מותאמים.",
        category: "HR",
        categoryEn: "HR",
        categoryHe: "HR",
        promptRu: `Ты — эксперт по карьерному коучингу и написанию резюме. 

Описание вакансии:
[ВСТАВЬ ОПИСАНИЕ ВАКАНСИИ]

Мой опыт и навыки:
[ВСТАВЬ КРАТКОЕ ОПИСАНИЕ СВОЕГО ОПЫТА]

Задачи:
1. Выдели 5-7 ключевых требований из вакансии
2. Напиши профессиональный Summary (3-4 предложения) под эту вакансию
3. Перефразируй мой опыт, используя ключевые слова из вакансии
4. Напиши сопроводительное письмо (200-250 слов)
5. Назови 3 ATS-ключевых слова, которые нужно обязательно включить`,
        promptEn: `You are an expert career coach and resume writer.

Job Description:
[PASTE JOB DESCRIPTION]

My experience and skills:
[PASTE YOUR BACKGROUND SUMMARY]

Tasks:
1. Extract 5-7 key requirements from the job description
2. Write a professional Summary (3-4 sentences) tailored to this role
3. Rephrase my experience using keywords from the job posting
4. Write a cover letter (200-250 words)
5. List 3 ATS keywords that must be included`,
        promptHe: `אתה מאמן קריירה ומומחה לכתיבת קורות חיים.

תיאור המשרה:
[הדבק תיאור משרה]

הניסיון והכישורים שלי:
[הדבק סיכום הרקע שלך]

משימות:
1. חלץ 5-7 דרישות מפתח מתיאור המשרה
2. כתוב תקציר מקצועי (3-4 משפטים) מותאם לתפקיד זה
3. נסח מחדש את הניסיון שלי באמצעות מילות מפתח מהמשרה
4. כתוב מכתב מקדים (200-250 מילים)
5. פרט 3 מילות מפתח ATS שחייבות להיכלל`,
        tool: "ChatGPT / Claude",
        tags: ["HR", "резюме", "карьера"],
        tagsEn: ["HR", "resume", "career"],
        tagsHe: ["HR", "קורות חיים", "קריירה"],
        difficulty: "easy",
        avatar: "👔",
    },
    {
        id: "p-004",
        title: "Контент-план в Instagram на месяц",
        titleEn: "Instagram Content Plan for 1 Month",
        titleHe: "תוכנית תוכן לאינסטגרם לחודש",
        description: "30 идей постов с заголовками, хуками и хэштегами под нишу бизнеса.",
        descriptionEn: "30 post ideas with headlines, hooks and hashtags tailored to your business niche.",
        descriptionHe: "30 רעיונות לפוסטים עם כותרות, הוקים והאזטגים מותאמים לנישה העסקית שלך.",
        category: "Маркетинг",
        categoryEn: "Marketing",
        categoryHe: "שיווק",
        promptRu: `Создай контент-план для Instagram на 30 дней.

Ниша: [ВАША НИША]
Целевая аудитория: [ОПИСАНИЕ ЦА]
Тон коммуникации: [ФОРМАЛЬНЫЙ/ДРУЖЕЛЮБНЫЙ/ЭКСПЕРТНЫЙ]
Продукт/услуга: [ЧТО ПРОДАЁМ]

Для каждого дня укажи:
- Тип поста (Reels/Carousel/Photo/Story)
- Тема и главная идея
- Хук (первые 2 строки, которые останавливают скролл)
- 5-7 релевантных хэштегов

Чередуй форматы: 40% обучающий контент, 30% развлекательный, 20% продающий, 10% личный бренд.`,
        promptEn: `Create an Instagram content plan for 30 days.

Niche: [YOUR NICHE]
Target audience: [AUDIENCE DESCRIPTION]
Communication tone: [FORMAL/FRIENDLY/EXPERT]
Product/service: [WHAT YOU SELL]

For each day include:
- Post type (Reels/Carousel/Photo/Story)
- Topic and main idea
- Hook (first 2 lines that stop the scroll)
- 5-7 relevant hashtags

Mix formats: 40% educational, 30% entertaining, 20% selling, 10% personal brand.`,
        promptHe: `צור תוכנית תוכן לאינסטגרם ל-30 יום.

נישה: [הנישה שלך]
קהל יעד: [תיאור הקהל]
טון תקשורת: [פורמלי/ידידותי/מומחה]
מוצר/שירות: [מה אתה מוכר]

לכל יום כלול:
- סוג פוסט (Reels/Carousel/Photo/Story)
- נושא ורעיון מרכזי
- הוק (2 שורות ראשונות שעוצרות גלילה)
- 5-7 האזטגים רלוונטיים

ערבב פורמטים: 40% חינוכי, 30% בידורי, 20% מכירתי, 10% מותג אישי.`,
        tool: "ChatGPT",
        tags: ["маркетинг", "Instagram", "контент", "SMM"],
        tagsEn: ["marketing", "Instagram", "content", "SMM"],
        tagsHe: ["שיווק", "אינסטגרם", "תוכן", "SMM"],
        difficulty: "easy",
        avatar: "📱",
    },
    {
        id: "p-005",
        title: "Аудит бизнес-процесса для ИИ-автоматизации",
        titleEn: "Business Process AI Automation Audit",
        titleHe: "ביקורת תהליך עסקי לאוטומציה AI",
        description: "Опишешь любой бизнес-процесс — получишь детальный план автоматизации с инструментами и ROI-оценкой.",
        descriptionEn: "Describe any business process — get a detailed automation plan with tools and ROI estimate.",
        descriptionHe: "תאר כל תהליך עסקי — קבל תוכנית אוטומציה מפורטת עם כלים והערכת ROI.",
        category: "Автоматизация",
        categoryEn: "Automation",
        categoryHe: "אוטומציה",
        promptRu: `Ты — эксперт по AI-автоматизации бизнес-процессов. Проанализируй следующий процесс и разработай план автоматизации.

Описание процесса:
[ОПИШИТЕ ПРОЦЕСС: шаги, участников, инструменты, частота, время на выполнение]

Создай анализ в формате:
1. **Узкие места** — где теряется больше всего времени
2. **Что можно автоматизировать** — конкретные шаги
3. **Стек инструментов** — рекомендуемые AI/no-code инструменты (с обоснованием)
4. **Схема автоматизации** — пошаговый флоу нового процесса
5. **ROI-оценка** — ожидаемая экономия времени в часах/месяц и деньгах
6. **Сложность внедрения** — оценка 1-10 и что потребуется`,
        promptEn: `You are an AI business process automation expert. Analyze the following process and create an automation plan.

Process description:
[DESCRIBE THE PROCESS: steps, participants, tools, frequency, time to complete]

Create an analysis in this format:
1. **Bottlenecks** — where most time is wasted
2. **What can be automated** — specific steps
3. **Tool stack** — recommended AI/no-code tools (with rationale)
4. **Automation flow** — step-by-step new process diagram
5. **ROI estimate** — expected time savings in hours/month and money
6. **Implementation difficulty** — rating 1-10 and what's required`,
        promptHe: `אתה מומחה לאוטומציה של תהליכים עסקיים עם AI. נתח את התהליך הבא וצור תוכנית אוטומציה.

תיאור התהליך:
[תאר את התהליך: שלבים, משתתפים, כלים, תדירות, זמן לביצוע]

צור ניתוח בפורמט זה:
1. **צווארי בקבוק** — היכן מבוזבז הכי הרבה זמן
2. **מה ניתן לאוטומציה** — צעדים ספציפיים
3. **מחסנית כלים** — כלי AI/no-code מומלצים (עם הנמקה)
4. **זרימת אוטומציה** — תרשים תהליך חדש שלב אחר שלב
5. **הערכת ROI** — חיסכון זמן משוער בשעות/חודש וכסף
6. **קושי יישום** — דירוג 1-10 ומה נדרש`,
        tool: "Claude 3.5",
        tags: ["автоматизация", "процессы", "ROI", "аудит"],
        tagsEn: ["automation", "processes", "ROI", "audit"],
        tagsHe: ["אוטומציה", "תהליכים", "ROI", "ביקורת"],
        difficulty: "medium",
        avatar: "⚙️",
    },
    {
        id: "p-006",
        title: "Скрипт видео для YouTube / Reels",
        titleEn: "YouTube / Reels Video Script",
        titleHe: "תסריט וידאו ל-YouTube / Reels",
        description: "Тема + аудитория → готовый сценарий видео с хуком, структурой, CTA.",
        descriptionEn: "Topic + audience → ready video script with hook, structure and CTA.",
        descriptionHe: "נושא + קהל → תסריט וידאו מוכן עם הוק, מבנה ו-CTA.",
        category: "Маркетинг",
        categoryEn: "Marketing",
        categoryHe: "שיווק",
        promptRu: `Напиши сценарий для короткого видео (60-90 секунд).

Тема видео: [ТЕМА]
Целевая аудитория: [КТО СМОТРИТ]
Платформа: [YouTube Shorts / Instagram Reels / TikTok]
Цель: [ОБУЧИТЬ / ПРОДАТЬ / РАЗВЛЕЧЬ / НАБРАТЬ ПОДПИСЧИКОВ]

Структура сценария:
**[00:00-00:05] Хук** — первые 5 секунд, которые удерживают внимание
**[00:05-00:15] Проблема** — боль, которую чувствует зритель
**[00:15-00:50] Решение** — основной контент (3 ключевых пункта)
**[00:50-01:00] CTA** — чёткий призыв к действию
**[01:00-01:10] Outro** — финальный крючок

Укажи также: визуальные подсказки, B-roll идеи, текст для субтитров.`,
        promptEn: `Write a script for a short video (60-90 seconds).

Video topic: [TOPIC]
Target audience: [WHO'S WATCHING]
Platform: [YouTube Shorts / Instagram Reels / TikTok]
Goal: [EDUCATE / SELL / ENTERTAIN / GROW SUBSCRIBERS]

Script structure:
**[00:00-00:05] Hook** — first 5 seconds that hold attention
**[00:05-00:15] Problem** — pain the viewer feels
**[00:15-00:50] Solution** — main content (3 key points)
**[00:50-01:00] CTA** — clear call to action
**[01:00-01:10] Outro** — final hook

Also include: visual cues, B-roll ideas, subtitle text.`,
        promptHe: `כתוב תסריט לסרטון קצר (60-90 שניות).

נושא הסרטון: [נושא]
קהל יעד: [מי צופה]
פלטפורמה: [YouTube Shorts / Instagram Reels / TikTok]
מטרה: [לחנך / למכור / לבדר / לצמוח]

מבנה התסריט:
**[00:00-00:05] הוק** — 5 שניות ראשונות שמחזיקות תשומת לב
**[00:05-00:15] הבעיה** — כאב שהצופה מרגיש
**[00:15-00:50] הפתרון** — תוכן מרכזי (3 נקודות מפתח)
**[00:50-01:00] CTA** — קריאה ברורה לפעולה
**[01:00-01:10] Outro** — קרס סופי

כלול גם: רמזים ויזואליים, רעיונות B-roll, טקסט לכתוביות.`,
        tool: "ChatGPT / Claude",
        tags: ["видео", "контент", "YouTube", "Reels"],
        tagsEn: ["video", "content", "YouTube", "Reels"],
        tagsHe: ["וידאו", "תוכן", "YouTube", "Reels"],
        difficulty: "easy",
        avatar: "🎬",
    },
    {
        id: "p-007",
        title: "Ответ на негативный отзыв клиента",
        titleEn: "Response to Negative Customer Review",
        titleHe: "תגובה לביקורת שלילית",
        description: "Конструктивный, профессиональный ответ на любой негативный отзыв без оправданий.",
        descriptionEn: "A constructive, professional response to any negative review without excuses.",
        descriptionHe: "תגובה בונה ומקצועית לכל ביקורת שלילית ללא תירוצים.",
        category: "Продажи",
        categoryEn: "Sales",
        categoryHe: "מכירות",
        promptRu: `Ты — эксперт по работе с репутацией бренда. Напиши профессиональный ответ на негативный отзыв клиента.

Негативный отзыв:
[ВСТАВЬ ТЕКСТ ОТЗЫВА]

Контекст (что произошло на самом деле):
[ОПИШИ СИТУАЦИЮ С ВАШЕЙ СТОРОНЫ — опционально]

Требования к ответу:
- Признай чувства клиента (не защищайся)
- Извинись искренне, без "но"
- Объясни, что уже сделано для решения проблемы
- Предложи конкретное решение
- Призови продолжить разговор приватно
- Тон: тёплый, профессиональный, не шаблонный
- Длина: 80-120 слов`,
        promptEn: `You are a brand reputation expert. Write a professional response to a negative customer review.

Negative review:
[PASTE REVIEW TEXT]

Context (what actually happened on your end):
[DESCRIBE YOUR SIDE OF THE SITUATION — optional]

Response requirements:
- Acknowledge the customer's feelings (no defensiveness)
- Apologize sincerely, without "but"
- Explain what has already been done to fix the issue
- Offer a concrete solution
- Invite continued private conversation
- Tone: warm, professional, non-templated
- Length: 80-120 words`,
        promptHe: `אתה מומחה לניהול מוניטין מותג. כתוב תגובה מקצועית לביקורת שלילית של לקוח.

הביקורת השלילית:
[הדבק את טקסט הביקורת]

הקשר (מה שקרה בצד שלך):
[תאר את הצד שלך — אופציונלי]

דרישות לתגובה:
- הכר ברגשות הלקוח (ללא הגנתיות)
- התנצל בכנות, ללא "אבל"
- הסבר מה כבר נעשה לפתרון הבעיה
- הצע פתרון קונקרטי
- הזמן לשיחה פרטית
- טון: חמים, מקצועי, לא תבניתי
- אורך: 80-120 מילים`,
        tool: "ChatGPT",
        tags: ["репутация", "отзывы", "сервис", "клиенты"],
        tagsEn: ["reputation", "reviews", "service", "customers"],
        tagsHe: ["מוניטין", "ביקורות", "שירות", "לקוחות"],
        difficulty: "easy",
        avatar: "⭐",
    },
    {
        id: "p-008",
        title: "Anализ конкурентов (быстрый)",
        titleEn: "Quick Competitor Analysis",
        titleHe: "ניתוח מתחרים מהיר",
        description: "Структурированный конкурентный анализ по одному запросу — позиционирование, слабые места, возможности.",
        descriptionEn: "Structured competitive analysis from one prompt — positioning, weaknesses, opportunities.",
        descriptionHe: "ניתוח תחרותי מובנה מפרומפט אחד — מיצוב, חולשות, הזדמנויות.",
        category: "Стратегия",
        categoryEn: "Strategy",
        categoryHe: "אסטרטגיה",
        promptRu: `Проведи конкурентный анализ для моего бизнеса.

Мой бизнес: [ОПИСАНИЕ]
Конкуренты для анализа: [СПИСОК 3-5 КОНКУРЕНТОВ]
Рынок/гео: [РЫНОК И ГЕОГРАФИЯ]

Создай сравнительную таблицу по параметрам:
- Ценовое позиционирование
- УТП / основное предложение
- Целевая аудитория
- Каналы привлечения клиентов
- Явные слабые места

После таблицы:
1. Незанятые ниши (где нет сильных игроков)
2. Их лучшие практики, которые стоит внедрить
3. Наш потенциальный дифференциатор (в чём мы можем быть уникальны)`,
        promptEn: `Conduct a competitive analysis for my business.

My business: [DESCRIPTION]
Competitors to analyze: [LIST 3-5 COMPETITORS]
Market/geo: [MARKET AND GEOGRAPHY]

Create a comparison table by parameters:
- Price positioning
- USP / main offer
- Target audience
- Customer acquisition channels
- Obvious weaknesses

After the table:
1. Unoccupied niches (where there are no strong players)
2. Their best practices worth adopting
3. Our potential differentiator (where we can be unique)`,
        promptHe: `ערוך ניתוח תחרותי לעסק שלי.

העסק שלי: [תיאור]
מתחרים לניתוח: [רשימה של 3-5 מתחרים]
שוק/גיאוגרפיה: [שוק וגיאוגרפיה]

צור טבלת השוואה לפי פרמטרים:
- מיצוב מחיר
- USP / הצעה עיקרית
- קהל יעד
- ערוצי רכישת לקוחות
- חולשות ברורות

לאחר הטבלה:
1. נישות פנויות (שאין בהן שחקנים חזקים)
2. שיטות העבודה הטובות ביותר שלהם שכדאי לאמץ
3. הבידול הפוטנציאלי שלנו (במה אנחנו יכולים להיות ייחודיים)`,
        tool: "Claude 3.5 / Perplexity",
        tags: ["стратегия", "конкуренты", "анализ"],
        tagsEn: ["strategy", "competitors", "analysis"],
        tagsHe: ["אסטרטגיה", "מתחרים", "ניתוח"],
        difficulty: "medium",
        avatar: "🏆",
    },
    {
        id: "p-009",
        title: "Скрипт отдела продаж (звонки)",
        titleEn: "Sales Call Script",
        titleHe: "תסריט שיחות מכירה",
        description: "Полный скрипт для холодного/тёплого звонка с ответами на топ-5 возражений.",
        descriptionEn: "Complete cold/warm call script with answers to top-5 objections.",
        descriptionHe: "תסריט שיחה קר/חם מלא עם תשובות ל-5 ההתנגדויות הנפוצות.",
        category: "Продажи",
        categoryEn: "Sales",
        categoryHe: "מכירות",
        promptRu: `Создай профессиональный скрипт для звонков отдела продаж.

Продукт/услуга: [ЧТО ПРОДАЁМ]
Тип звонка: [ХОЛОДНЫЙ / ТЁПЛЫЙ / ПОВТОРНЫЙ]
Целевой клиент: [ДОЛЖНОСТЬ, РАЗМЕР КОМПАНИИ, ИНДУСТРИЯ]
Главная проблема клиента: [БОЛЬ]
Наше решение: [КАК МЫ РЕШАЕМ]

Структура скрипта:
1. Открытие (первые 30 секунд)
2. Квалификация (5 ключевых вопросов с логикой воронки)
3. Презентация ценности (elevator pitch 60 сек)
4. Обработка возражений — подготовь ответы на: "Дорого", "Нам не нужно", "Уже есть поставщик", "Пришлите КП", "Нет времени"
5. Закрытие (2 варианта закрытия)
6. Скрипт голосового сообщения (если не берут трубку)`,
        promptEn: `Create a professional sales call script.

Product/service: [WHAT YOU SELL]
Call type: [COLD / WARM / FOLLOW-UP]
Target customer: [TITLE, COMPANY SIZE, INDUSTRY]
Customer's main problem: [PAIN POINT]
Our solution: [HOW WE SOLVE IT]

Script structure:
1. Opening (first 30 seconds)
2. Qualification (5 key questions with funnel logic)
3. Value presentation (60-second elevator pitch)
4. Objection handling — prepare responses to: "Too expensive", "We don't need it", "We already have a vendor", "Send a proposal", "No time"
5. Closing (2 closing variations)
6. Voicemail script (if no answer)`,
        promptHe: `צור תסריט שיחות מכירה מקצועי.

מוצר/שירות: [מה אתה מוכר]
סוג שיחה: [קרה / חמה / מעקב]
לקוח יעד: [תפקיד, גודל חברה, תעשייה]
הבעיה העיקרית של הלקוח: [נקודת כאב]
הפתרון שלנו: [איך אנחנו פותרים]

מבנה התסריט:
1. פתיחה (30 שניות ראשונות)
2. כישורים (5 שאלות מפתח עם לוגיקת משפך)
3. הצגת ערך (מגרש מעלית 60 שניות)
4. טיפול בהתנגדויות — הכן תגובות ל: "יקר מדי", "אנחנו לא צריכים", "יש לנו כבר ספק", "שלח הצעה", "אין זמן"
5. סגירה (2 וריאציות סגירה)
6. תסריט הודעה קולית (אם אין מענה)`,
        tool: "ChatGPT",
        tags: ["продажи", "скрипт", "звонки", "возражения"],
        tagsEn: ["sales", "script", "calls", "objections"],
        tagsHe: ["מכירות", "תסריט", "שיחות", "התנגדויות"],
        difficulty: "medium",
        avatar: "📞",
    },
    {
        id: "p-010",
        title: "Описание вакансии, которая привлекает",
        titleEn: "Job Description That Attracts Talent",
        titleHe: "תיאור משרה שמושך כישרונות",
        description: "Не boring шаблон — живое объявление, которое находит правильных кандидатов.",
        descriptionEn: "Not a boring template — a compelling listing that finds the right candidates.",
        descriptionHe: "לא תבנית משעממת — מודעה משכנעת שמוצאת את המועמדים הנכונים.",
        category: "HR",
        categoryEn: "HR",
        categoryHe: "HR",
        promptRu: `Напиши описание вакансии, которое привлекает A-players.

Должность: [НАЗВАНИЕ РОЛИ]
Компания: [КРАТКОЕ ОПИСАНИЕ КОМПАНИИ И КУЛЬТУРЫ]
Тип занятости: [ПОЛНАЯ/ЧАСТИЧНАЯ/УДАЛЁННАЯ/ГИБРИД]
Диапазон зарплаты: [ДИАПАЗОН]
Топ-3 задачи в роли: [ЗАДАЧИ]
Обязательные навыки: [СПИСОК]
Желательные навыки: [СПИСОК]

Структура объявления:
1. Заголовок (цепляющий, не "ищем менеджера")
2. Почему это крутая роль (3-4 предложения без штампов)
3. Что ты будешь делать (конкретные задачи, не "участвовать в...")
4. Что тебя ждёт (реальные ценности компании)
5. Требования (must vs nice-to-have, без 25 лет опыта в 20-летней технологии)
6. Как подать заявку`,
        promptEn: `Write a job description that attracts A-players.

Position: [ROLE TITLE]
Company: [SHORT DESCRIPTION OF COMPANY AND CULTURE]
Employment type: [FULL-TIME/PART-TIME/REMOTE/HYBRID]
Salary range: [RANGE]
Top-3 responsibilities: [LIST]
Required skills: [LIST]
Nice-to-have skills: [LIST]

Ad structure:
1. Headline (compelling, not just "looking for a manager")
2. Why this is a great role (3-4 sentences without clichés)
3. What you'll do (specific tasks, not "participate in...")
4. What awaits you (real company values)
5. Requirements (must vs nice-to-have)
6. How to apply`,
        promptHe: `כתוב תיאור משרה שמושך A-players.

תפקיד: [שם התפקיד]
חברה: [תיאור קצר של החברה והתרבות]
סוג העסקה: [משרה מלאה/חלקית/מרחוק/היברידי]
טווח שכר: [טווח]
3 תחומי אחריות עיקריים: [רשימה]
כישורים נדרשים: [רשימה]
כישורים רצויים: [רשימה]

מבנה המודעה:
1. כותרת (מושכת, לא רק "מחפשים מנהל")
2. למה זה תפקיד מעולה (3-4 משפטים ללא קלישאות)
3. מה תעשה (משימות ספציפיות)
4. מה מחכה לך (ערכי החברה האמיתיים)
5. דרישות (חובה מול יתרון)
6. איך להגיש מועמדות`,
        tool: "Claude 3.5",
        tags: ["HR", "вакансия", "рекрутинг", "найм"],
        tagsEn: ["HR", "job posting", "recruiting", "hiring"],
        tagsHe: ["HR", "פרסום משרה", "גיוס"],
        difficulty: "easy",
        avatar: "🎯",
    },
    {
        id: "p-011",
        title: "Make/Zapier автоматизация — ТЗ для разработчика",
        titleEn: "Make/Zapier Automation — Dev Brief",
        titleHe: "אוטומציה Make/Zapier — תדריך לפיתוח",
        description: "Опиши что хочешь автоматизировать — получи полное ТЗ для настройки сценария в Make или Zapier.",
        descriptionEn: "Describe what you want to automate — get a full spec for setting up a Make or Zapier scenario.",
        descriptionHe: "תאר מה אתה רוצה לאוטומציה — קבל מפרט מלא להגדרת תרחיש ב-Make או Zapier.",
        category: "Автоматизация",
        categoryEn: "Automation",
        categoryHe: "אוטומציה",
        promptRu: `Ты — эксперт по no-code автоматизации (Make.com, Zapier, n8n). 

Я хочу автоматизировать следующее:
[ОПИШИТЕ ЧТО НУЖНО АВТОМАТИЗИРОВАТЬ]

Инструменты, которые я использую:
[СПИСОК: CRM, таблицы, мессенджеры, email и т.д.]

Создай детальное ТЗ для настройки автоматизации:
1. **Триггер** — что запускает сценарий
2. **Шаги сценария** — последовательность действий с описанием каждого модуля
3. **Условия и фильтры** — если есть развилки
4. **Обработка ошибок** — что делать при сбоях
5. **Тестирование** — как проверить что всё работает
6. **Платформа** — Make или Zapier (с обоснованием)
7. **Ориентировочное время настройки** — в часах`,
        promptEn: `You are a no-code automation expert (Make.com, Zapier, n8n).

I want to automate the following:
[DESCRIBE WHAT YOU WANT TO AUTOMATE]

Tools I use:
[LIST: CRM, spreadsheets, messengers, email, etc.]

Create a detailed spec for setting up the automation:
1. **Trigger** — what starts the scenario
2. **Scenario steps** — action sequence with each module described
3. **Conditions and filters** — if there are branches
4. **Error handling** — what to do on failure
5. **Testing** — how to verify it works
6. **Platform** — Make or Zapier (with rationale)
7. **Estimated setup time** — in hours`,
        promptHe: `אתה מומחה לאוטומציה ללא קוד (Make.com, Zapier, n8n).

אני רוצה לאוטש את הדברים הבאים:
[תאר מה אתה רוצה לאוטמת]

כלים שאני משתמש בהם:
[רשימה: CRM, גיליונות, מסנג'רים, אימייל וכו']

צור מפרט מפורט להגדרת האוטומציה:
1. **טריגר** — מה מפעיל את התרחיש
2. **שלבי התרחיש** — רצף פעולות עם תיאור כל מודול
3. **תנאים ומסננים** — אם יש הסתעפויות
4. **טיפול בשגיאות** — מה לעשות בכשל
5. **בדיקות** — איך לאמת שזה עובד
6. **פלטפורמה** — Make או Zapier (עם הנמקה)
7. **זמן הגדרה משוער** — בשעות`,
        tool: "Claude 3.5",
        tags: ["автоматизация", "Make", "Zapier", "no-code"],
        tagsEn: ["automation", "Make", "Zapier", "no-code"],
        tagsHe: ["אוטומציה", "Make", "Zapier", "no-code"],
        difficulty: "hard",
        avatar: "🔗",
    },
    {
        id: "p-012",
        title: "Стратегия выхода на новый рынок",
        titleEn: "New Market Entry Strategy",
        titleHe: "אסטרטגיית כניסה לשוק חדש",
        description: "Полная стратегия выхода на новый рынок или сегмент: исследование, риски, тактика.",
        descriptionEn: "Full strategy for entering a new market or segment: research, risks, tactics.",
        descriptionHe: "אסטרטגיה מלאה לכניסה לשוק או סגמנט חדש: מחקר, סיכונים, טקטיקה.",
        category: "Стратегия",
        categoryEn: "Strategy",
        categoryHe: "אסטרטגיה",
        promptRu: `Ты — стратегический консультант. Разработай план выхода на новый рынок.

Текущий бизнес: [ОПИСАНИЕ]
Целевой новый рынок: [РЫНОК/СЕГМЕНТ/ГЕО]
Ресурсы: [БЮДЖЕТ, КОМАНДА, СРОКИ]

Создай стратегию по фреймворку:
1. **Анализ рынка** — размер, тренды, барьеры входа
2. **Анализ конкуренции** — топ-3 игрока, их позиции
3. **Целевой сегмент** — кто наш первый клиент (beachhead)
4. **Go-to-market стратегия** — каналы, партнёрства, ценообразование
5. **Риски и митигация** — топ-5 рисков с планом Б
6. **Метрики успеха** — KPI для 30/90/180 дней
7. **Первые 30 дней** — конкретные действия weekby-week`,
        promptEn: `You are a strategic consultant. Develop a new market entry plan.

Current business: [DESCRIPTION]
Target new market: [MARKET/SEGMENT/GEO]
Resources: [BUDGET, TEAM, TIMELINE]

Create a strategy with this framework:
1. **Market analysis** — size, trends, entry barriers
2. **Competition analysis** — top-3 players and their positions
3. **Target segment** — who is our first customer (beachhead)
4. **Go-to-market strategy** — channels, partnerships, pricing
5. **Risks and mitigation** — top-5 risks with Plan B
6. **Success metrics** — KPIs for 30/90/180 days
7. **First 30 days** — specific week-by-week actions`,
        promptHe: `אתה יועץ אסטרטגי. פתח תוכנית כניסה לשוק חדש.

העסק הנוכחי: [תיאור]
שוק יעד חדש: [שוק/סגמנט/גיאוגרפיה]
משאבים: [תקציב, צוות, לוח זמנים]

צור אסטרטגיה עם המסגרת הזו:
1. **ניתוח שוק** — גודל, מגמות, חסמי כניסה
2. **ניתוח תחרות** — 3 שחקנים מובילים ועמדותיהם
3. **סגמנט יעד** — מי הלקוח הראשון שלנו (beachhead)
4. **אסטרטגיית Go-to-market** — ערוצים, שותפויות, תמחור
5. **סיכונים ומיטיגציה** — 5 סיכונים עיקריים עם תוכנית ב'
6. **מדדי הצלחה** — KPIs ל-30/90/180 יום
7. **30 הימים הראשונים** — פעולות ספציפיות שבוע אחר שבוע`,
        tool: "Claude 3.5 / Perplexity",
        tags: ["стратегия", "рынок", "GTM", "запуск"],
        tagsEn: ["strategy", "market", "GTM", "launch"],
        tagsHe: ["אסטרטגיה", "שוק", "GTM", "השקה"],
        difficulty: "hard",
        avatar: "🌍",
    },
];
