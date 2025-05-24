import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { checkAuth } from '@/utils/authApi';

const AUTH_COOKIE_NAME = 'token';
const LOGIN_URL = '/login';
const REGISTER_URL = '/register';
const HOME_URL = '/';

const publicPaths = [HOME_URL, LOGIN_URL, '/register', '/channels', '/lives', '/trending', '/watch-later', '/watch', '/test'];

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    console.log('FILE[/middleware.ts] | middleware | pathname', pathname);

    const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;

    let user = null;

    console.log('FILE[/middleware.ts] | middleware | token', token);
    // nếu tồn tại token thì kiểm tra tính hợp lệ
    if (token) {
        try {
            const res = await checkAuth(token);
            if (res && res.data && res.data.data) {
                user = res.data.data;
            } else {
                user = null;
            }
        } catch (error) {
            console.log(error);
            user = null;
        }
    }

    const isPublicPath = publicPaths.includes(pathname);
    const isLoginOrRegisterPath = pathname === LOGIN_URL || pathname === REGISTER_URL;
    const isWorkspacePath = pathname.startsWith('/workspace');

    let response = NextResponse.next();

    console.log('FILE[/middleware.ts] | middleware | user', user);

    if (user) {
        if (isLoginOrRegisterPath) {
            response = NextResponse.redirect(new URL(HOME_URL, request.url));
        }
    } else {
        if (isWorkspacePath) {
            const loginUrl = new URL(LOGIN_URL, request.url);
            loginUrl.searchParams.set('callbackUrl', pathname);
            response = NextResponse.redirect(loginUrl);
        } else if (!isPublicPath) {
            response = NextResponse.redirect(new URL(LOGIN_URL, request.url));
        }

        if (token && !user) {
            response.cookies.delete(AUTH_COOKIE_NAME);
        }
    }

    return response;
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|images|.*\\.(?:png|jpg|jpeg|gif|webp|svg|eot|ttf|woff|woff2)$).*)',
        '/login',
        '/register',
        '/channels',
        '/lives',
        '/trending',
        '/watch-later',
        '/watch',
        '/workspace/:path*',
        '/upload',
        '/search',
        '/search/:path*',
        '/video/:path*',
        '/channel/:path*',
        '/user/:path*',
    ],
};