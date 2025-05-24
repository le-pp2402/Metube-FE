"use server";

import { ResourceEditRequest, ResourceResponse } from '@/types/resource';
import { cookies } from 'next/headers';


const AUTH_COOKIE_NAME = process.env.AUTH_COOKIE_NAME ?? 'token';
const BACKEND_API_URL = process.env.BACKEND_API_URL ?? 'http://localhost:8080';

export default async function fetchResourcesServer(): Promise<ResourceResponse[]> {
    const token = (await cookies()).get(AUTH_COOKIE_NAME)?.value;

    const res = await fetch(`${BACKEND_API_URL}/workspace/content`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!res.ok) throw new Error('Failed to fetch resources');
    const data = await res.json();
    console.log("FILE[fetchResourcesServer] | data", data);
    return data.data;
}

export async function fetchResourcesServerById(id: number): Promise<ResourceEditRequest> {
    const token = (await cookies()).get(AUTH_COOKIE_NAME)?.value;

    const res = await fetch(`${BACKEND_API_URL}/workspace/content/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!res.ok) throw new Error('Failed to fetch resources');
    const data = await res.json();
    console.log("FILE[fetchResourcesServer] | data", data);
    return data.data;
}