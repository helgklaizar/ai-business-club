"use client";

import { useAuth, AuthProvider } from "@/lib/contexts/AuthContext";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
    Zap, LogOut, Lock, ChevronRight, Calendar, Clock,
    Users, Play, Eye, Mic, ExternalLink, GraduationCap
} from "lucide-react";
import { EVENTS, RECORDINGS, AcademyEvent, AcademyRecord } from "@/lib/firebase/academy";
import { getDictionary } from "@/dictionaries";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import Link from "next/link";

// --- Shared App Header ---
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
                    {[
                        { href: `/${locale}/dashboard`, label: dict.dashboard.navCases },
                        { href: `/${locale}/vault`, label: dict.dashboard.navVault },
                        { href: `/${locale}/academy`, label: dict.dashboard.navAcademy, active: true },
                    ].map(({ href, label, active }) => (
                        <Link
                            key={href}
                            href={href}
                            className={`px-3 py-1.5 rounded-lg text-sm transition-colors font-medium ${active
                                ? "text-white bg-zinc-800"
                                : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
                                }`}
                        >
                            {label}
                        </Link>
                    ))}
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

// --- Date formatter ---
const formatDate = (iso: string, locale: string) => {
    const d = new Date(iso);
    const opts: Intl.DateTimeFormatOptions = { day: "numeric", month: "long", year: "numeric" };
    const loc = locale === "he" ? "he-IL" : locale === "en" ? "en-US" : "ru-RU";
    return d.toLocaleDateString(loc, opts);
};

// --- Spotsbar ---
const SpotsBar = ({ registered, spots, dict }: { registered: number; spots: number; dict: ReturnType<typeof getDictionary> }) => {
    const pct = Math.round((registered / spots) * 100);
    const isFull = pct >= 100;
    const isAlmost = pct >= 80;
    const color = isFull ? "bg-red-500" : isAlmost ? "bg-amber-500" : "bg-brand";
    return (
        <div>
            <div className="flex justify-between text-xs text-zinc-500 mb-1">
                <span>{registered} {dict.academy.registered}</span>
                <span>{dict.academy.of} {spots} {dict.academy.spots}</span>
            </div>
            <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                <div className={`h-full rounded-full transition-all ${color}`} style={{ width: `${Math.min(pct, 100)}%` }} />
            </div>
        </div>
    );
};

// --- Category pill ---
const CategoryPill = ({ label }: { label: string }) => (
    <span className="text-xs font-semibold text-brand uppercase tracking-wider px-2.5 py-1 rounded-full bg-brand/10 border border-brand/20">
        {label}
    </span>
);

// --- Event Card ---
const EventCard = ({ ev, dict, locale }: { ev: AcademyEvent; dict: ReturnType<typeof getDictionary>; locale: string }) => {
    const title = locale === "en" ? ev.titleEn : locale === "he" ? ev.titleHe : ev.title;
    const description = locale === "en" ? ev.descriptionEn : locale === "he" ? ev.descriptionHe : ev.description;
    const category = locale === "en" ? ev.categoryEn : locale === "he" ? ev.categoryHe : ev.category;
    const duration = locale === "en" ? ev.durationEn : locale === "he" ? ev.durationHe : ev.duration;
    const hostTitle = locale === "en" ? ev.hostTitleEn : locale === "he" ? ev.hostTitleHe : ev.hostTitle;
    const tags = locale === "en" ? ev.tagsEn : locale === "he" ? ev.tagsHe : ev.tags;

    const isFull = ev.registered >= ev.spots;

    return (
        <div className="bg-zinc-900/60 border border-zinc-800/50 rounded-2xl p-6 hover:border-brand/30 hover:shadow-lg hover:shadow-brand/5 transition-all duration-300 flex flex-col">
            {/* Header */}
            <div className="flex items-start justify-between gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-zinc-800 text-2xl flex items-center justify-center flex-shrink-0">
                    {ev.avatar}
                </div>
                <CategoryPill label={category} />
            </div>

            <h3 className="text-white font-bold text-lg leading-snug mb-2">{title}</h3>
            <p className="text-zinc-400 text-sm leading-relaxed mb-4 flex-1 line-clamp-3">{description}</p>

            {/* Meta */}
            <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-zinc-400">
                    <Calendar size={14} className="text-brand flex-shrink-0" />
                    <span>{formatDate(ev.date, locale)} — {ev.time}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-zinc-400">
                    <Clock size={14} className="text-zinc-500 flex-shrink-0" />
                    <span>{duration}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-zinc-400">
                    <Mic size={14} className="text-zinc-500 flex-shrink-0" />
                    <span>{ev.host} — <span className="text-zinc-500 text-xs">{hostTitle}</span></span>
                </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mb-4">
                {tags.map(t => (
                    <span key={t} className="text-xs bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded-md">{t}</span>
                ))}
            </div>

            {/* Spots bar */}
            <div className="mb-4">
                <SpotsBar registered={ev.registered} spots={ev.spots} dict={dict} />
            </div>

            {/* CTA */}
            <a
                href={isFull ? undefined : ev.zoomLink}
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-auto w-full text-center py-3 rounded-xl font-medium text-sm transition-all flex items-center justify-center gap-2 group ${isFull
                    ? "bg-zinc-800 text-zinc-500 cursor-not-allowed"
                    : "bg-brand hover:bg-brand-hover text-white shadow-lg shadow-brand/20 hover:shadow-brand/40 hover:-translate-y-0.5"
                    }`}
            >
                {isFull ? "Мест нет" : dict.academy.registerBtn}
                {!isFull && <ExternalLink size={15} className="group-hover:translate-x-0.5 transition-transform" />}
            </a>
        </div>
    );
};

// --- Recording Card ---
const RecordingCard = ({
    rec,
    dict,
    locale,
    onPlay,
    isPlaying,
}: {
    rec: AcademyRecord;
    dict: ReturnType<typeof getDictionary>;
    locale: string;
    onPlay: (id: string) => void;
    isPlaying: boolean;
}) => {
    const title = locale === "en" ? rec.titleEn : locale === "he" ? rec.titleHe : rec.title;
    const description = locale === "en" ? rec.descriptionEn : locale === "he" ? rec.descriptionHe : rec.description;
    const category = locale === "en" ? rec.categoryEn : locale === "he" ? rec.categoryHe : rec.category;
    const tags = locale === "en" ? rec.tagsEn : locale === "he" ? rec.tagsHe : rec.tags;

    return (
        <div className="bg-zinc-900/60 border border-zinc-800/50 rounded-2xl overflow-hidden hover:border-brand/30 transition-all duration-300">
            {/* Video embed or thumbnail */}
            {isPlaying ? (
                <div className="aspect-video bg-black">
                    <iframe
                        className="w-full h-full"
                        src={`https://www.youtube.com/embed/${rec.youtubeId}?autoplay=1`}
                        title={title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                </div>
            ) : (
                <button
                    onClick={() => onPlay(rec.id)}
                    className="w-full aspect-video bg-zinc-950 relative flex items-center justify-center group cursor-pointer"
                    aria-label={`Play ${title}`}
                >
                    <div className="absolute inset-0 flex items-center justify-center opacity-40 text-6xl select-none pointer-events-none">
                        {rec.avatar}
                    </div>
                    <div className="w-16 h-16 rounded-full bg-brand/90 flex items-center justify-center shadow-2xl shadow-brand/40 group-hover:scale-110 group-hover:bg-brand transition-all z-10">
                        <Play size={24} className="text-white ml-1" fill="white" />
                    </div>
                    <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded font-mono">
                        {rec.duration}
                    </div>
                </button>
            )}

            <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                    <CategoryPill label={category} />
                    <span className="text-xs text-zinc-500">{formatDate(rec.date, locale)}</span>
                </div>

                <h3 className="text-white font-bold text-base leading-snug mb-2">{title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed line-clamp-2 mb-3">{description}</p>

                <div className="flex items-center justify-between text-xs text-zinc-500">
                    <div className="flex items-center gap-1.5">
                        <Mic size={12} />
                        <span>{rec.host}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Eye size={12} />
                        <span>{rec.views} {dict.academy.views}</span>
                    </div>
                </div>

                <div className="flex flex-wrap gap-1.5 mt-3">
                    {tags.slice(0, 4).map(t => (
                        <span key={t} className="text-xs bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded-md">{t}</span>
                    ))}
                </div>
            </div>
        </div>
    );
};

// --- Paywall ---
const AcademyPaywall = ({ dict }: { dict: ReturnType<typeof getDictionary> }) => (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
        <div className="w-full max-w-lg bg-zinc-900 border border-zinc-800 rounded-3xl p-10 relative overflow-hidden text-center shadow-2xl shadow-brand/10">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-brand/15 blur-[80px] pointer-events-none" />
            <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-brand/10 border border-brand/30 text-brand flex items-center justify-center mx-auto mb-6">
                    <Lock size={28} />
                </div>
                <h2 className="text-2xl font-bold text-white mb-3">{dict.academy.paywallTitle}</h2>
                <p className="text-zinc-400 mb-8 text-sm leading-relaxed">{dict.academy.paywallSubtitle}</p>
                <div className="mb-2">
                    <span className="text-4xl font-extrabold text-white">{dict.academy.paywallPrice}</span>
                </div>
                <p className="text-zinc-500 text-xs mb-6">{dict.academy.paywallNote}</p>
                <button
                    onClick={() => alert("Провайдер оплаты будет подключён позже.")}
                    className="w-full bg-brand hover:bg-brand-hover text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-brand/25 hover:shadow-brand/50 hover:-translate-y-0.5 flex items-center justify-center gap-2 group"
                >
                    {dict.academy.paywallBtn}
                    <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
        </div>
    </div>
);

// --- Main ---
const AcademyContent = ({ locale }: { locale: string }) => {
    const { user, loading, signOut } = useAuth();
    const router = useRouter();
    const dict = getDictionary(locale);
    const [hasSubscription, setHasSubscription] = useState<boolean | null>(null);
    const [tab, setTab] = useState<"upcoming" | "archive">("upcoming");
    const [playingId, setPlayingId] = useState<string | null>(null);

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

    if (loading || hasSubscription === null) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-zinc-950">
                <div className="w-5 h-5 border-2 border-brand border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }
    if (!user) return null;

    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-300">
            <AppHeader dict={dict} locale={locale} signOut={signOut} email={user.email} />

            <main className="container mx-auto px-6 py-10">
                {/* Page title */}
                <div className="mb-10">
                    <div className="flex items-center gap-3 mb-1">
                        <GraduationCap size={20} className="text-brand" />
                        <p className="text-zinc-500 text-sm">Academy</p>
                    </div>
                    <h1 className="text-3xl font-bold text-white">{dict.academy.title}</h1>
                    <p className="text-zinc-400 mt-1">{dict.academy.subtitle}</p>
                </div>

                {!hasSubscription ? (
                    <AcademyPaywall dict={dict} />
                ) : (
                    <>
                        {/* Tabs */}
                        <div className="flex gap-2 mb-8 border-b border-zinc-800">
                            {(["upcoming", "archive"] as const).map(t => (
                                <button
                                    key={t}
                                    onClick={() => setTab(t)}
                                    className={`pb-3 px-4 text-sm font-medium border-b-2 transition-all -mb-px ${tab === t
                                        ? "border-brand text-white"
                                        : "border-transparent text-zinc-400 hover:text-zinc-200"
                                        }`}
                                >
                                    {t === "upcoming" ? dict.academy.tabUpcoming : dict.academy.tabArchive}
                                    <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${tab === t ? "bg-brand/20 text-brand" : "bg-zinc-800 text-zinc-500"}`}>
                                        {t === "upcoming" ? EVENTS.length : RECORDINGS.length}
                                    </span>
                                </button>
                            ))}
                        </div>

                        {/* Upcoming Events */}
                        {tab === "upcoming" && (
                            <>
                                {EVENTS.length === 0 ? (
                                    <p className="text-zinc-500 text-center py-16">{dict.academy.noEvents}</p>
                                ) : (
                                    <div className="grid md:grid-cols-2 gap-6">
                                        {EVENTS.map(ev => (
                                            <EventCard key={ev.id} ev={ev} dict={dict} locale={locale} />
                                        ))}
                                    </div>
                                )}
                            </>
                        )}

                        {/* Archive */}
                        {tab === "archive" && (
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {RECORDINGS.map(rec => (
                                    <RecordingCard
                                        key={rec.id}
                                        rec={rec}
                                        dict={dict}
                                        locale={locale}
                                        onPlay={setPlayingId}
                                        isPlaying={playingId === rec.id}
                                    />
                                ))}
                            </div>
                        )}
                    </>
                )}
            </main>
        </div>
    );
};

export default function AcademyPage() {
    const params = useParams();
    const locale = (params?.locale as string) || "ru";
    return (
        <AuthProvider>
            <AcademyContent locale={locale} />
        </AuthProvider>
    );
}
