"use server";
import { LoginSuccessResponse } from "@/features/auth/utils/form-state";
import { cookies } from "next/headers";

export default async function signInWithGoogle(token: string) {
    const AUTH_API_URL = process.env.BACKEND_API_URL ?? 'http://localhost:8888';
    const AUTH_COOKIE_NAME = process.env.AUTH_COOKIE_NAME ?? 'token';

    const res = await fetch(`${AUTH_API_URL}/google`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            ggToken: token,
        }),
    });

    const successData: LoginSuccessResponse = await res.json();

    console.log('FILE[api/auth/google.ts] | signInWithGoogle | successData', successData);

    if (res.ok) {
        const cookieStore = await cookies();
        cookieStore.set(AUTH_COOKIE_NAME, successData.data.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24 * 7,
            path: '/',
            sameSite: 'lax',
        });
    }

    return res;
}
