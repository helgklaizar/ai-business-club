"use client";

import { useState } from "react";
import { AuthModal } from "./AuthModal";
import { Dictionary } from "@/dictionaries";
import { useAuth } from "@/lib/contexts/AuthContext";
import { useRouter } from "next/navigation";

export const AuthButton = ({ dict, currentLocale, variant = "ghost" }: { dict: Dictionary, currentLocale: string, variant?: "ghost" | "primary" }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { user, loading } = useAuth();
    const router = useRouter();

    if (loading) return <div className="w-20 animate-pulse bg-zinc-800 h-10 rounded-xl" />;

    const handleClick = () => {
        if (user) {
            router.push(`/${currentLocale}/dashboard`);
        } else {
            setIsModalOpen(true);
        }
    };

    const btnClasses = variant === "primary"
        ? "bg-brand hover:bg-brand-hover text-white px-8 py-4 rounded-full font-bold transition-all shadow-lg shadow-brand/25 hover:shadow-brand/50 hover:-translate-y-1 inline-flex items-center gap-2"
        : "text-zinc-300 hover:text-white px-5 py-2.5 rounded-full font-medium transition-colors hover:bg-zinc-800/50";

    return (
        <>
            <button onClick={handleClick} className={btnClasses}>
                {user ? "Dashboard" : variant === "primary" ? dict.global.becomeResident : dict.global.login}
            </button>

            <AuthModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                dict={dict}
                currentLocale={currentLocale}
            />
        </>
    );
};
