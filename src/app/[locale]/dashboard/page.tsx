"use client";

import { useAuth, AuthProvider } from "@/lib/contexts/AuthContext";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState, useMemo } from "react";
import { LogOut, Lock, Search, Clock, Wallet, TrendingUp, ChevronRight, Zap } from "lucide-react";
import Link from "next/link";
import { CASES, Case } from "@/lib/firebase/cases";
import { getDictionary } from "@/dictionaries";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/config";

// --- Paywall UI ---
const Paywall = ({ dict, locale }: { dict: ReturnType<typeof getDictionary>; locale: string }) => {
    const perks = [
        "📚 Más de 50 casos reales",
        locale === "ru"
            ? "📚 Более 50 реальных кейсов с ROI"
            : locale === "he"
                ? "📚 יותר מ-50 מקרים עם ROI"
                : "📚 50+ real cases with proven ROI",
        locale === "ru"
            ? "🛠 Пошаговый разбор инструментов"
            : locale === "he"
                ? "🛠 פירוק כלים צעד אחר צעד"
                : "🛠 Step-by-step tool breakdowns",
        locale === "ru"
            ? "💼 Шаблоны и промпты резидентов"
            : locale === "he"
                ? "💼 תבניות ופרומפטים של חברים"
                : "💼 Member templates & prompts",
        locale === "ru"
            ? "🎯 Доступ к воркшопам и записям"
            : locale === "he"
                ? "🎯 גישה לסדנאות ולהקלטות"
                : "🎯 Access to workshops & recordings",
        locale === "ru"
            ? "🤝 Закрытый чат резидентов"
            : locale === "he"
                ? "🤝 צ'אט סגור של חברים"
                : "🤝 Private member community chat",
    ].slice(1); // remove the first bad placeholder

    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
            <div className="w-full max-w-lg bg-zinc-900 border border-zinc-800 rounded-3xl p-10 relative overflow-hidden shadow-2xl shadow-brand/10 text-center">
                {/* Glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-brand/15 blur-[80px] pointer-events-none" />

                <div className="relative z-10">
                    <div className="w-16 h-16 rounded-2xl bg-brand/10 border border-brand/30 text-brand flex items-center justify-center mx-auto mb-6">
                        <Lock size={28} />
                    </div>

                    <h2 className="text-2xl font-bold text-white mb-3">{dict.dashboard.paywallTitle}</h2>
                    <p className="text-zinc-400 mb-8 text-sm leading-relaxed">{dict.dashboard.paywallSubtitle}</p>

                    <ul className="text-left space-y-3 mb-8">
                        {perks.map((perk, i) => (
                            <li key={i} className="flex items-center gap-3 text-sm text-zinc-300">
                                <span className="text-base">{perk}</span>
                            </li>
                        ))}
                    </ul>

                    <div className="mb-4">
                        <span className="text-4xl font-extrabold text-white">{dict.dashboard.paywallPrice}</span>
                    </div>
                    <p className="text-zinc-500 text-xs mb-6">{dict.dashboard.paywallNote}</p>

                    <button
                        // TODO: replace href with real payment provider link
                        onClick={() => alert("Провайдер оплаты будет подключён позже. Сейчас это заглушка.")}
                        className="w-full bg-brand hover:bg-brand-hover text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-brand/25 hover:shadow-brand/50 hover:-translate-y-0.5 flex items-center justify-center gap-2 group"
                    >
                        {dict.dashboard.paywallBtn}
                        <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>
        </div>
    );
};

// --- Difficulty Badge ---
const DiffBadge = ({ diff, dict }: { diff: Case["difficulty"]; dict: ReturnType<typeof getDictionary> }) => {
    const map = {
        easy: { label: dict.dashboard.diffEasy, cls: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
        medium: { label: dict.dashboard.diffMedium, cls: "bg-amber-500/10 text-amber-400 border-amber-500/20" },
        hard: { label: dict.dashboard.diffHard, cls: "bg-red-500/10 text-red-400 border-red-500/20" },
    };
    const { label, cls } = map[diff];
    return (
        <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full border ${cls}`}>{label}</span>
    );
};

// --- Case Card ---
const CaseCard = ({ c, dict, locale }: { c: Case; dict: ReturnType<typeof getDictionary>; locale: string }) => {
    const title = locale === "en" ? c.titleEn : locale === "he" ? c.titleHe : c.title;
    const industry = locale === "en" ? c.industryEn : locale === "he" ? c.industryHe : c.industry;
    const description = locale === "en" ? c.descriptionEn : locale === "he" ? c.descriptionHe : c.description;
    const tags = locale === "en" ? c.tagsEn : locale === "he" ? c.tagsHe : c.tags;

    return (
        <div className="group bg-zinc-900/60 border border-zinc-800/50 rounded-2xl p-6 hover:border-brand/30 hover:shadow-lg hover:shadow-brand/5 transition-all duration-300 flex flex-col">
            <div className="flex items-start justify-between gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-zinc-800 text-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    {c.avatar}
                </div>
                <DiffBadge diff={c.difficulty} dict={dict} />
            </div>

            <p className="text-xs font-semibold text-brand uppercase tracking-wider mb-1">{industry}</p>
            <h3 className="text-white font-bold text-lg leading-snug mb-3">{title}</h3>
            <p className="text-zinc-400 text-sm leading-relaxed flex-1 mb-4 line-clamp-3">{description}</p>

            {/* ROI Stats */}
            <div className="grid grid-cols-3 gap-2 mb-4">
                <div className="bg-zinc-800/50 rounded-xl p-3 text-center">
                    <Clock size={14} className="text-brand mx-auto mb-1" />
                    <p className="text-white font-bold text-sm">{c.timeSaved}</p>
                    <p className="text-zinc-500 text-[10px] mt-0.5">{dict.dashboard.timeSaved}</p>
                </div>
                <div className="bg-zinc-800/50 rounded-xl p-3 text-center">
                    <Wallet size={14} className="text-emerald-400 mx-auto mb-1" />
                    <p className="text-emerald-400 font-bold text-sm">{c.moneySaved}</p>
                    <p className="text-zinc-500 text-[10px] mt-0.5">{dict.dashboard.moneySaved}</p>
                </div>
                <div className="bg-zinc-800/50 rounded-xl p-3 text-center">
                    <TrendingUp size={14} className="text-amber-400 mx-auto mb-1" />
                    <p className="text-amber-400 font-bold text-sm">{c.roiPercent}%</p>
                    <p className="text-zinc-500 text-[10px] mt-0.5">{dict.dashboard.roi}</p>
                </div>
            </div>

            {/* Tool */}
            <p className="text-xs text-zinc-500 mb-4 font-mono">{c.tool}</p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mb-5">
                {tags.map(tag => (
                    <span key={tag} className="text-xs bg-zinc-800 text-zinc-400 px-2. py-0.5 rounded-md">{tag}</span>
                ))}
            </div>

            <button className="mt-auto w-full text-center text-sm text-brand hover:text-white border border-brand/30 hover:border-brand hover:bg-brand/5 rounded-xl py-2.5 transition-all font-medium flex items-center justify-center gap-1.5">
                {dict.dashboard.readCase}
                <ChevronRight size={16} />
            </button>
        </div>
    );
};

// --- Main Dashboard Content ---
const DashboardContent = ({ locale }: { locale: string }) => {
    const { user, loading, signOut } = useAuth();
    const router = useRouter();
    const dict = getDictionary(locale);
    const [hasSubscription, setHasSubscription] = useState<boolean | null>(null);
    const [search, setSearch] = useState("");
    const [activeFilter, setActiveFilter] = useState("all");

    useEffect(() => {
        if (!loading && !user) {
            router.push(`/${locale}`);
        }
    }, [user, loading, router, locale]);

    // Check subscription status in Firestore
    useEffect(() => {
        if (!user || !db) return;
        const checkSub = async () => {
            try {
                const ref = doc(db, "users", user.uid);
                const snap = await getDoc(ref);
                if (snap.exists() && snap.data().subscription === "active") {
                    setHasSubscription(true);
                } else {
                    setHasSubscription(false);
                }
            } catch {
                setHasSubscription(false);
            }
        };
        checkSub();
    }, [user]);

    const industries = useMemo(() => {
        const all = CASES.map(c => locale === "en" ? c.industryEn : locale === "he" ? c.industryHe : c.industry);
        return [dict.dashboard.filterAll, ...Array.from(new Set(all))];
    }, [locale, dict]);

    const filteredCases = useMemo(() => {
        return CASES.filter(c => {
            const title = locale === "en" ? c.titleEn : locale === "he" ? c.titleHe : c.title;
            const industry = locale === "en" ? c.industryEn : locale === "he" ? c.industryHe : c.industry;
            const matchSearch = title.toLowerCase().includes(search.toLowerCase()) ||
                industry.toLowerCase().includes(search.toLowerCase()) ||
                c.tool.toLowerCase().includes(search.toLowerCase());
            const matchFilter = activeFilter === dict.dashboard.filterAll || industry === activeFilter;
            return matchSearch && matchFilter;
        });
    }, [search, activeFilter, locale, dict]);

    if (loading || hasSubscription === null) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-zinc-950">
                <div className="flex items-center gap-3 text-zinc-400">
                    <div className="w-5 h-5 border-2 border-brand border-t-transparent rounded-full animate-spin" />
                    <span>Loading...</span>
                </div>
            </div>
        );
    }

    if (!user) return null;

    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-300">
            {/* Header */}
            <header className="sticky top-0 z-40 border-b border-white/5 bg-zinc-950/80 backdrop-blur-xl">
                <div className="container mx-auto px-6 h-18 py-4 flex items-center justify-between">
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
                            className="px-3 py-1.5 rounded-lg text-sm text-white bg-zinc-800 transition-colors font-medium"
                        >
                            {dict.dashboard.navCases}
                        </Link>
                        <Link
                            href={`/${locale}/vault`}
                            className="px-3 py-1.5 rounded-lg text-sm text-zinc-400 hover:text-white hover:bg-zinc-800/50 transition-colors font-medium"
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
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-zinc-400 hidden sm:block">{user.email}</span>
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

            <main className="container mx-auto px-6 py-10">
                {/* Welcome */}
                <div className="mb-10">
                    <p className="text-zinc-500 text-sm mb-1">{dict.dashboard.welcome}</p>
                    <h1 className="text-3xl font-bold text-white">{dict.dashboard.title}</h1>
                    <p className="text-zinc-400 mt-1">{dict.dashboard.subtitle}</p>
                </div>

                {!hasSubscription ? (
                    <Paywall dict={dict} locale={locale} />
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
                                    placeholder={dict.dashboard.searchPlaceholder}
                                    className="w-full bg-zinc-900 border border-zinc-800 focus:border-brand focus:ring-1 focus:ring-brand rounded-xl pl-10 pr-4 py-3 text-sm transition-all outline-none"
                                />
                            </div>
                            <div className="flex gap-2 flex-wrap">
                                {industries.map(ind => (
                                    <button
                                        key={ind}
                                        onClick={() => setActiveFilter(ind)}
                                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${activeFilter === ind
                                            ? "bg-brand text-white"
                                            : "bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-600"
                                            }`}
                                    >
                                        {ind}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <p className="text-sm text-zinc-500 mb-6">{filteredCases.length} {dict.dashboard.casesCount}</p>

                        {/* Cases Grid */}
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredCases.map(c => (
                                <CaseCard key={c.id} c={c} dict={dict} locale={locale} />
                            ))}
                        </div>
                    </>
                )}
            </main>
        </div>
    );
};

export default function DashboardPage() {
    const params = useParams();
    const locale = (params?.locale as string) || "ru";

    return (
        <AuthProvider>
            <DashboardContent locale={locale} />
        </AuthProvider>
    );
}
