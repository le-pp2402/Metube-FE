import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { checkAuth } from '@/utils/authApi';

const AUTH_COOKIE_NAME = process.env.AUTH_COOKIE_NAME ?? 'token';

export async function GET() {
    try {
        const token = (await cookies()).get(AUTH_COOKIE_NAME)?.value;
        
        console.log('FILE[api/auth/me/route.ts] | GET | token', token);
        
        if (!token) {
            return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
        }   

        const response = await checkAuth(token);
        
        if (!response.data?.data) {
            return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
        }

        const userData = response.data.data;
        return NextResponse.json({
            id: userData.id,
            username: userData.username,
            email: userData.email,
            is_admin: userData.is_admin,
        });
    } catch (error) {
        console.error('Error in /api/auth/me:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
} 