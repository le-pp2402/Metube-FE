'use server';

import { z } from 'zod';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

import { LoginFormSchema } from './validation';
import { ActionState, LoginErrorResponse, LoginSuccessResponse } from './form-state';

const BACKEND_API_URL = process.env.API;

if (!BACKEND_API_URL) {
    console.error("BACKEND_API_URL is not set in environment variables!");
}

const AUTH_COOKIE_NAME = 'auth_token';

export async function login(prevState: ActionState, formData: FormData): Promise<ActionState> {
    console.log("Attempting login...");

    const validatedFields = LoginFormSchema.safeParse({
        username: formData.get('username'),
        password: formData.get('password'),
    });

    if (!validatedFields.success) {
        console.error('Login Action Validation Failed:', validatedFields.error.flatten().fieldErrors);
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Invalid input provided.',
        };
    }

    console.log("Validated login data:", validatedFields.data);

    if (!BACKEND_API_URL) {
         console.error("Attempted login action with unset BACKEND_API_URL");
         return { message: "Server configuration error: Backend URL not set." };
    }

    try {
        const res = await fetch(`${BACKEND_API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(validatedFields.data),
        });

        console.log("Backend login API response status:", res.status);

        if (!res.ok) {
            let errorData: LoginErrorResponse | null = null;
            let errorMessage = `Login failed (Status: ${res.status}).`;

            try {
                errorData = await res.json();
                console.error("Backend login error response data:", errorData);
                errorMessage = errorData?.message ?? errorMessage;

            } catch (parseError) {
                console.error("Failed to parse backend login error response as JSON:", parseError);
            }

            return {
                message: errorMessage,
            };
        }

        const successData: LoginSuccessResponse = await res.json();
        console.log("Backend login success response data:", successData);

        (await cookies()).set(AUTH_COOKIE_NAME, successData.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24 * 7,
            path: '/',
            sameSite: 'lax',
            // signing: COOKIE_SECRET,
        });

        console.log("Authentication cookie set successfully.");

        redirect('/');

    } catch (err) {
        console.error('Error during backend login fetch (network or other):', err);
        return {
            message: 'An unexpected error occurred during login.',
        };
    }

     return { message: "Login process completed (should have redirected)." };
}