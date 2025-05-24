"use server";

import { cookies } from "next/headers";

export async function createSteamKey() : Promise<string> {
    const AUTH_COOKIE_NAME = process.env.AUTH_COOKIE_NAME ?? 'token';
    const BACKEND_API_URL = process.env.BACKEND_API_URL ?? 'http://localhost:8080';
    
    const token = (await cookies()).get(AUTH_COOKIE_NAME)?.value;

    const res = await fetch(`${BACKEND_API_URL}/users/streamkey`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || 'Failed to create stream key');
    }

    const { data } = await res.json();

    console.log("FILE[create-stream-key.ts] | data", data);
    return data;
}