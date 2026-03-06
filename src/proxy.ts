import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const locales = ['ru', 'en', 'he']
const defaultLocale = 'ru'

export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl

    // Пропускаем статику и API
    if (pathname.includes('.') || pathname.startsWith('/api') || pathname.startsWith('/_next')) return

    // Проверяем, есть ли локаль в URL
    const pathnameIsMissingLocale = locales.every(
        (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
    )

    if (pathnameIsMissingLocale) {
        // Вставляем дефолтную локаль и делаем редирект
        return NextResponse.redirect(
            new URL(
                `/${defaultLocale}${pathname.startsWith('/') ? '' : '/'}${pathname}`,
                request.url
            )
        )
    }
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
}
