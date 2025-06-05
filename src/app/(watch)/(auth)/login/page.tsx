"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { LoginForm } from "@/features/auth/components/login-form";
import { FcGoogle } from 'react-icons/fc';
import signInWithGoogle from "@/app/api/auth/google";

export default function LoginPage() {
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl') || '/workspace';
    const [isGoogleLoaded, setIsGoogleLoaded] = useState(false);

    const handleGoogleSignIn = async (response) => {
        try {
            console.log('Google Sign-In response:', response);

            if (!response || !response.credential) {
                console.error('No credential received from Google');
                return;
            }

            const res = await signInWithGoogle(response.credential);

            if (res) {
                console.log('Sign-in successful, redirecting...');
                window.location.href = callbackUrl;
            } else {
                alert('Sign-in failed. F5 and try again.');
            }
        } catch (error) {
            console.error('Error during sign-in:', error);
            alert('An error occurred during sign-in. Please try again.');
        }
    };

    useEffect(() => {
        if (window.google) {
            initializeGoogleSignIn();
            return;
        }

        const script = document.createElement('script');
        script.src = 'https://accounts.google.com/gsi/client';
        script.async = true;
        script.defer = true;

        script.onload = () => {
            console.log('Google script loaded');
            initializeGoogleSignIn();
        };

        script.onerror = () => {
            console.error('Failed to load Google script');
            setIsGoogleLoaded(false);
        };

        document.head.appendChild(script);

        return () => {
            // Cleanup script when component unmounts
            if (script.parentNode) {
                script.parentNode.removeChild(script);
            }
        };
    }, []);

    const initializeGoogleSignIn = () => {
        if (!window.google || !window.google.accounts) {
            console.error('Google accounts not available');
            return;
        }

        try {
            const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

            if (!clientId) {
                console.error('Google Client ID not found in environment variables');
                return;
            }

            console.log('Initializing Google Sign-In with client ID:', clientId);

            window.google.accounts.id.initialize({
                client_id: clientId,
                callback: handleGoogleSignIn,
                auto_select: false,
                cancel_on_tap_outside: true,
            });

            setIsGoogleLoaded(true);
            console.log('Google Sign-In initialized successfully');

        } catch (error) {
            console.error('Error initializing Google Sign-In:', error);
            setIsGoogleLoaded(false);
        }
    };

    const handleCustomGoogleSignIn = () => {
        console.log('Custom Google Sign-In button clicked');

        if (!window.google || !window.google.accounts) {
            console.error('Google Sign-In not initialized');
            alert('Google Sign-In is not available. Please refresh the page and try again.');
            return;
        }

        try {
            window.google.accounts.id.prompt((notification) => {
                console.log('Google prompt notification:', notification);
                if (notification.isNotDisplayed()) {
                    console.log('Google One Tap not displayed');
                } else if (notification.isSkippedMoment()) {
                    console.log('Google One Tap skipped');
                }
            });
        } catch (error) {
            console.error('Error triggering Google Sign-In:', error);
            alert('Unable to open Google Sign-In. Please try again.');
        }
    };

    return (
        <div className="min-h-screen flex flex-col lg:flex-row bg-white">
            {/* Left side - Login Form */}
            <div className="w-full lg:w-3/5 flex items-center justify-center px-4 py-8">
                <div className="w-full max-w-md flex flex-col justify-center">
                    <h1 className="text-4xl font-extrabold text-zinc-900 mb-2 text-center">Welcome back!</h1>
                    <p className="text-zinc-500 text-center mb-8">
                        Simplify your workflow and boost your productivity with <span className="font-semibold text-zinc-900">MeTube</span>. Get started for free.
                    </p>
                    <LoginForm callbackUrl={callbackUrl} />
                    <div className="flex justify-end mt-2 mb-6">
                        <a href="#" className="text-xs text-zinc-500 hover:underline">Forgot Password?</a>
                    </div>
                    <div className="flex items-center my-6">
                        <div className="flex-1 h-px bg-zinc-200" />
                        <span className="mx-4 text-zinc-400 text-sm">or continue with</span>
                        <div className="flex-1 h-px bg-zinc-200" />
                    </div>
                    <div className="flex justify-center gap-4 mb-8">
                        <button
                            onClick={handleCustomGoogleSignIn}
                            disabled={!isGoogleLoaded}
                            className={`rounded-full border border-zinc-200 p-3 transition ${isGoogleLoaded
                                ? 'hover:bg-zinc-50 cursor-pointer'
                                : 'opacity-50 cursor-not-allowed'
                                }`}
                            title={isGoogleLoaded ? 'Sign in with Google' : 'Loading Google Sign-In...'}
                        >
                            <FcGoogle size={22} />
                        </button>
                    </div>
                    {!isGoogleLoaded && (
                        <div className="text-center text-xs text-zinc-400 mb-4">
                            Loading Google Sign-In...
                        </div>
                    )}
                    <div className="text-center text-sm text-zinc-500">
                        Not a member?{' '}
                        <a href="/register" className="text-green-700 font-medium hover:underline">Register now</a>
                    </div>
                </div>
            </div>
            {/* Right side - Illustration */}
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