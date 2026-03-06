"use client";

import { useAuth, AuthProvider } from "@/lib/contexts/AuthContext";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState, useMemo } from "react";
import {
    Search, Copy, Check, Zap, LogOut, Lock, ChevronRight,
    BookOpen, Cpu, BarChart2, Users, Megaphone
} from "lucide-react";
import { PROMPTS, Prompt } from "@/lib/firebase/prompts";
import { getDictionary } from "@/dictionaries";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import Link from "next/link";

// --- Shared Header ---
const AppHeader = ({
    dict,
    locale,
    signOut,
    email,
}: {
    dict: ReturnType<typeof getDictionary>;
    locale: string;
    signOut: () => void;
    email?: string | null;
}) => (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-zinc-950/80 backdrop-blur-xl">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-6">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-brand/10 border border-brand/30 flex items-center justify-center">
                        <Zap size={16} className="text-brand" />
                    </div>
                    <span className="font-extrabold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-500">
                        AI BUSINESS CLUB
                    </span>
                </div>
                <nav className="hidden md:flex items-center gap-1">
                    <Link
                        href={`/${locale}/dashboard`}
                        className="px-3 py-1.5 rounded-lg text-sm text-zinc-400 hover:text-white hover:bg-zinc-800/50 transition-colors font-medium"
                    >
                        {dict.dashboard.navCases}
                    </Link>
                    <Link
                        href={`/${locale}/vault`}
                        className="px-3 py-1.5 rounded-lg text-sm text-white bg-zinc-800 transition-colors font-medium"
                    >
                        {dict.dashboard.navVault}
                    </Link>
                    <Link
                        href={`/${locale}/academy`}
                        className="px-3 py-1.5 rounded-lg text-sm text-zinc-400 hover:text-white hover:bg-zinc-800/50 transition-colors font-medium"
                    >
                        {dict.dashboard.navAcademy}
                    </Link>
                    <Link
                        href={`/${locale}/community`}
                        className="px-3 py-1.5 rounded-lg text-sm text-zinc-400 hover:text-white hover:bg-zinc-800/50 transition-colors font-medium"
                    >
                        {dict.dashboard.navCommunity}
                    </Link>
                </nav>
            </div>
            <div className="flex items-center gap-3">
                <span className="text-sm text-zinc-500 hidden sm:block">{email}</span>
                <button
                    onClick={signOut}
                    className="flex items-center gap-2 text-zinc-400 hover:text-white hover:bg-zinc-800 px-3 py-2 rounded-xl transition-colors text-sm"
                >
                    <LogOut size={15} />
                    {dict.dashboard.logout}
                </button>
            </div>
        </div>
    </header>
);

// --- Category icon map ---
const categoryIcons: Record<string, React.ReactNode> = {
    Продуктивность: <BookOpen size={14} />,
    Productivity: <BookOpen size={14} />,
    "פרודוקטיביות": <BookOpen size={14} />,
    Продажи: <BarChart2 size={14} />,
    Sales: <BarChart2 size={14} />,
    "מכירות": <BarChart2 size={14} />,
    Маркетинг: <Megaphone size={14} />,
    Marketing: <Megaphone size={14} />,
    "שיווק": <Megaphone size={14} />,
    HR: <Users size={14} />,
    Автоматизация: <Cpu size={14} />,
    Automation: <Cpu size={14} />,
    "אוטומציה": <Cpu size={14} />,
    Стратегия: <BarChart2 size={14} />,
    Strategy: <BarChart2 size={14} />,
    "אסטרטגיה": <BarChart2 size={14} />,
};

// --- Difficulty Badge ---
const DiffBadge = ({ diff, dict }: { diff: Prompt["difficulty"]; dict: ReturnType<typeof getDictionary> }) => {
    const map = {
        easy: { label: dict.vault.diffEasy, cls: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
        medium: { label: dict.vault.diffMedium, cls: "bg-amber-500/10 text-amber-400 border-amber-500/20" },
        hard: { label: dict.vault.diffHard, cls: "bg-red-500/10 text-red-400 border-red-500/20" },
    };
    const { label, cls } = map[diff];
    return <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full border ${cls}`}>{label}</span>;
};

// --- Prompt Card ---
const PromptCard = ({ p, dict, locale }: { p: Prompt; dict: ReturnType<typeof getDictionary>; locale: string }) => {
    const [copied, setCopied] = useState(false);
    const [expanded, setExpanded] = useState(false);

    const title = locale === "en" ? p.titleEn : locale === "he" ? p.titleHe : p.title;
    const description = locale === "en" ? p.descriptionEn : locale === "he" ? p.descriptionHe : p.description;
    const category = locale === "en" ? p.categoryEn : locale === "he" ? p.categoryHe : p.category;
    const tags = locale === "en" ? p.tagsEn : locale === "he" ? p.tagsHe : p.tags;
    const promptText = locale === "en" ? p.promptEn : locale === "he" ? p.promptHe : p.promptRu;

    const handleCopy = async () => {
        await navigator.clipboard.writeText(promptText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="group bg-zinc-900/60 border border-zinc-800/50 rounded-2xl p-6 hover:border-brand/30 transition-all duration-300 flex flex-col">
            {/* Header */}
            <div className="flex items-start justify-between gap-3 mb-4">
                <div className="w-11 h-11 rounded-xl bg-zinc-800 text-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    {p.avatar}
                </div>
                <DiffBadge diff={p.difficulty} dict={dict} />
            </div>

            {/* Category */}
            <div className="flex items-center gap-1.5 text-xs font-semibold text-brand uppercase tracking-wider mb-1">
                {categoryIcons[category] || <BookOpen size={14} />}
                {category}
            </div>

            <h3 className="text-white font-bold text-base leading-snug mb-2">{title}</h3>
            <p className="text-zinc-400 text-sm leading-relaxed flex-1 mb-3 line-clamp-2">{description}</p>

            {/* Tool */}
            <div className="flex items-center gap-1.5 text-xs text-zinc-500 mb-4">
                <Cpu size={12} />
                <span className="font-mono">{p.tool}</span>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mb-4">
                {tags.slice(0, 4).map(tag => (
                    <span key={tag} className="text-xs bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded-md">{tag}</span>
                ))}
            </div>

            {/* Prompt Preview / Expand */}
            {expanded && (
                <div className="mb-4 p-4 bg-zinc-950 border border-zinc-800 rounded-xl overflow-auto max-h-64">
                    <pre className="text-xs text-zinc-300 whitespace-pre-wrap font-mono leading-relaxed">{promptText}</pre>
                </div>
            )}

            {/* Actions */}
            <div className="flex gap-2 mt-auto">
                <button
                    onClick={() => setExpanded(v => !v)}
                    className="flex-1 text-center text-sm text-zinc-400 hover:text-white border border-zinc-700 hover:border-zinc-500 hover:bg-zinc-800/50 rounded-xl py-2.5 transition-all font-medium"
                >
                    {expanded ? "▲" : "▼"} {expanded ? (locale === "ru" ? "Скрыть" : locale === "he" ? "הסתר" : "Hide") : (locale === "ru" ? "Показать" : locale === "he" ? "הצג" : "Preview")}
                </button>
                <button
                    onClick={handleCopy}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${copied
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                        : "bg-brand text-white hover:bg-brand-hover"
                        }`}
                >
                    {copied ? <Check size={15} /> : <Copy size={15} />}
                    {copied ? dict.vault.copied : dict.vault.copyBtn}
                </button>
            </div>
        </div>
    );
};

// --- Paywall ---
const VaultPaywall = ({ dict }: { dict: ReturnType<typeof getDictionary> }) => (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
        <div className="w-full max-w-lg bg-zinc-900 border border-zinc-800 rounded-3xl p-10 relative overflow-hidden shadow-2xl shadow-brand/10 text-center">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-brand/15 blur-[80px] pointer-events-none" />
            <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-brand/10 border border-brand/30 text-brand flex items-center justify-center mx-auto mb-6">
                    <Lock size={28} />
                </div>
                <h2 className="text-2xl font-bold text-white mb-3">{dict.vault.paywallTitle}</h2>
                <p className="text-zinc-400 mb-8 text-sm leading-relaxed">{dict.vault.paywallSubtitle}</p>
                <div className="mb-2">
                    <span className="text-4xl font-extrabold text-white">{dict.vault.paywallPrice}</span>
                </div>
                <p className="text-zinc-500 text-xs mb-6">{dict.vault.paywallNote}</p>
                <button
                    onClick={() => alert("Провайдер оплаты будет подключён позже.")}
                    className="w-full bg-brand hover:bg-brand-hover text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-brand/25 hover:shadow-brand/50 hover:-translate-y-0.5 flex items-center justify-center gap-2 group"
                >
                    {dict.vault.paywallBtn}
                    <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
        </div>
    </div>
);

// --- Main Vault Content ---
const VaultContent = ({ locale }: { locale: string }) => {
    const { user, loading, signOut } = useAuth();
    const router = useRouter();
    const dict = getDictionary(locale);
    const [hasSubscription, setHasSubscription] = useState<boolean | null>(null);
    const [search, setSearch] = useState("");
    const [activeFilter, setActiveFilter] = useState("all");

    useEffect(() => {
        if (!loading && !user) router.push(`/${locale}`);
    }, [user, loading, router, locale]);

    useEffect(() => {
        if (!user || !db) return;
        const check = async () => {
            try {
                const snap = await getDoc(doc(db, "users", user.uid));
                setHasSubscription(snap.exists() && snap.data().subscription === "active");
            } catch {
                setHasSubscription(false);
            }
        };
        check();
    }, [user]);

    const categories = useMemo(() => {
        const all = PROMPTS.map(p => locale === "en" ? p.categoryEn : locale === "he" ? p.categoryHe : p.category);
        return [dict.vault.filterAll, ...Array.from(new Set(all))];
    }, [locale, dict]);

    const filtered = useMemo(() => PROMPTS.filter(p => {
        const title = locale === "en" ? p.titleEn : locale === "he" ? p.titleHe : p.title;
        const category = locale === "en" ? p.categoryEn : locale === "he" ? p.categoryHe : p.category;
        const tags = locale === "en" ? p.tagsEn : locale === "he" ? p.tagsHe : p.tags;
        const q = search.toLowerCase();
        const matchSearch = !q || title.toLowerCase().includes(q) || category.toLowerCase().includes(q) || tags.some(t => t.toLowerCase().includes(q)) || p.tool.toLowerCase().includes(q);
        const matchFilter = activeFilter === dict.vault.filterAll || category === activeFilter;
        return matchSearch && matchFilter;
    }), [search, activeFilter, locale, dict]);

    if (loading || hasSubscription === null) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-zinc-950">
                <div className="flex items-center gap-3 text-zinc-400">
                    <div className="w-5 h-5 border-2 border-brand border-t-transparent rounded-full animate-spin" />
                </div>
            </div>
        );
    }
    if (!user) return null;

    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-300">
            <AppHeader dict={dict} locale={locale} signOut={signOut} email={user.email} />

            <main className="container mx-auto px-6 py-10">
                <div className="mb-10">
                    <p className="text-zinc-500 text-sm mb-1">Vault</p>
                    <h1 className="text-3xl font-bold text-white">{dict.vault.title}</h1>
                    <p className="text-zinc-400 mt-1">{dict.vault.subtitle}</p>
                </div>

                {!hasSubscription ? (
                    <VaultPaywall dict={dict} />
                ) : (
                    <>
                        {/* Search & Filter */}
                        <div className="flex flex-col sm:flex-row gap-4 mb-8">
                            <div className="relative flex-1">
                                <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
                                <input
                                    type="text"
                                    value={search}
                                    onChange={e => setSearch(e.target.value)}
                                    placeholder={dict.vault.searchPlaceholder}
                                    className="w-full bg-zinc-900 border border-zinc-800 focus:border-brand focus:ring-1 focus:ring-brand rounded-xl pl-10 pr-4 py-3 text-sm transition-all outline-none"
                                />
                            </div>
                            <div className="flex gap-2 flex-wrap">
                                {categories.map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => setActiveFilter(cat)}
                                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-1.5 ${activeFilter === cat
                                            ? "bg-brand text-white"
                                            : "bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-600"
                                            }`}
                                    >
                                        {cat !== dict.vault.filterAll && categoryIcons[cat]}
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <p className="text-sm text-zinc-500 mb-6">
                            {filtered.length} {dict.vault.promptsCount}
                        </p>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filtered.map(p => (
                                <PromptCard key={p.id} p={p} dict={dict} locale={locale} />
                            ))}
                        </div>
                    </>
                )}
            </main>
        </div>
    );
};

export default function VaultPage() {
    const params = useParams();
    const locale = (params?.locale as string) || "ru";
    return (
        <AuthProvider>
            <VaultContent locale={locale} />
        </AuthProvider>
    );
}
