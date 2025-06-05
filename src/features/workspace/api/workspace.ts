'use server';

import { cookies } from 'next/headers';

const BACKEND_API_URL = process.env.BACKEND_API_URL ?? 'http://localhost:8080';
const AUTH_COOKIE_NAME = process.env.AUTH_COOKIE_NAME ?? 'token';

export async function getUserInfo() {
    try {
        const token = (await cookies()).get(AUTH_COOKIE_NAME)?.value;
        if (!token) {
            return { error: 'Not authenticated' };
        }

        const res = await fetch(`${BACKEND_API_URL}/users/me`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!res.ok) {
            return { error: 'Failed to fetch user info' };
        }

        const data = await res.json();

        return { user: data.data };
    } catch (error) {
        console.error('Error fetching user info:', error);
        return { error: 'An error occurred while fetching user info' };
    }
}

export async function updateUserInfo(data: { username?: string; email?: string }) {
    try {
        const token = (await cookies()).get(AUTH_COOKIE_NAME)?.value;
        if (!token) {
            return { error: 'Not authenticated' };
        }

        const res = await fetch(`${BACKEND_API_URL}/users/me`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!res.ok) {
            return { error: 'Failed to update user info' };
        }

        const responseData = await res.json();
        return { user: responseData.data };
    } catch (error) {
        console.error('Error updating user info:', error);
        return { error: 'An error occurred while updating user info' };
    }
}

export async function getStreamKey() {
    try {
        const token = (await cookies()).get(AUTH_COOKIE_NAME)?.value;
        if (!token) {
            return { error: 'Not authenticated' };
        }

        const res = await fetch(`${BACKEND_API_URL}/users/stream-key`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!res.ok) {
            return { error: 'Failed to fetch stream key' };
        }

        const data = await res.json();
        return { streamKey: data.data.stream_key };
    } catch (error) {
        console.error('Error fetching stream key:', error);
        return { error: 'An error occurred while fetching stream key' };
    }
}

export async function regenerateStreamKey() {
    try {
        const token = (await cookies()).get(AUTH_COOKIE_NAME)?.value;
        if (!token) {
            return { error: 'Not authenticated' };
        }

        const res = await fetch(`${BACKEND_API_URL}/users/stream-key/regenerate`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!res.ok) {
            return { error: 'Failed to regenerate stream key' };
        }

        const data = await res.json();
        return { streamKey: data.data.stream_key };
    } catch (error) {
        console.error('Error regenerating stream key:', error);
        return { error: 'An error occurred while regenerating stream key' };
    }
} 

export async function getStatistics() {
    try {
        const token = (await cookies()).get(AUTH_COOKIE_NAME)?.value;
        const res = await fetch(`${BACKEND_API_URL}/statistic`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });

        if (!res.ok) {
            throw new Error('Failed to fetch statistics');
        }

        const data = await res.json();
        return { data: data.data };
    } catch (error) {
        console.error('Error fetching statistics:', error);
        return { error: 'An error occurred while fetching statistics' };
    }
}

export async function appendAdvertising(
    videoId: number
) {
    try {
        const token = (await cookies()).get(AUTH_COOKIE_NAME)?.value;
        const res = await fetch(`${BACKEND_API_URL}/resources/add-ad/${videoId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });

        if (!res.ok) {
            throw new Error('Failed to append advertising');
        }

        return { success: true };
    } catch (error) {
        console.error('Error appending advertising:', error);
        return { error: 'An error occurred while appending advertising' };
    }
}