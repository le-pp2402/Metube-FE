import 'server-only';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { User } from '@/types/user';
import { checkAuth } from '@/utils/authApi';

const BACKEND_API_URL = process.env.API; 
const AUTH_COOKIE_NAME = process.env.AUTH_COOKIE_NAME ?? 'token';

export async function verifySession() {
  const token = (await cookies()).get(AUTH_COOKIE_NAME)?.value;

  console.log("Token from cookie:", token);

  const res = await fetch(`${BACKEND_API_URL}/api/session/verify`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    redirect('/login');
  }

  const data = await res.json();

  return { isAuth: true, userId: Number(data.userId) };
}

export async function updateSession() {
  const token = (await cookies()).get(AUTH_COOKIE_NAME)?.value;

  if (!token) return null;

  const res = await fetch(`${BACKEND_API_URL}/api/session/refresh`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    return null;
  }

  const { newToken, expiresAt } = await res.json();

  (await cookies()).set(AUTH_COOKIE_NAME, newToken, {
    httpOnly: true,
    secure: true,
    expires: new Date(expiresAt),
    sameSite: 'lax',
    path: '/',
  });
}

export async function deleteSession() {
  const token = (await cookies()).get(AUTH_COOKIE_NAME)?.value;

  if (token) {
    await fetch(`${BACKEND_API_URL}/api/session/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  }

  (await cookies()).delete('session');
  redirect('/login');
}


export async function getUserFromCookie(): Promise<User | null> {
    try {
        const token = (await cookies()).get(AUTH_COOKIE_NAME)?.value;

        console.log("Token from cookie:", token);

        if (!token) {
            return null;
        }

        const res = await checkAuth(token);

        const userData = res.data?.data;

        if (!userData) {
            (await cookies()).delete(AUTH_COOKIE_NAME);
            return null;
        }

        return {
            id: userData.id,
            username: userData.username,
            email: userData.email,
            is_admin: userData.is_admin,
        };

    } catch (error) {
        console.error("Error getting user from cookie:", error);
        (await cookies()).delete(AUTH_COOKIE_NAME);
        return null;
    }
}