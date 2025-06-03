"use server";
import { cookies } from "next/headers";

export default async function signInWithGoogle(token: string) {
    const AUTH_API_URL = process.env.BACKEND_API_URL ?? 'http://localhost:8888';
    const AUTH_COOKIE_NAME = process.env.AUTH_COOKIE_NAME ?? 'token';

    console.log('FILE[api/auth/google.ts] | signInWithGoogle | AUTH_API_URL', AUTH_API_URL);

    const res = await fetch(`${AUTH_API_URL}/google`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ggToken: token }),
    });

    if (!res.ok) {
        console.error('Google sign-in failed:', res.status, res.statusText);
        try {
            const errorData = await res.json();
            console.error('Error response body:', errorData);
        } catch (e) {
            console.error('Error parsing error JSON:', e);
        }
        return false;
    }

    let successData;
    try {
        successData = await res.json();
        console.log('FILE[api/auth/google.ts] | signInWithGoogle | successData', successData);
    } catch (e) {
        console.error('Failed to parse success JSON:', e);
        return false;
    }

    const cookieStore = cookies();
    (await cookieStore).set(AUTH_COOKIE_NAME, successData.data.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7,
        path: '/',
        sameSite: 'lax',
    });

    return true;
}
