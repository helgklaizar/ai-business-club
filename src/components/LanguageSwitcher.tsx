"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useCallback } from "react";

export const LanguageSwitcher = ({ currentLocale }: { currentLocale: string }) => {
    const pathname = usePathname();

    // Redirects from /ru/path to /en/path
    const redirectedPathName = useCallback(
        (locale: string) => {
            if (!pathname) return "/";
            const segments = pathname.split("/");
            segments[1] = locale; // since pathname starts with '/', chunks[0] is '' and chunks[1] is the locale
            return segments.join("/");
        },
        [pathname]
    );

    return (
        <div className="flex gap-2 items-center text-sm">
            {['ru', 'en', 'he'].map((l) => (
                <Link
                    key={l}
                    href={redirectedPathName(l)}
                    className={`uppercase font-mono tracking-wider transition-colors hover:text-brand ${currentLocale === l ? 'text-brand font-bold' : 'text-zinc-500'}`}
                >
                    {l}
                </Link>
            ))}
        </div>
    );
};
