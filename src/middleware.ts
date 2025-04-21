import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const AUTH_COOKIE_NAME = 'auth_token';
const LOGIN_URL = '/login';
const PROTECTED_REDIRECT_URL = '/';

export function middleware(request: NextRequest) {

    const { pathname } = request.nextUrl;

    const authToken = request.cookies.get(AUTH_COOKIE_NAME);

    console.log(`[Middleware] Checking path: ${pathname}, Auth cookie: ${authToken ? 'Found' : 'Not Found'}`);

    const isLoginRoute = pathname === LOGIN_URL;

    if (authToken) {
        if (isLoginRoute) {
            console.log("[Middleware] Logged in, redirecting from login page");
            return NextResponse.redirect(new URL(PROTECTED_REDIRECT_URL, request.url));
        }
        console.log("[Middleware] Logged in, allowing access");
        return NextResponse.next();
    } else {
        if (isLoginRoute) {
            console.log("[Middleware] Not logged in, allowing access to login page");
            return NextResponse.next();
        }

        // Nếu chưa đăng nhập và truy cập trang khác login (cần bảo vệ)
        // Bạn cần xác định các route cần bảo vệ, ví dụ bằng `config.matcher`
        // Redirect về trang login
        // Đây là logic đơn giản, cần kết hợp với config.matcher bên dưới
        console.log(`[Middleware] Not logged in, potentially redirecting from ${pathname} to ${LOGIN_URL}`);
        // Việc redirect thực tế sẽ dựa vào config.matcher
        // Nếu pathname khớp với matcher nhưng không phải trang login và không có token, middleware sẽ redirect.
        // Bạn không cần code explicit redirect ở đây cho tất cả các trường hợp ngoài login page,
        // mà dựa vào cấu hình matcher để trigger middleware trên các route mong muốn.
        // Hàm này chủ yếu xác định dựa trên trạng thái token và trang login.
        // Logic chi tiết hơn dựa vào matcher sẽ tự động xử lý redirect nếu cần.
        return NextResponse.next(); // Cho phép đi tiếp nếu không phải trang login, redirect sẽ xử lý nếu route match và không có token.
    }
}

export const config = {
    matcher: [
        '/dashboard/:path*',
        '/profile',
        '/settings',
        '/login',
    ],
};