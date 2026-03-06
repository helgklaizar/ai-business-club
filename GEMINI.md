# GEMINI.md — Оперативная память проекта AI Business Club

> Обновлять в конце каждой сессии.

## Последнее обновление: 2026-03-06 (сессия 4)

## Что сделано (текущее состояние)
- ✅ **Задача 01-setup-firebase**: Firebase config, `.env.local` заполнен (проект `ai-business-club`), tsc чистый.
- ✅ **Задача 02-landing-and-auth**: Лендинг, AuthModal (email+Google), AuthContext, AuthButton, Dashboard-заглушка. Мультиязык (ru/en/he).
- ✅ **Задача 03-cases-and-paywall**: Cases Library — 6 кейсов, пейвол, фильтры, ROI-карточки.
- ✅ **Задача 04-vault-prompts**: Vault — 12 промптов, копирование, превью, поиск, категории.
  - `src/lib/firebase/prompts.ts` — 12 промптов с переводами (ru/en/he): 5 категорий (Продажи, Маркетинг, HR, Автоматизация, Стратегия, Продуктивность).
  - `/[locale]/vault` — новый роут. Карточки с превью промпта, кнопка "Копировать" (clipboard API), поиск, фильтры по категории.
  - Навигация Cases ↔ Vault добавлена в хедер обоих страниц.
  - Пейвол аналогичен дашборду: проверка `subscription === "active"` в Firestore.
  - Словари обновлены (секция `vault`) для всех 3 языков.
- ✅ **Задача 05-academy-events**: Academy — вкладки Upcoming/Archive.
  - `src/lib/firebase/academy.ts` — 4 ивента + 5 архивных записей с переводами (ru/en/he)
  - `/[locale]/academy` — новый роут с табами Предстоящие / Архив
  - Ивенты: дата, время, спикер, progress-bar мест, ссылка на Zoom
  - Архив: inline YouTube embed с play-кнопкой, просмотры, длительность
  - Навигация Cases ↔ Vault ↔ Academy во всех страницах
  - Пейвол аналогичен остальным разделам
- ✅ **Задача 06-community-chats**: Community — Telegram-карточка + Q&A форум.
  - `/[locale]/community` — новый роут
  - Telegram-карточка с брендингом + ссылка на закрытый чат
  - Q&A форум: real-time через Firestore `threads` + `threads/{id}/replies`
  - Создание тредов и ответов, временны́е метки i18n (ru/en/he)
  - Ссылка Admin в nav видна только для роли `admin` (проверка Firestore)
  - Убран `output: export` из next.config.ts (несовместим с Firestore real-time)
- ✅ **Задача 07-admin-panel**: Admin Panel — полная управлялка.
  - `/[locale]/admin` — новый роут, защита по `role === "admin"` в Firestore
  - Вкладка **Users**: real-time список, toggle подписки, toggle роли admin/user
  - Вкладка **Cases**: CRUD через Firestore коллекция `cases`
  - Вкладка **Prompts**: CRUD через Firestore коллекция `prompts`
  - Вкладка **Academy**: CRUD для `events` и `recordings`
  - Кнопка Админки в nav — видна только admin

## Как дать права admin (dev)
Firestore Console → коллекция `users` → документ `{uid}` → поле `role` = `"admin"`

## Как дать подписку резиденту (dev)
Firestore Console → коллекция `users` → документ `{uid}` → поле `subscription` = `"active"`

## Роуты приложения
| Роут | Описание |
|---|---|
| `/[locale]` | Лендинг + AuthModal |
| `/[locale]/dashboard` | Кейсы (Cases Library) |
| `/[locale]/vault` | Библиотека промптов |
| `/[locale]/academy` | Воркшопы + архив записей |
| `/[locale]/community` | Чат (Telegram) + Q&A форум |
| `/[locale]/admin` | Admin Panel (только для role=admin) |

## Известные проблемы / технический долг
- Кнопка оплаты — заглушка (`alert`). Провайдер оплаты не выбран.
- Нет Firestore security rules (приоритет перед запуском в prod).
- Seed кейсы/промпты в статике `src/lib/firebase/`. Admin panel создаёт НОВЫЕ записи в Firestore, но старые seed данные всё ещё из файлов. Нужно мигрировать или сделать priority Firestore.
- Telegram ссылка — placeholder (`https://t.me/+placeholder`).
- Admin ссылка показывается только на странице Community. Остальные страницы — без role check.

## Следующие приоритеты
- Настроить Firestore Security Rules перед деплоем в prod.
- Выбрать провайдера оплаты (Israel: Tranzila, PayMe, CardCom) и подключить Checkout.
- Добавить реальную Telegram-ссылку.
