import { getDictionary } from "@/dictionaries";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { AuthButton } from "@/components/auth/AuthButton";
import Image from "next/image";
import { PlayCircle, ShieldCheck, Zap, BarChart } from "lucide-react";
import { AuthProvider } from "@/lib/contexts/AuthContext";

export default async function Home({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    const dict = getDictionary(locale);

    return (
        <AuthProvider>
            <div className="min-h-screen flex flex-col relative overflow-hidden text-zinc-300">

                {/* Background Gradients & Noise */}
                <div className="absolute inset-0 z-[-2] bg-zinc-950"></div>
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent"></div>
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-brand/10 blur-[150px] rounded-full z-[-1] opacity-50 pointer-events-none"></div>

                {/* Navigation */}
                <header className="fixed top-0 inset-x-0 z-50 border-b border-white/5 bg-zinc-950/50 backdrop-blur-xl supports-[backdrop-filter]:bg-zinc-950/20">
                    <div className="container mx-auto px-6 h-20 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Image
                                src="/logo.jpg"
                                alt="Logo"
                                width={40}
                                height={40}
                                className="rounded-xl brightness-110 contrast-125 saturate-150"
                            />
                            <span className="font-extrabold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-500">
                                {dict.global.logoText}
                            </span>
                        </div>

                        <div className="flex items-center gap-6">
                            <div className="hidden lg:flex items-center text-sm font-medium mr-4">
                                <a href="https://crafthouse.ai" className="text-zinc-400 hover:text-white transition-colors">Home</a>
                                <span className="text-zinc-600 mx-3">·</span>
                                <a href="https://expert.crafthouse.ai" className="text-zinc-400 hover:text-white transition-colors">Expert</a>
                                <span className="text-zinc-600 mx-3">·</span>
                                <a href="https://support.crafthouse.ai" className="text-zinc-400 hover:text-white transition-colors">Support</a>
                                <span className="text-zinc-600 mx-3">·</span>
                                <a href="https://apps.crafthouse.ai" className="text-zinc-400 hover:text-white transition-colors">Apps</a>
                                <span className="text-zinc-600 mx-4">|</span>
                            </div>

                            <LanguageSwitcher currentLocale={locale} />
                            <div className="w-px h-6 bg-zinc-800 hidden md:block"></div>
                            <AuthButton dict={dict} currentLocale={locale} variant="ghost" />
                        </div>
                    </div>
                </header>

                {/* Hero Section */}
                <main className="flex-1 flex flex-col justify-center pt-32 pb-20 container mx-auto px-6 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">

                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand/30 bg-brand/5 text-brand text-sm font-semibold tracking-wide mb-8 animate-fade-in">
                            <ShieldCheck size={16} />
                            {dict.hero.badge}
                        </div>

                        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-8 leading-[1.1]">
                            {dict.hero.title} <br className="hidden md:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-[#ff8c3a]">
                                {dict.hero.titleHighlight}
                            </span>
                        </h1>

                        <p className="text-xl md:text-2xl text-zinc-400 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
                            {dict.hero.subtitle}
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 px-4">
                            <AuthButton dict={dict} currentLocale={locale} variant="primary" />

                            <button className="px-8 py-4 rounded-full font-medium transition-all inline-flex items-center gap-2 text-white bg-zinc-900 border border-zinc-700 hover:border-zinc-500 hover:bg-zinc-800">
                                <PlayCircle size={20} className="text-brand" />
                                {dict.hero.secondaryCta}
                            </button>
                        </div>
                    </div>
                </main>

                {/* Features Minimal Section */}
                <section className="border-t border-white/5 bg-zinc-950/50 backdrop-blur-sm relative z-10 py-20 mt-auto">
                    <div className="container mx-auto px-6">
                        <div className="max-w-3xl mx-auto text-center">
                            <h2 className="text-3xl font-bold text-white mb-6 flex items-center justify-center gap-3">
                                <Zap className="text-brand" />
                                {dict.features.title}
                            </h2>
                            <p className="text-lg text-zinc-400">
                                {dict.features.description}
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8 mt-16 max-w-5xl mx-auto">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="p-8 rounded-2xl bg-zinc-900/50 border border-zinc-800/50 hover:border-brand/30 transition-colors group">
                                    <div className="w-12 h-12 rounded-xl bg-brand/10 text-brand flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                        <BarChart size={24} />
                                    </div>
                                    <div className="h-4 bg-zinc-800 rounded w-2/3 mb-4"></div>
                                    <div className="h-3 bg-zinc-800/50 rounded w-full mb-2"></div>
                                    <div className="h-3 bg-zinc-800/50 rounded w-4/5"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </AuthProvider>
    );
}
