"use client";

import { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "@/lib/firebase/config";
import { Dictionary } from "@/dictionaries";
import { useRouter } from "next/navigation";
import { X, Mail, KeyRound, ArrowRight } from "lucide-react";

export const AuthModal = ({ isOpen, onClose, dict, currentLocale }: { isOpen: boolean, onClose: () => void, dict: Dictionary, currentLocale: string }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    if (!isOpen) return null;

    const handleEmailSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!auth) return;
        setError("");
        setLoading(true);
        try {
            await signInWithEmailAndPassword(auth, email, password);
            onClose();
            router.push(`/${currentLocale}/dashboard`);
        } catch (err) {
            setError(dict.auth.error);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        if (!auth) return;
        setError("");
        setLoading(true);
        try {
            const provider = new GoogleAuthProvider();
            await signInWithPopup(auth, provider);
            onClose();
            router.push(`/${currentLocale}/dashboard`);
        } catch (err) {
            setError(dict.auth.error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="relative w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl shadow-brand/10 p-8 overflow-hidden">
                {/* Glow effect */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-brand/10 blur-[100px] pointer-events-none" />

                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white transition-colors z-10"
                >
                    <X size={20} />
                </button>

                <div className="text-center mb-8 relative z-10">
                    <h2 className="text-2xl font-bold tracking-tight mb-2">{dict.auth.title}</h2>
                    <p className="text-zinc-400 text-sm">{dict.auth.subtitle}</p>
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-sm p-3 rounded-lg mb-6 text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleEmailSignIn} className="space-y-4 relative z-10">
                    <div className="space-y-1">
                        <label className="text-xs font-medium text-zinc-400 pl-1">{dict.auth.emailLabel}</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-500">
                                <Mail size={16} />
                            </div>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full bg-zinc-900 border border-zinc-800 focus:border-brand focus:ring-1 focus:ring-brand rounded-xl pl-10 pr-4 py-3 text-sm transition-all outline-none"
                                placeholder="name@company.com"
                            />
                        </div>
                    </div>

                    <div className="space-y-1 pb-2">
                        <label className="text-xs font-medium text-zinc-400 pl-1">{dict.auth.passwordLabel}</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-500">
                                <KeyRound size={16} />
                            </div>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full bg-zinc-900 border border-zinc-800 focus:border-brand focus:ring-1 focus:ring-brand rounded-xl pl-10 pr-4 py-3 text-sm transition-all outline-none"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-brand hover:bg-brand-hover text-white font-medium py-3 rounded-xl transition-colors flex items-center justify-center gap-2 group disabled:opacity-50"
                    >
                        {loading ? "..." : dict.auth.loginBtn}
                        {!loading && <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform rtl:group-hover:-translate-x-1" />}
                    </button>
                </form>

                <div className="mt-6 mb-6 flex items-center gap-4 relative z-10">
                    <div className="h-px bg-zinc-800 flex-1"></div>
                    <span className="text-xs text-zinc-500 font-medium">OR</span>
                    <div className="h-px bg-zinc-800 flex-1"></div>
                </div>

                <button
                    onClick={handleGoogleSignIn}
                    disabled={loading}
                    className="relative z-10 w-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-white font-medium py-3 rounded-xl transition-colors flex items-center justify-center gap-3"
                >
                    <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                    </svg>
                    {dict.auth.googleBtn}
                </button>
            </div>
        </div>
    );
};
