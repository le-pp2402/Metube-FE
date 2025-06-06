"use server";

import { Video } from "@/types/video";
import { cookies } from "next/headers";



const AUTH_COOKIE_NAME = process.env.AUTH_COOKIE_NAME ?? 'token';
const BACKEND_API_URL = process.env.BACKEND_API_URL ?? 'http://localhost:8080';

export default async function getVideos(query: string): Promise<Video[]> {
  
    const token = (await cookies()).get(AUTH_COOKIE_NAME)?.value;

    const res = await fetch(`${BACKEND_API_URL}/resources?searchPattern=${query}`, {
        method: "GET",
        headers: {
            ...(token && { Authorization: `Bearer ${token}` }),
        },
    });

    if (!res.ok) throw new Error("Failed to fetch videos");

    const resBody = await res.json();
    console.log("FILE[getVideos] | resBody", resBody);

    return resBody.data;
}




