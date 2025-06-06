import Link from 'next/link';
import { SignupForm } from '@/app/(watch)/(auth)/register/form';

export default function Page() {
    return (
        <div className="min-h-screen flex flex-col lg:flex-row bg-white">
            <div className="w-full lg:w-3/5 flex items-center justify-center px-4 py-8">
                <div className="w-full max-w-md flex flex-col justify-center">
                    <h1 className="text-4xl font-extrabold text-zinc-900 mb-2 text-center">Welcome back!</h1>
                    <p className="text-zinc-500 text-center mb-8">
                        Simplify your workflow and boost your productivity with <span className="font-semibold text-zinc-900">MeTube</span>. Get started for free.
                    </p>
                    <SignupForm />
                    <div className="mt-6 text-center text-sm">
                        Already have an account?{' '}
                        <Link className="underline" href="/login">
                            Login
                        </Link>
                    </div>
                </div>
            </div>
            <div className="hidden lg:flex w-2/5 items-center justify-center bg-[#F6FBF9]">
                <div className="flex flex-col items-center justify-center w-full h-full p-8">
                    {/* Illustration of TV Viewer */}
                    <svg width="320" height="220" viewBox="0 0 320 220" fill="none" xmlns="http://www.w3.org/2000/svg">
                        {/* TV Frame */}
                        <rect width="320" height="220" rx="32" fill="#E6F4EA" />
                        {/* TV Screen */}
                        <rect x="40" y="30" width="240" height="140" rx="8" fill="#fff" />
                        {/* TV Stand */}
                        <path d="M120 170 L200 170 L180 200 L140 200 Z" fill="#B7EACD" />
                        {/* Person Silhouette */}
                        <circle cx="160" cy="100" r="20" fill="#B7EACD" /> {/* Head */}
                        <rect x="140" y="120" width="40" height="30" rx="8" fill="#B7EACD" /> {/* Body */}
                        {/* Play Button */}
                        <circle cx="160" cy="85" r="8" fill="#fff" />
                        <path d="M158 82 L164 85 L158 88 Z" fill="#B7EACD" />
                        {/* Language Symbols */}
                        <text x="60" y="60" fontSize="12" fill="#B7EACD">En</text>
                    </svg>
                    <div className="mt-8 text-center">
                        <h2 className="text-xl font-semibold text-zinc-800 mb-2">Watch Videos, Live Streams & More</h2>
                        <p className="text-zinc-600 font-medium">in multiple languages on <span className="font-bold">MeTube</span></p>
                    </div>
                </div>
            </div>
        </div>
    );
}