"use server";

import { cookies } from "next/headers";

interface GetPresignedUrlParams {
  title: string;
}

interface PresignedUrlResponse {
    url: string;
}

const AUTH_COOKIE_NAME = process.env.AUTH_COOKIE_NAME ?? 'token';
const BACKEND_API_URL = process.env.BACKEND_API_URL ?? 'http://localhost:8080';

export default async function getPresignedUrl({ title }: GetPresignedUrlParams): Promise<PresignedUrlResponse> {
  const token = (await cookies()).get(AUTH_COOKIE_NAME)?.value;

  const res = await fetch(`${BACKEND_API_URL}/storage/upload`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title }),
  });

  console.log("FILE[getPresignedUrl] | res", res);

  if (!res.ok) throw new Error("Failed to get upload URL");
  return res.json();
} 