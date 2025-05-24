'use client';

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Home, LogOut, Video, Search, SettingsIcon, RadioIcon } from "lucide-react";
import { useAuth } from '@/context/AuthContext';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { Input } from "@/components/ui/input";
import Link from "next/link";

const sidebarItems = [
    { icon: Home, label: "Overview", link: "/workspace" },
    { icon: Video, label: "Content", link: "/workspace/content" },
    { icon: RadioIcon, label: "Live Stream", link: "/workspace/livestream" },
    { icon: SettingsIcon, label: "Settings", link: "/workspace/settings" },
];


export function WorkspaceLayout({ children }: { children: React.ReactNode }) {
    const { user } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (!user) {
            router.push('/login');
        }
    }, [user, router]);

    if (!user) return null;

    return (
        <div className="flex min-h-screen bg-background text-foreground">
            {/* Sidebar */}
            <aside className="w-64 bg-zinc-900 text-zinc-100 flex flex-col py-6 px-3 border-r border-zinc-800">
                <div className="flex items-center gap-3 mb-8 px-2">
                    <div className="bg-zinc-700 rounded-full w-10 h-10 flex items-center justify-center text-2xl font-bold">P</div>
                    <div>
                        <div className="font-semibold text-lg leading-tight">Your channel</div>
                        <div className="text-xs text-zinc-400">Phi Phat Lê</div>
                    </div>
                </div>
                <nav className="flex-1 space-y-1">
                    {sidebarItems.map((item) => {
                        const isActive = pathname === item.link;
                        return (
                            <Button
                                key={item.label}
                                variant={isActive ? "secondary" : "ghost"}
                                className={cn(
                                    "w-full justify-start gap-3 px-3 py-2 rounded-lg text-base",
                                    isActive && "bg-zinc-800 text-green-400 hover:bg-zinc-800 font-bold",
                                    !isActive && "font-medium"
                                )}
                                onClick={() => router.push(item.link)}
                            >
                                <item.icon className={cn("w-5 h-5", isActive && "text-green-400")} />
                                {item.label}
                            </Button>
                        );
                    })}
                </nav>

                <div className="mt-8">
                    <Button
                        variant="ghost"
                        className="w-full justify-start gap-3 px-3 py-2 rounded-lg text-base font-medium"
                        onClick={() => router.push('/')}
                    >
                        <LogOut className="w-5 h-5" />
                        Go home
                    </Button>
                </div>
            </aside>

            {/* Main content */}
            <div className="flex-1 flex flex-col min-h-screen">
                {/* Top bar */}
                <header className="flex items-center justify-between px-8 py-4 border-b border-zinc-200 dark:border-zinc-800 bg-background">
                    <nav className="flex items-center justify-between px-6 py-3 bg-white shadow-md w-full">
                        <div className="relative w-2/3">
                            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                            <Input placeholder="Search videos in your channel..." className="pl-10 pr-3 py-2 rounded-md border border-gray-300 focus:ring-primary focus:border-primary w-full" />
                        </div>
                    </nav>
                </header>

                <main className="flex-1 bg-background px-8 py-6 overflow-auto">
                    {children}
                </main>
            </div>
        </div >
    );
} 