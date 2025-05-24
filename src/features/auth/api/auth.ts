'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import {  RegisterFormSchema } from '@/features/auth/utils/validation';
import { ActionState, LoginSuccessResponse } from '@/features/auth/utils/form-state';

const BACKEND_API_URL = process.env.BACKEND_API_URL ?? 'http://localhost:8080';
const AUTH_COOKIE_NAME = process.env.AUTH_COOKIE_NAME ?? 'token';

export async function signup(prevState: ActionState, formData: FormData): Promise<ActionState> {
    const validatedFields = RegisterFormSchema.safeParse({
        username: formData.get('username'),
        email: formData.get('email'),
        password: formData.get('password'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Invalid fields',
        };
    }

    try {
        const res = await fetch(`${BACKEND_API_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(validatedFields.data),
        });

        if (!res.ok) {
            const error = await res.json();
            return {
                message: error.message || 'Something went wrong',
            };
        }

        redirect('/login');
    } catch (error) {
        return {
            message: 'An error occurred during registration',
        };
    }
}

export async function login(data: { username: string; password: string }): Promise<{ error?: string; user?: any }> {
    try {
        const res = await fetch(`${BACKEND_API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        console.log('Response:', res);
        
        if (!res.ok) {
            const errorData = await res.json();
            return {
                error: errorData?.message ?? 'Login failed'
            };
        }

        const successData: LoginSuccessResponse = await res.json();
        
        const cookieStore = await cookies();
        cookieStore.set(AUTH_COOKIE_NAME, successData.data.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24 * 7,
            path: '/',
            sameSite: 'lax',
        });

        // Return the user data without the token
        const { token, ...userData } = successData.data;
        return {
            user: userData
        };

    } catch (err) {
        console.error('Error during login:', err);
        return {
            error: 'An unexpected error occurred during login.'
        };
    }
}

export async function serverLogout() {
    const cookieStore = await cookies();
    cookieStore.delete(AUTH_COOKIE_NAME);
    return { success: true };
} 