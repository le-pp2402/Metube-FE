import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { LoginForm } from './login-form';


const AUTH_COOKIE_NAME = 'auth_token';

export default async function LoginPage() {
    const authToken = (await cookies()).get(AUTH_COOKIE_NAME);

    console.log("Checking auth cookie on login page:", authToken ? 'Found' : 'Not Found');

    if (authToken) {
        console.log("Auth cookie found, redirecting to /");
        redirect('/');
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <LoginForm />
        </div>
    );
}