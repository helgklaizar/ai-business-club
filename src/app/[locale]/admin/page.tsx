"use client";

import { useAuth, AuthProvider } from "@/lib/contexts/AuthContext";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
    Zap, LogOut, Users, BookOpen, Cpu, GraduationCap,
    Shield, Trash2, ChevronDown, ChevronUp, Plus, X, Save,
    Check, AlertTriangle, Edit3
} from "lucide-react";
import {
    collection, getDocs, doc, updateDoc, deleteDoc, addDoc,
    serverTimestamp, query, orderBy, onSnapshot
} from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import Link from "next/link";

// ─── Types ───────────────────────────────────────────────────────────────────

interface UserRecord {
    id: string;
    email: string;
    displayName?: string;
    subscription?: string;
    role?: string;
    createdAt?: { seconds: number } | null;
}

type Tab = "users" | "cases" | "prompts" | "academy";

// ─── Helpers ─────────────────────────────────────────────────────────────────

const Badge = ({ label, variant }: { label: string; variant: "green" | "yellow" | "red" | "zinc" }) => {
    const cls = {
        green: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
        yellow: "bg-amber-500/10 text-amber-400 border-amber-500/20",
        red: "bg-red-500/10 text-red-400 border-red-500/20",
        zinc: "bg-zinc-800 text-zinc-400 border-zinc-700",
    }[variant];
    return (
        <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full border ${cls}`}>{label}</span>
    );
};

// ─── Users Tab ───────────────────────────────────────────────────────────────

const UsersTab = () => {
    const [users, setUsers] = useState<UserRecord[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState<string | null>(null);

    useEffect(() => {
        if (!db) return;
        const q = query(collection(db, "users"), orderBy("email"));
        const unsub = onSnapshot(q, snap => {
            setUsers(snap.docs.map(d => ({ id: d.id, ...d.data() } as UserRecord)));
            setLoading(false);
        });
        return () => unsub();
    }, []);

    const toggle = async (u: UserRecord, field: "subscription" | "role", value: string) => {
        if (!db) return;
        setSaving(u.id + field);
        await updateDoc(doc(db, "users", u.id), { [field]: value });
        setSaving(null);
    };

    if (loading) return <div className="py-16 flex justify-center"><div className="w-5 h-5 border-2 border-brand border-t-transparent rounded-full animate-spin" /></div>;

    return (
        <div>
            <div className="text-zinc-400 text-sm mb-4">{users.length} пользователей в базе</div>
            <div className="rounded-2xl border border-zinc-800 overflow-hidden">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-zinc-800 text-zinc-500 text-xs">
                            <th className="px-4 py-3 text-left font-medium">Email</th>
                            <th className="px-4 py-3 text-left font-medium">Подписка</th>
                            <th className="px-4 py-3 text-left font-medium">Роль</th>
                            <th className="px-4 py-3 text-right font-medium">Действия</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((u, i) => (
                            <tr key={u.id} className={`${i % 2 === 0 ? "bg-zinc-900/30" : ""} border-b border-zinc-800/30 hover:bg-zinc-800/20 transition-colors`}>
                                <td className="px-4 py-3 text-zinc-300 font-mono text-xs">{u.email || u.id}</td>
                                <td className="px-4 py-3">
                                    <Badge
                                        label={u.subscription === "active" ? "active" : "—"}
                                        variant={u.subscription === "active" ? "green" : "zinc"}
                                    />
                                </td>
                                <td className="px-4 py-3">
                                    <Badge
                                        label={u.role || "user"}
                                        variant={u.role === "admin" ? "yellow" : "zinc"}
                                    />
                                </td>
                                <td className="px-4 py-3">
                                    <div className="flex justify-end gap-2">
                                        {/* Toggle subscription */}
                                        <button
                                            onClick={() => toggle(u, "subscription", u.subscription === "active" ? "" : "active")}
                                            disabled={saving === u.id + "subscription"}
                                            className={`text-xs px-2.5 py-1 rounded-lg border transition-colors ${u.subscription === "active"
                                                ? "border-red-500/30 text-red-400 hover:bg-red-500/10"
                                                : "border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10"
                                                } disabled:opacity-50`}
                                        >
                                            {u.subscription === "active" ? "Отключить подписку" : "Активировать"}
                                        </button>
                                        {/* Toggle admin */}
                                        <button
                                            onClick={() => toggle(u, "role", u.role === "admin" ? "user" : "admin")}
                                            disabled={saving === u.id + "role"}
                                            className="text-xs px-2.5 py-1 rounded-lg border border-zinc-700 text-zinc-400 hover:bg-zinc-800 transition-colors disabled:opacity-50"
                                        >
                                            {u.role === "admin" ? "→ user" : "→ admin"}
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {users.length === 0 && (
                    <p className="text-center py-10 text-zinc-500">Нет пользователей</p>
                )}
            </div>
        </div>
    );
};

// ─── Generic CRUD List ────────────────────────────────────────────────────────

interface CrudItem {
    id: string;
    [key: string]: unknown;
}

const CrudSection = ({
    collectionName,
    label,
    fields,
}: {
    collectionName: string;
    label: string;
    fields: { key: string; label: string; type: "text" | "textarea" | "select"; options?: string[] }[];
}) => {
    const [items, setItems] = useState<CrudItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editId, setEditId] = useState<string | null>(null);
    const [form, setForm] = useState<Record<string, string>>({});
    const [saving, setSaving] = useState(false);
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [expandedId, setExpandedId] = useState<string | null>(null);

    useEffect(() => {
        if (!db) return;
        const q = query(collection(db, collectionName), orderBy("createdAt", "desc"));
        const unsub = onSnapshot(q, snap => {
            setItems(snap.docs.map(d => ({ id: d.id, ...d.data() } as CrudItem)));
            setLoading(false);
        }, () => setLoading(false));
        return () => unsub();
    }, [collectionName]);

    const openCreate = () => {
        setEditId(null);
        setForm({});
        setShowForm(true);
    };

    const openEdit = (item: CrudItem) => {
        setEditId(item.id);
        const f: Record<string, string> = {};
        fields.forEach(field => { f[field.key] = String(item[field.key] ?? ""); });
        setForm(f);
        setShowForm(true);
    };

    const save = async () => {
        if (!db) return;
        setSaving(true);
        try {
            if (editId) {
                await updateDoc(doc(db, collectionName, editId), { ...form });
            } else {
                await addDoc(collection(db, collectionName), { ...form, createdAt: serverTimestamp() });
            }
            setShowForm(false);
            setEditId(null);
            setForm({});
        } catch (e) {
            console.error(e);
        }
        setSaving(false);
    };

    const remove = async (id: string) => {
        if (!db || !confirm("Удалить запись?")) return;
        setDeletingId(id);
        try { await deleteDoc(doc(db, collectionName, id)); } catch { /* */ }
        setDeletingId(null);
    };

    const primaryField = fields[0]?.key || "id";

    if (loading) return <div className="py-8 flex justify-center"><div className="w-5 h-5 border-2 border-brand border-t-transparent rounded-full animate-spin" /></div>;

    return (
        <div>
            <div className="flex items-center justify-between mb-4">
                <p className="text-zinc-400 text-sm">{items.length} {label}</p>
                <button
                    onClick={openCreate}
                    className="flex items-center gap-1.5 text-sm bg-brand hover:bg-brand-hover text-white px-4 py-2 rounded-xl transition-colors font-medium"
                >
                    <Plus size={14} /> Добавить
                </button>
            </div>

            {/* Form */}
            {showForm && (
                <div className="bg-zinc-900 border border-brand/20 rounded-2xl p-6 mb-4 shadow-lg shadow-brand/5">
                    <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                        {editId ? <Edit3 size={15} className="text-brand" /> : <Plus size={15} className="text-brand" />}
                        {editId ? "Редактировать" : "Новая запись"}
                    </h3>
                    <div className="space-y-3">
                        {fields.map(f => (
                            <div key={f.key}>
                                <label className="text-xs text-zinc-500 mb-1 block">{f.label}</label>
                                {f.type === "textarea" ? (
                                    <textarea
                                        value={form[f.key] ?? ""}
                                        onChange={e => setForm(prev => ({ ...prev, [f.key]: e.target.value }))}
                                        rows={4}
                                        className="w-full bg-zinc-950 border border-zinc-700 focus:border-brand focus:ring-1 focus:ring-brand rounded-xl px-3 py-2 text-sm transition-all outline-none resize-none text-zinc-200 placeholder-zinc-600"
                                    />
                                ) : f.type === "select" ? (
                                    <select
                                        value={form[f.key] ?? ""}
                                        onChange={e => setForm(prev => ({ ...prev, [f.key]: e.target.value }))}
                                        className="w-full bg-zinc-950 border border-zinc-700 focus:border-brand rounded-xl px-3 py-2 text-sm outline-none text-zinc-200"
                                    >
                                        <option value="">— выбрать —</option>
                                        {f.options?.map(o => <option key={o} value={o}>{o}</option>)}
                                    </select>
                                ) : (
                                    <input
                                        type="text"
                                        value={form[f.key] ?? ""}
                                        onChange={e => setForm(prev => ({ ...prev, [f.key]: e.target.value }))}
                                        className="w-full bg-zinc-950 border border-zinc-700 focus:border-brand focus:ring-1 focus:ring-brand rounded-xl px-3 py-2 text-sm transition-all outline-none text-zinc-200 placeholder-zinc-600"
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="flex gap-2 mt-4">
                        <button
                            onClick={save}
                            disabled={saving}
                            className="flex items-center gap-2 px-5 py-2 bg-brand hover:bg-brand-hover text-white text-sm font-medium rounded-xl transition-colors disabled:opacity-50"
                        >
                            {saving ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Save size={14} />}
                            Сохранить
                        </button>
                        <button
                            onClick={() => { setShowForm(false); setEditId(null); }}
                            className="px-5 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-sm rounded-xl transition-colors flex items-center gap-2"
                        >
                            <X size={14} /> Отмена
                        </button>
                    </div>
                </div>
            )}

            {/* List */}
            <div className="space-y-2">
                {items.length === 0 && (
                    <div className="text-center py-10 text-zinc-500">Нет записей. Добавьте первую!</div>
                )}
                {items.map(item => (
                    <div key={item.id} className="bg-zinc-900/60 border border-zinc-800/50 rounded-xl overflow-hidden">
                        <div className="flex items-center gap-3 px-4 py-3">
                            <button
                                onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
                                className="flex-1 text-left text-sm text-zinc-300 font-medium hover:text-white transition-colors truncate"
                            >
                                {String(item[primaryField] ?? item.id).slice(0, 80)}
                            </button>
                            <div className="flex items-center gap-1.5 flex-shrink-0">
                                {expandedId === item.id ? <ChevronUp size={14} className="text-zinc-500" /> : <ChevronDown size={14} className="text-zinc-500" />}
                                <button
                                    onClick={() => openEdit(item)}
                                    className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-700 rounded-lg transition-colors"
                                    title="Редактировать"
                                >
                                    <Edit3 size={14} />
                                </button>
                                <button
                                    onClick={() => remove(item.id)}
                                    disabled={deletingId === item.id}
                                    className="p-1.5 text-zinc-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors disabled:opacity-50"
                                    title="Удалить"
                                >
                                    <Trash2 size={14} />
                                </button>
                            </div>
                        </div>
                        {expandedId === item.id && (
                            <div className="px-4 pb-4 border-t border-zinc-800/30 pt-3">
                                <div className="grid grid-cols-2 gap-2">
                                    {fields.map(f => (
                                        <div key={f.key} className="text-xs">
                                            <span className="text-zinc-500">{f.label}: </span>
                                            <span className="text-zinc-300">{String(item[f.key] ?? "—").slice(0, 120)}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

// ─── Cases Tab ────────────────────────────────────────────────────────────────

const CasesTab = () => (
    <CrudSection
        collectionName="cases"
        label="кейсов"
        fields={[
            { key: "title", label: "Название (RU)", type: "text" },
            { key: "titleEn", label: "Название (EN)", type: "text" },
            { key: "industry", label: "Индустрия", type: "select", options: ["Ритейл", "Маркетинг", "Финансы", "HR", "Логистика", "E-commerce"] },
            { key: "description", label: "Описание (RU)", type: "textarea" },
            { key: "tool", label: "Инструмент", type: "text" },
            { key: "roi", label: "ROI (%)", type: "text" },
            { key: "difficulty", label: "Сложность", type: "select", options: ["easy", "medium", "hard"] },
        ]}
    />
);

// ─── Prompts Tab ──────────────────────────────────────────────────────────────

const PromptsTab = () => (
    <CrudSection
        collectionName="prompts"
        label="промптов"
        fields={[
            { key: "title", label: "Название (RU)", type: "text" },
            { key: "titleEn", label: "Название (EN)", type: "text" },
            { key: "category", label: "Категория", type: "select", options: ["Продуктивность", "Продажи", "Маркетинг", "HR", "Автоматизация", "Стратегия"] },
            { key: "description", label: "Описание (RU)", type: "textarea" },
            { key: "promptRu", label: "Текст промпта (RU)", type: "textarea" },
            { key: "tool", label: "Инструмент (ChatGPT, Claude...)", type: "text" },
            { key: "difficulty", label: "Сложность", type: "select", options: ["easy", "medium", "hard"] },
        ]}
    />
);

// ─── Academy Tab ──────────────────────────────────────────────────────────────

const AcademyTab = () => (
    <div className="space-y-8">
        <div>
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <span className="text-lg">📅</span> Предстоящие события
            </h3>
            <CrudSection
                collectionName="events"
                label="событий"
                fields={[
                    { key: "title", label: "Название (RU)", type: "text" },
                    { key: "description", label: "Описание", type: "textarea" },
                    { key: "date", label: "Дата (YYYY-MM-DD)", type: "text" },
                    { key: "time", label: "Время (напр. 18:00 IST)", type: "text" },
                    { key: "host", label: "Спикер", type: "text" },
                    { key: "zoomLink", label: "Zoom ссылка", type: "text" },
                    { key: "spots", label: "Мест всего", type: "text" },
                ]}
            />
        </div>
        <div>
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <span className="text-lg">🎬</span> Архив записей
            </h3>
            <CrudSection
                collectionName="recordings"
                label="записей"
                fields={[
                    { key: "title", label: "Название (RU)", type: "text" },
                    { key: "description", label: "Описание", type: "textarea" },
                    { key: "youtubeId", label: "YouTube Video ID", type: "text" },
                    { key: "host", label: "Спикер", type: "text" },
                    { key: "duration", label: "Длительность (1:23:45)", type: "text" },
                    { key: "date", label: "Дата записи (YYYY-MM-DD)", type: "text" },
                ]}
            />
        </div>
    </div>
);

// ─── Main ─────────────────────────────────────────────────────────────────────

const AdminContent = ({ locale }: { locale: string }) => {
    const { user, loading, signOut } = useAuth();
    const router = useRouter();
    const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
    const [tab, setTab] = useState<Tab>("users");

    useEffect(() => {
        if (!loading && !user) router.push(`/${locale}`);
    }, [user, loading, router, locale]);

    useEffect(() => {
        if (!user || !db) return;
        const check = async () => {
            try {
                const snap = await (await import("firebase/firestore")).getDoc(doc(db, "users", user.uid));
                setIsAdmin(snap.exists() && snap.data().role === "admin");
            } catch {
                setIsAdmin(false);
            }
        };
        check();
    }, [user]);

    if (loading || isAdmin === null) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-zinc-950">
                <div className="w-5 h-5 border-2 border-brand border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (!user) return null;

    if (!isAdmin) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-zinc-950">
                <div className="text-center">
                    <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center mx-auto mb-4">
                        <AlertTriangle size={28} />
                    </div>
                    <h2 className="text-xl font-bold text-white mb-2">Доступ запрещён</h2>
                    <p className="text-zinc-500 text-sm mb-6">Только для администраторов</p>
                    <Link href={`/${locale}/dashboard`} className="text-brand hover:text-white text-sm transition-colors">
                        ← На дашборд
                    </Link>
                </div>
            </div>
        );
    }

    const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
        { id: "users", label: "Пользователи", icon: <Users size={15} /> },
        { id: "cases", label: "Кейсы", icon: <BookOpen size={15} /> },
        { id: "prompts", label: "Промпты", icon: <Cpu size={15} /> },
        { id: "academy", label: "Academy", icon: <GraduationCap size={15} /> },
    ];

    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-300">
            {/* Header */}
            <header className="sticky top-0 z-40 border-b border-white/5 bg-zinc-950/80 backdrop-blur-xl">
                <div className="container mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <a href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity mr-4">
                    <img src="/logo.jpg" alt="Craft House AI" width={32} height={32} className="rounded-lg object-cover" />
                    <div className="flex flex-col">
                        <span className="font-semibold text-[14px] leading-[1.2] text-[#e8e8e8]">Craft House AI</span>
                        <span className="text-[10px] text-[#ff6b2b] uppercase font-bold tracking-[0.5px]">Club</span>
                    </div>
                </a>
                        <div className="flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold px-3 py-1 rounded-full">
                            <Shield size={12} />
                            Admin Panel
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Link
                            href={`/${locale}/dashboard`}
                            className="text-sm text-zinc-400 hover:text-white transition-colors"
                        >
                            ← К клубу
                        </Link>
                        <button
                            onClick={signOut}
                            className="flex items-center gap-2 text-zinc-400 hover:text-white hover:bg-zinc-800 px-3 py-2 rounded-xl transition-colors text-sm"
                        >
                            <LogOut size={15} />
                        </button>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-6 py-10">
                {/* Page title */}
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-white flex items-center gap-3">
                        <Shield size={22} className="text-amber-400" />
                        Панель администратора
                    </h1>
                    <p className="text-zinc-500 text-sm mt-1">Управление контентом и пользователями клуба</p>
                </div>

                {/* Tabs */}
                <div className="flex gap-1 border-b border-zinc-800 mb-8">
                    {tabs.map(t => (
                        <button
                            key={t.id}
                            onClick={() => setTab(t.id)}
                            className={`flex items-center gap-2 pb-3 px-4 text-sm font-medium border-b-2 transition-all -mb-px ${tab === t.id
                                ? "border-brand text-white"
                                : "border-transparent text-zinc-400 hover:text-zinc-200"
                                }`}
                        >
                            {t.icon}
                            {t.label}
                        </button>
                    ))}
                </div>

                {/* Tab content */}
                {tab === "users" && <UsersTab />}
                {tab === "cases" && <CasesTab />}
                {tab === "prompts" && <PromptsTab />}
                {tab === "academy" && <AcademyTab />}
            </main>
        </div>
    );
};

export default function AdminPage() {
    const params = useParams();
    const locale = (params?.locale as string) || "ru";
    return (
        <AuthProvider>
            <AdminContent locale={locale} />
        </AuthProvider>
    );
}
