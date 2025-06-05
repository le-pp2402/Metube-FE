"use server";

import { cookies } from "next/headers";

const AUTH_COOKIE_NAME = process.env.AUTH_COOKIE_NAME ?? "token";
const BACKEND_API_URL = process.env.BACKEND_API_URL ?? "http://localhost:8080";

export async function getLiveSession() {
    const res = await fetch(`${BACKEND_API_URL}/live-session`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!res.ok) {
        const error = await res.json();
        console.log("FILE[api/live/live-session.ts] | error", error);
        throw new Error(error.message || "Failed to get live session");
    }

    const { data } = await res.json();
    console.log("FILE[live-session.ts] | data", data);
    return data;
}

export async function startLiveSession({ title }: { title: string }) {
    const token = (await cookies()).get(AUTH_COOKIE_NAME)?.value;

    const res = await fetch(`${BACKEND_API_URL}/live-session/start`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title }),
    });

    if (!res.ok) {
        const error = await res.json();
        console.log("FILE[api/live/live-session.ts] | error", error);
        throw new Error(error.message || "Failed to start live session");
    } else {
        const { data } = await res.json();
        console.log(data);
        console.log("FILE[live-session.ts] | data", data);    
    }

    return true;
}

export async function stopLiveSession() {
    const token = (await cookies()).get(AUTH_COOKIE_NAME)?.value;

    const res = await fetch(`${BACKEND_API_URL}/live-session/stop`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    if (!res.ok) {
        const error = await res.json();
        console.log("FILE[api/live/live-session.ts] | error", error);
        throw new Error(error.message || "Failed to stop live session");
    }

    console.log(res);

    const { data } = await res.json();
    console.log("FILE[live-session.ts] | data", data);

    return true;
}

export async function getCurrentLiveSession() {
    const token = (await cookies()).get(AUTH_COOKIE_NAME)?.value;

    const res = await fetch(`${BACKEND_API_URL}/live-session/me`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    console.log("[CurrentLiveSession] {}", res);
    if (!res.ok) {
        return null;
    }

    const { data } = await res.json();
    return data;
}
