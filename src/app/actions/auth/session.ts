import 'server-only';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const BACKEND_API_URL = process.env.API; 

export async function createSession(userId: string) {
  const res = await fetch(`${BACKEND_API_URL}/api/session/create`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId }),
  });

  if (!res.ok) {
    throw new Error('Failed to create session');
  }

  const { token, expiresAt } = await res.json();

  (await cookies()).set('session', token, {
    httpOnly: true,
    secure: true,
    expires: new Date(expiresAt),
    sameSite: 'lax',
    path: '/',
  });

  redirect('/dashboard');
}

export async function verifySession() {
  const token = (await cookies()).get('session')?.value;

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
  const token = (await cookies()).get('session')?.value;

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

  (await cookies()).set('session', newToken, {
    httpOnly: true,
    secure: true,
    expires: new Date(expiresAt),
    sameSite: 'lax',
    path: '/',
  });
}

export async function deleteSession() {
  const token = (await cookies()).get('session')?.value;

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
