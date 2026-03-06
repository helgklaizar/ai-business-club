"use client";

import { useAuth, AuthProvider } from "@/lib/contexts/AuthContext";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
    Zap, LogOut, Lock, ChevronRight, MessageSquare, Send,
    ChevronDown, ChevronUp, Plus, X, Users
} from "lucide-react";
import { getDictionary } from "@/dictionaries";
import { doc, getDoc, collection, addDoc, onSnapshot, query, orderBy, serverTimestamp, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import Link from "next/link";

// --- Types ---
interface Thread {
    id: string;
    title: string;
    body: string;
    authorEmail: string;
    authorName: string;
    createdAt: Timestamp | null;
    replyCount: number;
}

interface Reply {
    id: string;
    body: string;
    authorEmail: string;
    authorName: string;
    createdAt: Timestamp | null;
}

// --- Nav ---
const AppHeader = ({
    dict,
    locale,
    signOut,
    email,
    isAdmin,
}: {
    dict: ReturnType<typeof getDictionary>;
    locale: string;
    signOut: () => void;
    email?: string | null;
    isAdmin?: boolean;
}) => (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-zinc-950/80 backdrop-blur-xl">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-6">
                <a href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity mr-4">
                    <img src="/logo.jpg" alt="Craft House AI" width={32} height={32} className="rounded-lg object-cover" />
                    <div className="flex flex-col">
                        <span className="font-semibold text-[14px] leading-[1.2] text-[#e8e8e8]">Craft House AI</span>
                        <span className="text-[10px] text-[#ff6b2b] uppercase font-bold tracking-[0.5px]">Club</span>
                    </div>
                </a>
                <nav className="hidden md:flex items-center gap-1">
                    {[
                        { href: `/${locale}/dashboard`, label: dict.dashboard.navCases },
                        { href: `/${locale}/vault`, label: dict.dashboard.navVault },
                        { href: `/${locale}/academy`, label: dict.dashboard.navAcademy },
                        { href: `/${locale}/community`, label: dict.dashboard.navCommunity, active: true },
                        ...(isAdmin ? [{ href: `/${locale}/admin`, label: dict.dashboard.navAdmin }] : []),
                    ].map(({ href, label, active }) => (
                        <Link
                            key={href}
                            href={href}
                            className={`px-3 py-1.5 rounded-lg text-sm transition-colors font-medium ${(active as boolean | undefined) ? "text-white bg-zinc-800" : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
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

// --- Time formatter ---
const timeAgo = (ts: Timestamp | null, locale: string): string => {
    if (!ts) return "";
    const now = Date.now();
    const diff = now - ts.toMillis();
    const mins = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    if (locale === "ru") {
        if (mins < 1) return "только что";
        if (mins < 60) return `${mins} мин назад`;
        if (hours < 24) return `${hours} ч назад`;
        return `${days} дн назад`;
    } else if (locale === "he") {
        if (mins < 1) return "הרגע";
        if (mins < 60) return `לפני ${mins} דקות`;
        if (hours < 24) return `לפני ${hours} שעות`;
        return `לפני ${days} ימים`;
    } else {
        if (mins < 1) return "just now";
        if (mins < 60) return `${mins}m ago`;
        if (hours < 24) return `${hours}h ago`;
        return `${days}d ago`;
    }
};

// --- Reply item ---
const ReplyItem = ({ reply, locale }: { reply: Reply; locale: string }) => (
    <div className="flex gap-3 py-3 border-t border-zinc-800/50">
        <div className="w-7 h-7 rounded-full bg-zinc-700 flex items-center justify-center text-xs font-bold text-zinc-300 flex-shrink-0">
            {reply.authorName?.[0]?.toUpperCase() || "?"}
        </div>
        <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
                <span className="text-xs font-semibold text-zinc-300">{reply.authorName}</span>
                <span className="text-xs text-zinc-600">{timeAgo(reply.createdAt, locale)}</span>
            </div>
            <p className="text-sm text-zinc-400 leading-relaxed whitespace-pre-wrap">{reply.body}</p>
        </div>
    </div>
);

// --- Thread Card ---
const ThreadCard = ({
    thread,
    dict,
    locale,
    user,
}: {
    thread: Thread;
    dict: ReturnType<typeof getDictionary>;
    locale: string;
    user: { uid: string; email: string | null; displayName: string | null };
}) => {
    const [expanded, setExpanded] = useState(false);
    const [replies, setReplies] = useState<Reply[]>([]);
    const [replyText, setReplyText] = useState("");
    const [sending, setSending] = useState(false);
    const [showReplyBox, setShowReplyBox] = useState(false);

    useEffect(() => {
        if (!expanded || !db) return;
        const q = query(
            collection(db, "threads", thread.id, "replies"),
            orderBy("createdAt", "asc")
        );
        const unsub = onSnapshot(q, snap => {
            setReplies(snap.docs.map(d => ({ id: d.id, ...d.data() } as Reply)));
        });
        return () => unsub();
    }, [expanded, thread.id]);

    const sendReply = async () => {
        if (!replyText.trim() || !db) return;
        setSending(true);
        try {
            await addDoc(collection(db, "threads", thread.id, "replies"), {
                body: replyText.trim(),
                authorEmail: user.email || "",
                authorName: user.displayName || user.email?.split("@")[0] || "Member",
                createdAt: serverTimestamp(),
            });
            setReplyText("");
            setShowReplyBox(false);
        } catch { /* silent */ }
        setSending(false);
    };

    return (
        <div className="bg-zinc-900/60 border border-zinc-800/50 rounded-2xl overflow-hidden hover:border-zinc-700/50 transition-colors">
            <button
                onClick={() => setExpanded(v => !v)}
                className="w-full text-left p-5 flex items-start gap-4 group"
            >
                <div className="w-9 h-9 rounded-full bg-zinc-700 flex items-center justify-center text-sm font-bold text-zinc-300 flex-shrink-0 mt-0.5">
                    {thread.authorName?.[0]?.toUpperCase() || "?"}
                </div>
                <div className="flex-1 min-w-0">
                    <h3 className="text-white font-semibold text-sm leading-snug mb-1 group-hover:text-brand transition-colors">{thread.title}</h3>
                    <p className="text-zinc-400 text-xs line-clamp-2 leading-relaxed">{thread.body}</p>
                    <div className="flex items-center gap-3 mt-2 text-xs text-zinc-600">
                        <span>{thread.authorName}</span>
                        <span>·</span>
                        <span>{timeAgo(thread.createdAt, locale)}</span>
                        <span>·</span>
                        <span className="flex items-center gap-1">
                            <MessageSquare size={11} />
                            {thread.replyCount} {dict.community.replies}
                        </span>
                    </div>
                </div>
                <div className="text-zinc-500 mt-1 flex-shrink-0">
                    {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </div>
            </button>

            {expanded && (
                <div className="px-5 pb-5 border-t border-zinc-800/50">
                    {/* Full body */}
                    <p className="text-zinc-300 text-sm leading-relaxed pt-4 mb-3 whitespace-pre-wrap">{thread.body}</p>

                    {/* Replies */}
                    {replies.length > 0 && (
                        <div className="mb-3">
                            {replies.map(r => (
                                <ReplyItem key={r.id} reply={r} locale={locale} />
                            ))}
                        </div>
                    )}

                    {/* Reply action */}
                    {!showReplyBox ? (
                        <button
                            onClick={() => setShowReplyBox(true)}
                            className="text-xs text-brand hover:text-white border border-brand/30 hover:border-brand/60 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5"
                        >
                            <MessageSquare size={12} />
                            {dict.community.reply}
                        </button>
                    ) : (
                        <div className="flex gap-2 mt-2">
                            <textarea
                                value={replyText}
                                onChange={e => setReplyText(e.target.value)}
                                placeholder={dict.community.replyPlaceholder}
                                rows={2}
                                className="flex-1 bg-zinc-950 border border-zinc-700 focus:border-brand focus:ring-1 focus:ring-brand rounded-xl px-3 py-2 text-sm transition-all outline-none resize-none text-zinc-200 placeholder-zinc-600"
                            />
                            <div className="flex flex-col gap-1.5">
                                <button
                                    onClick={sendReply}
                                    disabled={sending || !replyText.trim()}
                                    className="p-2 bg-brand hover:bg-brand-hover text-white rounded-xl transition-colors disabled:opacity-50"
                                >
                                    <Send size={14} />
                                </button>
                                <button
                                    onClick={() => { setShowReplyBox(false); setReplyText(""); }}
                                    className="p-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-400 rounded-xl transition-colors"
                                >
                                    <X size={14} />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

// --- New Thread Form ---
const NewThreadForm = ({
    dict,
    user,
    onClose,
}: {
    dict: ReturnType<typeof getDictionary>;
    user: { uid: string; email: string | null; displayName: string | null };
    onClose: () => void;
}) => {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [loading, setLoading] = useState(false);

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim() || !db) return;
        setLoading(true);
        try {
            await addDoc(collection(db, "threads"), {
                title: title.trim(),
                body: body.trim(),
                authorEmail: user.email || "",
                authorName: user.displayName || user.email?.split("@")[0] || "Member",
                createdAt: serverTimestamp(),
                replyCount: 0,
            });
            onClose();
        } catch { /* silent */ }
        setLoading(false);
    };

    return (
        <form onSubmit={submit} className="bg-zinc-900 border border-brand/20 rounded-2xl p-6 mb-6 shadow-lg shadow-brand/5">
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <Plus size={16} className="text-brand" />
                {dict.community.newThread}
            </h3>
            <input
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder={dict.community.threadTitle}
                required
                className="w-full bg-zinc-950 border border-zinc-700 focus:border-brand focus:ring-1 focus:ring-brand rounded-xl px-4 py-2.5 text-sm mb-3 transition-all outline-none text-zinc-200 placeholder-zinc-600"
            />
            <textarea
                value={body}
                onChange={e => setBody(e.target.value)}
                placeholder={dict.community.threadBody}
                rows={3}
                className="w-full bg-zinc-950 border border-zinc-700 focus:border-brand focus:ring-1 focus:ring-brand rounded-xl px-4 py-2.5 text-sm mb-4 transition-all outline-none resize-none text-zinc-200 placeholder-zinc-600"
            />
            <div className="flex gap-2">
                <button
                    type="submit"
                    disabled={loading || !title.trim()}
                    className="px-5 py-2 bg-brand hover:bg-brand-hover text-white text-sm font-medium rounded-xl transition-colors disabled:opacity-50 flex items-center gap-2"
                >
                    {loading ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Send size={14} />}
                    {dict.community.publish}
                </button>
                <button
                    type="button"
                    onClick={onClose}
                    className="px-5 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-sm font-medium rounded-xl transition-colors"
                >
                    {dict.community.cancel}
                </button>
            </div>
        </form>
    );
};

// --- Paywall ---
const CommunityPaywall = ({ dict }: { dict: ReturnType<typeof getDictionary> }) => (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
        <div className="w-full max-w-lg bg-zinc-900 border border-zinc-800 rounded-3xl p-10 relative overflow-hidden text-center shadow-2xl shadow-brand/10">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-brand/15 blur-[80px] pointer-events-none" />
            <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-brand/10 border border-brand/30 text-brand flex items-center justify-center mx-auto mb-6">
                    <Lock size={28} />
                </div>
                <h2 className="text-2xl font-bold text-white mb-3">{dict.community.paywallTitle}</h2>
                <p className="text-zinc-400 mb-8 text-sm leading-relaxed">{dict.community.paywallSubtitle}</p>
                <div className="mb-2">
                    <span className="text-4xl font-extrabold text-white">{dict.community.paywallPrice}</span>
                </div>
                <p className="text-zinc-500 text-xs mb-6">{dict.community.paywallNote}</p>
                <button
                    onClick={() => alert("Провайдер оплаты будет подключён позже.")}
                    className="w-full bg-brand hover:bg-brand-hover text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-brand/25 hover:shadow-brand/50 hover:-translate-y-0.5 flex items-center justify-center gap-2 group"
                >
                    {dict.community.paywallBtn}
                    <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
        </div>
    </div>
);

// --- Main ---
const CommunityContent = ({ locale }: { locale: string }) => {
    const { user, loading, signOut } = useAuth();
    const router = useRouter();
    const dict = getDictionary(locale);
    const [hasSubscription, setHasSubscription] = useState<boolean | null>(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [threads, setThreads] = useState<Thread[]>([]);
    const [showNewForm, setShowNewForm] = useState(false);

    useEffect(() => {
        if (!loading && !user) router.push(`/${locale}`);
    }, [user, loading, router, locale]);

    useEffect(() => {
        if (!user || !db) return;
        const check = async () => {
            try {
                const snap = await getDoc(doc(db, "users", user.uid));
                const data = snap.exists() ? snap.data() : {};
                setHasSubscription(data.subscription === "active");
                setIsAdmin(data.role === "admin");
            } catch {
                setHasSubscription(false);
            }
        };
        check();
    }, [user]);

    // Listen to threads in real-time
    useEffect(() => {
        if (!hasSubscription || !db) return;
        const q = query(collection(db, "threads"), orderBy("createdAt", "desc"));
        const unsub = onSnapshot(q, snap => {
            setThreads(snap.docs.map(d => ({ id: d.id, ...d.data() } as Thread)));
        });
        return () => unsub();
    }, [hasSubscription]);

    if (loading || hasSubscription === null) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-zinc-950">
                <div className="w-5 h-5 border-2 border-brand border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }
    if (!user) return null;

    const authorName = user.displayName || user.email?.split("@")[0] || "Member";

    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-300">
            <AppHeader dict={dict} locale={locale} signOut={signOut} email={user.email} isAdmin={isAdmin} />

            <main className="container mx-auto px-6 py-10">
                {/* Page header */}
                <div className="mb-10">
                    <div className="flex items-center gap-3 mb-1">
                        <Users size={20} className="text-brand" />
                        <p className="text-zinc-500 text-sm">Community</p>
                    </div>
                    <h1 className="text-3xl font-bold text-white">{dict.community.title}</h1>
                    <p className="text-zinc-400 mt-1">{dict.community.subtitle}</p>
                </div>

                {!hasSubscription ? (
                    <CommunityPaywall dict={dict} />
                ) : (
                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Left: Telegram card + Stats */}
                        <div className="md:col-span-1 space-y-4">
                            {/* Telegram */}
                            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-[#2AABEE]/10 blur-[60px] pointer-events-none" />
                                <div className="relative z-10">
                                    <div className="w-12 h-12 rounded-xl bg-[#2AABEE]/10 border border-[#2AABEE]/20 flex items-center justify-center mb-4 text-2xl">
                                        ✈️
                                    </div>
                                    <h3 className="text-white font-bold mb-2">{dict.community.telegramTitle}</h3>
                                    <p className="text-zinc-400 text-sm leading-relaxed mb-4">{dict.community.telegramDesc}</p>
                                    <a
                                        href="https://t.me/+placeholder"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full block text-center bg-[#2AABEE] hover:bg-[#229ED9] text-white font-semibold py-3 rounded-xl transition-colors text-sm"
                                    >
                                        {dict.community.telegramBtn}
                                    </a>
                                </div>
                            </div>

                            {/* Stats */}
                            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="text-center">
                                        <p className="text-2xl font-bold text-white">{threads.length}</p>
                                        <p className="text-xs text-zinc-500">тредов</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-2xl font-bold text-white">
                                            {threads.reduce((acc, t) => acc + (t.replyCount || 0), 0)}
                                        </p>
                                        <p className="text-xs text-zinc-500">{dict.community.replies}</p>
                                    </div>
                                </div>
                            </div>

                            {/* New thread button */}
                            <button
                                onClick={() => setShowNewForm(v => !v)}
                                className="w-full py-3 px-4 bg-brand hover:bg-brand-hover text-white font-semibold text-sm rounded-xl transition-all shadow-lg shadow-brand/20 flex items-center justify-center gap-2 group"
                            >
                                <Plus size={16} />
                                {dict.community.newThread}
                            </button>
                        </div>

                        {/* Right: Forum */}
                        <div className="md:col-span-2">
                            <div className="flex items-center justify-between mb-5">
                                <h2 className="text-white font-bold text-xl flex items-center gap-2">
                                    <MessageSquare size={18} className="text-brand" />
                                    {dict.community.forumTitle}
                                </h2>
                            </div>

                            {showNewForm && (
                                <NewThreadForm
                                    dict={dict}
                                    user={{ uid: user.uid, email: user.email, displayName: user.displayName }}
                                    onClose={() => setShowNewForm(false)}
                                />
                            )}

                            {threads.length === 0 ? (
                                <div className="text-center py-16">
                                    <p className="text-4xl mb-3">💬</p>
                                    <p className="text-zinc-500">{dict.community.noThreads}</p>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {threads.map(t => (
                                        <ThreadCard
                                            key={t.id}
                                            thread={t}
                                            dict={dict}
                                            locale={locale}
                                            user={{ uid: user.uid, email: user.email, displayName: user.displayName }}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default function CommunityPage() {
    const params = useParams();
    const locale = (params?.locale as string) || "ru";
    return (
        <AuthProvider>
            <CommunityContent locale={locale} />
        </AuthProvider>
    );
}
